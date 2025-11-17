'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface LoaderProps {
  radius?: number;
}

export function LoaderCircle({ radius }: LoaderProps) {
  const DURATION = 8;
  const r = radius ?? 120;

  return (
    <div className="flex items-center justify-center">
      <motion.svg
        viewBox="0 0 384 384"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 overflow-visible rotate-[-90deg]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 2,
        }}
      >
        {/* 🌈 SKY GRADIENT */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />   {/* sky-500 */}
            <stop offset="100%" stopColor="#7dd3fc" /> {/* sky-300 */}
          </linearGradient>

          <linearGradient id="skyGradientSoft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bae6fd" />   {/* sky-200 */}
            <stop offset="100%" stopColor="#e0f2fe" /> {/* sky-100 */}
          </linearGradient>
        </defs>

        {/* 🔵 ACTIVE RING */}
        <motion.circle
          pathLength={360}
          fill="transparent"
          strokeWidth={24}
          cx={192}
          cy={192}
          r={r}
          stroke="url(#skyGradient)"
          strokeLinecap="round"
          strokeDashoffset={360}
          animate={{
            strokeDasharray: [
              '0 0 0 360 0 360',
              '0 0 270 90 270 90',
              '0 270 0 360 0 360',
              '0 270 270 90 270 90',
              '0 540 0 360 0 360',
              '0 180 0 360 0 360',
              '0 180 270 90 270 90',
              '0 450 0 360 0 360',
              '0 450 270 90 270 90',
              '0 90 270 90 270 90',
              '0 360 1 360 0 360',
            ],
            opacity: [0.9, 1, 0.85],
          }}
          transition={{
            duration: DURATION,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 🔵 SOFT BACK RING */}
        <motion.circle
          pathLength={360}
          fill="transparent"
          strokeWidth={32}
          cx={192}
          cy={192}
          r={r}
          stroke="url(#skyGradientSoft)"
          strokeLinecap="round"
          strokeDashoffset={360}
          animate={{
            strokeDasharray: [
              '0 20 320 40 320 40',
              '0 290 50 310 50 310',
              '0 290 320 40 320 40',
              '0 560 50 310 50 310',
              '0 200 50 310 50 310',
              '0 200 320 40 320 40',
              '0 470 50 310 50 310',
              '0 110 50 310 50 310',
              '0 110 320 40 320 40',
              '0 380 50 310 50 310',
              '0 380 320 40 320 40',
            ],
            opacity: [0.25, 0.45, 0.35],
          }}
          transition={{
            duration: DURATION,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
    </div>
  );
}
