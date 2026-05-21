import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Rajput — Building AI Operations & Automation",
  description:
    "Philosophy → MBA → real estate ops → AI. Self-taught AI builder shipping agents, workflows, and systems from scratch. Building in public, available globally.",
  openGraph: {
    title: "Dev Rajput — Building AI Operations & Automation",
    description:
      "Philosophy → MBA → real estate ops → AI. Self-taught AI builder shipping agents, workflows, and systems from scratch. Building in public, available globally.",
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
      className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
