"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";
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

  // Scroll-Driven Pinned Timeline Experience on Desktop (Width >= 1024px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // On mobile and tablet, let it flow naturally without pinning to prevent height clipping
    if (window.innerWidth < 1024) return;

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
      className="relative w-full bg-ivory text-dark min-h-screen lg:min-h-[340vh]"
    >
      {/* Pinned Viewport on Desktop; Natural Flow on Mobile/Tablet */}
      <div
        ref={pinnedRef}
        className="relative w-full h-auto lg:h-[100vh] lg:h-[100svh] py-10 sm:py-14 lg:py-16 px-5 sm:px-10 lg:px-16 flex flex-col justify-between overflow-visible lg:overflow-hidden"
      >
        {/* Top Header */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-dark/15 pb-4 sm:pb-6">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-dark font-light leading-[0.94]">
              ROOTED IN
              <br />
              <span className="italic font-normal text-vermillion">
                HERITAGE.
              </span>
            </h2>
          </div>

          {/* Golden Progress Line Driven by Scroll (Desktop GPU Accelerated) */}
          <div className="hidden lg:block relative w-full h-[2px] bg-dark/10 overflow-hidden mt-0.5">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-dark via-vermillion to-gold will-change-[width]"
              style={{ width: "5%" }}
            />
          </div>
        </div>

        {/* Main Interactive Chapter Display with AnimatePresence */}
        <div className="max-w-7xl mx-auto w-full my-6 sm:my-8 lg:my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual with Cinematic Cross-Fade */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-dark/10 shadow-2xl border border-gold/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.number}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                    <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-dark/85 backdrop-blur-md text-gold text-[9px] sm:text-[10px] tracking-luxury uppercase font-serif border border-gold/30 shadow-md">
                      {activeChapter.location} • {activeChapter.year}
                    </span>
                  </div>

                  {/* Era Footnote */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <p className="text-xs font-serif text-ivory/90 italic drop-shadow-sm">
                      {activeChapter.detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Storytelling Narrative with Smooth Fade & Slide */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.number}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2 text-vermillion font-serif text-xs tracking-luxury">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CHAPTER {activeChapter.number} ARCHIVE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-dark tracking-tight leading-tight">
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

            {/* Quick Interactive Era Jump Tabs (Touch-Friendly on Mobile) */}
            <div className="pt-4 sm:pt-6 border-t border-dark/15 flex items-center gap-4 sm:gap-6">
              {HERITAGE_CHAPTERS.map((chapter, idx) => (
                <button
                  key={chapter.number}
                  onClick={() => handleTabClick(idx)}
                  className={`group flex items-center gap-2 py-2 px-1 transition-all ${
                    activeChapterIndex === idx
                      ? "text-vermillion font-medium scale-105"
                      : "text-dark/40 hover:text-dark hover:scale-102"
                  }`}
                  title={chapter.title}
                  aria-label={`Go to chapter ${chapter.number}: ${chapter.title}`}
                >
                  <span className="font-serif text-xs tracking-wider">
                    {chapter.number}
                  </span>
                  <span
                    className={`h-[2px] transition-all duration-300 ${
                      activeChapterIndex === idx
                        ? "w-8 sm:w-10 bg-vermillion"
                        : "w-3 sm:w-4 bg-dark/20 group-hover:w-6 group-hover:bg-dark/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Subtle Statement */}
        <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-6 border-t border-dark/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-dark/50 gap-2">
          <span>PRESERVING INTANGIBLE CULTURAL HERITAGE • EST. 1928</span>
          <span className="font-serif italic text-dark/70 text-center sm:text-right">
            From the sacred banks of Varanasi to private global wardrobes
          </span>
        </div>
      </div>
    </section>
  );
}
