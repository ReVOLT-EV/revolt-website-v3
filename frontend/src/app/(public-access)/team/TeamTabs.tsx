"use client";

import Image from "next/image";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import type { SubTeam } from "@/content/team";

/**
 * One sub-team at a time. Tabs follow the WAI-ARIA tabs pattern
 * (arrow keys move between tabs) and sync with the URL hash, so
 * /team#electrical opens straight to Electrical.
 */
export default function TeamTabs({ teams }: { teams: SubTeam[] }) {
  const [active, setActive] = useState(teams[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (teams.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [teams]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = teams.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    select(teams[next].id);
    tabRefs.current[next]?.focus();
  };

  const team = teams.find((t) => t.id === active) ?? teams[0];

  return (
    <div>
      <div role="tablist" aria-label="Sub-teams" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {teams.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`btn shrink-0 gap-3 ${on ? "btn-volt" : "btn-line text-chalk"}`}
            >
              {t.name}
              <span className={`font-mono text-xs ${on ? "text-asphalt/60" : "text-muted"}`}>{t.members.length}</span>
            </button>
          );
        })}
      </div>

      <div key={team.id} role="tabpanel" id={`panel-${team.id}`} aria-labelledby={`tab-${team.id}`} className="mt-10 animate-[fadeUp_.4s_ease-out]">
        <div className="mb-10 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="h-display text-[clamp(28px,4vw,52px)]">{team.name}</h2>
            <p className="mt-5 max-w-md text-chalk/70">{team.blurb}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-line">
            <Image src={team.photo} alt={`${team.name} sub-team at work`} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" priority />
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {team.members.map((m) => (
            <li key={m.name} className="card group overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(min-width:1024px) 230px, (min-width:640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="font-medium leading-tight">{m.name}</p>
                <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.08em] ${/lead|director|president|treasurer|manager/i.test(m.role) ? "text-volt" : "text-muted"}`}>{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
