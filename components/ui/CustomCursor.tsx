"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      const clickTarget = target.closest("button, a, input, [role='button'], [data-cursor='pointer']");

      if (viewTarget) {
        setCursorType("view");
      } else if (clickTarget) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setCursorType("hidden");
    const handleMouseEnter = () => setCursorType("default");

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (isTouchDevice || cursorType === "hidden") return null;

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: cursorType === "view" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer follower ring / VIEW label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[2px] transition-colors"
        animate={{
          x: cursorType === "view" ? position.x - 42 : position.x - 18,
          y: cursorType === "view" ? position.y - 42 : position.y - 18,
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
        transition={{ type: "spring", damping: 25, stiffness: 280, mass: 0.2 }}
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
