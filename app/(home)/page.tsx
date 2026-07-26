import Image from 'next/image';
import { HeroHeader, HeroCTA } from '@/components/landing/HeroSection';
import { ComponentsSection } from '@/components/landing/componens-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="bg-muted2 relative fixed inset-0 no-scrollbar h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] border rounded-xl space-y-4 overflow-y-scroll">
      <section className="group relative flex min-h-[calc(100vh-1rem)] flex-col justify-center overflow-hidden">
        <Image
          src="/images/clouds.png"
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

      <section>
        <Footer/>
      </section>

    </div>
  );
}