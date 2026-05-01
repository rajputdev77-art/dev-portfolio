"use client";
import { useEffect, useState } from "react";
import { topbar } from "@/content/site";

export default function Topbar() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="oc-topbar">
      <div className="oc-topbar-l">
        <span className="oc-dot" />
        <span>{topbar.status}</span>
        <span className="oc-sep">/</span>
        <span>{topbar.node}</span>
      </div>
      <div className="oc-topbar-c">
        <span>&ldquo;{topbar.quote}&rdquo;</span>
      </div>
      <div className="oc-topbar-r">
        <span>{topbar.location}</span>
        <span className="oc-sep">/</span>
        <span style={{ color: "var(--accent)" }}>{time || "--:--:--"}</span>
      </div>
    </div>
  );
}
