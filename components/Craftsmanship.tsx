"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CRAFT_PILLARS } from "@/data/collections";
import { Sparkles, ArrowRight } from "lucide-react";
import ImageReveal from "./ui/ImageReveal";

export default function Craftsmanship() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  return (
    <section
      id="craftsmanship"
      className="relative w-full min-h-screen bg-dark text-ivory py-12 sm:py-20 lg:py-32 px-4 sm:px-12 md:px-16 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Artisan Textile Image with Mask Reveal */}
        <div className="lg:col-span-6 relative">
          <div className="border border-gold/30 shadow-2xl overflow-hidden">
            <ImageReveal
              src="/images/macro_pleats.jpg"
              alt="Silk weave craftsmanship detail"
              preset="maskReveal"
              aspectRatio="aspect-[3/4] sm:aspect-[4/5]"
            />
          </div>

          {/* Bottom floating metric */}
          <div className="mt-4 p-5 bg-dark-surface/90 backdrop-blur-md border border-gold/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gold uppercase tracking-luxury font-serif">
                CURRENT SPECIFICATION
              </p>
              <p className="text-xl font-serif text-ivory">
                {CRAFT_PILLARS[activePillarIndex].metricLabel}
              </p>
            </div>
            <span className="text-3xl font-serif text-gold-light font-light">
              {CRAFT_PILLARS[activePillarIndex].metric}
            </span>
          </div>
        </div>

        {/* Right: CRAFTSMANSHIP & 4 Interactive Pillars */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-[11px] tracking-luxury uppercase text-gold font-serif">
                SCENE 07 • THE FOUR CORNERSTONES
              </span>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-ivory font-light leading-none"
              >
                CRAFTSMANSHIP
              </motion.h2>
            </div>
            <p className="text-sm font-sans text-ivory/60 mt-3 font-light">
              We hold our weaving process to the uncompromising standards of haute couture.
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-4 pt-4">
            {CRAFT_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.title}
                onClick={() => setActivePillarIndex(idx)}
                className={`group cursor-pointer p-5 border transition-all duration-300 ${
                  activePillarIndex === idx
                    ? "border-gold bg-gold/10"
                    : "border-gold/15 hover:border-gold/40 bg-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-xs text-gold/60">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl tracking-wider text-ivory group-hover:text-gold transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-gold transition-transform duration-300 ${
                      activePillarIndex === idx ? "translate-x-1" : "opacity-40"
                    }`}
                  />
                </div>

                {activePillarIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="pt-3 pl-8 text-xs text-ivory/70 leading-relaxed font-light"
                  >
                    <p>{pillar.description}</p>
                    <p className="text-gold/80 font-serif italic mt-1">
                      {pillar.subtitle}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outstanding 24K Gold Artisan Patronage Crest Divider (Replaces clunky white overlay) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-20 pb-4">
        <div className="relative flex items-center justify-center">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-gold" />
          <div className="mx-3 sm:mx-8 px-4 sm:px-6 py-2 rounded-full border border-gold/40 bg-dark-surface/95 backdrop-blur-md shadow-[0_0_35px_rgba(184,154,90,0.35)] flex items-center gap-2 sm:gap-3">
            <span className="text-gold text-xs animate-spin" style={{ animationDuration: "14s" }}>✦</span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-gold font-serif whitespace-nowrap">
              CRAFTSMANSHIP GUILD • 120+ WEAVING FAMILIES • GRADE 6A SILK
            </span>
            <span className="text-gold text-xs animate-spin" style={{ animationDuration: "14s" }}>✦</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gold/40 to-gold" />
        </div>
      </div>
    </section>
  );
}
