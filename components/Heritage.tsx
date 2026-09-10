"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { HERITAGE_CHAPTERS } from "@/data/collections";

export default function Heritage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeChapter = HERITAGE_CHAPTERS[activeChapterIndex];

  const handleNext = () => {
    if (activeChapterIndex < HERITAGE_CHAPTERS.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      id="heritage"
      className="relative w-full min-h-screen bg-ivory text-dark py-32 px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-dark/15 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-gold-dark rounded-full" />
              <span className="text-[11px] tracking-luxury uppercase text-gold-dark font-medium">
                THE LINEAGE ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-dark font-light leading-[0.9]">
              ROOTED IN
              <br />
              <span className="italic font-normal text-vermillion">HERITAGE.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-serif text-xs tracking-luxury uppercase text-dark/60">
              CHAPTER {activeChapter.number} OF 0{HERITAGE_CHAPTERS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeChapterIndex === 0}
                className="p-3 border border-dark/20 hover:border-vermillion disabled:opacity-30 disabled:pointer-events-none text-dark transition-colors"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapterIndex === HERITAGE_CHAPTERS.length - 1}
                className="p-3 border border-dark/20 hover:border-vermillion disabled:opacity-30 disabled:pointer-events-none text-dark transition-colors"
                aria-label="Next chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Chapter Display */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Huge Visual */}
        <div className="lg:col-span-7 relative group">
          <motion.div
            key={activeChapter.number}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-dark/10 shadow-2xl border border-gold/30"
          >
            <Image
              src={activeChapter.image}
              alt={activeChapter.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="px-3.5 py-1.5 bg-dark/70 backdrop-blur-md text-gold text-[10px] tracking-luxury uppercase font-serif border border-gold/30">
                {activeChapter.location} • {activeChapter.year}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-serif text-ivory/80 italic">
                {activeChapter.detail}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Storytelling Narrative & Editorial Typography */}
        <div className="lg:col-span-5 space-y-6 lg:pl-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-vermillion font-serif text-sm tracking-luxury">
              <Compass className="w-4 h-4" />
              <span>CHAPTER {activeChapter.number}</span>
            </div>
            <motion.h3
              key={`title-${activeChapter.number}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-dark tracking-tight leading-tight"
            >
              {activeChapter.title}
            </motion.h3>
            <p className="text-sm font-serif italic text-gold-dark">
              {activeChapter.subtitle}
            </p>
          </div>

          <motion.p
            key={`text-${activeChapter.number}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-dark/75 leading-relaxed font-light"
          >
            {activeChapter.text}
          </motion.p>

          {/* Chapter Quick Tabs */}
          <div className="pt-8 border-t border-dark/15 flex items-center gap-4">
            {HERITAGE_CHAPTERS.map((chapter, idx) => (
              <button
                key={chapter.number}
                onClick={() => setActiveChapterIndex(idx)}
                className={`group flex items-center gap-2 py-1 transition-all ${
                  activeChapterIndex === idx
                    ? "text-vermillion font-medium"
                    : "text-dark/40 hover:text-dark"
                }`}
              >
                <span className="font-serif text-xs tracking-wider">
                  {chapter.number}
                </span>
                <span
                  className={`h-[2px] transition-all ${
                    activeChapterIndex === idx
                      ? "w-8 bg-vermillion"
                      : "w-3 bg-dark/20 group-hover:w-5 group-hover:bg-dark/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Subtle Statement */}
      <div className="max-w-7xl mx-auto w-full pt-16 border-t border-dark/10 flex flex-col sm:flex-row items-center justify-between text-xs text-dark/50 gap-4">
        <span>PRESERVING INTANGIBLE CULTURAL HERITAGE</span>
        <span className="font-serif italic text-dark/70">
          From the sacred banks of Varanasi to private global wardrobes
        </span>
      </div>
    </section>
  );
}
