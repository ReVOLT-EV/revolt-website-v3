import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Server-side gate for the member portal. The Flask backend (/api/login) issues
// an HS256 JWT in the httpOnly "session" cookie; we verify it here with the same
// JWT_SECRET before any /revolt-team page is served. Fails closed: no secret,
// no cookie, or a bad/expired token all redirect to /login.
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const secret = process.env.JWT_SECRET;

  if (token && secret && secret.length >= 32) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch {
      // fall through to redirect
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  const res = NextResponse.redirect(url);
  if (token) res.cookies.delete("session");
  return res;
}

export const config = {
  // Vercel Services don't support Edge functions, so run on Node.js.
  runtime: "nodejs",
  matcher: ["/revolt-team", "/revolt-team/:path*"],
};
