'use client';

import { gsap } from 'gsap';
import Image from 'next/image';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Greetings } from '@/components/greetings';
import { HeroHeader, HeroCTA } from '@/components/landing/HeroSection';
import { CustomNavbar } from '@/components/navbar';
import { SpotlightWordmark } from '@/components/landing/footer';
import { ComponentsSection } from '@/components/landing/componens-section';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const greetings = ['Hey,', 'Hola', 'Bonjour', 'Ciao', 'Namaste', 'Ni hoa', 'こんにちは'];

export default function HomePage() {
  return (
    <div className="bg-muted2 relative  fixed inset-0 no-scrollbar h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] border rounded-xl space-y-4 overflow-y-scroll">
      <section className="group relative flex min-h-[calc(100vh-1rem)] flex-col justify-center overflow-hidden">
        <Image
          src="/Images/clouds.png"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover opacity-85"
        />

        <div className="relative z-10">
          <HeroHeader />
          <HeroCTA />
        </div>
      </section>

      <section className="group flex min-h-[calc(100vh-1rem)] flex-col justify-center">
        <ComponentsSection />
      </section>
    </div>
  );
}