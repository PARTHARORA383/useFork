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
 * A small outlined wordmark whose border is traced by a gradient
 * spotlight that follows the cursor — sized for inline use (e.g. footer),
 * roughly matching a text-lg footprint.
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

  // viewBox dimensions — sized for a small inline mark
  const VW = 140;
  const VH = 28;

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

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  const textProps = {
    x: VW / 2,
    y: VH / 2,
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    fontFamily: "var(--font-sans, system-ui, sans-serif)",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "0.02em",
  };

  return (
    <motion.svg
      ref={ref}
      viewBox={`0 0 ${VW} ${VH}`}
      className={`h-[1.75rem] w-auto select-none touch-manipulation [--stroke:color-mix(in_oklab,var(--foreground)_35%,var(--background))] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="45"
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

      {/* Hollow fill — knocks out background so only the border shows */}
      <text {...textProps} fill="var(--muted)" stroke="none">
        {text}
      </text>

      {/* Base outline/border */}
      <text {...textProps} fill="none" stroke="var(--stroke)" strokeWidth={0.2}>
        {text}
      </text>

      {/* Cursor-tracked spotlight overlay on the border */}
      <text
        {...textProps}
        fill="none"
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth={0.6}
      >
        {text}
      </text>
    </motion.svg>
  );
}