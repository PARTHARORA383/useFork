'use client';

import React, { HTMLAttributes, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface ImageData {
  title?: string;
  src: string;
}

interface CarousalProps extends HTMLAttributes<HTMLDivElement> {
  images?: ImageData[];
}

interface BannerSlidesProps extends HTMLAttributes<HTMLDivElement> {
  showBackground?: boolean; // default true
  showOverlay?: boolean; // default true
}

interface ActiveStateContextProps {
  data: ImageData[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  nextIndex: number;
  setNextIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ActiveStateContext = React.createContext<ActiveStateContextProps | undefined>(undefined);

export const useActiveContext = () => {
  const context = useContext(ActiveStateContext);
  if (!context) throw new Error('useActiveContext must be used inside BannerCarousal');
  return context;
};

export function BannerCarousal({ images, children, className }: CarousalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const defaultImages: ImageData[] = [
    {
      src: 'https://i.pinimg.com/736x/6d/2b/a8/6d2ba8add2b39bba3a630922bcbbfce5.jpg',
    },
    {
      src: 'https://i.pinimg.com/736x/b2/fb/20/b2fb20cd5286f15c7b4aeade50a948d1.jpg',
    },
    {
      src: 'https://i.pinimg.com/1200x/15/29/de/1529dec3f7e010bd71a3b02f4fe9e156.jpg',
    },
    {
      src: 'https://i.pinimg.com/1200x/22/46/c2/2246c21e61d756b8d6821e72799bf0e1.jpg',
    },
  ];

  const data = images && images.length > 0 ? images : defaultImages;

  // Active background change
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  // Next thumbnail preview
  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <ActiveStateContext.Provider
      value={{ data, activeIndex, setActiveIndex, nextIndex, setNextIndex }}
    >
      <div
        className={cn(
          'relative flex items-center justify-center h-full w-full overflow-hidden rounded-2xl shadow-lg',
          className,
        )}
      >
        {children}
      </div>
    </ActiveStateContext.Provider>
  );
}

/* Animated Carousel with overlay transforming into background */
export function BannerSlides({
  className,
  showBackground = true,
  showOverlay = true,
}: BannerSlidesProps) {
  const { data, activeIndex, nextIndex } = useActiveContext();

  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Background image (current activeIndex) */}
      {showBackground && (
        <AnimatePresence mode="wait">
          <motion.img
            key={data[activeIndex].src}
            src={data[activeIndex].src}
            alt={data[activeIndex].title}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </AnimatePresence>
      )}

      {/* Overlay preview (grows into next background) */}
      {showOverlay && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={data[nextIndex].src}
            className="absolute right-0 bottom-0 aspect-square w-full h-full rounded-xl overflow-hidden shadow-lg cursor-pointer origin-bottom-right"
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{
              scale: [0.3, 0.3, 1],
              opacity: [0.8, 1, 1],
              height: '100%',
              width: '100%',
              transition: {
                duration: 4.5,
                times: [0, 0.4, 1],
                ease: [0.45, 0, 0.55, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 1,
              transition: { duration: 0.5 },
            }}
          >
            <motion.img
              src={data[nextIndex].src}
              alt={data[nextIndex].title}
              initial={{ scale: 0.5, x: 100, opacity: 1 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full origin-right object-cover rounded-xl z-30"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
