"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { INTRO_SEEN_KEY, REPLAY_EVENT } from "./boot";

// The game is client-only and only downloaded when it actually plays.
const IntroGame = dynamic(() => import("./IntroGame"), { ssr: false });

export default function IntroMount() {
  const [run, setRun] = useState(0); // 0 = not playing; >0 = play (key forces a fresh game)

  useEffect(() => {
    if (document.documentElement.dataset.intro === "on") setRun(1);
    const replay = () => {
      document.documentElement.dataset.intro = "on";
      setRun((n) => n + 1);
    };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  const done = useCallback(() => {
    try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch {}
    document.documentElement.dataset.intro = "off";
    setRun(0);
  }, []);

  return (
    <>
      {/* Solid cover until the game has loaded, only when data-intro="on" */}
      <div className="intro-cover" aria-hidden="true" />
      {run > 0 && <IntroGame key={run} onDone={done} />}
    </>
  );
}

/** Small pixel-font button that plays the intro again. */
export function ReplayIntroButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}
      className={`font-pixel text-[10px] leading-loose text-chalk/70 underline-offset-4 hover:text-volt hover:underline ${className}`}
    >
      ▶ PLAY THE INTRO
    </button>
  );
}
