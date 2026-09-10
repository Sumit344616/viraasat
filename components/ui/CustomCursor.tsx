"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-performance springs directly updating GPU transforms (Zero React re-renders)
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 600, mass: 0.05 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 600, mass: 0.05 });

  const followerX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.15 });
  const followerY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.15 });

  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "hidden">("default");
  const cursorTypeRef = useRef<"default" | "pointer" | "view" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered element without triggering unnecessary React renders
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      const clickTarget = target.closest("button, a, input, [role='button'], [data-cursor='pointer']");

      let nextType: "default" | "pointer" | "view" | "hidden" = "default";
      if (viewTarget) {
        nextType = "view";
      } else if (clickTarget) {
        nextType = "pointer";
      }

      if (cursorTypeRef.current !== nextType) {
        cursorTypeRef.current = nextType;
        setCursorType(nextType);
      }
    };

    const handleMouseLeave = () => {
      cursorTypeRef.current = "hidden";
      setCursorType("hidden");
    };

    const handleMouseEnter = () => {
      cursorTypeRef.current = "default";
      setCursorType("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || cursorType === "hidden") return null;

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorType === "view" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer follower ring / VIEW label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "view" ? 84 : cursorType === "pointer" ? 44 : 36,
          height: cursorType === "view" ? 84 : cursorType === "pointer" ? 44 : 36,
          backgroundColor:
            cursorType === "view"
              ? "rgba(143, 29, 44, 0.85)"
              : cursorType === "pointer"
              ? "rgba(184, 154, 90, 0.2)"
              : "rgba(184, 154, 90, 0.08)",
          borderColor:
            cursorType === "view"
              ? "rgba(213, 189, 131, 0.9)"
              : cursorType === "pointer"
              ? "rgba(184, 154, 90, 0.8)"
              : "rgba(184, 154, 90, 0.4)",
          borderWidth: cursorType === "view" ? 1.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorType === "view" && (
          <span className="text-[10px] tracking-luxury text-ivory font-medium uppercase font-serif">
            EXPLORE
          </span>
        )}
      </motion.div>
    </>
  );
}
