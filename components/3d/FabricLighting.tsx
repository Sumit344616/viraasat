"use client";

import React from "react";

interface FabricLightingProps {
  mode?: "warm" | "dramatic" | "minimal";
  accentColor?: string;
}

export default function FabricLighting({
  mode = "warm",
  accentColor = "#8F1D2C",
}: FabricLightingProps) {
  return (
    <>
      {/* Soft studio ambient light */}
      <ambientLight intensity={mode === "dramatic" ? 0.45 : 0.75} color="#FAF6EE" />

      {/* Main key light: warm diffused daylight from high top-left */}
      <directionalLight
        position={[-3, 4, 3]}
        intensity={mode === "dramatic" ? 1.6 : 1.9}
        color="#FFF6E5"
      />

      {/* Rim light: Antique gold grazing backlight to sculpt the silk edges */}
      <directionalLight
        position={[3.5, 2, -2.5]}
        intensity={mode === "dramatic" ? 2.4 : 1.8}
        color="#D5BD83"
      />

      {/* Subtle under-bounce light reflecting the brand accent hue */}
      <pointLight
        position={[0, -2.5, 1.5]}
        intensity={0.8}
        color={accentColor}
        distance={6}
      />

      {/* Fill light from front-right to soften shadows */}
      <pointLight
        position={[2, 0.5, 2.5]}
        intensity={0.6}
        color="#ECE5D8"
        distance={7}
      />
    </>
  );
}
