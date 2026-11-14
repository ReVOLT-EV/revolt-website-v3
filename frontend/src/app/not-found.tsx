import Link from "next/link";

export default function NotFound() {
  return (
    <main className="gutter grid min-h-[100svh] place-items-center pt-[var(--header-h)] text-center">
      <div>
        <p className="font-pixel text-xs leading-loose text-volt">ERROR 404 · NO SIGNAL</p>
        <h1 className="h-display mt-6 text-[clamp(64px,16vw,200px)] leading-none">404</h1>
        <p className="mx-auto mt-6 max-w-md text-chalk/70">This page ran out of charge. It doesn&apos;t exist, or it moved.</p>
        <Link href="/" className="btn btn-volt mt-9">Back to the shop</Link>
      </div>
    </main>
  );
}
