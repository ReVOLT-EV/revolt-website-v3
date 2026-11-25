"use client";

import { FormEvent, useState } from "react";

// Same-origin: vercel.json routes /api/* to the Flask backend service.
const EMAIL_ENDPOINT = "/api/contact";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

const field =
  "w-full rounded-xl border border-line bg-night px-4 py-3.5 text-chalk placeholder:text-muted/70 outline-none transition-colors focus:border-volt";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ kind: "ok", msg: "Message sent. We'll get back to you soon." });
        setForm({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus({ kind: "error", msg: "That didn't send. Try again, or email us directly." });
      }
    } catch {
      setStatus({ kind: "error", msg: "Couldn't reach our mail server. Try again, or email us directly." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-5 p-7 md:p-9">
      {/* Honeypot: hidden from people, bots fill it in and get silently dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update("company")} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Name</span>
          <input name="name" required autoComplete="name" value={form.name} onChange={update("name")} className={field} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Message</span>
        <textarea name="message" required rows={6} value={form.message} onChange={update("message")} className={`${field} resize-y`} placeholder="Sponsorship, joining the team, press, anything." />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-volt disabled:opacity-60">
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className={`text-sm ${status.kind === "error" ? "text-[#ff7a6b]" : "text-volt"}`}>
          {status.msg}
        </p>
      </div>
    </form>
  );
}
