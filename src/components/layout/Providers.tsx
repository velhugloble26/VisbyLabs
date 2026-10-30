"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { GlobalMotion } from "./GlobalMotion";
import { SmoothScroll } from "./SmoothScroll";

/** Smooth scrolling, plus motion animations that respect the visitor's reduced-motion setting. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <GlobalMotion />
      {children}
    </MotionConfig>
  );
}
