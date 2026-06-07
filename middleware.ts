import { NextRequest, NextResponse } from "next/server";

const COOKIE = "admin_ok";

/**
 * Gate /admin/* behind a single shared password set in ADMIN_PASSWORD env var.
 * On success we set an httpOnly cookie so subsequent visits don't re-prompt.
 *
 * If ADMIN_PASSWORD isn't set, we deny by default — safer than open.
 */
export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("Set ADMIN_PASSWORD env var in Vercel to enable /admin.", {
      status: 503,
      headers: { "content-type": "text/plain" },
    });
  }

  // Already authenticated via cookie?
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie === expected) {
    return NextResponse.next();
  }

  // Login attempt via ?pw=... — set cookie + redirect to clean URL.
  const pw = req.nextUrl.searchParams.get("pw");
  if (pw && pw === expected) {
    const res = NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
    res.cookies.set(COOKIE, expected, {
      httpOnly: true,
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: true,
    });
    return res;
  }

  // Otherwise: brutalist login screen.
  return new NextResponse(
    `<!doctype html><html><head><title>// ADMIN //</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'JetBrains Mono',monospace;background:#f5d000;color:#000;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
  .box{background:#000;color:#f5d000;border:6px solid #000;box-shadow:12px 12px 0 #ff2e2e;padding:36px 32px;width:100%;max-width:420px}
  h1{font-family:'Anton','Archivo Black',sans-serif;font-size:64px;line-height:.86;letter-spacing:-.04em;text-transform:uppercase;margin-bottom:16px}
  p{font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:24px;opacity:.7}
  input{display:block;width:100%;padding:14px 16px;font-family:inherit;font-size:18px;background:#fffef5;color:#000;border:4px solid #f5d000;outline:none;margin-bottom:14px}
  button{display:block;width:100%;padding:14px 16px;font-family:'Archivo Black',sans-serif;font-size:18px;background:#ff2e2e;color:#000;border:4px solid #ff2e2e;text-transform:uppercase;letter-spacing:.04em;cursor:pointer}
  button:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #fffef5}
  .x{color:#ff2e2e}
</style></head>
<body>
<form class="box" method="get">
  <h1>// ADMIN<br/>ONLY.</h1>
  <p>SAY THE <span class="x">PASSWORD</span>.</p>
  <input type="password" name="pw" autofocus required />
  <button type="submit">UNLOCK ↗</button>
</form>
</body></html>`,
    { status: 401, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};
