"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/data/brand";

export default function Quote() {
  return (
    <section className="relative w-full bg-ivory text-dark py-36 px-6 sm:px-12 md:px-16 overflow-hidden flex items-center justify-center">
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

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-dark font-light leading-[1.05]"
        >
          &ldquo;Elegance is not created.
          <br />
          <span className="italic font-normal text-vermillion">
            It is woven.&rdquo;
          </span>
        </motion.blockquote>

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
