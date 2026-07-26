

"use client";

import { useEffect, useId, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface SpotlightWordmarkProps {
  text?: string;
  className?: string;
}

/**
 * A 3D-extruded wordmark whose outline is traced by a gradient highlight
 * that follows the cursor — same spotlight technique as SpotlightLogo,
 * built with stacked SVG <text> layers to fake isometric depth instead
 * of hand-authored vector paths.
 */
export function SpotlightWordmark({
  text = "USEFORK",
  className = "",
}: SpotlightWordmarkProps) {
  const id = useId();
  const ids = {
    radialGradient: `wordmark-radial-gradient-${id}`,
  };

  const ref = useRef<SVGSVGElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { margin: "80px" });

  // viewBox dimensions
  const VW = 900;
  const VH = 260;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, VW]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, VH]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  // Number of stacked layers used to fake the isometric extrusion depth
  const DEPTH = 18;
  const OFFSET = 1.4; // px per layer, in viewBox units

  const textProps = {
    x: VW / 2,
    y: VH / 2,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontFamily: "var(--font-sans, system-ui, sans-serif)",
    fontWeight: 800,
    fontSize: 150,
    letterSpacing: "0.01em",
  };

  return (
    <motion.svg
      ref={ref}
      viewBox={`0 0 ${VW} ${VH}`}
      className={`h-auto w-full select-none touch-manipulation [--stroke:color-mix(in_oklab,var(--foreground)_18%,var(--background))] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Extruded depth layers — build the isometric side-thickness */}
      <g>
        {Array.from({ length: DEPTH }).map((_, i) => (
          <text
            key={i}
            {...textProps}
            transform={`translate(${(DEPTH - i) * OFFSET}, ${(DEPTH - i) * OFFSET})`}
            fill="none"
            stroke="var(--stroke)"
            strokeOpacity={0.35 - i * 0.012}
            strokeWidth={1}
          >
            {text}
          </text>
        ))}
      </g>

      {/* Front face — mostly hollow, faint fill so it reads as outline */}
      <text {...textProps} fill="var(--background)" stroke="none">
        {text}
      </text>

      {/* Base outline stroke */}
      <text {...textProps} fill="none" stroke="var(--stroke)" strokeWidth={1.5}>
        {text}
      </text>

      {/* Cursor-tracked spotlight stroke overlay */}
      <text
        {...textProps}
        fill="none"
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth={1.5}
      >
        {text}
      </text>
    </motion.svg>
  );
}