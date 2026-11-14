import Link from "next/link";

export default function TeamSystems() {
  return (
    <main className="gutter min-h-[100svh] pt-[calc(var(--header-h)+clamp(48px,8vw,96px))] pb-24">
      <div className="wrap">
        <p className="eyebrow mb-6">Team portal</p>
        <h1 className="h-display text-[clamp(28px,5vw,64px)]">Systems</h1>
        <p className="mt-6 font-pixel text-xs leading-loose text-muted">STILL CHARGING…</p>
        <Link href="/revolt-team" className="btn btn-line mt-10 text-chalk">← Back to portal</Link>
      </div>
    </main>
  );
}
