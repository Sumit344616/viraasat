"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MOTION_PRESETS, MotionPresetType } from "@/lib/motionPresets";

interface ImageRevealProps {
  src: string;
  alt: string;
  preset?: MotionPresetType;
  delay?: number;
  hoverZoom?: boolean;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  cursorView?: boolean;
  onClick?: () => void;
}

export default function ImageReveal({
  src,
  alt,
  preset = "rise",
  delay = 0,
  hoverZoom = true,
  aspectRatio = "aspect-[3/4]",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption,
  cursorView = true,
  onClick,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const presetConfig = MOTION_PRESETS[preset] || MOTION_PRESETS.rise;

  return (
    <div
      ref={ref}
      className={`relative group overflow-hidden ${aspectRatio} ${className} ${
        cursorView ? "cursor-pointer" : ""
      }`}
      data-cursor={cursorView ? "view" : undefined}
      onClick={onClick}
    >
      <motion.div
        initial={presetConfig.initial}
        animate={isInView ? presetConfig.animate : presetConfig.initial}
        transition={{
          ...presetConfig.transition,
          delay: delay,
        }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-all duration-700 ease-out ${
            hoverZoom ? "group-hover:scale-[1.045] group-hover:brightness-105" : ""
          }`}
        />

        {/* Soft luxury film grain overlay on image */}
        <div className="absolute inset-0 bg-dark/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>

      {caption && (
        <div className="absolute bottom-3 left-3 right-3 bg-dark/60 backdrop-blur-md px-3 py-1.5 border border-gold/20 text-ivory text-[10px] tracking-luxury uppercase font-serif">
          {caption}
        </div>
      )}
    </div>
  );
}
