"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-ink/5">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-ink">
          Dev Rajput
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="/#work" className="hover:text-teal-primary transition-colors">
            Work
          </a>
          <Link href="/about" className="hover:text-teal-primary transition-colors">
            About
          </Link>
          <a href="/#experience" className="hover:text-teal-primary transition-colors">
            Experience
          </a>
          <a href="/#contact" className="hover:text-teal-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink/5 bg-surface px-6 py-4 space-y-3 text-sm">
          <a href="/#work" onClick={() => setOpen(false)} className="block hover:text-teal-primary">
            Work
          </a>
          <Link href="/about" onClick={() => setOpen(false)} className="block hover:text-teal-primary">
            About
          </Link>
          <a href="/#experience" onClick={() => setOpen(false)} className="block hover:text-teal-primary">
            Experience
          </a>
          <a href="/#contact" onClick={() => setOpen(false)} className="block hover:text-teal-primary">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
