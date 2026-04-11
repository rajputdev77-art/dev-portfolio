import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Rajput — AI Automation & Workflow Engineering",
  description:
    "I design AI systems and automated workflows that solve real business problems — lead qualification, content pipelines, and intelligent agents that run without you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-surface text-ink antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
