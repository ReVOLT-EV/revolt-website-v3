import type { Metadata, Viewport } from "next";
import "./globals.css";

import { fontVariables } from "./fonts";
import Header from "@/components/Header_Main";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: { default: "ReVOLT EV · University of Calgary", template: "%s · ReVOLT EV" },
  description:
    "ReVOLT is the University of Calgary student team that converts gas motorcycles and snowmobiles into electric machines, then races them.",
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body suppressHydrationWarning>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
