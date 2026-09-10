"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import FabricMotion from "@/components/FabricMotion";
import Weaving from "@/components/Weaving";
import Heritage from "@/components/Heritage";
import SignatureCollection from "@/components/SignatureCollection";
import BrandStory from "@/components/BrandStory";
import Craftsmanship from "@/components/Craftsmanship";
import EditorialFilm from "@/components/EditorialFilm";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ModalInquiry from "@/components/ui/ModalInquiry";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-ivory text-dark selection:bg-vermillion selection:text-ivory">
        {/* Custom Luxury Magnetic Cursor */}
        <CustomCursor />

        {/* Global Bespoke Inquiry Drawer */}
        <ModalInquiry
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
        />

        {/* Minimal Luxury Navigation */}
        <Navbar onOpenInquiry={() => setInquiryOpen(true)} />

        {/* Hero Section — The 3D WOW Moment */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById("collection");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onStoryClick={() => {
            const el = document.getElementById("story");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Section 01: The Collection (Asymmetric Editorial Gallery) */}
        <Collection />

        {/* Section 02: Fabric in Motion (3D Interactive Silk Showroom) */}
        <FabricMotion />

        {/* Section 03: The Art of Weaving (Dark Mode & Animated Threads) */}
        <Weaving />

        {/* Section 04: Rooted in Heritage (Horizontal Lineage Archive) */}
        <Heritage />

        {/* Section 05: The Signature Collection (Made to be Remembered) */}
        <SignatureCollection />

        {/* Section 06: Brand Story (More Than a Saree Manifesto) */}
        <BrandStory />

        {/* Section 07: Craftsmanship (Split Screen & 4 Pillars) */}
        <Craftsmanship />

        {/* Section 08: The Editorial Film (The Saree, Reimagined) */}
        <EditorialFilm />

        {/* Section 09: Testimonial & Brand Impact Quote */}
        <Quote />

        {/* Section 10: Contact & Business Presentation Conversion CTA */}
        <Contact onOpenInquiry={() => setInquiryOpen(true)} />

        {/* Minimal Luxury Brand Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
