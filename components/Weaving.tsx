"use client";

import React from "react";
import { motion } from "framer-motion";
import ImageReveal from "./ui/ImageReveal";
import CurtainTransition from "./ui/CurtainTransition";

export default function Weaving() {
  const pillars = [
    {
      word: "HANDCRAFTED",
      number: "01",
      detail: "Formed shuttle-by-shuttle on non-motorized heritage wooden looms.",
    },
    {
      word: "TIMELESS",
      number: "02",
      detail: "Centuries-old jaal motifs impervious to passing seasonal fads.",
    },
    {
      word: "AUTHENTIC",
      number: "03",
      detail: "Certified pure silk mark & tested metallurgical bullion accreditation.",
    },
  ];

  return (
    <section
      id="craft"
      className="relative w-full min-h-screen bg-dark text-ivory py-32 px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Animated Textile Thread Lines (SVG Warp & Weft) */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="22%"
            x2="100%"
            y2="22%"
            stroke="#B89A5A"
            strokeWidth="0.75"
            strokeDasharray="6 8"
            className="animate-pulse"
          />
          <line
            x1="0"
            y1="48%"
            x2="100%"
            y2="48%"
            stroke="#D5BD83"
            strokeWidth="0.5"
            strokeDasharray="12 16"
          />
          <line
            x1="0"
            y1="78%"
            x2="100%"
            y2="78%"
            stroke="#B89A5A"
            strokeWidth="0.75"
            strokeDasharray="8 12"
            className="animate-pulse"
          />

          <line
            x1="-10%"
            y1="10%"
            x2="110%"
            y2="90%"
            stroke="#8F1D2C"
            strokeWidth="1"
            className="animate-thread"
          />
          <line
            x1="-10%"
            y1="30%"
            x2="110%"
            y2="110%"
            stroke="#B89A5A"
            strokeWidth="0.8"
            className="animate-thread"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Top Header with Line-by-Line Reveal */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-[1px] bg-gold" />
          <span className="text-[11px] tracking-luxury uppercase text-gold font-serif">
            SCENE 04 • SACRED METALLURGY & TEXTILE ANATOMY
          </span>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ivory font-light leading-[0.9]"
          >
            THE ART
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-gold-light italic font-normal leading-[0.9]"
          >
            OF WEAVING
          </motion.h2>
        </div>
      </div>

      {/* Centerpiece: Canva-style Staggered Image Reveals */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Master Weaver with softBlur Preset */}
        <div className="lg:col-span-7 relative">
          <div className="border border-gold/30 shadow-2xl overflow-hidden">
            <ImageReveal
              src="/images/artisan_loom.jpg"
              alt="Artisan weaving at traditional pit loom"
              preset="softBlur"
              aspectRatio="aspect-[16/10] sm:aspect-[16/9]"
              caption="ARCHIVE PHOTOGRAPH • HAND-THROWN SHUTTLE CROSSING 9,000 WARP THREADS"
            />
          </div>
        </div>

        {/* Right: Zari Spools with panRight + zoomIn Preset */}
        <div className="lg:col-span-5 relative">
          <div className="border border-gold/20 shadow-xl overflow-hidden">
            <ImageReveal
              src="/images/zari_macro.jpg"
              alt="Pure gold zari spools and antique wooden shuttle"
              preset="panRight"
              delay={0.2}
              aspectRatio="aspect-[4/3]"
              caption="RAW ANATOMY • 24K BULLION GILDED ONTO PURE SILVER"
            />
          </div>
        </div>
      </div>

      {/* Bottom Pillars: HANDCRAFTED • TIMELESS • AUTHENTIC */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-gold/20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {pillars.map((item, index) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group space-y-3"
            >
              <div className="flex items-center justify-between text-gold/60 text-xs font-serif">
                <span>{item.number}</span>
                <div className="w-12 h-[1px] bg-gold/30 group-hover:w-20 transition-all duration-300" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif tracking-wider text-ivory group-hover:text-gold transition-colors">
                {item.word}
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed font-light">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fabric Curtain Transition to next section */}
      <CurtainTransition color="vermillion" direction="right" />
    </section>
  );
}
