"use client";

import Link from "next/link";
import { useState } from "react";

import { Wordmark } from "@/components/brand/Logo";
import { site } from "@/content/site";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(site.email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
      className="text-left text-chalk/80 hover:text-volt"
    >
      {copied ? "Copied!" : site.email}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="gutter border-t border-line bg-night pt-16 pb-10">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Wordmark size={28} />
            <p className="max-w-xs text-chalk/60">
              University of Calgary students rebuilding gas motorcycles and snowmobiles as electric race machines.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Explore</p>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-chalk/80 hover:text-volt">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Follow</p>
            {site.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-chalk/80 hover:text-volt">
                {s.label} ↗
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Get in touch</p>
            <CopyEmail />
            <p className="text-chalk/60">{site.address}</p>
            <Link href="/contact" className="btn btn-line mt-2 self-start text-chalk">
              Contact us
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.1em] text-muted">
          <span>© {new Date().getFullYear()} ReVOLT EV · All rights reserved</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
