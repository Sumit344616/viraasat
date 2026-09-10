"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Sparkles } from "lucide-react";
import { BRAND } from "@/data/brand";

interface ModalInquiryProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export default function ModalInquiry({
  isOpen,
  onClose,
  defaultTopic = "Digital Brand Showcase Consultation",
}: ModalInquiryProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brandOrHouse: "",
    email: "",
    phone: "",
    topic: defaultTopic,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate completed submission
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-dark-surface border border-gold/30 rounded-none shadow-2xl p-8 sm:p-12 text-ivory z-10 overflow-hidden"
          >
            {/* Subtle antique gold border glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-ivory hover:rotate-90 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-[11px] tracking-widest text-gold uppercase font-serif">
                    PRIVATE CONCIERGE & BUSINESS INQUIRY
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif tracking-wide text-ivory mb-3">
                  Bring Your Saree Brand to Life
                </h3>

                <p className="text-sm text-ivory/70 font-light mb-8 max-w-lg leading-relaxed">
                  Request a confidential presentation to discover how an architectural 3D digital presence transforms heritage sarees into high-fashion heirlooms.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-luxury text-gold/80 uppercase mb-1.5 font-serif">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Radhika Singhania"
                        className="w-full bg-dark/60 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-luxury text-gold/80 uppercase mb-1.5 font-serif">
                        Brand / Business Name
                      </label>
                      <input
                        type="text"
                        value={form.brandOrHouse}
                        onChange={(e) => setForm({ ...form, brandOrHouse: e.target.value })}
                        placeholder="e.g. Singhania Silks / Atelier"
                        className="w-full bg-dark/60 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] tracking-luxury text-gold/80 uppercase mb-1.5 font-serif">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="client@brand.com"
                        className="w-full bg-dark/60 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] tracking-luxury text-gold/80 uppercase mb-1.5 font-serif">
                        Contact Number / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-dark/60 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-luxury text-gold/80 uppercase mb-1.5 font-serif">
                      Your Vision / Project Notes
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share details regarding your upcoming collection or brand showcase objectives..."
                      className="w-full bg-dark/60 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <p className="text-[11px] text-ivory/40">
                      Direct Atelier Line: {BRAND.contact.conciergePhone}
                    </p>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-vermillion hover:bg-vermillion-light text-ivory text-xs tracking-luxury uppercase font-serif transition-all duration-300 shadow-lg group"
                    >
                      <span>SUBMIT INQUIRY</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto animate-pulse" />
                <h4 className="text-2xl font-serif text-ivory">Inquiry Received with Distinction</h4>
                <p className="text-sm text-ivory/70 max-w-md mx-auto leading-relaxed">
                  Our private client director will reach out within 24 hours to schedule a bespoke digital walk-through and presentation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-dark text-xs tracking-luxury uppercase font-serif transition-colors"
                  >
                    RETURN TO SHOWCASE
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
