"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/data/brand";

export default function Quote() {
  return (
    <section className="relative w-full bg-ivory text-dark py-14 sm:py-24 lg:py-36 px-4 sm:px-12 md:px-16 overflow-hidden flex items-center justify-center">
      {/* Background Accent Monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif text-[28vw] font-light">V</span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-12 h-[1px] bg-vermillion mx-auto"
        />

        {/* Quote Blockquote with Kinetic Bounce & Weaving Thread Lines */}
        <blockquote className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-dark font-light leading-[1.1] select-none">
          {/* Line 1: "Elegance is not created." with Staggered Word Bounce */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5">
            <span className="text-gold-dark/60 font-serif">&ldquo;</span>
            {["Elegance", "is", "not", "created."].map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotate: idx % 2 === 0 ? -4 : 4 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 12,
                  mass: 0.8,
                  delay: idx * 0.12,
                }}
                whileHover={{ scale: 1.08, y: -4, color: "#8F1D2C" }}
                className="inline-block cursor-default transition-colors duration-200"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Animated Gold Handloom Thread Line that weaves under Line 1 */}
          <div className="relative w-48 sm:w-72 md:w-96 mx-auto my-3 h-4 overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 300 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 0,10 Q 75,0 150,10 T 300,10"
                stroke="url(#threadGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8F1D2C" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#B89A5A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8F1D2C" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            {/* Shimmering Shuttle Dot at head of thread */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,230,153,0.9)]"
            />
          </div>

          {/* Line 2: "It is woven." with Kinetic Elastic Bounce & Vermillion Sheen */}
          <div className="overflow-hidden py-2">
            <motion.span
              initial={{ opacity: 0, y: 70, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 10,
                mass: 1,
                delay: 0.6,
              }}
              whileHover={{ scale: 1.05 }}
              className="inline-block italic font-normal text-vermillion transition-transform duration-300 drop-shadow-sm cursor-default"
            >
              It is woven.&rdquo;
            </motion.span>
          </div>
        </blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-1"
        >
          <p className="font-serif tracking-[0.3em] text-sm sm:text-base text-gold-dark uppercase font-medium">
            — {BRAND.name}
          </p>
          <p className="text-[11px] tracking-luxury uppercase text-dark/40 font-sans">
            CENTURY OF LIVING HANDLOOM HERITAGE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
