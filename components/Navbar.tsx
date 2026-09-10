"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/data/brand";

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const navLinks = [
    { label: "COLLECTION", href: "#collection" },
    { label: "CRAFT", href: "#craft" },
    { label: "HERITAGE", href: "#heritage" },
    { label: "STORY", href: "#story" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-dark/80 backdrop-blur-md border-b border-gold/15 text-ivory shadow-lg"
            : "py-7 bg-transparent text-ivory"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex flex-col focus:outline-none"
            aria-label={`${BRAND.name} Home`}
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-medium text-ivory group-hover:text-gold transition-colors duration-300">
              {BRAND.name}
            </span>
            <span className="text-[9px] tracking-ultra text-gold/80 uppercase font-sans -mt-1 group-hover:tracking-[0.45em] transition-all duration-300">
              COUTURE TEXTILES
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[11px] font-sans tracking-[0.22em] text-ivory/80 hover:text-gold transition-colors py-1 group uppercase font-medium"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Triggers */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Inquire Button */}
            <button
              onClick={onOpenInquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-gold/40 hover:border-gold bg-transparent hover:bg-gold hover:text-dark text-ivory text-[10px] tracking-luxury uppercase font-serif transition-all duration-300"
            >
              <span>CONSULTATION</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-ivory hover:text-gold focus:outline-none transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Cinematic Curtain Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-dark text-ivory flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-gold/20 pb-6">
              <span className="font-serif text-2xl tracking-widest text-ivory">
                {BRAND.name}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-ivory/70 hover:text-gold hover:rotate-90 transition-all duration-300"
                aria-label="Close Mobile Menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Large Typography Links */}
            <div className="py-12 space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08, duration: 0.5 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline justify-between py-2 border-b border-gold/10 hover:border-gold/40 transition-colors"
                  >
                    <span className="text-4xl sm:text-5xl font-serif tracking-wider text-ivory group-hover:text-gold transition-colors">
                      {link.label}
                    </span>
                    <span className="text-xs font-serif text-gold/60 tracking-widest">
                      0{idx + 1}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Details & Direct Concierge */}
            <div className="border-t border-gold/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ivory/60">
              <div>
                <p className="text-gold uppercase tracking-widest font-serif text-[11px] mb-1">
                  Private Client Concierge
                </p>
                <p>{BRAND.contact.phone}</p>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenInquiry) onOpenInquiry();
                }}
                className="px-6 py-2.5 bg-vermillion text-ivory text-xs tracking-luxury uppercase font-serif hover:bg-vermillion-light transition-colors"
              >
                REQUEST PRESENTATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
