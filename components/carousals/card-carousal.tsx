"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  Virtual,
  EffectCreative,
  EffectCards,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useState } from "react";

interface ImageProps {
  src: string;
}

interface CenterFocusSwiperProps {
  images: ImageProps[];
  className?: string;
}

export function CenterFocusSwiper({ images, className }: CenterFocusSwiperProps) {

  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-[400px] px-5 py-4 h-[400px] ${className}`}
    >

      <style>{`
        .CenterFocusSwiper {
          width: 100%;
          height: 100%          
        }

        .CenterFocusSwiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
        }
      `}</style>

      <Swiper
        modules={[EffectCreative, Pagination]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: ['-120%', 0, -500],
            rotate: [0, 0, -20],
            opacity: 1,
          },
          next: {
            translate: ['120%', 0, -500],
            rotate: [0, 0, 20],
            opacity: 1,
          },
        }}
        centeredSlides={true}
        loop={true}

        grabCursor={true}
        spaceBetween={0}

        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}


        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="CenterFocusSwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageCard src={image.src} index={index} activeIndex={activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-8 flex justify-center"></div>
    </motion.div>
  );
}

interface ImageCardProps {
  src: string;
  index: number,
  activeIndex: number
}

export function ImageCard({ src, index, activeIndex }: ImageCardProps) {

  const isActive = index === activeIndex

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, filter: index == activeIndex ? 'blur(0px)' : 'blur(4px)', rotateX: isActive ? 0 : index * -0.5 }}
      transition={{ duration: 0.3 }}
      className=" relative shadow-lg  overflow-hidden transform-gpu w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt="" className=" absolute w-full h-full object-cover"

      />


      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: activeIndex === index ? '100%' : '0%',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 dark:bg-[#161616] bg-[#fcfcfc] mix-blend-saturation"
      />

    </motion.div>
  );
}
