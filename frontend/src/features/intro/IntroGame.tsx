"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { createGame, type Phase } from "./engine";
import s from "./intro.module.css";

type Props = {
  /** Called once the volt light has taken over and the overlay has faded out. */
  onDone: () => void;
};

const KEYS: Record<string, "left" | "right" | "up"> = {
  ArrowRight: "right",
  KeyD: "right",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowUp: "up",
  KeyW: "up",
  Space: "up",
};
const SCROLL_KEYS = ["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "];
const FLOOD_MS = 1100; // how long the volt screen holds before fading to the site
const FADE_MS = 450;

const pad6 = (n: number) => String(n).padStart(6, "0");

export default function IntroGame({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<() => void>(() => {});
  const padRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const root = rootRef.current!;
    const cv = canvasRef.current!;
    const cx = cv.getContext("2d")!;
    const html = document.documentElement;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const g = createGame();

    // ---- lock the page underneath ----
    const siblings = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.contains(root) && el.tagName !== "SCRIPT",
    );
    html.classList.add("intro-locked");
    window.scrollTo(0, 0);
    siblings.forEach((el) => el.setAttribute("inert", ""));
    const unlock = () => {
      html.classList.remove("intro-locked");
      siblings.forEach((el) => el.removeAttribute("inert"));
    };
    const block = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });

    // ---- sizing: ~180px tall pixel canvas, width from aspect ratio ----
    let img = cx.createImageData(1, 1);
    const size = () => {
      const r = root.getBoundingClientRect();
      const asp = Math.max(0.3, r.width / Math.max(1, r.height));
      let ch = 180;
      let cw = Math.round(ch * asp);
      if (cw < 240) { cw = 240; ch = Math.round(cw / asp); }
      cv.width = cw; cv.height = ch;
      g.resize(cw, ch);
      img = cx.createImageData(cw, ch);
    };
    size();
    window.addEventListener("resize", size);
    g.reset(performance.now());

    // ---- prompts / HUD ----
    const P: Partial<Record<Phase, string>> = {
      wait: touch ? "TAP <b>▶</b> TO HOP ON" : "PRESS <b>→</b> TO HOP ON",
      convert: "SWAPPING GAS FOR VOLTS...",
      ride: touch ? "HOLD <b>▶</b> TO RIDE · <b>▲</b> WHEELIE" : "HOLD <b>→</b> TO RIDE · <b>↑</b> WHEELIE",
    };
    const setPrompt = (t: string) => {
      const el = promptRef.current;
      if (!el) return;
      el.innerHTML = t;
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    };
    setPrompt(P.wait!);

    let bonus = 0;
    let lastScore = -1;
    let revealed = false;
    const score = () => Math.floor(g.state.d) + bonus;

    let finishTimer = 0;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      g.input.left = g.input.right = g.input.up = false;
      setFinalScore(score());
      setRevealed(true);
      finishTimer = window.setTimeout(() => {
        unlock();
        setGone(true);
        finishTimer = window.setTimeout(onDone, FADE_MS);
      }, FLOOD_MS);
    };
    revealRef.current = reveal;

    g.onPhase = (ph) => {
      setPrompt(P[ph] ?? "");
      if (ph === "done") reveal();
    };
    g.onWheelie = () => {
      bonus += 100;
      const t = toastRef.current;
      if (!t) return;
      t.classList.remove(s.toastShow);
      void t.offsetWidth;
      t.classList.add(s.toastShow);
    };

    const hud = () => {
      const p = Math.min(1, g.state.d / g.D);
      const sc = score();
      if (sc !== lastScore && scoreRef.current) { lastScore = sc; scoreRef.current.textContent = pad6(sc); }
      if (fillRef.current) fillRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      if (dotRef.current) dotRef.current.style.left = `${(p * 100).toFixed(1)}%`;
      if (g.state.phase === "ride" && g.state.d > 260 && promptRef.current?.innerHTML) setPrompt("");
    };

    // ---- loop ----
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!revealed) {
        g.update(dt, now);
        g.draw(now);
        img.data.set(g.buffer);
        cx.putImageData(img, 0, 0);
        hud();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // ---- keyboard ----
    const onKeyDown = (e: KeyboardEvent) => {
      if (revealed) return;
      const target = e.target as HTMLElement | null;
      const onButton = target?.closest?.("button");
      if (e.key === "Escape") { reveal(); return; }
      if (g.state.phase === "wait" && (e.code === "Space" || e.key === "Enter") && !onButton) {
        g.input.tap = true; e.preventDefault(); return;
      }
      const k = KEYS[e.code];
      if (k && !(onButton && (e.code === "Space"))) { e.preventDefault(); g.input[k] = true; return; }
      if (SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => { const k = KEYS[e.code]; if (k) g.input[k] = false; };
    const onBlur = () => { g.input.left = g.input.right = g.input.up = false; };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    // ---- touch pad + tap to start ----
    const cleanups: (() => void)[] = [];
    padRef.current?.querySelectorAll<HTMLButtonElement>("button[data-k]").forEach((b) => {
      const k = b.dataset.k as "left" | "right" | "up";
      const on = (e: PointerEvent) => {
        e.preventDefault();
        try { b.setPointerCapture(e.pointerId); } catch {}
        if (g.state.phase === "wait" && k === "right") g.input.tap = true;
        g.input[k] = true;
        b.classList.add(s.on);
      };
      const off = () => { g.input[k] = false; b.classList.remove(s.on); };
      const ctx = (e: Event) => e.preventDefault();
      b.addEventListener("pointerdown", on);
      b.addEventListener("pointerup", off);
      b.addEventListener("pointercancel", off);
      b.addEventListener("lostpointercapture", off);
      b.addEventListener("contextmenu", ctx);
      cleanups.push(() => {
        b.removeEventListener("pointerdown", on);
        b.removeEventListener("pointerup", off);
        b.removeEventListener("pointercancel", off);
        b.removeEventListener("lostpointercapture", off);
        b.removeEventListener("contextmenu", ctx);
      });
    });
    const onCanvasDown = () => { if (g.state.phase === "wait") g.input.tap = true; };
    cv.addEventListener("pointerdown", onCanvasDown);

    root.focus({ preventScroll: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finishTimer);
      unlock();
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("resize", size);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      cv.removeEventListener("pointerdown", onCanvasDown);
      cleanups.forEach((f) => f());
    };
  }, [onDone]);

  return createPortal(
    <div
      ref={rootRef}
      tabIndex={-1}
      role="region"
      aria-label="ReVOLT intro game: ride the electric motorcycle to enter the site"
      className={`${s.intro} ${revealed ? s.revealed : ""} ${gone ? s.gone : ""} outline-none`}
    >
      <canvas ref={canvasRef} className={s.scene} aria-hidden="true" />

      <div className={s.hud}>
        <div className={s.hudLeft}>
          <div className={s.score}>SCORE <span ref={scoreRef}>000000</span></div>
          <div className={s.track} aria-hidden="true">
            SHOP
            <span className={s.bar}>
              <span ref={fillRef} className={s.fill} />
              <span ref={dotRef} className={s.dot} />
            </span>
            ROCKIES
          </div>
        </div>
        <button type="button" className={s.skip} onClick={() => revealRef.current()}>
          SKIP ▶▶
        </button>
      </div>

      <div ref={promptRef} className={s.prompt} aria-live="polite" />
      <div ref={toastRef} className={s.toast} aria-hidden="true">WHEELIE! +100</div>

      <div ref={padRef} className={s.pad} aria-label="Game controls">
        <button type="button" data-k="left" aria-label="Brake">◀</button>
        <button type="button" data-k="up" aria-label="Wheelie">▲</button>
        <button type="button" data-k="right" aria-label="Ride forward">▶</button>
      </div>

      <div className={s.flood} aria-hidden={!revealed}>
        <div className={s.floodTitle}>WELCOME TO<br />REVOLT</div>
        <div className={s.floodScore}>SCORE {pad6(finalScore)}</div>
      </div>
    </div>,
    document.body,
  );
}
