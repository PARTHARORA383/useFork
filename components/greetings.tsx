'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DataProps {
  data: string[];
}

export function Greetings({ data }: DataProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const time = activeIndex === 0 ? 3500 : 300;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, time);

    return () => clearInterval(interval);
  }, [data.length, activeIndex]);

  return (
    <div className="playfair-display-400 text-[#0a0a0a] flex justify-center items-center  overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
          className="font-medium text-2xl md:text-3xl"
        >
          {data[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
