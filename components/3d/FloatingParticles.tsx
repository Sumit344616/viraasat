"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

export default function FloatingParticles({
  count = 60,
  color = "#D5BD83",
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a subtle 3D bounding envelope around the fabric
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      sc[i] = Math.random() * 0.04 + 0.015;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = positionAttr.getY(i);
      // Drift upwards slowly like dust in a shaft of temple light
      y += 0.003;
      if (y > 3) y = -3;
      positionAttr.setY(i, y);

      // Subtle horizontal sway
      const x = positions[i * 3] + Math.sin(time * 0.4 + i) * 0.08;
      positionAttr.setX(i, x);
    }
    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
