'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ImageProps {
  src: string;
}

interface Props {
  leftLane?: ImageProps[];
  rightLane?: ImageProps[];
  maxOffset?: number;
  imageWidth?: number;
  imageHeight?: number;
}

export function MouseParallaxImages({
  leftLane,
  rightLane,
  maxOffset = 40,
  imageWidth = 300,
  imageHeight = 400,
}: Props) {
  const topSrc = 'https://i.pinimg.com/736x/fa/2e/b8/fa2eb8fe7012d991cfb06b9ff58ebf2b.jpg';
  const bottomSrc = 'https://i.pinimg.com/1200x/28/ae/db/28aedb0c63b1cdf0739e90e08653af0b.jpg';
  const rightSrc = 'https://i.pinimg.com/1200x/58/85/d1/5885d1f6220c22bd6018c3451a3cc23d.jpg';
  const leftSrc = 'https://i.pinimg.com/736x/f7/38/ac/f738ace16139857c6bbb173120bc5b84.jpg';

  const left = leftLane ?? [{ src: topSrc }, { src: bottomSrc }];
  const right = rightLane ?? [{ src: leftSrc }, { src: rightSrc }];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const raw = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const smooth = useSpring(raw, {
    stiffness: 40,
    damping: 10,
  });

  const translateY = useTransform(smooth, (v) => -v * maxOffset);
  const reverseY = useTransform(smooth, (v) => v * maxOffset);

  function handleMouseMove(e: React.MouseEvent) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const norm = (y / rect.height - 0.5) * 2;
    raw.set(norm);
  }

  function handleMouseLeave() {
    raw.set(0);
    setActiveIndex(null);
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4"
      style={{ touchAction: 'pan-left' }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full flex items-center justify-center gap-12 overflow-hidden"
      >
        <motion.div className="flex flex-col gap-6 items-center">
          {left.map((item, index) => (
            <motion.div
              key={index}
              style={{ y: translateY }}
              className="flex flex-col gap-6 items-center "
            >
              <HoverImage
                src={item.src}
                index={index}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="flex flex-col gap-6 items-center">
          {right.map((item, index) => (
            <motion.div
              key={index}
              style={{ y: reverseY }}
              className="flex flex-col gap-6 items-center "
            >
              <HoverImage
                src={item.src}
                index={index}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface HoverImageProps {
  src: string;
  index: number;
  imageWidth: number;
  imageHeight: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

function HoverImage({
  src,
  index,
  imageHeight,
  imageWidth,
  activeIndex,
  setActiveIndex,
}: HoverImageProps) {
  return (
    <motion.div
      className="relative p-0 m-0 overflow-hidden shadow-lg "
      style={{ width: imageWidth, height: imageHeight }}
      onMouseEnter={() => setActiveIndex(index)}
    >
      {/* Image  */}
      <motion.img
        src={src}
        alt={`img-${index}`}
        className="absolute inset-0 p-0 m-0 h-full w-full object-cover transition-transform duration-700 ease-in-out"
      />

      {/* Overlay for the image */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: activeIndex === index ? '-100%' : '0%',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 dark:bg-[#161616] bg-[#fcfcfc] mix-blend-saturation"
      />
    </motion.div>
  );
}

//Creator - Partharora
//X - https://x.com/partharora9128
