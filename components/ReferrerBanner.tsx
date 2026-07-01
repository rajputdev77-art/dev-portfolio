"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";

// Additive: a slim bar that greets a KNOWN referrer. Hidden for everyone else
// (direct traffic, unknown sources) — so it never changes the default page.
// Dismissible; never modifies the hero.
interface Greeting {
  key: string;
  label: string;
  cta: string;
  href: string;
}

function matchReferrer(ref: string): Greeting | null {
  let host = "";
  try {
    host = new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (host.includes("linkedin")) {
    return { key: "linkedin", label: "STRAIGHT FROM LINKEDIN?", cta: "Here's the 60-second version →", href: "#work" };
  }
  if (host.includes("github")) {
    return { key: "github", label: "IN FROM GITHUB?", cta: "The code's all here — see what shipped →", href: "#work" };
  }
  if (host === "t.co" || host.includes("twitter") || host === "x.com") {
    return { key: "x", label: "OVER FROM X?", cta: "Skip the scroll — jump to the builds →", href: "#work" };
  }
  return null;
}

export default function ReferrerBanner() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    const ref = document.referrer || "";
    const g = matchReferrer(ref);
    if (!g) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("ref-dismissed") === g.key;
    } catch {}
    if (dismissed) return;
    setGreeting(g);
    track("referrer_banner_shown", { source: g.key });
  }, []);

  if (!greeting) return null;

  return (
    <div className="refbar" role="note">
      <b>{greeting.label}</b>
      <a
        href={greeting.href}
        onClick={() => track("referrer_banner_clicked", { source: greeting.key })}
      >
        {greeting.cta}
      </a>
      <button
        className="x"
        aria-label="Dismiss"
        onClick={() => {
          try {
            sessionStorage.setItem("ref-dismissed", greeting.key);
          } catch {}
          setGreeting(null);
        }}
      >
        ×
      </button>
    </div>
  );
}
