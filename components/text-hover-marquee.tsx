'use client';
import { Anton } from 'next/font/google';
import { cn } from '@/lib/cn';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

const anton = Anton({ subsets: ['latin'], weight: ['400'] });

interface TextHoverMarqueeProps {
  heading: string;
  texts?: string[];
  textHeight?: number;
  marqueeDuration?: number;
}

export function TextHoverMarquee({
  heading,
  texts = ['Texas', 'California', 'States'],
  textHeight = 250,
  marqueeDuration = 24,
}: TextHoverMarqueeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-[100vw] mb-4">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'relative text-start cursor-default bg-amber-500 tracking-tight text-amber-50 bg-clip-text ',
          anton.className,
        )}
      >
        <span
          className="cursor-default "
          style={{
            fontSize: textHeight,
            lineHeight: '1',
            margin: 0,
            padding: 0,
            paddingLeft: 100,
          }}
        >
          {heading}
        </span>

        <AnimatePresence>
          {hovered && (
            <div>
              <TextMarquee
                texts={texts}
                textHeight={textHeight}
                marqueeDuration={marqueeDuration}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface TextMarqueeProps {
  texts: string[];
  className?: string;
  textHeight?: number;
  marqueeDuration?: number;
}

export function TextMarquee({
  texts,
  className,
  textHeight = 250,
  marqueeDuration = 24,
}: TextMarqueeProps) {
  return (
    <motion.div
      layout
      initial={{ height: 0 }}
      animate={{ height: '100%' }}
      exit={{ height: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className={cn(
        `flex items-center absolute bottom-0 overflow-hidden min-w-screen z-20 uppercase font-medium p-0 origin-bottom cursor-default bg-blue-700 text-amber-50 tracking-tight`,
        anton.className,
        className,
      )}
      style={{
        fontSize: textHeight,
        lineHeight: '1',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Loop 1 */}
      <motion.span
        className="flex whitespace-nowrap cursor-default"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          x: {
            duration: marqueeDuration,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        {texts.map((text, i) => (
          <motion.span
            key={i}
            className="flex whitespace-nowrap mx-10 cursor-default"
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            transition={{
              translateY: { duration: 0.3, ease: 'easeOut', delay: 0.2 },
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.span>

      {/* Loop 2 */}
      <motion.span
        className="flex whitespace-nowrap cursor-default"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          x: {
            duration: marqueeDuration,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      >
        {texts.map((text, i) => (
          <motion.span
            key={i}
            className="flex whitespace-nowrap mx-10 cursor-default"
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            transition={{
              translateY: { duration: 0.3, ease: 'easeOut', delay: 0.2 },
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}
