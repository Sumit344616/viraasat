"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Film } from "lucide-react";
import { BRAND } from "@/data/brand";

export default function EditorialFilm() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="film"
      className="relative w-full min-h-[90vh] bg-dark text-ivory flex items-center justify-center overflow-hidden py-24 px-6"
    >
      {/* Cinematic Full-Bleed Background Visual with subtle breathe motion */}
      <motion.div
        animate={{ scale: [1.02, 1.05, 1.02] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/film_still.jpg"
          alt="The Saree Reimagined Fashion Film Still"
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-dark/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/70" />
      </motion.div>

      {/* Central Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-dark/60 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] tracking-luxury uppercase text-gold font-serif">
            SCENE 08 • CINEMATIC BRAND CAMPAIGN
          </span>
        </div>

        <div className="space-y-1">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl lg:text-9xl tracking-tight text-ivory font-light leading-[0.88] drop-shadow-2xl"
            >
              THE SAREE,
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl lg:text-9xl tracking-tight text-gold-light italic font-normal leading-[0.88] drop-shadow-2xl"
            >
              REIMAGINED.
            </motion.h2>
          </div>
        </div>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
          Directed in the sandstone corridors of Rajasthan at twilight. Witness the liquid motion of handwoven silk in our cinematic brand campaign.
        </p>

        {/* Circular Animated Magnetic Play Button */}
        <div className="pt-4 flex flex-col items-center justify-center gap-4">
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold/50 flex items-center justify-center bg-dark/60 backdrop-blur-md hover:border-gold hover:scale-110 transition-all duration-500 shadow-2xl"
            aria-label="Play Brand Campaign Film"
          >
            <div className="absolute inset-0 rounded-full border border-gold animate-ping opacity-20" />
            <div className="absolute -inset-2 rounded-full border border-gold/20" />

            <div className="flex items-center justify-center pl-1 text-gold group-hover:text-ivory transition-colors">
              <Play className="w-8 h-8 fill-current" />
            </div>
          </button>

          <span className="text-[11px] tracking-luxury uppercase text-gold/90 font-serif">
            PLAY FILM → (3:20 MIN)
          </span>
        </div>
      </div>

      {/* Fullscreen Luxury Film Modal */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-[2000] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-video bg-black border border-gold/30 shadow-2xl overflow-hidden flex items-center justify-center"
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-6 right-6 z-30 p-2 text-ivory/70 hover:text-ivory hover:rotate-90 transition-all duration-300"
                aria-label="Close Film Modal"
              >
                <X className="w-7 h-7" />
              </button>

              <div className="relative w-full h-full">
                <Image
                  src="/images/film_still.jpg"
                  alt="Fashion Film Frame"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/60" />

                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-ivory z-20">
                  <div className="space-y-1">
                    <span className="text-xs text-gold uppercase tracking-widest font-serif">
                      OFFICIAL ATELIER CAMPAIGN
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif">
                      The Geometry of Royal Silk — Directed for {BRAND.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-serif text-gold">
                    <Film className="w-4 h-4 text-gold" />
                    <span>4K CINEMA MASTER</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
