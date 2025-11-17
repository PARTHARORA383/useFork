'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { RollInText } from '@/components/roll-in-text';
import { InfiniteScroll } from '@/components/infinite-number-scroll';
import { WheelPickerDemo } from '@/components/wheel-picker-demo';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Greetings } from '@/components/greetings';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const greetings = ['Hey,', 'Hola', 'Bonjour', 'Ciao', 'Namaste', 'Ni hoa', 'こんにちは'];

export default function HomePage() {
  return (
    <div className="relative flex py-48 md:-py-0 md:items-center justify-center rounded-2xl  bg-amber-50 h-[calc(100vh-1.5rem)] w-[calc(100vw-1rem)] px-4 lg:px-0">
      <div className=" flex flex-col items-start gap-2">
        <Navbar />
        <Greetings data={greetings} />
        <HeroHeader />
        <HeroButton />

        <div className="fixed bottom-5 right-8">
          <Link
            href="/"
            className="text-[#737373] hover:text-[var(--color-blue-500)] transition-colors"
          >
            Creator - Partharora
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroHeader() {
  return (
    <div className="max-w-2xl leading-8 ">
      <div className="text-2xl pb-1 text-[#0a0a0a] delius-swash-caps-regular">
        <WaveInText className=" text-xl md:text-2xl" duration={0.3}>
          bridging the gap between design and development -
        </WaveInText>
      </div>
      <div className="text-xl md:text-2xl leading-8 text-[#737373]">
        The website is a collection of cool{' '}
        <span className="delius-swash-caps-regular text-[#0a0a0a]">designer components</span>{' '}
        reimagined from the web for shadcn ui.
      </div>
    </div>
  );
}

import { FiArrowRight } from 'react-icons/fi'; // Using react-icons for the arrow
import Link from 'next/link';
import { WaveInText } from '@/components/wave-in-text';

function HeroButton() {
  return (
    <div className="flex items-center justify-start gap-6">
      <Link href={'/docs'}>
        <button className="cursor-pointer flex items-center gap-2 border border-[#0a0a0a]  text-[#0a0a0a] px-5 py-1.5 rounded-3xl font-medium overflow-hidden relative mt-2 group hover:text-[var(--color-blue-500)] transition">
          <span className="text-[17px] ">Docs</span>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            <FiArrowRight size={20} />
          </span>
        </button>
      </Link>
      <Link href={'/docs'}>
        <button className="cursor-pointer flex items-center gap-2 border border-[#0a0a0a]  text-[#0a0a0a] px-5 py-1.5 rounded-3xl font-medium overflow-hidden relative mt-2 group hover:text-[var(--color-blue-500)] transition">
          <span className="text-[17px] ">Components</span>
        </button>
      </Link>
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed top-6 left-0 min-w-[768px] w-full border rounded-xl h-16 z-50 flex items-center justify-between px-8">
      {/* Logo */}
      <h1 className="text-[#0a0a0a] text-2xl font-medium delius-swash-caps-regular">useFork</h1>

      {/* Links */}
      <div className="flex gap-6">
        <Link
          href="/docs"
          className="text-gray-800 hover:text-[var(--color-blue-500)] transition-colors"
        >
          Docs
        </Link>
        <Link
          href="/docs"
          className="text-gray-800 hover:text-[var(--color-blue-500)]  transition-colors"
        >
          Components
        </Link>
        <a
          href="https://github.com/Partharora383/useFork"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-[var(--color-blue-500)]  transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
