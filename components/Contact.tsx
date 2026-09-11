"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { BRAND } from "@/data/brand";

interface ContactProps {
  onOpenInquiry?: () => void;
}

export default function Contact({ onOpenInquiry }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative w-full min-h-[auto] lg:min-h-screen bg-dark text-ivory py-14 sm:py-24 lg:py-32 px-4 sm:px-12 md:px-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vermillion/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span className="text-[11px] tracking-luxury uppercase text-gold font-serif">
            DIGITAL ATELIER COLLABORATION & CLIENT COMMISSION
          </span>
        </div>
      </div>

      {/* Monumental Central Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <h2 className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-ivory font-light leading-[0.92]">
          LET&apos;S CREATE
          <br />
          <span className="italic font-normal text-gold-light">SOMETHING</span>
          <br />
          TIMELESS.
        </h2>

        <p className="mt-6 sm:mt-8 text-sm sm:text-xl font-light text-ivory/80 max-w-xl leading-relaxed">
          &ldquo;Bring your collection to the digital world.&rdquo;
          <br />
          <span className="text-xs sm:text-sm text-ivory/50">
            For discerning saree houses, multi-designer boutiques, and haute couture textile ateliers looking to redefine luxury digital presence.
          </span>
        </p>

        {/* Action Buttons (Mobile Full-Width Responsive) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-vermillion hover:bg-vermillion-light text-ivory text-xs tracking-luxury uppercase font-serif transition-all duration-300 shadow-2xl w-full sm:w-auto text-center"
          >
            <span className="font-medium">START A CONVERSATION</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="#collection"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-gold/40 hover:border-gold text-ivory hover:text-gold text-xs tracking-luxury uppercase font-serif transition-colors w-full sm:w-auto text-center"
          >
            <span>VIEW ARCHIVE COLLECTION</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Direct Contacts */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold uppercase tracking-widest font-serif text-[11px]">
            <MapPin className="w-3.5 h-3.5" />
            <span>ATELIER PRESENCE</span>
          </div>
          <p className="text-ivory/80 font-light">{BRAND.contact.address}</p>
          <p className="text-ivory/50">{BRAND.contact.city}, {BRAND.contact.country}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold uppercase tracking-widest font-serif text-[11px]">
            <Phone className="w-3.5 h-3.5" />
            <span>PRIVATE CONCIERGE</span>
          </div>
          <p className="text-ivory/80 font-light">{BRAND.contact.conciergePhone}</p>
          <p className="text-ivory/50">{BRAND.contact.phone}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold uppercase tracking-widest font-serif text-[11px]">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMISSIONS & PRESS</span>
          </div>
          <p className="text-ivory/80 font-light">{BRAND.contact.email}</p>
          <p className="text-ivory/50">{BRAND.contact.businessEmail}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gold uppercase tracking-widest font-serif text-[11px]">
            <svg className="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>DIGITAL CURATION</span>
          </div>
          <p className="text-ivory/80 font-light">{BRAND.contact.instagramHandle}</p>
          <p className="text-ivory/50">{BRAND.contact.workingHours}</p>
        </div>
      </div>
    </section>
  );
}
