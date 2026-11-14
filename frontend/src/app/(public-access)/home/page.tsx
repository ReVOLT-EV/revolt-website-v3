import Image from "next/image";
import Link from "next/link";

import { PageHero, Reveal, SectionHeader, Ticker } from "@/components/ui";
import { allSponsors } from "@/content/sponsors";
import { introBootScript } from "@/features/intro/boot";
import IntroMount, { ReplayIntroButton } from "@/features/intro/IntroMount";

const focus = [
  {
    title: "Performance",
    body: "Performance-focused upgrades get the most efficiency and power out of every conversion. Lightweight, high-performance materials and fine-tuned components for speed and endurance.",
    img: "/home_page_media/wwfo1.png",
  },
  {
    title: "Sustainability",
    body: "Repurposing existing vehicles cuts their footprint. We favour recyclable materials and energy-efficient designs, and every gas-to-electric conversion means fewer emissions.",
    img: "/home_page_media/wwfo2.JPG",
  },
  {
    title: "Innovation",
    body: "Restoration is at the heart of ReVOLT: breathing new life into old vehicles. Every project tries ideas nobody has tested yet, swapping gas engines for modern electric powertrains.",
    img: "/home_page_media/wwfo3.JPG",
  },
];

const machines = [
  {
    name: "MOTO",
    title: "Electric motorcycle",
    body: "A gas bike, stripped and rebuilt around a battery pack and electric motor. Then raced against gas and electric machines.",
    tone: "volt" as const,
  },
  {
    name: "SNOW",
    title: "Electric snowmobile",
    body: "Taking the same playbook to the snow: an electric powertrain built for cold, torque and Alberta winters.",
    tone: "glacier" as const,
  },
];

export default function Home() {
  return (
    <main>
      {/* 8-bit intro game: plays once per session before the site */}
      <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      <IntroMount />

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <video className="absolute inset-0 -z-20 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/home_page_media/Home_Page_Title_V1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/30" />
        <div className="w-full">
          <PageHero
            eyebrow="University of Calgary · EV design team"
            title={<>Gas in.<br />Electric out.</>}
            lead="We're students who take gas-powered motorcycles and snowmobiles, pull the engines, and rebuild them as electric machines. Then we race them."
          >
            <Link href="/sponsor-us" className="btn btn-volt">Power the build</Link>
            <Link href="/vehicles" className="btn btn-line text-chalk">See the builds</Link>
            <ReplayIntroButton className="basis-full pt-2 text-left" />
          </PageHero>
        </div>
      </section>

      <Ticker items={["Electric motorcycle", "Electric snowmobile", "Mechanical", "Electrical", "Software", "Business"]} />

      {/* Who we are */}
      <section className="gutter py-[clamp(64px,9vw,120px)]">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">01 · Who we are</p>
            <h2 className="h-display text-[clamp(26px,3.6vw,48px)]">We give gas machines a second life.</h2>
            <p className="mt-6 max-w-xl text-lg text-chalk/75">
              ReVOLT is a club of people who share a passion for developing electric vehicles. Ever wondered how a standard gas-powered vehicle could become fully electric, and perform better? That&apos;s our goal: blending restoration with cutting-edge modernization.
            </p>
            <p className="mt-4 max-w-xl text-chalk/65">
              Our builds race against gas and electric machines, and every result feeds the next version. Most importantly, members have fun doing it. That&apos;s when people do their best work.
            </p>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
              <Image src="/home_page_media/wwa1.jpg" alt="ReVOLT members working in the shop" fill sizes="(min-width:1024px) 360px, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 mt-16 aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
              <Image src="/home_page_media/wwa2.jpg" alt="ReVOLT team members around the build" fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Focus */}
      <section className="gutter border-t border-line py-[clamp(64px,9vw,120px)]">
        <div className="wrap">
          <SectionHeader index="02 · What drives us" title="Rebuild. Rewire. Race." lead="Three things every ReVOLT project has to get right." />
          <div className="grid gap-4 md:grid-cols-3">
            {focus.map((f, i) => (
              <Reveal key={f.title} delay={i * 90} className="card overflow-hidden">
                <div className="relative aspect-[5/4]">
                  <Image src={f.img} alt="" fill sizes="(min-width:768px) 400px, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="h-display text-xl text-volt">{f.title}</h3>
                  <p className="mt-3 text-[15px] text-chalk/70">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Machines */}
      <section className="gutter border-t border-line py-[clamp(64px,9vw,120px)]">
        <div className="wrap">
          <SectionHeader index="03 · The builds" title="Two machines. One current." />
          <div className="grid gap-4 md:grid-cols-2">
            {machines.map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <Link
                  href="/vehicles"
                  className={`card group flex h-full flex-col gap-14 p-8 transition-colors md:p-10 ${m.tone === "volt" ? "hover:border-volt" : "hover:border-glacier"}`}
                >
                  <span className="@container block w-full">
                    {/* sized to the card (cqi), so the wide display face never overflows */}
                    <span className={`block font-display text-[clamp(36px,19cqi,120px)] leading-none ${m.tone === "volt" ? "text-volt" : "text-glacier"}`}>{m.name}</span>
                  </span>
                  <span>
                    <span className="block text-xl font-medium">{m.title}</span>
                    <span className="mt-2 block max-w-md text-chalk/65">{m.body}</span>
                    <span className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.1em] text-chalk/80 group-hover:text-chalk">View build →</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="gutter border-t border-line py-[clamp(64px,9vw,120px)]">
        <div className="wrap">
          <SectionHeader index="04 · In motion" title="See us in action" />
          <Reveal className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-line bg-night">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/ksU0j4Y6paA"
              title="ReVOLT video"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      {/* Join */}
      <section className="gutter border-t border-line py-[clamp(64px,9vw,120px)]">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-4">05 · Join us</p>
            <h2 className="h-display text-[clamp(26px,3.6vw,48px)]">Plug in.</h2>
            <p className="mt-6 max-w-xl text-lg text-chalk/75">
              Into software, mechanical or electrical engineering, bikes, or electric vehicles? ReVOLT is the club for you, whatever your faculty.
            </p>
            <Link href="/contact" className="btn btn-volt mt-8">Ask about joining</Link>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-4">
            {[
              ["Build real EVs", "Help convert gas vehicles into high-performance EVs, and learn how each sub-team works on its own and together."],
              ["Find your people", "Meet others who share your passion. Just starting out? It's a great way to build connections."],
            ].map(([k, v]) => (
              <div key={k} className="card p-7">
                <h3 className="h-display text-lg">{k}</h3>
                <p className="mt-2 text-chalk/70">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Sponsors */}
      <section className="gutter bg-volt py-[clamp(64px,9vw,112px)] text-asphalt">
        <div className="wrap">
          <SectionHeader index="Powered by" title="Our sponsors" lead="These partners keep the shop running. Want your logo on the next build?" tone="volt" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {allSponsors.map((s) => (
              <li key={s.name} className="relative h-24 rounded-xl bg-chalk">
                <Image src={s.logo} alt={s.name} fill sizes="200px" className="object-contain p-4" />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/sponsor-us" className="btn btn-dark">Become a sponsor</Link>
            <Link href="/sponsor-us#tiers" className="btn btn-line">See the tiers</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
