import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero, Reveal } from "@/components/ui";
import { groupPhoto, subTeams } from "@/content/team";

export const metadata: Metadata = { title: "Team" };

const total = subTeams.reduce((n, t) => n + t.members.length, 0);

export default function TeamPage() {
  return (
    <main>
      <PageHero
        eyebrow="The pit crew"
        title="Meet the team"
        lead={`${total} students across four sub-teams. Engineers, designers and business students who learn by building.`}
        image={groupPhoto}
      >
        {subTeams.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="btn btn-line min-h-11 text-chalk">
            {t.name}
          </a>
        ))}
      </PageHero>

      {subTeams.map((team, i) => (
        <section key={team.id} id={team.id} className="gutter border-t border-line py-[clamp(56px,8vw,104px)]">
          <div className="wrap">
            <Reveal>
              <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className="eyebrow mb-4">0{i + 1} · {team.members.length} members</p>
                  <h2 className="h-display text-[clamp(28px,4vw,52px)]">{team.name}</h2>
                  <p className="mt-5 max-w-md text-chalk/70">{team.blurb}</p>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-line">
                  <Image src={team.photo} alt={`${team.name} sub-team at work`} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" />
                </div>
              </div>
            </Reveal>

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
                    <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.08em] ${/lead|director/i.test(m.role) ? "text-volt" : "text-muted"}`}>
                      {m.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="gutter bg-volt py-[clamp(56px,8vw,96px)] text-asphalt">
        <div className="wrap flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-4 !text-asphalt">Join the crew</p>
            <h2 className="h-display text-[clamp(26px,3.6vw,44px)]">Every faculty welcome.</h2>
            <p className="mt-4 max-w-xl text-asphalt/75">Nobody arrives knowing how to build a battery pack. Reach out and we&apos;ll tell you when recruitment opens.</p>
          </div>
          <Link href="/contact" className="btn btn-dark">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
