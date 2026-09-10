"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Clock, Award, Compass, Sparkles } from "lucide-react";
import { COLLECTIONS_DATA, CollectionItem } from "@/data/collections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleParallaxRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<CollectionItem | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Only pin on desktop (screen width >= 1024px)
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollDistance = track.scrollWidth - window.innerWidth + 140;

      // Pin container and translate track from right to left
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Differential parallax for background typography
      if (titleParallaxRef.current) {
        gsap.to(titleParallaxRef.current, {
          x: -scrollDistance * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Runway editorial items with strictly height-fitted aspect ratios (Zero Bottom Cutoff)
  const runwayItems = [
    {
      ...COLLECTIONS_DATA[0],
      aspectClass: "aspect-[3/4]",
      cropLabel: "TALL EDITORIAL PORTRAIT",
    },
    {
      ...COLLECTIONS_DATA[1],
      aspectClass: "aspect-[4/5]",
      cropLabel: "MACRO BROCADE TEXTILE",
    },
    {
      id: "runway-detail",
      number: "02.5",
      name: "PURE GOLD ZARI ANATOMY",
      tag: "CRAFT",
      category: "Tested Bullion Leaf",
      origin: "Varanasi Atelier",
      weaveTime: "Continuous Lineage",
      zariPurity: "24K Tested Core",
      description: "Fine bullion ribbons hand-spun on teakwood bobbins.",
      image: "/images/zari_macro.jpg",
      aspectClass: "aspect-[1/1]",
      cropLabel: "SQUARE CRAFT DETAIL",
      accent: "#B89A5A",
    },
    {
      ...COLLECTIONS_DATA[2],
      aspectClass: "aspect-[4/5]",
      cropLabel: "SCULPTURAL ORGANZA",
    },
    {
      ...COLLECTIONS_DATA[3],
      aspectClass: "aspect-[3/4]",
      cropLabel: "TEMPLE KORVAI CAMPAIGN",
    },
    {
      id: "runway-palace",
      number: "05",
      name: "COURTYARD SERENADE",
      tag: "CAMPAIGN",
      category: "Haute Couture Drape",
      origin: "Royal Rajasthan Archive",
      weaveTime: "Couture Edition",
      zariPurity: "Pure Gilded Zari",
      description: "Liquid silk cascading along sandstone arches at dusk.",
      image: "/images/film_still.jpg",
      aspectClass: "aspect-[16/10]",
      cropLabel: "WIDE CAMPAIGN LANDSCAPE",
      accent: "#8F1D2C",
    },
  ];

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative w-full bg-ivory text-dark min-h-screen overflow-hidden py-16 lg:py-0 lg:h-[100vh] lg:flex lg:flex-col lg:justify-between"
    >
      {/* Background Differential Parallax Typography */}
      <div
        ref={titleParallaxRef}
        className="hidden lg:block absolute top-6 left-10 text-[16vw] font-serif text-dark/[0.03] select-none pointer-events-none whitespace-nowrap leading-none z-0"
      >
        01 SILK • 02 BANARASI • 03 ORGANZA • 04 HANDWOVEN •
      </div>

      {/* Top Section Header (Compact & Elegant to Prevent Height Overflow) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-4 pb-2 border-b border-dark/15 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-vermillion" />
            <span className="text-[10px] tracking-luxury uppercase text-vermillion font-medium">
              SCENE 02 • THE EDITORIAL RUNWAY
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight text-dark font-light leading-none">
            THE COLLECTION RUNWAY
          </h2>
        </div>

        <div className="max-w-md md:text-right">
          <p className="font-serif italic text-base sm:text-lg text-gold-dark mb-0.5">
            &ldquo;Timeless silhouettes. Contemporary expression.&rdquo;
          </p>
          <span className="text-[10px] font-serif tracking-widest text-dark/60 uppercase">
            SCROLL DOWN TO ADVANCE HORIZONTALLY →
          </span>
        </div>
      </div>

      {/* Horizontal Runway Track (Constrained to 44vh so images NEVER get cut off at bottom) */}
      <div className="relative z-10 w-full my-auto py-1 lg:py-2 overflow-x-auto lg:overflow-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-12 lg:px-16 w-max"
        >
          {runwayItems.map((item) => (
            <div
              key={item.id}
              className="relative flex-shrink-0 group cursor-pointer flex flex-col justify-start"
              data-cursor="view"
              onClick={() => setActiveItem(item as CollectionItem)}
            >
              {/* Image Frame with Viewport-Height Responsive Sizing */}
              <div
                className={`relative overflow-hidden bg-dark/10 shadow-2xl border border-gold/25 h-[38vh] sm:h-[42vh] lg:h-[44vh] max-h-[380px] min-h-[250px] w-auto ${item.aspectClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 80vw, 550px"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-105"
                />

                {/* Tag & Number Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-dark/85 backdrop-blur-md text-[9px] tracking-widest text-gold uppercase font-serif border border-gold/30">
                    {item.number} • {item.tag}
                  </span>
                </div>

                {/* Hover Reveal Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <div className="w-full flex items-center justify-between text-ivory">
                    <span className="text-xs font-serif tracking-widest text-gold uppercase">
                      INSPECT ARCHIVE →
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </div>

              {/* Caption & Metadata (Fully in view with zero cutoff) */}
              <div className="mt-2 flex items-start justify-between gap-3 max-w-full">
                <div>
                  <span className="text-[9px] tracking-widest text-gold uppercase font-serif block">
                    {item.cropLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif text-dark tracking-wide group-hover:text-vermillion transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                </div>
                <span className="text-[10px] tracking-luxury text-vermillion font-serif uppercase flex-shrink-0 pt-0.5">
                  {item.weaveTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Runway Status Footer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 py-2 border-t border-dark/10 flex items-center justify-between text-[11px] text-dark/50">
        <span>06 ARCHIVE RUNWAY CREATIONS</span>
        <span className="font-serif italic">Pure mulberry silk & certified 24K bullion</span>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-dark/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="relative w-full max-w-4xl bg-dark text-ivory border border-gold/30 shadow-2xl p-6 sm:p-12 z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-ivory hover:rotate-90 transition-all duration-300"
                aria-label="Close detail modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:col-span-5 relative aspect-[3/4] bg-dark-surface overflow-hidden border border-gold/20">
                <Image
                  src={activeItem.image}
                  alt={activeItem.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-serif text-gold tracking-widest uppercase">
                    RUNWAY PIECE {activeItem.number} • {activeItem.tag}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif tracking-wide text-ivory mt-1">
                    {activeItem.name}
                  </h3>
                  <p className="text-xs text-gold-light/80 font-serif tracking-luxury uppercase mt-1">
                    {activeItem.category}
                  </p>
                </div>

                <p className="text-sm text-ivory/80 leading-relaxed font-light">
                  {activeItem.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gold/15 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-gold/80">
                      <Compass className="w-3.5 h-3.5" />
                      <span className="tracking-widest uppercase font-serif">ORIGIN</span>
                    </div>
                    <p className="text-ivory font-light">{activeItem.origin}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-gold/80">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="tracking-widest uppercase font-serif">LOOM TIME</span>
                    </div>
                    <p className="text-ivory font-light">{activeItem.weaveTime}</p>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <div className="flex items-center gap-1.5 text-gold/80">
                      <Award className="w-3.5 h-3.5" />
                      <span className="tracking-widest uppercase font-serif">ZARI PURITY</span>
                    </div>
                    <p className="text-ivory font-light">{activeItem.zariPurity}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-ivory/40">
                    Bespoke Atelier Commission
                  </span>
                  <a
                    href="#contact"
                    onClick={() => setActiveItem(null)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-vermillion hover:bg-vermillion-light text-ivory text-xs tracking-luxury uppercase font-serif transition-colors"
                  >
                    <span>INQUIRE PIECE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
