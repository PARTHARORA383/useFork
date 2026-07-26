import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';
import { AppleCarouselDemo } from '@/components/demo/apple-carousel-demo';
import { OrbDemo } from '@/components/demo/cloud-orb-usage';
import { CloudOrbDemo } from '@/components/demo/cloud-orb-demo';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' });

export default function TestPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <CloudOrbDemo/>
    </div>
  );
}