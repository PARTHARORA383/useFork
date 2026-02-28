'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bebas_Neue } from 'next/font/google';
import { useState } from 'react';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' });

function HeroHeader() {
  return (
    <div className="">
      <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 1, y: '120%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-9xl font-medium"
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
          className="text-9xl font-medium"
          style={{ fontFamily: bebasNeue.style.fontFamily }}
        >
          For Bold{' '}
          <span className="bg-gradient-to-r from-[var(--color-purple-200)] to-[var(--color-purple-300)] bg-clip-text text-transparent">
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
      className="flex gap-4"
    >
      {/* Documentation Button */}
      <DocumentationButton />
      <ComponentButton />
    </motion.div>
  );
}

function DocumentationButton() {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href="/docs"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative rounded-full p-2 px-5 overflow-hidden bg-muted3 cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center"
    >
      {/* Base Text */}
      <span className="text-foreground/80">Documentation</span>

      {/* Reveal Layer */}
      <div
        className="absolute inset-0 p-2 px-5 transition-[clip-path] duration-700 ease-out flex items-center justify-center"
        style={{
          clipPath: isHover ? 'ellipse(150px 150px at 10% 50%)' : 'ellipse(0px 0px at 0% 50%)',
        }}
      >
        <span className="text-foreground">Documentation</span>
      </div>
    </Link>
  );
}

function ComponentButton() {
  const [isHover, setIsHover] = useState(false);
  return (
    <div>
      <a
        href="https://github.com/PARTHARORA383/useFork"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative rounded-full p-2 px-5 overflow-hidden bg-foreground/90 text-background cursor-pointer active:scale-95 transition-transform duration-200 flex items-center justify-center"
      >
        {/* Base Text */}
        <span className="text-background/80">Star us on GitHub</span>

        {/* Reveal Layer */}
        <div
          className="absolute inset-0 p-2 px-5 bg-gradient-to-r from-[var(--color-purple-300)] to-[var(--color-purple-400)] transition-[clip-path] duration-700 ease-out flex items-center justify-center"
          style={{
            clipPath: isHover ? 'ellipse(150px 150px at 50% 100%)' : 'ellipse(0px 0px at 0% 50%)',
          }}
        >
          <span className="text-foreground">Star us on GitHub</span>
        </div>
      </a>
    </div>
  );
}

export { HeroHeader, HeroCTA };
