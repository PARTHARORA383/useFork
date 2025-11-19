'use client';

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front?: React.ReactNode;
  back?: React.ReactNode;
  className?: string;
  defaultFrontImage?: string;
  defaultHeading?: string;
  defaultQuote?: string;
  defaultBrand?: string;
}

export function FlipCardOnHover({
  front,
  back,
  className,
  defaultFrontImage = "https://framerusercontent.com/images/GKmCpxDWc2mPXeyMGaJrcYyps.png?width=1920&height=2400",
  defaultHeading = "Welcome to Our Journey",
  defaultQuote = "useFork began as a simple idea — to bridge the gap between design and development, so creators could spend less time fighting UI and more time building what matters.",
  defaultBrand = "useFork",
}: FlipCardProps) {


  const useFlipRotation = () => {
    const [rotation, setRotation] = useState(0);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      setRotation(mouseX < rect.width / 2 ? 180 : -180);
    };

    const handleMouseLeave = () => setRotation(0);

    return { rotation, handleMouseEnter, handleMouseLeave };
  };

  const { rotation, handleMouseEnter, handleMouseLeave } = useFlipRotation();


  const defaultFront = (
    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
      <span className="absolute z-10 text-center font-serif px-5 text-[18px] top-3 text-white">
      <span>If the dream doesn&apos;t scare you, it&apos;s too small.</span>

      </span>

      <img
        src={defaultFrontImage}
        alt="Front"
        className="w-full h-full object-cover rounded-xl"
      />

      <div className="absolute bottom-2 z-10 font-medium left-1/2 -translate-x-1/2 text-white">
        {defaultBrand}
      </div>
    </div>
  );

  const defaultBack = (
    <div className="w-full h-full bg-amber-50 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <p className="font-serif font-medium text-black mb-2">
          {defaultHeading}
        </p>
        <p className="font-serif font-medium text-black">{defaultQuote}</p>
      </div>

      <p className="font-medium text-black text-center">{defaultBrand}</p>
    </div>
  );

  return (
    <div className={cn("w-xs h-[400px] perspective-[1200px]", className)}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative w-full h-full 
          rounded-xl 
          [transform-style:preserve-3d]
          will-change-transform
        "
      >
   
        <motion.div
          className="
            absolute inset-0 w-full h-full 
            [backface-visibility:hidden]
          "
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          {front ?? defaultFront}
        </motion.div>

  
        <motion.div
          className="
            absolute inset-0 w-full h-full 
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
          "
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          {back ?? defaultBack}
        </motion.div>
      </motion.div>
    </div>
  );
}
