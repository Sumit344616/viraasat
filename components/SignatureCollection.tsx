"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import { SIGNATURE_COLLECTIONS, SignaturePiece } from "@/data/collections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterTrackRef = useRef<HTMLDivElement>(null);
  const [selectedPiece, setSelectedPiece] = useState<SignaturePiece | null>(null);

  // Counter-Directional Horizontal Runway: scrolls DOWN -> moves LEFT to RIGHT
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !counterTrackRef.current) return;

      // Moves from negative X to positive X (counter-movement to Collection runway)
      gsap.fromTo(
        counterTrackRef.current,
        { xPercent: -28 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative w-full bg-dark-surface text-ivory py-32 px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-dark/40 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[11px] tracking-luxury uppercase text-gold font-serif">
            SCENE 05 • HAUTE COUTURE ARCHIVE
          </span>
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ivory font-light leading-none">
          MADE TO
          <br />
          <span className="italic font-normal text-gold-light">BE REMEMBERED.</span>
        </h2>

        <p className="max-w-xl mx-auto text-xs sm:text-sm text-ivory/70 mt-6 leading-relaxed font-light">
          Bespoke commissions executed in limited private editions. Woven for historic weddings, royal occasions, and museum acquisitions.
        </p>
      </div>

      {/* Counter-Directional Runway Track (Moves Left to Right on Scroll) */}
      <div className="relative w-full overflow-x-auto lg:overflow-visible no-scrollbar pb-10">
        <div
          ref={counterTrackRef}
          className="flex items-stretch gap-8 lg:gap-10 w-max lg:w-auto lg:grid lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {SIGNATURE_COLLECTIONS.map((piece, idx) => (
            <div
              key={piece.id}
              data-cursor="view"
              onClick={() => setSelectedPiece(piece)}
              className="w-[85vw] sm:w-[380px] lg:w-auto flex-shrink-0 group cursor-pointer flex flex-col justify-between space-y-6"
            >
              {/* Visual Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-dark border border-gold/20 shadow-2xl">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="w-full flex items-center justify-between text-gold">
                    <span className="text-xs font-serif tracking-widest uppercase">
                      VIEW ARCHIVE →
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-dark/80 backdrop-blur-md text-[9px] tracking-widest text-gold uppercase font-serif border border-gold/30">
                    {piece.tag}
                  </span>
                </div>
              </div>

              {/* Editorial Caption */}
              <div className="space-y-2 border-t border-gold/15 pt-4">
                <span className="text-[10px] text-gold/80 uppercase font-serif tracking-widest">
                  {piece.edition}
                </span>
                <h3 className="text-2xl font-serif text-ivory group-hover:text-gold transition-colors">
                  {piece.title}
                </h3>
                <p className="text-xs font-serif italic text-ivory/60">
                  &ldquo;{piece.quote}&rdquo;
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-ivory/40">
                  <span>{piece.craft}</span>
                  <span>{piece.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-xs text-ivory/50 font-serif tracking-widest">
          PRIVATE COMMISSIONS BY APPOINTMENT ONLY
        </span>

        <a
          href="#collection"
          className="group inline-flex items-center gap-3 text-xs font-serif tracking-luxury text-gold hover:text-ivory uppercase transition-colors"
        >
          <span>VIEW COMPLETE RUNWAY COLLECTION</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>

      {/* Signature Modal */}
      <AnimatePresence>
        {selectedPiece && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPiece(null)}
              className="absolute inset-0 bg-dark/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative w-full max-w-2xl bg-dark border border-gold/30 p-8 sm:p-12 text-ivory z-10 space-y-6"
            >
              <button
                onClick={() => setSelectedPiece(null)}
                className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-ivory"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-xs tracking-widest text-gold uppercase font-serif">
                {selectedPiece.edition}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-ivory">
                {selectedPiece.title}
              </h3>
              <p className="text-sm font-serif italic text-gold-light">
                &ldquo;{selectedPiece.quote}&rdquo;
              </p>

              <div className="relative aspect-[16/9] overflow-hidden border border-gold/20">
                <Image
                  src={selectedPiece.image}
                  alt={selectedPiece.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                <div>
                  <p className="text-xs text-ivory/50 font-serif">CRAFT SPECIFICATION</p>
                  <p className="text-sm text-ivory">{selectedPiece.craft}</p>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedPiece(null)}
                  className="px-6 py-2.5 bg-vermillion text-ivory text-xs tracking-luxury uppercase font-serif hover:bg-vermillion-light transition-colors"
                >
                  REQUEST APPOINTMENT
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
