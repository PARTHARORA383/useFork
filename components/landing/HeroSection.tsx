'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' });

function HeroHeader() {
  return (
    <div className="">
      <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 1, y: '120%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl font-medium text-center"
          style={{ fontFamily: bebasNeue.style.fontFamily }}
        >
          Design Led Components
        </motion.div>
      </div>
      <div className=" overflow-hidden">
        <motion.div
          initial={{ opacity: 1, y: '120%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl font-medium text-center"
          style={{ fontFamily: bebasNeue.style.fontFamily }}
        >
          For Bold{' '}
          <span className="bg-gradient-to-r from-[var(--color-purple-200)] to-[var(--color-purple-300)] bg-clip-text text-white">
            Interfaces
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center gap-4 mt-2"
    >
      <Link
        href="/docs"
        className="rounded-full px-4 py-1.5 text-sm font-medium bg-foreground text-background cursor-pointer active:scale-95 transition-transform duration-200 hover:opacity-90"
      >
        Get Started
      </Link>

      <Link
        href="/components"
        className="rounded-full px-4 py-1.5 text-sm font-medium bg-muted3 text-foreground/80 cursor-pointer active:scale-95 transition-transform duration-200 hover:text-foreground"
      >
        View All Components
      </Link>
    </motion.div>
  );
}

export { HeroHeader, HeroCTA };