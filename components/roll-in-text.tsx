'use client';

import { cn } from '@/lib/cn';
import { motion } from 'motion/react';

interface RollInTextProps {
  children: string;
  className?: string;
  rotateY?: number[] | string[];
  rotateX?: number[] | string[];
  y?: string[] | number[];
  x?: string[] | number[];
  delay?: number;
  duration?: number;
}

export function RollInText({
  children,
  className,
  rotateX,
  rotateY,
  y,
  x,
  delay,
  duration,
}: RollInTextProps) {
  const text = children.split('').map((char) => (char === ' ' ? '\u00A0' : char));

  return (
    <motion.div
      className={cn(`inline-block text-5xl`, className)}
      initial="hidden"
      whileInView="visible"
    >
      {text.map((char, index) => (
        <motion.span
          className=""
          key={index}
          style={{
            display: 'inline-block',
            perspective: '500px',
            overflow: 'hidden',
            height: '1em',
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: index * 0.1,
              },
            },
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{
              y: y ?? ['100%', '-100%', '0%'], // wheel-like motion
              x: x ?? 0,
              rotateX: rotateX ?? [0, 360, 0], // optional 3D flip
              rotateY: rotateY ?? 0,
            }}
            transition={{
              duration: duration ?? 1.4,
              ease: 'easeInOut',
              delay: delay ? index * delay : index * 0.05,
              repeatType: 'loop',
              repeat: 1,
            }}
          >
            {char}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}
