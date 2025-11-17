"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useRef, useState } from "react";
import { isActive } from "@/lib/is-active";

interface RollOverTextProps {
  children: string;
  className?: string;
  staggerDelay?: number; // delay between each character
}

export function RollOverText({
  children,
  className,
  staggerDelay = 0.03,
}: RollOverTextProps) {
  const text = children.split("").map((char) => (char === " " ? "\u00A0" : char));

  const [isHovered , setIsHovered] = useState(false);
  const containerRef  = useRef<HTMLDivElement>(null);

  // Variants for front layer (roll up + blur on hover)
  const frontVariants = {
    initial: { y: 0, filter: "blur(0px)" },
    hovered: { y: "-100%", filter: "blur(2px)" },
  };

  // Variants for back layer (slide in from bottom + blur)
  const backVariants = {
    initial: { y: "100%", filter: "blur(2px)" },
    hovered: { y: 0, filter: "blur(0px)" },
  };


  return (
    <motion.div
    ref={containerRef}
      initial="initial"
      whileHover="hovered"
      className={cn("relative inline-block overflow-hidden ", className)}
    >
      {/* Front layer */}
      <div className="relative block">
        {text.map((char, i) => (
          <motion.span
            key={`front-${i}`}
            variants={frontVariants}
            transition={{ ease: "easeInOut", duration: 0.3, delay: i * staggerDelay }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

    
      <div className="absolute inset-0">
        {text.map((char, i) => (
          <motion.span
          key={`back-${i}`}
          variants={backVariants}
          transition={{ ease: "easeInOut", duration: 0.3, delay: i * staggerDelay }}
          className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

    </motion.div>
  );
}
