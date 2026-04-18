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
  title: "Dev Rajput — AI Operations Specialist",
  description:
    "AI Operations Specialist building, deploying, and scaling agentic workflows in n8n, Claude, and Python. Available for remote-first global roles.",
  openGraph: {
    title: "Dev Rajput — AI Operations Specialist",
    description:
      "AI Operations Specialist building, deploying, and scaling agentic workflows in n8n, Claude, and Python. Available for remote-first global roles.",
  },
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
