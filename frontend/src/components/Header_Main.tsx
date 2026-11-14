"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/brand/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { site } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "/home";
  return pathname.startsWith(href);
}

function MemberLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <>
        <Link href="/revolt-team" onClick={onNavigate} className="text-sm font-medium text-chalk/80 hover:text-volt">
          Team portal
        </Link>
        <button type="button" onClick={() => { onNavigate?.(); logout(); }} className="text-sm font-medium text-chalk/60 hover:text-volt">
          Log out
        </button>
      </>
    );
  }
  return (
    <Link href="/login" onClick={onNavigate} className="text-sm font-medium text-chalk/60 hover:text-volt">
      Member login
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and lock page scroll while it's open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || open ? "border-b border-line bg-asphalt/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="gutter">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="ReVOLT home" className="rounded-md">
            <Wordmark size={20} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`text-[15px] font-medium transition-colors hover:text-volt ${
                  isActive(pathname, item.href) ? "text-volt" : "text-chalk/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <MemberLinks />
            <Link href="/sponsor-us" className="btn btn-volt min-h-11 px-5 text-[15px]">
              Sponsor us
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-chalk lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="gutter h-[calc(100svh-var(--header-h))] overflow-y-auto bg-asphalt pb-10 lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col pt-6">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`border-b border-line py-5 font-display text-2xl ${isActive(pathname, item.href) ? "text-volt" : "text-chalk"}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/sponsor-us" className="btn btn-volt">Sponsor us</Link>
              <MemberLinks onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
