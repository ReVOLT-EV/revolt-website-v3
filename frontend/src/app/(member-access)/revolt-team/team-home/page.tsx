import Link from "next/link";

const sections = [
  { href: "/revolt-team/team-systems", title: "Systems", body: "Build status, telemetry and vehicle systems.", tone: "text-volt" },
  { href: "/revolt-team/team-wiki", title: "Wiki", body: "How-tos, safety procedures and team knowledge.", tone: "text-glacier" },
];

export default function TeamPortalHome() {
  return (
    <main className="gutter min-h-[100svh] pt-[calc(var(--header-h)+clamp(48px,8vw,96px))] pb-24">
      <div className="wrap">
        <p className="eyebrow mb-6">Members only</p>
        <h1 className="h-display text-[clamp(28px,5vw,64px)]">Team portal</h1>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card group flex flex-col gap-10 p-8 transition-colors hover:border-volt">
              <span className={`font-display text-4xl ${s.tone}`}>{s.title}</span>
              <span className="flex items-end justify-between gap-6 text-chalk/70">
                {s.body}
                <span className="text-chalk group-hover:text-volt" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
