import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero, Reveal, SectionHeader } from "@/components/ui";
import { sponsorPackage, tiers } from "@/content/sponsors";

export const metadata: Metadata = { title: "Sponsor us" };

const reasons = [
  { k: "Visibility", v: "Your logo rides on the bike, the team kit, our socials and every event we show up to." },
  { k: "Talent", v: "Meet engineering and business students early, at Career Fair and at our networking events." },
  { k: "Impact", v: "Back a team turning gas vehicles into electric ones: hands-on sustainability, not slides." },
];

const tierAccent: Record<string, string> = {
  silver: "text-chalk/70",
  gold: "text-[#E8C468]",
  diamond: "text-glacier",
};

export default function SponsorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Power the build"
        title="Sponsor ReVOLT"
        lead="Partner with the University of Calgary's electric vehicle team. Help us push sustainable engineering forward, and get your brand on the machines that prove it."
      >
        <a href={sponsorPackage.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-volt">
          Download the package
        </a>
        <Link href="/contact" className="btn btn-line text-chalk">Talk to us</Link>
      </PageHero>

      <section className="gutter pb-[clamp(56px,8vw,104px)]">
        <div className="wrap grid gap-4 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.k} delay={i * 80} className="card p-8">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-volt">0{i + 1}</p>
              <h3 className="h-display mt-4 text-2xl">{r.k}</h3>
              <p className="mt-3 text-chalk/70">{r.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="tiers" className="gutter border-t border-line py-[clamp(56px,8vw,104px)]">
        <div className="wrap">
          <SectionHeader index="Tiers" title="Pick your charge level" lead="Every tier includes everything below it. Full details and pricing are in the sponsorship package." />
          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 90} className={`card flex flex-col p-8 ${t.id === "diamond" ? "border-volt/60" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`h-display text-3xl ${tierAccent[t.id]}`}>{t.name}</h3>
                  {/* charge bars: 1 / 2 / 3 */}
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((b) => (
                      <span key={b} className={`h-6 w-3 rounded-sm ${b <= i ? "bg-volt" : "bg-steel"}`} />
                    ))}
                  </span>
                </div>
                <p className="mt-4 text-chalk/75">{t.summary}</p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px]">
                      <span className="text-volt" aria-hidden="true">✦</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Current {t.name.toLowerCase()} sponsors</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {t.sponsors.map((s) => (
                      <li key={s.name} className="relative grid h-20 place-items-center rounded-xl bg-chalk p-3">
                        <Image src={s.logo} alt={s.name} fill sizes="200px" className="object-contain p-3" />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gutter bg-volt py-[clamp(56px,8vw,104px)] text-asphalt">
        <div className="wrap grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-4 !text-asphalt">Sponsorship package</p>
            <h2 className="h-display text-[clamp(26px,3.6vw,48px)]">Everything in one PDF.</h2>
            <p className="mt-5 max-w-xl text-asphalt/75">
              Tier pricing, logo placements, event perks and what we&apos;re building this season. Have questions or want something custom? Get in touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={sponsorPackage.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Download the package</a>
              <Link href="/contact" className="btn btn-line">Contact the business team</Link>
            </div>
          </div>
          <a href={sponsorPackage.pdf} target="_blank" rel="noopener noreferrer" className="relative mx-auto block aspect-[1404/790] w-full max-w-lg rotate-2 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:rotate-0">
            <Image src={sponsorPackage.cover} alt="Cover of the ReVOLT sponsorship package" fill sizes="(min-width:768px) 512px, 100vw" className="object-cover" />
          </a>
        </div>
      </section>
    </main>
  );
}
