import type { Metadata } from "next";

import { LoginControl } from "./login_functions";

export const metadata: Metadata = { title: "Member login" };

export default function LoginPage() {
  return (
    <main className="gutter relative isolate grid min-h-[100svh] place-items-center pt-[var(--header-h)] pb-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/2025-2026.JPG" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-asphalt/85" />
      <LoginControl />
    </main>
  );
}
