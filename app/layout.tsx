import type { Metadata } from "next";
import { Anton, Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEV RAJPUT // NOW I BUILD //",
  description:
    "AI Operations & Automation. Philosophy + MBA + Ops + AI. Self-taught builder shipping agents, workflows, and systems from scratch. Building in public, available globally.",
  openGraph: {
    title: "DEV RAJPUT // NOW I BUILD //",
    description:
      "AI Operations & Automation. Philosophy + MBA + Ops + AI. Self-taught builder shipping agents, workflows, and systems from scratch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        {children}

        {/* Vercel Analytics — page views, top pages, referrers, country, device.
            Lives in your Vercel dashboard → Analytics tab. */}
        <Analytics />

        {/* Vercel Speed Insights — Web Vitals (LCP, FID, CLS, TTFB) per route. */}
        <SpeedInsights />

        {/* Microsoft Clarity — session replays + heatmaps. Only loads when the
            env var is set. Set NEXT_PUBLIC_CLARITY_ID in Vercel → Project →
            Settings → Environment Variables. Get the ID at clarity.microsoft.com. */}
        {clarityId && (
          <Script
            id="ms-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
