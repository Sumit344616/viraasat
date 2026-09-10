"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CurtainTransitionProps {
  color?: "vermillion" | "ivory" | "dark";
  direction?: "left" | "right" | "up";
}

export default function CurtainTransition({
  color = "vermillion",
  direction = "right",
}: CurtainTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!panelRef.current || !containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.6,
        },
      });

      if (direction === "right") {
        tl.fromTo(
          panelRef.current,
          { xPercent: -100, scaleY: 1.05 },
          { xPercent: 100, ease: "power2.inOut" }
        );
      } else if (direction === "left") {
        tl.fromTo(
          panelRef.current,
          { xPercent: 100, scaleY: 1.05 },
          { xPercent: -100, ease: "power2.inOut" }
        );
      } else {
        tl.fromTo(
          panelRef.current,
          { yPercent: 100 },
          { yPercent: -100, ease: "power2.inOut" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  const bgClasses = {
    vermillion: "bg-gradient-to-r from-vermillion-dark via-vermillion to-vermillion-dark",
    ivory: "bg-gradient-to-r from-ivory-muted via-ivory to-ivory-muted",
    dark: "bg-gradient-to-r from-dark via-dark-surface to-dark",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 sm:h-24 pointer-events-none overflow-hidden -my-8 z-30"
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className={`absolute inset-0 w-full h-full opacity-70 shadow-2xl ${bgClasses[color]}`}
        style={{
          boxShadow: "0 0 50px rgba(143, 29, 44, 0.4)",
        }}
      />
    </div>
  );
}
