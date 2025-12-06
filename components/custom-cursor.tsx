

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 , delay : 0.1 }}
          style={{ 
            position: "fixed",
            top: mousePos.y,
            left: mousePos.x,
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none", // allow clicks through cursor
            transform: "translate(-50%, -50%)", // center on mouse
            zIndex: 9999,
          }}
        >
          drag
        </motion.div>
      )}
    </AnimatePresence>
  );
}
