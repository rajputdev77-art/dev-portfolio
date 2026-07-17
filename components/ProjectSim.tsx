"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import type {
  SimDef,
  PipelineStage,
  TermLine,
  ChatChip,
  FeedLine,
  StatDef,
  TryLink,
} from "@/content/sims";

/**
 * ProjectSim — an honest, browser-only reenactment of each project.
 * Seven engines: pipeline · terminal · chat · agents · dashboard · dictation · tts.
 * Nothing here talks to the live systems.
 */

/* ── shared bits ─────────────────────────────────────────────────── */

function useTicker(active: boolean, ms: number, cb: () => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => cbRef.current(), ms);
    return () => clearInterval(id);
  }, [active, ms]);
}

function RunOverlay({ onRun, label }: { onRun: () => void; label?: string }) {
  return (
    <div className="psim-overlay">
      <button className="psim-run" onClick={onRun}>
        ▶ {label || "RUN SIMULATION"}
      </button>
    </div>
  );
}

function Finale({
  text, onReplay, tryLink, onTry,
}: { text: string; onReplay: () => void; tryLink?: TryLink; onTry?: () => void }) {
  return (
    <div className="psim-finale">
      <p>{text}</p>
      <div className="psim-finale-acts">
        {tryLink && (
          <a
            className="psim-try"
            href={tryLink.url}
            target="_blank"
            rel="noreferrer"
            onClick={onTry}
          >
            {tryLink.label}
          </a>
        )}
        <button className="psim-replay" onClick={onReplay}>↻ REPLAY</button>
      </div>
    </div>
  );
}

/* ── engine: pipeline ────────────────────────────────────────────── */

function PipelineSim({ stages, finale, onStart, tryLink, onTry }: { stages: PipelineStage[]; finale: string; onStart: () => void; tryLink?: TryLink; onTry?: () => void }) {
  const [step, setStep] = useState(-1); // -1 idle; N = index in flight; stages.length = done
  const running = step >= 0 && step < stages.length;

  useTicker(running, 1400, () => setStep((s) => s + 1));

  const start = () => { onStart(); setStep(0); };

  return (
    <div className="psim-stagewrap">
      {step === -1 && <RunOverlay onRun={start} />}
      <div className={`psim-stages${step === -1 ? " dim" : ""}`}>
        {stages.map((st, i) => {
          const state = i < step ? "done" : i === step ? "live" : "wait";
          return (
            <div key={i} className={`psim-stage ${state}`}>
              <div className="psim-stage-rail">
                <span className="dot">{state === "done" ? "✓" : state === "live" ? "●" : "○"}</span>
                {i < stages.length - 1 && <span className="bar" />}
              </div>
              <div className="psim-stage-body">
                <div className="nm">{st.name}</div>
                {state !== "wait" && <div className="lg">{st.log}</div>}
                {state === "done" && st.out && <div className="out">→ {st.out}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {step >= stages.length && <Finale text={finale} onReplay={() => setStep(0)} tryLink={tryLink} onTry={onTry} />}
    </div>
  );
}

/* ── engine: terminal ────────────────────────────────────────────── */

function TerminalSim({ lines, finale, onStart, tryLink, onTry }: { lines: TermLine[]; finale: string; onStart: () => void; tryLink?: TryLink; onTry?: () => void }) {
  const [n, setN] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const running = n >= 0 && n < lines.length;

  useTicker(running, 620, () => setN((v) => v + 1));
  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [n]);

  const start = () => { onStart(); setN(0); };

  return (
    <div className="psim-stagewrap">
      {n === -1 && <RunOverlay onRun={start} />}
      <div ref={boxRef} className={`psim-term${n === -1 ? " dim" : ""}`}>
        {lines.slice(0, Math.max(n, 0)).map((l, i) => (
          <div key={i} className={`ln ${l.kind || ""}`}>{l.text}</div>
        ))}
        {running && <div className="ln cursor">▋</div>}
      </div>
      {n >= lines.length && <Finale text={finale} onReplay={() => setN(0)} tryLink={tryLink} onTry={onTry} />}
    </div>
  );
}

/* ── engine: chat ────────────────────────────────────────────────── */

type ChatMsg = { who: "user" | "bot"; text: string; footer?: string };

function ChatSim({
  persona, greeting, chips, done, onStart,
}: { persona: string; greeting: string; chips: ChatChip[]; done: string; onStart: () => void }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ who: "bot", text: greeting }]);
  const [used, setUsed] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const started = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (i: number) => {
    if (typing || used.includes(i)) return;
    if (!started.current) { started.current = true; onStart(); }
    const chip = chips[i];
    setUsed((u) => [...u, i]);
    setMsgs((m) => [...m, { who: "user", text: chip.user }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { who: "bot", text: chip.reply, footer: chip.footer }]);
    }, 1100);
  };

  const allUsed = used.length === chips.length;

  return (
    <div className="psim-chat">
      <div ref={boxRef} className="psim-chat-log">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.who}`}>
            {m.who === "bot" && <span className="who">{persona}</span>}
            <p>{m.text}</p>
            {m.footer && <pre className="footer">{m.footer}</pre>}
          </div>
        ))}
        {typing && (
          <div className="msg bot">
            <span className="who">{persona}</span>
            <p className="typing">● ● ●</p>
          </div>
        )}
      </div>
      <div className="psim-chips">
        {allUsed ? (
          <div className="psim-chat-done">{done}</div>
        ) : (
          chips.map((c, i) => (
            <button key={i} disabled={used.includes(i) || typing} onClick={() => send(i)}>
              {c.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ── engine: agents (office tick) ────────────────────────────────── */

function AgentsSim({
  floors, bubbles, artifacts, finale, onStart, tryLink, onTry,
}: {
  floors: { name: string; agents: string[] }[];
  bubbles: string[]; artifacts: string[]; finale: string; onStart: () => void;
  tryLink?: TryLink; onTry?: () => void;
}) {
  const TICKS = 16;
  const [tick, setTick] = useState(-1);
  const [active, setActive] = useState<{ f: number; a: number; b: string } | null>(null);
  const [feed, setFeed] = useState<string[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const running = tick >= 0 && tick < TICKS;

  useTicker(running, 850, () => {
    setTick((t) => {
      const nt = t + 1;
      const f = Math.floor(Math.random() * floors.length);
      const a = Math.floor(Math.random() * floors[f].agents.length);
      const b = bubbles[nt % bubbles.length];
      setActive({ f, a, b });
      if (nt % 3 === 2) {
        const art = artifacts[Math.floor(nt / 3) % artifacts.length];
        setFeed((fd) => [...fd, art]);
      }
      return nt;
    });
  });

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight });
  }, [feed]);

  const start = () => { onStart(); setTick(0); setFeed([]); setActive(null); };

  return (
    <div className="psim-stagewrap">
      {tick === -1 && <RunOverlay onRun={start} label="RUN ONE WORK TICK" />}
      <div className={`psim-office${tick === -1 ? " dim" : ""}`}>
        {floors.map((fl, fi) => (
          <div key={fi} className="floor">
            <div className="fname">{fl.name}</div>
            <div className="desks">
              {fl.agents.map((ag, ai) => {
                const on = running && active?.f === fi && active?.a === ai;
                return (
                  <span key={ai} className={`agent${on ? " on" : ""}`}>
                    {ag}
                    {on && active && <em className="bubble">{active.b}</em>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={feedRef} className="psim-artifacts">
          {feed.length === 0 && <div className="ln dim">— artifacts filed this tick appear here —</div>}
          {feed.map((f, i) => (
            <div key={i} className="ln ok">✓ {f}</div>
          ))}
        </div>
      </div>
      {tick >= TICKS && <Finale text={finale} onReplay={start} tryLink={tryLink} onTry={onTry} />}
    </div>
  );
}

/* ── engine: dashboard ───────────────────────────────────────────── */

function DashboardSim({
  stats, feed, finale, onStart, tryLink, onTry,
}: { stats: StatDef[]; feed: FeedLine[]; finale: string; onStart: () => void; tryLink?: TryLink; onTry?: () => void }) {
  const [n, setN] = useState(-1);
  const [vals, setVals] = useState<number[]>(stats.map((s) => s.base));
  const running = n >= 0 && n < feed.length;

  useTicker(running, 1150, () => setN((v) => v + 1));
  useTicker(n >= 0, 700, () =>
    setVals((vs) => vs.map((v, i) => v + (Math.random() - 0.5) * 2 * stats[i].jitter))
  );

  const start = () => { onStart(); setN(0); setVals(stats.map((s) => s.base)); };
  const fmt = (v: number, s: StatDef) =>
    `${s.prefix || ""}${v.toLocaleString("en-US", {
      minimumFractionDigits: s.decimals ?? 0,
      maximumFractionDigits: s.decimals ?? 0,
    })}${s.suffix || ""}`;

  return (
    <div className="psim-stagewrap">
      {n === -1 && <RunOverlay onRun={start} />}
      <div className={`psim-dash${n === -1 ? " dim" : ""}`}>
        <div className="psim-dash-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="l">{s.label}</div>
              <div className="v">{fmt(vals[i], s)}</div>
            </div>
          ))}
        </div>
        <div className="psim-term inner">
          {feed.slice(0, Math.max(n, 0)).map((l, i) => (
            <div key={i} className={`ln ${l.kind || ""}`}>{l.text}</div>
          ))}
          {running && <div className="ln cursor">▋</div>}
        </div>
      </div>
      {n >= feed.length && <Finale text={finale} onReplay={start} tryLink={tryLink} onTry={onTry} />}
    </div>
  );
}

/* ── engine: dictation (FreeFlow) ────────────────────────────────── */

function DictationSim({ phrases, onStart }: { phrases: string[]; onStart: () => void }) {
  const [state, setState] = useState<"idle" | "listen" | "proc" | "type">("idle");
  const [pad, setPad] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const idx = useRef(0);
  const started = useRef(false);
  const heldAt = useRef(0);

  const down = () => {
    if (state !== "idle") return;
    if (!started.current) { started.current = true; onStart(); }
    heldAt.current = Date.now();
    setState("listen");
  };

  const up = () => {
    if (state !== "listen") return;
    // require a minimum "speaking" hold so a tap still demos nicely
    const wait = Math.max(0, 500 - (Date.now() - heldAt.current));
    setState("proc");
    setTimeout(() => {
      const phrase = phrases[idx.current % phrases.length];
      idx.current += 1;
      setState("type");
      let i = 0;
      const id = setInterval(() => {
        i += 2;
        setCur(phrase.slice(0, i));
        if (i >= phrase.length) {
          clearInterval(id);
          setPad((p) => [...p, phrase]);
          setCur("");
          setState("idle");
        }
      }, 18);
    }, 650 + wait);
  };

  return (
    <div className="psim-dict">
      <div className="psim-dict-key">
        <button
          className={`f10 ${state}`}
          onPointerDown={down}
          onPointerUp={up}
          onPointerLeave={up}
        >
          {state === "listen" ? "● LISTENING — release to type" : state === "proc" ? "◌ TRANSCRIBING…" : state === "type" ? "TYPING…" : "HOLD ME (this is F10)"}
        </button>
        <span className="hint">hold → &quot;speak&quot; → release</span>
      </div>
      <div className="psim-dict-pad">
        <div className="padtitle">UNTITLED.TXT — whatever app has focus</div>
        {pad.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {cur && <p>{cur}<span className="caret">▋</span></p>}
        {pad.length === 0 && !cur && <p className="ph">text appears here when you release…</p>}
      </div>
    </div>
  );
}

/* ── engine: tts (VoiceForge) ────────────────────────────────────── */

function TtsSim({ sample, voices, onStart }: { sample: string; voices: string[]; onStart: () => void }) {
  const [text, setText] = useState(sample);
  const [voice, setVoice] = useState(voices[0]);
  const [state, setState] = useState<"idle" | "synth" | "play">("idle");
  const started = useRef(false);

  const run = () => {
    if (state !== "idle") return;
    if (!started.current) { started.current = true; onStart(); }
    setState("synth");
    setTimeout(() => {
      setState("play");
      let spoke = false;
      try {
        if (typeof window !== "undefined" && window.speechSynthesis) {
          const u = new SpeechSynthesisUtterance(text.slice(0, 300));
          u.rate = 1;
          u.onend = () => setState("idle");
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(u);
          spoke = true;
        }
      } catch { /* fall through to timer */ }
      if (!spoke) setTimeout(() => setState("idle"), 2600);
    }, 900);
  };

  return (
    <div className="psim-tts">
      <textarea
        value={text}
        maxLength={300}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="psim-tts-row">
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          {voices.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <button className="psim-run small" onClick={run} disabled={state !== "idle"}>
          {state === "synth" ? "◌ SYNTHESIZING…" : state === "play" ? "▶ PLAYING" : "▶ SYNTHESIZE"}
        </button>
      </div>
      <div className={`psim-wave ${state}`}>
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />
        ))}
      </div>
      <div className="psim-tts-meta">
        {state === "play"
          ? "playing — your browser's local voice stands in for Kokoro-82M"
          : "output: WAV · 44.1kHz · Kokoro-82M via ONNX · CPU only (simulated here)"}
      </div>
    </div>
  );
}

/* ── shell ───────────────────────────────────────────────────────── */

export default function ProjectSim({ slug, sim }: { slug: string; sim: SimDef }) {
  const onStart = useCallback(() => {
    track("sim_run", { slug, engine: sim.engine });
  }, [slug, sim.engine]);

  const onTry = useCallback(() => {
    track("sim_try_clicked", { slug });
  }, [slug]);

  return (
    <section className="psim">
      <div className="psim-head">
        <span className="badge">SIMULATION</span>
        <span className="note">RUNS IN YOUR BROWSER · NOT WIRED TO THE LIVE SYSTEM</span>
      </div>
      <p className="psim-intro">{sim.intro}</p>
      {sim.engine === "pipeline" && <PipelineSim stages={sim.stages} finale={sim.finale} onStart={onStart} tryLink={sim.tryLink} onTry={onTry} />}
      {sim.engine === "terminal" && <TerminalSim lines={sim.lines} finale={sim.finale} onStart={onStart} tryLink={sim.tryLink} onTry={onTry} />}
      {sim.engine === "chat" && (
        <ChatSim persona={sim.persona} greeting={sim.greeting} chips={sim.chips} done={sim.done} onStart={onStart} />
      )}
      {sim.engine === "agents" && (
        <AgentsSim floors={sim.floors} bubbles={sim.bubbles} artifacts={sim.artifacts} finale={sim.finale} onStart={onStart} tryLink={sim.tryLink} onTry={onTry} />
      )}
      {sim.engine === "dashboard" && (
        <DashboardSim stats={sim.stats} feed={sim.feed} finale={sim.finale} onStart={onStart} tryLink={sim.tryLink} onTry={onTry} />
      )}
      {sim.engine === "dictation" && <DictationSim phrases={sim.phrases} onStart={onStart} />}
      {sim.engine === "tts" && <TtsSim sample={sim.sample} voices={sim.voices} onStart={onStart} />}
    </section>
  );
}
