"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "oc-tweaks-v1";
const DEFAULTS = {
  accent: "#7CD46B",
  theme: "dark" as "dark" | "light",
  motion: 70,
  heroVariant: "diagram" as "diagram" | "log",
};

export type Tweaks = typeof DEFAULTS;

// Module-level store with subscribers
let state: Tweaks = DEFAULTS;
const listeners = new Set<() => void>();

function loadFromStorage(): Tweaks {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

function saveToStorage(s: Tweaks) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
  document.documentElement.style.setProperty("--accent", s.accent);
  if (s.theme === "light") document.body.classList.add("theme-light");
  else document.body.classList.remove("theme-light");
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Tweaks {
  return state;
}

function getServerSnapshot(): Tweaks {
  return DEFAULTS;
}

function setTweak<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
  state = { ...state, [key]: value };
  saveToStorage(state);
  listeners.forEach((cb) => cb());
}

// Hook all components use
export function useTweaks() {
  const t = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // On first mount, sync from localStorage if present
  useEffect(() => {
    const fromStorage = loadFromStorage();
    if (JSON.stringify(fromStorage) !== JSON.stringify(state)) {
      state = fromStorage;
      saveToStorage(state);
      listeners.forEach((cb) => cb());
    }
  }, []);

  return { t, setTweak };
}

export default function TweaksPanel() {
  const { t, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        className="twk-fab"
        onClick={() => setOpen(true)}
        aria-label="Open tweaks panel"
        title="Tweaks"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="twk-panel">
      <div className="twk-hd">
        <b>Tweaks</b>
        <button className="twk-x" onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">Theme</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Mode</span>
          </div>
          <div className="twk-seg">
            {(["dark", "light"] as const).map((opt) => (
              <button
                key={opt}
                className={t.theme === opt ? "active" : ""}
                onClick={() => setTweak("theme", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Accent</span>
          </div>
          <div className="twk-color">
            <input
              type="color"
              value={t.accent}
              onChange={(e) => setTweak("accent", e.target.value)}
            />
            <span className="twk-color-hex">{t.accent}</span>
          </div>
        </div>

        <div className="twk-sect">Motion</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Intensity</span>
            <span className="twk-val">{t.motion}%</span>
          </div>
          <input
            className="twk-slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={t.motion}
            onChange={(e) => setTweak("motion", Number(e.target.value))}
          />
        </div>

        <div className="twk-sect">Hero centerpiece</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Variant</span>
          </div>
          <div className="twk-seg">
            {(["diagram", "log"] as const).map((opt) => (
              <button
                key={opt}
                className={t.heroVariant === opt ? "active" : ""}
                onClick={() => setTweak("heroVariant", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
