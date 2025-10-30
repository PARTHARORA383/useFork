'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/cn';

export function InfiniteScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arr = Array.from({ length: 20 }, (_, i) => i + 1);

  // Each item’s total height = h-10 + margin (≈ 48px)
  const ITEM_HEIGHT = 48;

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault(); // stop default free scroll
    const container = containerRef.current;
    if (!container) return;

    // Determine direction
    const direction = e.deltaY > 0 ? 1 : -1;

    // Scroll exactly one item height
    container.scrollBy({
      top: direction * ITEM_HEIGHT,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-lg font-semibold mb-4">🎡 Wheel Picker</h1>

      <div className="relative">
        <div
          ref={containerRef}
          onWheel={handleScroll}
          className=" h-60 w-32 overflow-y-scroll no-scrollbar bg-gray-100 rounded-2xl border scroll-smooth"
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-muted2/20  rounded-md pointer-events-none z-20" />

          {arr.map((num, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-center h-10 my-1 rounded-lg transition-all duration-300 text-background',
              )}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
