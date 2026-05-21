"use client";
import { useEffect, useRef } from "react";

export default function BuildEasterEgg() {
  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const TARGET = "BUILD";
    let buf = "";
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target && target.matches("input,textarea,select,[contenteditable]")) return;
      const k = (e.key || "").toUpperCase();
      if (!/^[A-Z]$/.test(k)) {
        buf = "";
        return;
      }
      buf = (buf + k).slice(-TARGET.length);
      if (buf === TARGET) {
        document.body.classList.add("glitch");
        toastRef.current?.classList.add("show");
        setTimeout(() => document.body.classList.remove("glitch"), 600);
        setTimeout(() => toastRef.current?.classList.remove("show"), 1800);
        buf = "";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="build-toast" ref={toastRef}>
      BUILD MODE.
      <small>// you typed it. now type the next system.</small>
    </div>
  );
}
