"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/data/brand";
import ImageReveal from "./ui/ImageReveal";

export default function BrandStory() {
  const storyParagraphs = [
    "In an era obsessed with mechanical speed and fleeting trends, we make a deliberate, unyielding stand for slowness.",
    "A single VIRAASAT saree spends over three months on a wooden pit loom, cradled by the rhythmic breath and seasoned intuition of a master artisan whose lineage traces back across four generations.",
    "Every thread of pure mulberry silk is hand-twisted; every motif of pure gold zari is individually guided by shuttle without shortcut. When you drape this silk, you do not simply wear clothing—you inhabit six yards of uninterrupted human devotion.",
  ];

  return (
    <section
      id="story"
      className="relative w-full bg-ivory text-dark py-32 px-6 sm:px-12 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Editorial Title & Statement with Staggered Line Reveals */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-vermillion rounded-full" />
            <span className="text-[11px] tracking-luxury uppercase text-vermillion font-medium">
              SCENE 06 • THE MANIFESTO
            </span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-dark font-light leading-[0.9]"
            >
              MORE THAN
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-vermillion italic font-normal leading-[0.9]"
            >
              A SAREE.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 border-l-2 border-gold pl-6 sm:pl-8"
          >
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-dark font-light leading-snug">
              &ldquo;A saree is not simply worn.
              <br />
              <span className="italic text-gold-dark font-normal">It is remembered.&rdquo;</span>
            </p>
          </motion.div>
        </div>

        {/* Dual Image Editorial Composition with Canva-style Image Presets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Pair */}
          <div className="lg:col-span-6 relative">
            <div className="w-full max-w-lg shadow-2xl border border-gold/20 overflow-hidden">
              <ImageReveal
                src="/images/tussar.jpg"
                alt="Brand story editorial drape"
                preset="clipReveal"
                aspectRatio="aspect-[3/4]"
                caption="HANDWOVEN RAW SILK • MADANNAPURA LOOMS"
              />
            </div>

            {/* Overlapping Detail: Macro pleats with zoomIn preset */}
            <div className="hidden sm:block absolute -bottom-10 -right-4 w-48 sm:w-60 shadow-2xl border-2 border-ivory overflow-hidden z-20">
              <ImageReveal
                src="/images/macro_pleats.jpg"
                alt="Textile pleats detail"
                preset="zoomIn"
                delay={0.3}
                aspectRatio="aspect-[3/4]"
              />
            </div>
          </div>

          {/* Right Column: Line-by-line Narrative */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <div className="space-y-6">
              {storyParagraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg text-dark/80 font-light leading-relaxed font-sans"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Signature & Provenance */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-dark/15 flex items-center justify-between"
            >
              <div>
                <p className="font-serif text-2xl tracking-widest text-dark font-medium">
                  {BRAND.name}
                </p>
                <p className="text-[10px] tracking-luxury uppercase text-gold-dark">
                  ATELIER OF CONTEMPORARY INDIAN COUTURE
                </p>
              </div>

              <div className="text-right text-xs text-dark/60 font-serif italic">
                <p>Varanasi • Kanchipuram</p>
                <p>Est. {BRAND.founded}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
