import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' });

export default function TestPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/clouds.png"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover opacity-85"
      />

      <h1
        className="relative z-10 text-5xl font-medium text-center"
        style={{ fontFamily: bebasNeue.style.fontFamily }}
      >
        USEFORK.DEV
      </h1>
    </div>
  );
}