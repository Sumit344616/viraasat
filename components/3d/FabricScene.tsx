"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SilkFabric from "./SilkFabric";
import FabricLighting from "./FabricLighting";
import FloatingParticles from "./FloatingParticles";
import Image from "next/image";

interface FabricSceneProps {
  color?: string;
  sheenColor?: string;
  wireframe?: boolean;
  lightingMode?: "warm" | "dramatic" | "minimal";
  speed?: number;
  interactive?: boolean;
  intensity?: number;
  className?: string;
  enableParticles?: boolean;
  cameraPosition?: [number, number, number];
}

export default function FabricScene({
  color = "#8F1D2C",
  sheenColor = "#D5BD83",
  wireframe = false,
  lightingMode = "warm",
  speed = 1.0,
  interactive = true,
  intensity = 1.0,
  className = "w-full h-full",
  enableParticles = true,
  cameraPosition = [0, 0, 4.2],
}: FabricSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // WebGL availability detection
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return (
      <div className={`relative bg-dark/5 flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 rounded-full border border-gold/30 border-t-gold animate-spin" />
      </div>
    );
  }

  // Graceful WebGL fallback if client browser/GPU lacks WebGL
  if (!hasWebGL) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src="/images/banarasi.jpg"
          alt="Luxury Silk Texture Fallback"
          fill
          className="object-cover opacity-60 filter brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
          stencil: false,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <FabricLighting mode={lightingMode} accentColor={color} />
          {enableParticles && <FloatingParticles count={55} color={sheenColor} />}
          <SilkFabric
            color={color}
            sheenColor={sheenColor}
            wireframe={wireframe}
            intensity={intensity}
            speed={speed}
            interactive={interactive}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
