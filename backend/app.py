"""
ReVOLT website backend (Flask), deployed on Vercel as a Python service.

vercel.json routes every /api/* request here, and Vercel keeps the /api
prefix, so every route below is declared with it.

Environment variables (set them in the Vercel project, or in backend/.env
when running locally):

  JWT_SECRET      long random string that signs member-login tokens (required)
  TEAM_USERNAME   shared member-portal username (required for login)
  TEAM_PASSWORD   shared member-portal password (required for login)
  SMTP_HOST       e.g. smtp.gmail.com (required for the contact form)
  SMTP_PORT       465 (SSL) or 587 (STARTTLS)
  EMAIL_USER      mailbox the site sends from
  EMAIL_PASS      password / app password for EMAIL_USER
  CONTACT_TO      where contact messages are delivered (defaults to EMAIL_USER)
"""

import hmac
import os
import re
import smtplib
import ssl
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

import jwt
from dotenv import load_dotenv
from flask import Flask, jsonify, request

load_dotenv()

app = Flask(__name__)

COOKIE_NAME = "session"
SESSION_HOURS = 2
# Vercel sets VERCEL=1 on every deployment; locally we run over plain http.
ON_VERCEL = bool(os.getenv("VERCEL"))


def _jwt_secret() -> str | None:
    secret = os.getenv("JWT_SECRET")
    # Refuse short / missing secrets instead of falling back to a default:
    # a guessable secret would let anyone forge a member token.
    return secret if secret and len(secret) >= 32 else None


def _error(message: str, status: int):
    return jsonify({"success": False, "error": message}), status


# ── Member login ─────────────────────────────────────────────────────────────

@app.post("/api/login")
def login():
    secret = _jwt_secret()
    expected_user = os.getenv("TEAM_USERNAME")
    expected_pass = os.getenv("TEAM_PASSWORD")
    if not (secret and expected_user and expected_pass):
        app.logger.error("Login is not configured: set JWT_SECRET (32+ chars), TEAM_USERNAME, TEAM_PASSWORD")
        return _error("Login is not available right now.", 503)

    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")
    if not isinstance(username, str) or not isinstance(password, str):
        return _error("Invalid credentials", 401)

    # Compare both fields in constant time, and always compare both.
    user_ok = hmac.compare_digest(username.encode(), expected_user.encode())
    pass_ok = hmac.compare_digest(password.encode(), expected_pass.encode())
    if not (user_ok and pass_ok):
        return _error("Invalid credentials", 401)

    token = jwt.encode(
        {"username": username, "exp": datetime.now(timezone.utc) + timedelta(hours=SESSION_HOURS)},
        secret,
        algorithm="HS256",
    )
    resp = jsonify({"success": True})
    resp.set_cookie(
        COOKIE_NAME,
        token,
        max_age=SESSION_HOURS * 60 * 60,
        httponly=True,
        secure=ON_VERCEL,
        samesite="Lax",  # frontend and API share one origin now
        path="/",
    )
    return resp


@app.post("/api/logout")
def logout():
    resp = jsonify({"success": True})
    resp.delete_cookie(COOKIE_NAME, path="/", httponly=True, secure=ON_VERCEL, samesite="Lax")
    return resp


@app.get("/api/check")
def check():
    token = request.cookies.get(COOKIE_NAME)
    secret = _jwt_secret()
    if not token or not secret:
        return jsonify({"logged_in": False}), 401
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        return jsonify({"logged_in": False}), 401
    return jsonify({"logged_in": True, "user": payload["username"], "exp": payload["exp"]})


# ── Contact form ─────────────────────────────────────────────────────────────

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}

    # Honeypot: real visitors never see or fill the "company" field.
    if data.get("company"):
        return jsonify({"success": True})

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return _error("All fields are required.", 400)
    if len(name) > 100 or len(email) > 254 or len(message) > 5000:
        return _error("Message is too long.", 400)
    if not EMAIL_RE.match(email) or any(c in name + email for c in "\r\n"):
        return _error("Please enter a valid email address.", 400)

    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "465"))
    sender = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    recipient = os.getenv("CONTACT_TO") or sender
    if not (host and sender and password):
        app.logger.error("Contact form is not configured: set SMTP_HOST, SMTP_PORT, EMAIL_USER, EMAIL_PASS")
        return _error("Email is not available right now.", 503)

    msg = EmailMessage()
    # Send from our own mailbox (spoofing the visitor's address fails SPF/DMARC);
    # replying in the inbox goes straight to the visitor.
    msg["From"] = f"ReVOLT Website <{sender}>"
    msg["To"] = recipient
    msg["Reply-To"] = email
    msg["Subject"] = f"Website contact: {name}"
    msg.set_content(f"Name: {name}\nEmail: {email}\n\n{message}")  # plain text: no HTML injection

    try:
        context = ssl.create_default_context()
        if port == 465:
            with smtplib.SMTP_SSL(host, port, context=context, timeout=10) as smtp:
                smtp.login(sender, password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(host, port, timeout=10) as smtp:
                smtp.starttls(context=context)
                smtp.login(sender, password)
                smtp.send_message(msg)
    except (smtplib.SMTPException, OSError):
        app.logger.exception("Contact email failed to send")
        return _error("Email failed to send.", 502)

    return jsonify({"success": True})


@app.get("/api/health")
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()})


if __name__ == "__main__":
    # Local development: `python app.py`; the Next dev server proxies /api here.
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 5328)), debug=True)
