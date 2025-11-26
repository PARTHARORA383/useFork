'use client';

import { motion } from 'motion/react';

export function CookingTimer() {
  return <div></div>;
}

export function CookingBeacon() {
  return (
    <div className="relative w-[128px] h-[128px] border-2 border-t-transparent rounded-b-lg overflow-hidden bg-transparent">
      <svg className="absolute bottom-0 w-[200%] h-[70%]" viewBox="0 0 1440 320">
        <motion.path
          fill="url(#waveGradient)"
          d="M0,160 C150,200 300,120 450,150 C600,180 750,260 900,240 C1050,220 1200,140 1350,160 L1440,320 L0,320 Z"
          animate={{
            x: ['0%', '-25%', '0%'],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <defs>
          <linearGradient id="waveGradient" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
