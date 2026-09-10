"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, ScrollText } from "lucide-react";
import { HERITAGE_CHAPTERS } from "@/data/collections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Heritage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currIdxRef = useRef(0);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const activeChapter = HERITAGE_CHAPTERS[activeChapterIndex];

  // Scroll-Driven Pinned Timeline Experience
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinnedRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinnedRef.current,
        start: "top top",
        end: "+=260%",
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.max(self.progress * 100, 5)}%`;
          }
          const rawIdx = Math.min(
            Math.floor(self.progress * HERITAGE_CHAPTERS.length),
            HERITAGE_CHAPTERS.length - 1
          );
          if (rawIdx !== currIdxRef.current) {
            currIdxRef.current = rawIdx;
            setActiveChapterIndex(rawIdx);
          }
        },
      });

      triggerInstanceRef.current = trigger;
    }, containerRef);

    return () => {
      ctx.revert();
      triggerInstanceRef.current = null;
    };
  }, []);

  const handleTabClick = (idx: number) => {
    setActiveChapterIndex(idx);
    if (triggerInstanceRef.current) {
      const start = triggerInstanceRef.current.start;
      const end = triggerInstanceRef.current.end;
      const targetY =
        start + (idx / Math.max(HERITAGE_CHAPTERS.length - 1, 1)) * (end - start);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="heritage"
      ref={containerRef}
      className="relative w-full bg-ivory text-dark"
      style={{ minHeight: "360vh" }}
    >
      {/* Pinned Viewport */}
      <div
        ref={pinnedRef}
        className="relative w-full h-[100vh] h-[100svh] py-14 sm:py-20 px-6 sm:px-12 md:px-16 flex flex-col justify-between overflow-hidden"
      >
        {/* Top Header & Scroll Progress HUD */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-dark/15 pb-6 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-vermillion rounded-full animate-ping" />
                <span className="text-[10px] tracking-luxury uppercase text-gold-dark font-medium">
                  SCENE 05 • THE LINEAGE ARCHIVE
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-dark font-light leading-[0.92]">
                ROOTED IN
                <br />
                <span className="italic font-normal text-vermillion">
                  HERITAGE.
                </span>
              </h2>
            </div>

            {/* Scroll Indicator & Era Counter (Replaced manual left/right buttons) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              {/* Live Era Counter */}
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl text-dark font-medium">
                  {activeChapter.number}
                </span>
                <span className="text-dark/40 font-serif text-sm">
                  / 0{HERITAGE_CHAPTERS.length}
                </span>
              </div>

              {/* Scroll Timeline Indicator Pill */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-dark/20 bg-dark/5 backdrop-blur-sm">
                <ScrollText className="w-3.5 h-3.5 text-vermillion animate-pulse" />
                <span className="text-[9px] tracking-widest text-dark/80 uppercase font-serif">
                  SCROLL TO TRAVEL ERAS
                </span>
                <span className="text-vermillion font-serif text-xs animate-bounce">
                  ↓
                </span>
              </div>
            </div>
          </div>

          {/* Golden Progress Line Driven by Scroll (GPU Hardware Accelerated) */}
          <div className="relative w-full h-[2px] bg-dark/10 overflow-hidden mt-0.5">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-dark via-vermillion to-gold will-change-[width]"
              style={{ width: "5%" }}
            />
          </div>
        </div>

        {/* Main Interactive Chapter Display with AnimatePresence */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual with Cinematic Cross-Fade */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-dark/10 shadow-2xl border border-gold/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.number}
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeChapter.image}
                    alt={activeChapter.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent" />

                  {/* Era Location Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-1.5 bg-dark/85 backdrop-blur-md text-gold text-[10px] tracking-luxury uppercase font-serif border border-gold/30 shadow-md">
                      {activeChapter.location} • {activeChapter.year}
                    </span>
                  </div>

                  {/* Era Footnote */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-serif text-ivory/90 italic drop-shadow-sm">
                      {activeChapter.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Storytelling Narrative with Smooth Fade & Slide */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.number}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-vermillion font-serif text-xs tracking-luxury">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CHAPTER {activeChapter.number} ARCHIVE</span>
                </div>

                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-dark tracking-tight leading-tight">
                  {activeChapter.title}
                </h3>

                <p className="text-xs sm:text-sm font-serif italic text-gold-dark font-medium">
                  {activeChapter.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-dark/80 leading-relaxed font-light font-sans">
                  {activeChapter.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Interactive Era Jump Tabs */}
            <div className="pt-6 border-t border-dark/15 flex items-center gap-5">
              {HERITAGE_CHAPTERS.map((chapter, idx) => (
                <button
                  key={chapter.number}
                  onClick={() => handleTabClick(idx)}
                  className={`group flex items-center gap-2 py-1 transition-all ${
                    activeChapterIndex === idx
                      ? "text-vermillion font-medium scale-105"
                      : "text-dark/40 hover:text-dark hover:scale-102"
                  }`}
                  title={chapter.title}
                >
                  <span className="font-serif text-xs tracking-wider">
                    {chapter.number}
                  </span>
                  <span
                    className={`h-[2px] transition-all duration-300 ${
                      activeChapterIndex === idx
                        ? "w-8 bg-vermillion"
                        : "w-3 bg-dark/20 group-hover:w-6 group-hover:bg-dark/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Subtle Statement */}
        <div className="max-w-7xl mx-auto w-full pt-6 border-t border-dark/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-dark/50 gap-2">
          <span>PRESERVING INTANGIBLE CULTURAL HERITAGE • EST. 1928</span>
          <span className="font-serif italic text-dark/70">
            From the sacred banks of Varanasi to private global wardrobes
          </span>
        </div>
      </div>
    </section>
  );
}
