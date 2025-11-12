'use client';

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { motion, AnimatePresence, MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface ImageData {
  title?: string;
  src: string;
}

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  images?: ImageData[];
  children?: ReactNode;
}

const ani: MotionProps = {
  variants: {
    initial: (c: number) => ({
      transform: `translateX(${20 * (c === 1 ? 1 : -1)}px)`,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    animate: {
      transform: 'translateX(0px)',
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (c: number) => ({
      transform: `translateX(${-40 * (c === 1 ? 1 : -1)}px)`,
      opacity: 0,
      filter: 'blur(4px)',
    }),
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};

interface CarouselContextProps {
  images: ImageData[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  nextIndex: number;
  setNextIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselContext = createContext<CarouselContextProps | undefined>(undefined);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('useCarousel must be used inside <Expand> component');
  return context;
};

export function Expand({ images, className, children, ...props }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const defaultImages: ImageData[] = [
    {
      src: 'https://i.pinimg.com/736x/6d/2b/a8/6d2ba8add2b39bba3a630922bcbbfce5.jpg',
      title: 'Golden Dust',
    },
    {
      src: 'https://i.pinimg.com/736x/b2/fb/20/b2fb20cd5286f15c7b4aeade50a948d1.jpg',
      title: 'Whispering Bloom',
    },
    {
      src: 'https://i.pinimg.com/1200x/15/29/de/1529dec3f7e010bd71a3b02f4fe9e156.jpg',
      title: 'Ocean Veins',
    },
    {
      src: 'https://i.pinimg.com/1200x/22/46/c2/2246c21e61d756b8d6821e72799bf0e1.jpg',
      title: 'Twilight Serenity',
    },
  ];

  const data = images ?? defaultImages;

  useEffect(() => {
    if (!containerRef.current) return;

    imageRefs.current.forEach((img, i) => {
      gsap.set(img, { zIndex: data.length - i });
    });
  }, [data]);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % data.length;
    const currentImg = imageRefs.current[activeIndex];
    const nextImg = imageRefs.current[nextIndex];

    gsap.fromTo(
      nextImg,
      { x: 500, opacity: 1 },
      {
        x: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setActiveIndex(nextIndex),
      },
    );
  };

  return (
    <CarouselContext.Provider
      value={{
        images: data,
        activeIndex,
        setActiveIndex,
        nextIndex,
        setNextIndex,
        direction,
        setDirection,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative flex flex-col items-start ml-4 justify-center overflow-hidden rounded-2xl',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
export function CarouselImage() {
  const { images, activeIndex, direction } = useCarousel();

  return (
    <div className="relative w-[500px] h-[500px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait" initial={false}>
        {images.map((img, index) =>
          index === activeIndex ? (
            <motion.img
              key={index} // key changes when activeIndex changes
              src={img.src}
              custom={direction}
              variants={{
                initial: (dir: number) => ({
                  x: dir === 1 ? 500 : -500, // slide in from right or left
                  opacity: 0,
                  zIndex: 20, // ensure incoming image is on top
                }),
                animate: {
                  x: 0,
                  opacity: 1,
                  zIndex: 20,
                },
                exit: (dir: number) => ({
                  x: dir === 1 ? -500 : 500, // old image slides out opposite
                  opacity: 0,
                  zIndex: 10, // keep old image under incoming
                }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
          ) : null,
        )}
      </AnimatePresence>
    </div>
  );
}

export function CarouselTitle({ className }: HTMLAttributes<HTMLHeadingElement>) {
  const { images, activeIndex, direction } = useCarousel();

  return (
    <motion.div className=" text-white text-2xl italic font-light">
      <AnimatePresence mode="wait">
        <motion.h1
          key={images[activeIndex].title}
          custom={direction}
          {...ani}
          transition={{ duration: 0.6 }}
          className={cn('text-center drop-shadow-lg', className)}
        >
          {images[activeIndex].title}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}

export function CarouselControls() {
  const { images, setActiveIndex, setDirection, setNextIndex, nextIndex } = useCarousel();

  const handleNext = () => {
    setDirection(1);
    setNextIndex((prev) => (prev + 1) % images.length);
    const interval = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 0);

    return () => clearInterval(interval);
  };

  const handlePrev = () => {
    setDirection(0);
    setNextIndex((prev) => (prev - 1 + images.length) % images.length);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className=" flex  gap-4 px-4 z-10">
      <ChevronButton onClick={handlePrev}>
        <ChevronLeft className="w-6 h-6" />
      </ChevronButton>
      <ChevronButton onClick={handleNext}>
        <ChevronRight className="w-6 h-6" />
      </ChevronButton>
    </div>
  );
}

interface ChevronButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
}

export function ChevronButton({ children, className, onClick, ...props }: ChevronButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
