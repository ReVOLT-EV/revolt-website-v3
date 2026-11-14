"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setShown(true); io.disconnect(); }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Top-of-page hero used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <section className="gutter relative isolate overflow-hidden pt-[calc(var(--header-h)+clamp(56px,10vw,128px))] pb-[clamp(56px,8vw,104px)]">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-asphalt/80 via-asphalt/75 to-asphalt" />
        </>
      )}
      <div className="wrap">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="h-display max-w-5xl text-[clamp(28px,7vw,84px)]">{title}</h1>
        {lead && <p className="mt-7 max-w-2xl text-[clamp(17px,1.5vw,20px)] text-chalk/75">{lead}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Numbered section header: "01 · Title" with optional lead on the right. */
export function SectionHeader({ index, title, lead, tone = "dark" }: { index?: string; title: ReactNode; lead?: ReactNode; tone?: "dark" | "volt" }) {
  const muted = tone === "volt" ? "text-asphalt/70" : "text-chalk/65";
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
      <div>
        {index && <p className={`eyebrow mb-4 ${tone === "volt" ? "!text-asphalt" : ""}`}>{index}</p>}
        <h2 className="h-display text-[clamp(26px,3.6vw,48px)]">{title}</h2>
      </div>
      {lead && <p className={`max-w-xl md:justify-self-end ${muted}`}>{lead}</p>}
    </div>
  );
}

/** Scrolling ticker band. */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-night" aria-hidden="true">
      <div className="flex w-max animate-[ticker_32s_linear_infinite] gap-10 py-5">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg text-chalk/90">
            {t}
            <span className="text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
