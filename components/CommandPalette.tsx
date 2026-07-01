"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/track";

// Additive overlay. ⌘K / Ctrl-K opens a jump-to palette. Hidden until invoked —
// changes nothing about the page until a visitor summons it.
interface Cmd {
  label: string;
  hint: string;
  run: () => void;
}

const EMAIL = "rajputdev77@gmail.com";
const GITHUB = "https://github.com/rajputdev77-art";
const LINKEDIN = "https://www.linkedin.com/in/devrajput07/";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const commands: Cmd[] = useMemo(() => {
    const go = (href: string) => () => {
      window.location.href = href;
    };
    const ext = (href: string) => () => {
      window.open(href, "_blank", "noopener");
    };
    return [
      { label: "Top", hint: "GO", run: go("/#top") },
      { label: "The Story", hint: "GO · 01", run: go("/#story") },
      { label: "The Work", hint: "GO · 02", run: go("/#work") },
      { label: "The Vault", hint: "GO · 03", run: go("/#vault") },
      { label: "Right Now", hint: "GO · 04", run: go("/#now") },
      { label: "The CV", hint: "GO · 05", run: go("/#path") },
      { label: "Connect", hint: "GO", run: go("/#connect") },
      { label: "The Stack", hint: "PAGE", run: go("/stack") },
      { label: "CV — print view", hint: "PAGE", run: go("/cv") },
      {
        label: "Copy email",
        hint: EMAIL,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).then(
            () => setFlash("Email copied ✓"),
            () => setFlash(EMAIL)
          );
        },
      },
      { label: "Email Dev", hint: "MAILTO", run: go(`mailto:${EMAIL}`) },
      { label: "Download CV (PDF)", hint: "FILE", run: ext("/resume.pdf") },
      { label: "Open GitHub", hint: "↗", run: ext(GITHUB) },
      { label: "Open LinkedIn", hint: "↗", run: ext(LINKEDIN) },
    ];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(s) || c.hint.toLowerCase().includes(s)
    );
  }, [q, commands]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          const next = !v;
          if (next) track("command_palette_opened", {});
          return next;
        });
        setQ("");
        setActive(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
    else setFlash(null);
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  function exec(i: number) {
    const c = filtered[i];
    if (!c) return;
    track("command_palette_action", { label: c.label });
    c.run();
    if (!c.label.startsWith("Copy")) setOpen(false);
  }

  return (
    <div
      className="cmdk-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-head">
          <span className="cmdk-kbd">⌘K</span>
          <input
            ref={inputRef}
            className="cmdk-input"
            placeholder="Jump to… (type to filter)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                exec(active);
              }
            }}
          />
          {flash && <span className="cmdk-flash">{flash}</span>}
        </div>
        <ul className="cmdk-list">
          {filtered.map((c, i) => (
            <li
              key={c.label}
              className={`cmdk-item${i === active ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => exec(i)}
            >
              <span className="cmdk-label">{c.label}</span>
              <span className="cmdk-hint">{c.hint}</span>
            </li>
          ))}
          {filtered.length === 0 && <li className="cmdk-empty">No matches.</li>}
        </ul>
      </div>
    </div>
  );
}
