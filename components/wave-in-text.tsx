'use client';

import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'motion/react';

interface WaveInTextProps {
  children: string;
  className?: string;
  duration?: number; // animation duration per character
  yOffset?: number; // vertical offset for entrance
  blurAmount?: number; // initial blur
  isVisible?: boolean; // control exit
}

export const WaveInText = ({
  children,
  className,
  duration = 0.5,
  yOffset = 18,
  blurAmount = 8,
  isVisible = true,
}: WaveInTextProps) => {
  const text =
    typeof children === 'string'
      ? children.split('').map((char) => (char === ' ' ? '\u00A0' : char))
      : [children];

  return (
    <AnimatePresence>
      {isVisible && (
        <span className={cn(`inline-block text-[17px]`, className)}>
          {text.map((char, index) => (
            <motion.span
              key={index}
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: yOffset, filter: `blur(${blurAmount}px)` }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: yOffset, filter: `blur(${blurAmount}px)` }}
              transition={{
                duration,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      )}
    </AnimatePresence>
  );
};
