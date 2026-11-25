"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BoltV } from "@/components/brand/Logo";
import { useAuth } from "@/contexts/AuthContext";

// Same-origin: vercel.json routes /api/* to the Flask backend service.
const BACKEND_URL = "/api";

const field =
  "w-full rounded-xl border border-line bg-night px-4 py-3.5 text-chalk placeholder:text-muted/70 outline-none transition-colors focus:border-volt";

export const LoginControl = () => {
  const router = useRouter();
  const { user, checkAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in → straight to the portal
  useEffect(() => {
    if (user) router.push("/revolt-team");
  }, [user, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("bad credentials");
      await checkAuth();
      router.push("/revolt-team");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card flex w-full max-w-md flex-col gap-5 p-8 md:p-10">
      <BoltV size={40} />
      <div>
        <h1 className="h-display text-3xl">Member login</h1>
        <p className="mt-2 text-chalk/65">Sign in to access ReVOLT team content.</p>
      </div>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Username</span>
        <input autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className={field} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Password</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
      </label>
      <p role="alert" className="min-h-5 text-sm text-[#ff7a6b]">{error}</p>
      <button type="submit" disabled={busy} className="btn btn-volt disabled:opacity-60">
        {busy ? "Signing in…" : "Log in"}
      </button>
    </form>
  );
};
