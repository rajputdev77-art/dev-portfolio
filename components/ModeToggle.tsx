"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";

// Visitor-facing LOUD/CALM toggle. Default LOUD = the current experience,
// unchanged. Calm applies `body.calm` overrides (grain static, ticker slow,
// ghost numbers faint, quiet clocks, native cursor). Persists per-visitor.
export default function ModeToggle() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("oc-mode");
    } catch {}
    const isCalm = saved === "calm";
    setCalm(isCalm);
    document.body.classList.toggle("calm", isCalm);
  }, []);

  function apply(v: boolean) {
    setCalm(v);
    document.body.classList.toggle("calm", v);
    try {
      localStorage.setItem("oc-mode", v ? "calm" : "loud");
    } catch {}
    track("mode_toggled", { mode: v ? "calm" : "loud" });
  }

  return (
    <div className="mode-toggle" role="group" aria-label="Visual intensity">
      <button
        className={!calm ? "on" : ""}
        onClick={() => apply(false)}
        aria-pressed={!calm}
      >
        Loud
      </button>
      <button
        className={calm ? "on" : ""}
        onClick={() => apply(true)}
        aria-pressed={calm}
      >
        Calm
      </button>
    </div>
  );
}
