type Tone = "volt" | "chalk" | "asphalt";

const fill: Record<Tone, string> = {
  volt: "var(--color-volt)",
  chalk: "var(--color-chalk)",
  asphalt: "var(--color-asphalt)",
};

/** The bolt-V mark on its own: a V with a lightning bolt cut through it. */
export function BoltV({ size = 28, tone = "volt", cut = "asphalt" }: { size?: number; tone?: Tone; cut?: Tone }) {
  return (
    <svg width={Math.round((size * 210) / 230)} height={size} viewBox="0 0 210 230" aria-hidden="true" className="shrink-0">
      <path d="M0 0 H62 L105 118 L150 0 H210 L128 230 H82 Z" fill={fill[tone]} />
      <path d="M118 40 L92 128 H122 L100 196 L150 100 H120 L140 40 Z" fill={fill[cut]} />
    </svg>
  );
}

/**
 * Wordmark lockup: "Re" + bolt-V + "OLT" in Stalinist One.
 * `size` is the font size in px; the V is drawn at cap height.
 */
export function Wordmark({ size = 22, tone = "chalk", vTone = "volt", cut = "asphalt" }: { size?: number; tone?: Tone; vTone?: Tone; cut?: Tone }) {
  return (
    <span className="inline-flex items-center font-display leading-none" style={{ fontSize: size, color: fill[tone], gap: size * 0.06 }}>
      <span aria-hidden="true">Re</span>
      <BoltV size={Math.round(size * 0.74)} tone={vTone} cut={cut} />
      <span aria-hidden="true">OLT</span>
      <span className="sr-only">ReVOLT</span>
    </span>
  );
}
