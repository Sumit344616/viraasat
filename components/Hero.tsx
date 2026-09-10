"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { BRAND } from "@/data/brand";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick?: () => void;
  onStoryClick?: () => void;
}

export default function Hero({ onExploreClick, onStoryClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPinnedRef = useRef<HTMLDivElement>(null);
  const sareeMainRef = useRef<HTMLDivElement>(null);
  const sareeShadowRef = useRef<HTMLDivElement>(null);
  const sareeGlowRef = useRef<HTMLDivElement>(null);
  const revealImageRef = useRef<HTMLDivElement>(null);
  const brandTitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const transitionTextRef = useRef<HTMLDivElement>(null);

  // Royal Window Curtain ("Parda") Refs (Driven by mouse scroll)
  const curtainWrapperRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const curtainSealRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth scroll handler for seal click
  const handleOpenCurtainClick = () => {
    if (containerRef.current) {
      const targetScroll = containerRef.current.offsetTop + window.innerHeight * 0.75;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Close curtains by scrolling smoothly back to the top
  const handleReplayCurtainClick = () => {
    if (containerRef.current) {
      window.scrollTo({ top: containerRef.current.offsetTop, behavior: "smooth" });
    }
  };

  // Mouse Parallax (Restrained 5-12px)
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Pinned ScrollTrigger Timeline
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !heroPinnedRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: heroPinnedRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // -----------------------------------------------------------------
      // PHASE 1: WINDOW CURTAINS DRAW OPEN ON SCROLL (0.0 -> 0.22)
      // Curtains part left & right like real window/stage curtains as user scrolls!
      // -----------------------------------------------------------------
      tl.to(
        curtainSealRef.current,
        {
          scale: 1.15,
          opacity: 0,
          ease: "power1.in",
        },
        0
      )
        .to(
          leftCurtainRef.current,
          {
            xPercent: -100,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          rightCurtainRef.current,
          {
            xPercent: 100,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          curtainWrapperRef.current,
          {
            pointerEvents: "none",
            autoAlpha: 0,
            ease: "none",
          },
          0.18
        );

      // -----------------------------------------------------------------
      // PHASE 2: HERO ACTIVE & SAREE PALLU DIAGONAL FLOAT (0.22 -> 0.48)
      // -----------------------------------------------------------------
      tl.to(
        sareeMainRef.current,
        {
          yPercent: -35,
          xPercent: 6,
          rotate: -4,
          skewX: -2,
          scale: 1.05,
          ease: "none",
        },
        0.22
      )
        .to(
          sareeShadowRef.current,
          {
            yPercent: -30,
            xPercent: 4,
            opacity: 0.6,
            ease: "none",
          },
          0.22
        )
        .to(
          sareeGlowRef.current,
          {
            opacity: 0.85,
            scale: 1.1,
            ease: "none",
          },
          0.22
        );

      // -----------------------------------------------------------------
      // PHASE 3: SAREE SWEEP & CAMPAIGN VISUAL REVEAL (0.42 -> 0.72)
      // -----------------------------------------------------------------
      tl.to(
        sareeMainRef.current,
        {
          yPercent: -85,
          xPercent: -8,
          rotate: 3,
          skewX: 4,
          scale: 1.15,
          ease: "power1.inOut",
        },
        0.42
      )
        .to(
          sareeShadowRef.current,
          {
            yPercent: -75,
            xPercent: -5,
            ease: "power1.inOut",
          },
          0.42
        )
        .to(
          brandTitleRef.current,
          {
            y: -90,
            opacity: 0,
            scale: 0.95,
            ease: "power1.in",
          },
          0.45
        )
        .to(
          taglineRef.current,
          {
            y: -50,
            opacity: 0,
            ease: "power1.in",
          },
          0.45
        )
        .to(
          bottomBarRef.current,
          {
            y: 30,
            opacity: 0,
            ease: "power1.in",
          },
          0.45
        );

      tl.fromTo(
        revealImageRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 1.08,
          filter: "blur(6px)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          ease: "power2.out",
        },
        0.5
      );

      // -----------------------------------------------------------------
      // PHASE 4: EDITORIAL UNVEIL TRANSITION TO RUNWAY (0.72 -> 1.0)
      // -----------------------------------------------------------------
      tl.to(
        sareeMainRef.current,
        {
          yPercent: -150,
          xPercent: -15,
          rotate: 8,
          opacity: 0.15,
          ease: "power1.out",
        },
        0.72
      )
        .fromTo(
          transitionTextRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.78
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const brandLetters = BRAND.name.split("");

  return (
    <section ref={containerRef} className="relative w-full bg-dark text-ivory">
      {/* =========================================================================
          HERO PINNED VIEWPORT (CONTAINS WINDOW CURTAINS & EDITORIAL SCENE)
         ========================================================================= */}
      <div
        ref={heroPinnedRef}
        className="relative w-full h-[100vh] h-[100svh] overflow-hidden flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 md:px-16"
      >
        {/* =====================================================================
            GRAND ROYAL WINDOW CURTAINS ("PARDA")
            Starts closed over the screen; user scroll draws curtains left and right!
           ===================================================================== */}
        <div
          ref={curtainWrapperRef}
          className="absolute inset-0 z-50 overflow-hidden pointer-events-auto select-none"
          aria-label="Grand Royal Saree Curtain - Scroll down to draw curtains"
        >
          {/* Left Curtain Saree Panel (Authentic Banarasi Silk Saree with 24K Gold Zari Border) */}
          <div
            ref={leftCurtainRef}
            className="absolute top-0 left-0 w-1/2 h-full shadow-[25px_0_65px_rgba(0,0,0,0.95)] overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="relative w-full h-[106%] -top-4 scale-[1.18] origin-right">
              <Image
                src="/images/saree_curtain_left.jpg"
                alt="Royal Banarasi Silk Saree Curtain Left Drape"
                fill
                priority
                sizes="50vw"
                className="object-cover object-right filter brightness-95 contrast-105 select-none pointer-events-none"
              />
            </div>
            {/* Subtle Luxury Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-gold/35 to-transparent pointer-events-none" />
          </div>

          {/* Right Curtain Saree Panel (Authentic Banarasi Silk Saree with 24K Gold Zari Border) */}
          <div
            ref={rightCurtainRef}
            className="absolute top-0 right-0 w-1/2 h-full shadow-[-25px_0_65px_rgba(0,0,0,0.95)] overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="relative w-full h-[106%] -top-4 scale-[1.18] origin-left">
              <Image
                src="/images/saree_curtain_right.jpg"
                alt="Royal Banarasi Silk Saree Curtain Right Drape"
                fill
                priority
                sizes="50vw"
                className="object-cover object-left filter brightness-95 contrast-105 select-none pointer-events-none"
              />
            </div>
            {/* Subtle Luxury Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/50 pointer-events-none" />
            <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-gold/35 to-transparent pointer-events-none" />
          </div>

          {/* Center Grand Royal Atelier Medallion / Seal (Perfect Mathematical Flex Center) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div
              ref={curtainSealRef}
              onClick={handleOpenCurtainClick}
              className="pointer-events-auto relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-gold bg-[#11100F]/95 shadow-[0_0_65px_rgba(184,154,90,0.95)] flex flex-col items-center justify-center p-5 text-center group cursor-pointer hover:scale-105 transition-transform"
              style={{ transformOrigin: "center center" }}
            >
              {/* Outer spinning ornamental gold ring */}
              <div
                className="absolute inset-2 rounded-full border border-gold/40 border-dashed animate-spin"
                style={{ animationDuration: "24s" }}
              />

              <span className="text-gold text-xl sm:text-2xl animate-spin mb-1" style={{ animationDuration: "10s" }}>
                ✦
              </span>
              <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-ivory font-medium">
                {BRAND.name}
              </span>
              <span className="text-[9px] tracking-ultra text-gold-light uppercase font-sans mt-0.5">
                HAUTE COUTURE ARCHIVE
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-2" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] sm:text-[9px] tracking-widest text-ivory/90 uppercase font-serif bg-vermillion/90 px-3 py-1 rounded-full border border-gold/40 group-hover:bg-vermillion transition-colors flex items-center gap-1.5 shadow-md">
                  <span>SCROLL TO DRAW CURTAINS</span>
                  <span className="text-gold animate-bounce">↓</span>
                </span>
              </div>

              {/* Hanging Royal Golden Tassels */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
                <div className="w-[1px] h-5 bg-gold/70" />
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,230,153,0.9)]" />
                <div className="w-[1px] h-5 bg-gold/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Layer 0: Deep Atmospheric Background & Ambient Glow */}
        <div
          className="absolute inset-0 z-0 bg-dark pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-vermillion/15 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[40vw] h-[40vw] rounded-full bg-gold/10 blur-[140px] pointer-events-none" />
        </div>

        {/* Layer 1: Underlying Couture Campaign Visual Revealed by Saree Fall */}
        <div
          ref={revealImageRef}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 overflow-hidden"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
        >
          <Image
            src="/images/hero_model.jpg"
            alt="Royal Saree Campaign Reveal"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/80" />
        </div>

        {/* Layer 2: Multi-Layer Pseudo-3D Flowing Saree Pallu / Fall */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          {/* Saree Ambient Shadow */}
          <div
            ref={sareeShadowRef}
            className="absolute -bottom-20 right-0 w-[85vw] sm:w-[55vw] aspect-[3/4] opacity-35 filter blur-2xl transition-transform"
            style={{
              transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-vermillion-dark via-dark to-transparent" />
          </div>

          {/* Saree Specular Gold Rim Highlight */}
          <div
            ref={sareeGlowRef}
            className="absolute bottom-10 right-4 sm:right-16 w-72 sm:w-96 h-72 rounded-full bg-gold/20 blur-3xl opacity-40 pointer-events-none"
          />

          {/* Main Saree Fabric Silhouette Layer (Organic curved saree pallu) */}
          <div
            ref={sareeMainRef}
            className="absolute -bottom-16 sm:-bottom-10 right-[-10%] sm:right-[5%] w-[95vw] sm:w-[60vw] max-w-[850px] aspect-[3/4] transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px) rotate(-1deg)`,
              transformOrigin: "bottom right",
            }}
          >
            <div className="relative w-full h-full filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]">
              <Image
                src="/images/saree_pallu.jpg"
                alt="Flowing Silk Saree Pallu"
                fill
                priority
                sizes="(max-width: 768px) 95vw, 60vw"
                className="object-contain object-bottom select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Layer 3: Contrast Vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-dark/90 via-transparent to-dark/95" />

        {/* TOP: Crest Badge & Replay Curtain Option */}
        <div className="relative z-30 flex items-center justify-between max-w-7xl mx-auto w-full pt-4">
          <div className="inline-flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-5 py-2 rounded-full border border-gold/40 bg-dark/75 backdrop-blur-md shadow-lg shadow-gold/5 transition-all duration-300 hover:border-gold">
            <span className="text-gold text-xs leading-none">✦</span>
            <span className="text-[10px] sm:text-xs font-serif tracking-[0.28em] sm:tracking-[0.32em] uppercase text-gold-light font-medium">
              HIGH TEXTILE ARCHITECTURE
            </span>
            <span className="hidden sm:inline w-3 h-[1px] bg-gold/40" />
            <span className="hidden sm:inline text-[9px] tracking-ultra text-ivory/60 uppercase font-sans">
              HAUTE COUTURE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReplayCurtainClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/30 hover:border-gold text-[10px] font-serif tracking-widest text-gold/80 hover:text-gold bg-dark/60 backdrop-blur-sm transition-all"
              title="Close curtains and scroll to top"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span className="uppercase">CLOSE CURTAINS</span>
            </button>

            <div className="hidden md:flex items-center gap-4 text-ivory/60 text-[11px] tracking-widest font-serif">
              <span>KASHI</span>
              <span>•</span>
              <span>KANCHIPURAM</span>
              <span>•</span>
              <span>EST. {BRAND.founded}</span>
            </div>
          </div>
        </div>

        {/* CENTER: Hero Typography with Sleek Slide-Pan Sheen & Interactive Hover */}
        <div className="relative z-30 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center select-none">
          <div ref={brandTitleRef} className="relative overflow-visible py-2">
            {/* Subtle Gold Ambient Glow behind title */}
            <div className="absolute -inset-x-10 -inset-y-10 bg-radial from-gold/25 via-gold/5 to-transparent blur-3xl crazy-aura-glow pointer-events-none" />

            <h1
              className="relative font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-[0.06em] font-light leading-[0.88] flex items-center flex-nowrap whitespace-nowrap select-none"
              aria-label={BRAND.name}
            >
              {brandLetters.map((letter, index) => (
                <span
                  key={index}
                  className="relative inline-block transition-all duration-300 hover:scale-110 hover:-translate-y-2.5 hover:drop-shadow-[0_0_25px_rgba(213,189,131,0.9)] cursor-pointer"
                  title={`VIRAASAT - ${letter}`}
                >
                  <span className="slide-pan-gold-text inline-block">
                    {letter}
                  </span>
                </span>
              ))}

              {/* End Subtle Sparkle Accent */}
              <span className="text-gold text-lg sm:text-2xl ml-2 sm:ml-4 inline-block animate-pulse">
                ✦
              </span>
            </h1>

            {/* Glowing Golden Hairline Underline with Traveling Sheen */}
            <div className="relative h-[2px] w-full mt-3 overflow-hidden bg-gold/20 shadow-[0_0_20px_rgba(213,189,131,0.6)]">
              <div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold-light to-transparent animate-pulse"
                style={{ animationDuration: "2.5s" }}
              />
            </div>
          </div>

          {/* Tagline & Subtext */}
          <div
            ref={taglineRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-4 sm:mt-8"
          >
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-wide font-normal leading-tight">
                WEAVING STORIES
                <br />
                INTO SILK.
              </h2>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <p className="text-sm sm:text-base font-sans text-ivory/80 max-w-md ml-auto font-light leading-relaxed">
                {BRAND.subtitle}
              </p>
              <p className="text-xs text-gold/70 mt-1 font-serif tracking-widest uppercase">
                Handcrafted Pure Zari Heirlooms
              </p>
            </div>
          </div>

          {/* Reveal Story Text (Emerges at ~75% scroll progress when saree sweeps across) */}
          <div
            ref={transitionTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/40 bg-dark/80 backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] tracking-luxury uppercase text-gold font-serif">
                SCENE 01 • THE VEIL LIFTS
              </span>
            </div>
            <h3 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ivory font-light">
              THE UNVEILING OF
              <br />
              <span className="italic text-gold-light font-normal">TIMELESS ELEGANCE</span>
            </h3>
            <p className="text-xs sm:text-sm text-ivory/70 mt-4 max-w-md font-light">
              Scroll forward into the runway collection.
            </p>
          </div>
        </div>

        {/* BOTTOM: Action CTAs & Scroll Hint */}
        <div
          ref={bottomBarRef}
          className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-gold/15"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#collection"
              onClick={onExploreClick}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-vermillion hover:bg-vermillion-light text-ivory text-xs tracking-luxury uppercase font-serif transition-all duration-300 shadow-xl overflow-hidden"
            >
              <span className="relative z-10 font-medium">EXPLORE THE RUNWAY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>

            <a
              href="#story"
              onClick={onStoryClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-ivory/30 hover:border-gold text-ivory/90 hover:text-gold text-xs tracking-luxury uppercase font-serif transition-all duration-300 backdrop-blur-sm"
            >
              <span>DISCOVER OUR STORY</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-ivory/60 text-[11px] tracking-widest font-serif uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: "8s" }} />
            <span>SCROLL TO UNVEIL PALLU</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
