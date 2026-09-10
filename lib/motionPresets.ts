import { TargetAndTransition, Transition } from "framer-motion";

export type MotionPresetType =
  | "rise"
  | "fadeUp"
  | "fadeIn"
  | "softBlur"
  | "zoomIn"
  | "zoomOut"
  | "panLeft"
  | "panRight"
  | "panUp"
  | "panDown"
  | "breathe"
  | "drift"
  | "clipReveal"
  | "maskReveal"
  | "parallax"
  | "float"
  | "scaleReveal";

export interface MotionPresetDefinition {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  transition: Transition;
}

/**
 * CANVA-STYLE EDITORIAL MOTION PRESETS
 * Reusable motion configurations engineered for high-fashion imagery and typography.
 */
export const MOTION_PRESETS: Record<MotionPresetType, MotionPresetDefinition> = {
  // RISE: image starts 40px below, opacity 0, moves upward with crisp deceleration
  rise: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },

  // FADE UP: Subtle, graceful editorial reveal
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },

  // FADE IN: Pure opacity transition
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: "easeOut" },
  },

  // SOFT BLUR: blur(8px) -> blur(0px) for filmic focus pull
  softBlur: {
    initial: { opacity: 0, filter: "blur(8px)", scale: 1.03 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },

  // ZOOM IN: scale(1.08) -> scale(1)
  zoomIn: {
    initial: { opacity: 0, scale: 1.08 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },

  // ZOOM OUT: scale(0.94) -> scale(1)
  zoomOut: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },

  // PAN LEFT: image moves from x: +80px to x: 0
  panLeft: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },

  // PAN RIGHT: image moves from x: -80px to x: 0
  panRight: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },

  // PAN UP: image moves from y: 60px to y: 0
  panUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },

  // PAN DOWN: image moves from y: -60px to y: 0
  panDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },

  // BREATHE: Very subtle organic scale cycling 1 -> 1.025 -> 1
  breathe: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.025, 1] },
    transition: { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
  },

  // DRIFT: slow x/y movement with low amplitude
  drift: {
    initial: { x: 0, y: 0 },
    animate: { x: [0, 8, -6, 0], y: [0, -6, 4, 0] },
    transition: { duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
  },

  // CLIP REVEAL: image appears through animated diagonal clip-path
  clipReveal: {
    initial: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 },
    animate: { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1 },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },

  // MASK REVEAL: image is revealed through an expanding organic mask
  maskReveal: {
    initial: { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, scale: 1.05 },
    animate: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },

  // PARALLAX: differential depth
  parallax: {
    initial: { y: 30 },
    animate: { y: -30 },
    transition: { duration: 1.4, ease: "easeOut" },
  },

  // FLOAT: slow weightless vertical bobbing
  float: {
    initial: { y: 0 },
    animate: { y: [-6, 6, -6] },
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
  },

  // SCALE REVEAL: scale 0.92 -> 1 with opacity
  scaleReveal: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};
