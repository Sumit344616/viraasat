"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SilkFabricProps {
  color?: string;
  sheenColor?: string;
  wireframe?: boolean;
  intensity?: number;
  speed?: number;
  rotationOffset?: [number, number, number];
  interactive?: boolean;
  scale?: [number, number, number];
  position?: [number, number, number];
}

export default function SilkFabric({
  color = "#8F1D2C",
  sheenColor = "#D5BD83",
  wireframe = false,
  intensity = 1.0,
  speed = 1.0,
  rotationOffset = [0.2, -0.35, 0.1],
  interactive = true,
  scale = [1, 1, 1],
  position = [0, 0, 0],
}: SilkFabricProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // GPU Uniforms for 60-120 FPS butter-smooth vertex animation without CPU lag
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmp: { value: 0.24 * intensity },
      uSpeed: { value: speed },
    }),
    [intensity, speed]
  );

  // Keep amplitude and speed updated if props change
  useEffect(() => {
    uniforms.uWaveAmp.value = 0.24 * intensity;
    uniforms.uSpeed.value = speed;
  }, [intensity, speed, uniforms]);

  // Geometry: 48x48 segments provides high fidelity while remaining lightweight
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(5.0, 3.4, 48, 48);
  }, []);

  // Configure GPU vertex displacement via onBeforeCompile
  const onBeforeCompile = useMemo(() => {
    return (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uWaveAmp = uniforms.uWaveAmp;
      shader.uniforms.uSpeed = uniforms.uSpeed;

      shader.vertexShader = `
        uniform float uTime;
        uniform float uWaveAmp;
        uniform float uSpeed;
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        float t = uTime * 0.75 * uSpeed;
        float wave1 = sin(transformed.x * 1.7 + t * 1.3) * cos(transformed.y * 1.3 + t * 0.85);
        float wave2 = sin((transformed.x + transformed.y) * 2.4 - t * 1.05) * 0.42;
        float gravity = cos(transformed.x * 0.75) * sin(transformed.y * 0.85) * 0.32;
        float edgeFlutter = sin(transformed.x * 3.2 + t * 2.0) * (1.0 - clamp(abs(transformed.y) / 1.7, 0.0, 1.0)) * 0.16;
        
        transformed.z += (wave1 + wave2 + gravity + edgeFlutter) * uWaveAmp;
        `
      );
    };
  }, [uniforms]);

  // Smooth lerp targets for mouse parallax
  const targetRotation = useRef({ x: rotationOffset[0], y: rotationOffset[1] });

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    // Update GPU uniform in microseconds (zero CPU array allocations)
    uniforms.uTime.value = time;

    // Smooth subtle mouse interaction
    if (interactive && typeof window !== "undefined") {
      const mouseX = state.pointer.x * 0.22;
      const mouseY = state.pointer.y * 0.18;
      targetRotation.current.x = rotationOffset[0] + mouseY;
      targetRotation.current.y = rotationOffset[1] + mouseX;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        0.04
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y,
        0.04
      );
      meshRef.current.rotation.z =
        rotationOffset[2] + Math.sin(time * 0.35) * 0.04;
    } else {
      meshRef.current.rotation.z =
        rotationOffset[2] + Math.sin(time * 0.3) * 0.03;
    }

    // Weightless vertical floating
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.06;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.35) * 0.04;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotationOffset}
      scale={scale}
    >
      <meshPhysicalMaterial
        ref={materialRef}
        color={color}
        roughness={0.36}
        metalness={0.12}
        clearcoat={0.4}
        clearcoatRoughness={0.25}
        sheen={1.0}
        sheenRoughness={0.28}
        sheenColor={new THREE.Color(sheenColor)}
        side={THREE.DoubleSide}
        wireframe={wireframe}
        onBeforeCompile={onBeforeCompile}
      />
    </mesh>
  );
}
