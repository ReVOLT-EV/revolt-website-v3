"use client";

import React from "react";
import "./globals.css";

import Header from "@/components/Header_Main";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <title>ReVOLT</title>
      </head>
      <body suppressHydrationWarning={true} style={{ position: "relative" }}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
