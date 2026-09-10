"use client";

import React from "react";
import { BRAND } from "@/data/brand";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-dark text-ivory border-t border-gold/15 py-16 px-6 sm:px-12 md:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top: Brand Wordmark & Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gold/15 pb-12 gap-8">
          <div>
            <h3 className="font-serif text-4xl sm:text-5xl tracking-[0.25em] text-ivory font-medium">
              {BRAND.name}
            </h3>
            <p className="text-xs sm:text-sm font-serif tracking-[0.3em] text-gold-light uppercase mt-2">
              {BRAND.tagline}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs tracking-luxury uppercase font-serif text-ivory/60 hover:text-gold transition-colors self-start md:self-end"
          >
            <span>BACK TO TOP</span>
            <div className="p-2 border border-gold/30 rounded-full group-hover:border-gold transition-colors">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-8 text-xs font-serif tracking-luxury uppercase text-ivory/70">
          <div className="flex flex-wrap gap-8">
            {BRAND.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 text-ivory/50">
            <a
              href={BRAND.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              INSTAGRAM
            </a>
            <span>•</span>
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="hover:text-gold transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ivory/40 font-sans">
          <p>© {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. Not for commercial replication.</p>
          <p className="font-serif italic text-gold/60">Crafted as a Haute Couture Digital Experience for Saree Houses</p>
        </div>
      </div>
    </footer>
  );
}
