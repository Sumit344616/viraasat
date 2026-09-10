"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sliders, Eye, RefreshCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FabricMotion() {
  const [selectedHue, setSelectedHue] = useState<"vermillion" | "gold" | "noir" | "ivory">("vermillion");
  const [inspectMode, setInspectMode] = useState<"drape" | "weave" | "selvedge">("drape");
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isCycling, setIsCycling] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Canva-Style Scroll-Triggered Reveal Sequence
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Header: Canva-Style RISE UP
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Showcase Card: Canva-Style PAN RIGHT with smooth scale
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: 95,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Bottom Controls: Canva-Style FADE IN
      gsap.fromTo(
        controlsRef.current,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.22,
          ease: "power2.out",
          scrollTrigger: {
            trigger: controlsRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const silkHues = [
    { id: "vermillion", name: "Royal Vermillion", hex: "#8F1D2C", desc: "Sacred Kumkum & Sindoor", image: "/images/macro_pleats.jpg" },
    { id: "gold", name: "Imperial Gold", hex: "#B89A5A", desc: "Pure 24K Tested Zari", image: "/images/zari_macro.jpg" },
    { id: "noir", name: "Obsidian Noir", hex: "#181716", desc: "Midnight Weave & Charcoal", image: "/images/banarasi.jpg" },
    { id: "ivory", name: "Lustrous Ivory", hex: "#ECE4D6", desc: "Natural Mulberry Filament", image: "/images/organza.jpg" },
  ] as const;

  const currentHue = silkHues.find((h) => h.id === selectedHue) || silkHues[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 14, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="fabric-motion"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-dark text-ivory py-28 px-6 sm:px-12 md:px-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Radial Tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 60% 50%, ${currentHue.hex} 0%, transparent 65%)`,
        }}
      />

      {/* Top Header (Canva-Style Rise Up) */}
      <div
        ref={headerRef}
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8 will-change-transform"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-[11px] tracking-luxury uppercase text-gold font-serif">
              SCENE 03 • TACTILE SILK ANATOMY
            </span>
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ivory font-light leading-[0.92]">
            FABRIC
            <br />
            <span className="italic font-normal text-gold-light">IN MOTION</span>
          </h2>
        </div>

        <div className="max-w-md md:text-right space-y-2">
          <p className="font-serif text-2xl sm:text-3xl italic text-gold">
            &ldquo;Every fold carries a story.&rdquo;
          </p>
          <p className="text-xs text-ivory/70 leading-relaxed font-light">
            Observe how light cascades across hand-twisted mulberry filaments and metallic bullion. Interact with the drape below to inspect macro weave textures in real-time.
          </p>
        </div>
      </div>

      {/* Interactive Pseudo-3D Tactile Fabric Showcase (Canva-Style Pan Right) */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-6xl mx-auto my-10 perspective-[1200px] will-change-transform"
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-none overflow-hidden bg-dark-surface border border-gold/30 shadow-[0_30px_70px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Macro Silk Visual with Focus Pull / Blur & Rise Animation */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHue.id}
                initial={{
                  opacity: 0,
                  scale: 1.08,
                  filter: "blur(16px)",
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  filter: "blur(14px)",
                  y: -14,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentHue.image}
                  alt={currentHue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover filter brightness-95 contrast-105"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Light Sheen Overlay that tracks mouse */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
              style={{
                background: `radial-gradient(circle at ${50 + mouseTilt.x * 2}% ${
                  50 - mouseTilt.y * 2
                }%, rgba(213, 189, 131, 0.3) 0%, transparent 60%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/40 pointer-events-none z-10" />
          </div>

          {/* Floating Inspection HUD Badge */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHue.id}
                initial={{ opacity: 0, x: -24, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 24, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-dark/85 backdrop-blur-md px-5 py-3 border border-gold/30 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span className="text-[10px] text-gold uppercase tracking-luxury font-serif">
                    TEXTILE SPECIFICATION • 100% HANDLOOM
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif text-ivory">
                  {currentHue.name}
                </h4>
                <p className="text-xs text-gold-light/80 font-serif italic">
                  {currentHue.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="bg-dark/75 backdrop-blur-md px-4 py-2 border border-gold/20 text-[10px] tracking-widest text-ivory/60 uppercase font-serif">
              DRAG MOUSE OVER SURFACE TO SHIFT DRAPE PERSPECTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Hue Switcher & Inspection Mode (Canva-Style Fade In) */}
      <div
        ref={controlsRef}
        className="relative z-20 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-gold/15 will-change-transform"
      >
        {/* Silk Hue Selector */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="text-xs tracking-luxury text-gold uppercase font-serif">
            SILK DYE SELECTION:
          </span>
          <div className="flex items-center gap-3">
            {silkHues.map((hue) => (
              <button
                key={hue.id}
                onClick={() => setSelectedHue(hue.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                  selectedHue === hue.id
                    ? "border-gold bg-gold/20 text-ivory shadow-lg shadow-gold/20 scale-105"
                    : "border-ivory/20 hover:border-ivory/60 text-ivory/70 hover:scale-102"
                }`}
                title={hue.desc}
              >
                <span
                  className="w-3 h-3 rounded-full border border-ivory/40"
                  style={{ backgroundColor: hue.hex }}
                />
                <span className="text-[11px] font-serif tracking-wider uppercase">
                  {hue.name}
                </span>
                {selectedHue === hue.id && (
                  <motion.span
                    layoutId="activeDye"
                    className="absolute inset-0 rounded-full border border-gold pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* View Details Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              setIsCycling(true);
              const nextHue =
                selectedHue === "vermillion"
                  ? "gold"
                  : selectedHue === "gold"
                  ? "noir"
                  : selectedHue === "noir"
                  ? "ivory"
                  : "vermillion";
              setSelectedHue(nextHue);
              setTimeout(() => setIsCycling(false), 650);
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/40 hover:border-gold bg-dark/60 hover:bg-gold/10 text-gold text-[11px] font-serif tracking-wider uppercase transition-all duration-300 shadow-md group"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 transition-transform duration-700 ${
                isCycling ? "rotate-180 text-ivory" : "group-hover:rotate-45"
              }`}
            />
            <span>CYCLE SPECIMEN</span>
          </button>
        </div>
      </div>
    </section>
  );
}
