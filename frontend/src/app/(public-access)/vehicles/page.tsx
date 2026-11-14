import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui";
import { vehicles } from "@/content/vehicles";

export const metadata: Metadata = { title: "Builds" };

const toneText = { volt: "text-volt", glacier: "text-glacier" } as const;
const toneBg = { volt: "bg-volt", glacier: "bg-glacier" } as const;

export default function VehiclesPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <video className="absolute inset-0 -z-20 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/vehicle_page_media/vehicle_page_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-asphalt/80 via-asphalt/70 to-asphalt" />
        <div className="gutter pt-[calc(var(--header-h)+clamp(56px,10vw,128px))] pb-[clamp(56px,8vw,104px)]">
          <div className="wrap">
            <p className="eyebrow mb-6">The builds</p>
            <h1 className="h-display text-[clamp(28px,7vw,84px)]">Two machines.<br />One current.</h1>
            <p className="mt-7 max-w-2xl text-[clamp(17px,1.5vw,20px)] text-chalk/75">
              Every ReVOLT project starts as a gas vehicle and leaves as an electric one. Here&apos;s what&apos;s on the bench.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {vehicles.map((v) => (
                <a key={v.id} href={`#${v.id}`} className="btn btn-line min-h-11 text-chalk">{v.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {vehicles.map((v) => (
        <section key={v.id} id={v.id} className="gutter border-t border-line py-[clamp(64px,9vw,120px)]">
          <div className="wrap grid gap-10 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <p className={`eyebrow mb-4 ${toneText[v.tone]}`}>{v.tag} · {v.status}</p>
              <h2 className="h-display text-[clamp(28px,4.4vw,56px)]">{v.name}</h2>
              <p className="mt-6 max-w-xl text-lg text-chalk/75">{v.summary}</p>

              {/* 3D model slot: drop the three.js / react-three-fiber viewer here once the .glb is ready */}
              <div className="card relative mt-10 grid aspect-[16/10] place-items-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-chalk)_1px,transparent_1px),linear-gradient(90deg,var(--color-chalk)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="@container relative w-full px-8 text-center">
                  <p className={`font-display text-[clamp(32px,15cqi,104px)] leading-none ${toneText[v.tone]}`}>{v.id === "moto" ? "MOTO" : "SNOW"}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">3D model coming soon</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-4">
              <div className="card p-7">
                <p className="eyebrow mb-5 !text-muted">Spec sheet</p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {v.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{s.label}</dt>
                      <dd className="mt-1 font-mono text-xl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card p-7">
                <p className="eyebrow mb-5 !text-muted">Build progress</p>
                <ol className="flex flex-col gap-4">
                  {v.milestones.map((m, i) => (
                    <li key={m.label} className="flex items-center gap-4">
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs ${m.done ? `${toneBg[v.tone]} text-asphalt` : "border border-line text-muted"}`}>
                        {m.done ? "✓" : i + 1}
                      </span>
                      <span className={m.done ? "text-chalk" : "text-chalk/55"}>{m.label}</span>
                    </li>
                  ))}
                </ol>
                {/* charge bar = share of milestones done */}
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-steel" aria-hidden="true">
                  <div className={`h-full ${toneBg[v.tone]}`} style={{ width: `${(v.milestones.filter((m) => m.done).length / v.milestones.length) * 100}%` }} />
                </div>
              </div>

              <Link href="/sponsor-us" className={`card flex items-center justify-between p-7 transition-colors ${v.tone === "volt" ? "hover:border-volt" : "hover:border-glacier"}`}>
                <span>
                  <span className="block font-medium">Help finish this build</span>
                  <span className="mt-1 block text-sm text-chalk/60">Parts, tools and race fees are sponsor-powered.</span>
                </span>
                <span className={toneText[v.tone]} aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      ))}
    </main>
  );
}
