"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Portal } from "./portal-component";
import { cn } from "@/lib/cn";

export default function HoverCursor({ children, className , color , text }: { children: ReactNode, className?: string , color? : string  , text ?: string}) {
  const [active, setActive] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const CIRCLE_SIZE = 60
  // Position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth trailing motion
  const smoothX = useSpring(mouseX, {
    stiffness: isMoving ? 150 : 800,
    damping: isMoving ? 20 : 40,
  });
  const smoothY = useSpring(mouseY, {
    stiffness: isMoving ? 150 : 800,
    damping: isMoving ? 20 : 40,
  });


  useEffect(() => {
    

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    setIsMoving(true);

   const timeout = setTimeout(() => setIsMoving(false), 100); // 0.1s after stop
    clearTimeout(timeout);


    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [active]);

  const handleMouseOut = () => {
    setActive(false)
  }

  const handleMouseOver = () => {
    setActive(true)
  }

  return (
    <div>
      <div
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
      >
        {children}
      </div>

      <AnimatePresence>
        {active && (
          <Portal>
            <motion.div
              key="cursor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                `fixed z-[999] flex items-center justify-center text-sm  rounded-full pointer-events-none`,
                className
              )}
              style={{
                x: smoothX,
                y: smoothY,
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
        
                backgroundColor : color ?? "#6366f1"
              }}
            >
              {/* MAIN TEXT */}
              {text ?? "Drag"}

              {/* LEFT SMALL CIRCLE */}
              <div
                className="absolute rounded-full"
                style={{
                  width: CIRCLE_SIZE * 0.15,
                  height: CIRCLE_SIZE * 0.15,
                  left: -CIRCLE_SIZE * 0.25,
                  top: "50%",
                  transform: "translateY(-50%)",
                   backgroundColor : color ?? "#6366f1"
                }}
              />

              {/* RIGHT SMALL CIRCLE */}
              <div
                className="absolute  rounded-full"
                style={{
                  width: CIRCLE_SIZE * 0.15,
                  height: CIRCLE_SIZE * 0.15,
                  right: -CIRCLE_SIZE * 0.25,
                  top: "50%",
                  transform: "translateY(-50%)",
                   backgroundColor : color ?? "#6366f1"
                }}
              />
            </motion.div>

          </Portal>
        )}
      </AnimatePresence>

    </div>

  );
}
