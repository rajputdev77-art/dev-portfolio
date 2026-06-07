import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// ─── lazy KV ───────────────────────────────────────────────────────────────
// Loads @vercel/kv only when env vars are configured. If KV isn't set up yet,
// the endpoint still returns 200 and the events are logged to runtime console.
async function getKv() {
  if (
    !process.env.KV_REST_API_URL &&
    !process.env.KV_URL &&
    !process.env.REDIS_URL
  ) {
    return null;
  }
  try {
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null;
  }
}

interface IncomingEvent {
  name?: string;
  props?: Record<string, unknown>;
  ts?: number;
  path?: string;
  ref?: string;
}

export async function POST(req: NextRequest) {
  let body: IncomingEvent | null = null;
  try {
    body = (await req.json()) as IncomingEvent;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }
  if (!body || typeof body.name !== "string") {
    return NextResponse.json({ ok: false, reason: "no_name" }, { status: 400 });
  }

  // Pull geo + user-agent from request headers / Vercel edge geo.
  const country = req.geo?.country || req.headers.get("x-vercel-ip-country") || "";
  const city = req.geo?.city || req.headers.get("x-vercel-ip-city") || "";
  const region = req.geo?.region || req.headers.get("x-vercel-ip-country-region") || "";
  const ua = req.headers.get("user-agent") || "";
  const ipRaw = req.headers.get("x-forwarded-for") || "";
  // Hash IP for a stable anonymous session ID. Strip everything but first IP.
  const ip = (ipRaw.split(",")[0] || "").trim();
  const sessionSeed = `${ip}|${ua}`;
  let sessionId = "anon";
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(sessionSeed));
    sessionId = Array.from(new Uint8Array(buf))
      .slice(0, 8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {}

  const evt = {
    name: body.name,
    props: body.props || {},
    ts: body.ts || Date.now(),
    path: body.path || "",
    ref: body.ref || "",
    country,
    city,
    region,
    sessionId,
    ua: ua.slice(0, 200),
  };

  // Always log to runtime console (visible in Vercel dashboard → Logs).
  // eslint-disable-next-line no-console
  console.log("[track]", JSON.stringify(evt));

  // Persist to KV if available.
  const kv = await getKv();
  if (kv) {
    try {
      const dayKey = new Date(evt.ts).toISOString().slice(0, 10); // YYYY-MM-DD
      const eventKey = `events:${dayKey}`;
      await kv.lpush(eventKey, JSON.stringify(evt));
      await kv.expire(eventKey, 60 * 60 * 24 * 30); // 30 days
      await kv.incr(`counts:${dayKey}:${evt.name}`);
      await kv.expire(`counts:${dayKey}:${evt.name}`, 60 * 60 * 24 * 90);
      await kv.sadd(`sessions:${dayKey}`, evt.sessionId);
      await kv.expire(`sessions:${dayKey}`, 60 * 60 * 24 * 90);

      // High-signal notifications.
      const isConnectHit =
        evt.name === "section_viewed" && (evt.props as any)?.section === "connect";
      const isCvDownload = evt.name === "cv_downloaded";
      const isConnectCardClick = evt.name === "connect_card_clicked";
      if (isConnectHit || isCvDownload || isConnectCardClick) {
        await kv.lpush("alerts", JSON.stringify(evt));
        await kv.ltrim("alerts", 0, 99);

        // Fire-and-forget Telegram alert.
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (token && chatId) {
          const label = isCvDownload
            ? "📥 CV DOWNLOADED"
            : isConnectCardClick
            ? `📨 CONNECT CARD: ${(evt.props as any)?.label || "?"}`
            : "👀 CONNECT SECTION HIT";
          const where = [city, region, country].filter(Boolean).join(", ") || "—";
          const text =
            `*${label}*\n` +
            `🌍 ${where}\n` +
            `🔗 ${evt.ref || "direct"}\n` +
            `🆔 session ${evt.sessionId}\n` +
            `🕒 ${new Date(evt.ts).toISOString()}`;
          fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: "Markdown",
              disable_web_page_preview: true,
            }),
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.error("[track] kv error", err);
    }
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST events here" });
}
