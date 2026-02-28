'use client';

import Link from 'next/link';
import { motion, AnimatePresence, Variant, Variants, number } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Bebas_Neue } from 'next/font/google';
import { TableOfContents } from 'lucide-react';

const inter = Inter({
  subsets: ['latin'],
});
const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400', preload: false });

type Direction = 'top' | 'right' | 'left' | 'bottom';

const tooltipVariants: Record<Direction, Variants> = {
  top: {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 8, opacity: 0 },
  },
  bottom: {
    initial: { y: -8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -8, opacity: 0 },
  },
  left: {
    initial: { x: 8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 8, opacity: 0 },
  },
  right: {
    initial: { x: -8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -8, opacity: 0 },
  },
};

export function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Documentation', href: '/docs' },
  ];

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      animate={{
        width: isOpen ? 600 : 420,
        height: isOpen ? 180 : 44,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-7 left-1/2 -translate-x-1/2
        rounded-3xl border bg-muted3 z-20
        px-6 overflow-hidden cursor-pointer"
    >
      {/* Top Row */}
      <div className="flex items-center h-11">
        <h1 className="font-medium">USEFORK</h1>
      </div>

      {/* Always mounted — just animate */}
      <motion.div
        initial={false}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.2,
        }}
        className="flex flex-col gap-3 mt-4  pointer-events-auto"
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {links.map((item, i) => (
          <motion.div
            key={item.label}
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.25 + i * 0.08,
            }}
            style={{ fontFamily: bebasNeue.style.fontFamily }}
          >
            <Link
              href={item.href}
              className="text-5xl font-medium text-foreground/80 hover:text-purple-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setHovered(false);
        }}
        className={cn(
          'absolute top-1.5 right-2 h-8 w-8 rounded-full border bg-muted3  flex items-center justify-center cursor-pointer p-2',
        )}
      >
        <TableOfContents />
        {/* Tooltip */}
      </motion.div>
    </motion.div>
  );
}
