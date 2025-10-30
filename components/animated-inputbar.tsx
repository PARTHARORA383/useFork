'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { motion, cubicBezier } from 'motion/react';

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: cubicBezier(0.4, 0, 0.2, 1), // ✅ correct type
};

export interface AnimatedInputBarProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
}

export function AnimatedInputBar({
  value,
  onChange,
  label = 'Label',
  className,
}: AnimatedInputBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const val = value ?? internalValue;

  const isFloating = isFocused || val.length > 0;

  return (
    <div className={`relative w-fit ${className}`}>
      {/* Input field */}
      <Input
        value={val}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFloating ? `Enter your ${label}` : ''}
        className="relative 
                   border border-gray-300 rounded-md px-3 py-2
                   transition-all duration-300 ease-in-out transform
                   focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Animated floating label */}
      <motion.label
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm z-20  px-1 text-foreground 
                   pointer-events-none rounded-sm"
        animate={
          isFloating
            ? {
                y: -20,
                scale: 0.85,
                color: '#3b82f6', // blue-500
              }
            : {
                y: 0,
                scale: 1,
                color: '#6b7280', // gray-500
              }
        }
        transition={LABEL_TRANSITION}
      >
        {label}
      </motion.label>
    </div>
  );
}
