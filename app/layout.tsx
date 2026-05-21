import type { Metadata } from "next";
import { Anton, Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      style={{
        // expose CSS vars in case any component uses the Next font vars directly
        // (we mostly use literal Google fonts in CSS via @import)
      }}
    >
      <body>{children}</body>
    </html>
  );
}
