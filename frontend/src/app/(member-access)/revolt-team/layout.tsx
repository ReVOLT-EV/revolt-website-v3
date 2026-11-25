import { ReactNode } from "react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

// src/middleware.ts is the real gate: it verifies the session JWT on the server
// before any /revolt-team page is served. ProtectedRoute only handles the
// client side (e.g. redirecting after a logout or token expiry mid-visit).
export default function MemberAccessLayout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
