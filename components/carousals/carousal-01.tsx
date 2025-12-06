'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import React, {SetStateAction, useState } from 'react';

interface ImageProps {
  src: string;
}

interface CenterFocusSwiperProps {
  images: ImageProps[];
  className?: string;
  loop?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
}

export function Carousal01({
  images,
  className,
  loop = true,
  pagination = true,
  autoplay = false,
}: CenterFocusSwiperProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [ showLoader , setShowLoader ] = useState(true)
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

        {showLoader &&
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-muted2">
            <div className="border border-t-transparent w-6 h-6 rounded-full animate-spin" />
          </div>
        }
        
      <Swiper
        modules={[EffectCreative, Pagination, Autoplay]}
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
        autoplay={
          autoplay
            ? {
              delay: 1500,
              disableOnInteraction: false,
            }
            : false
        }
        centeredSlides={true}
        loop={loop}
        grabCursor={true}
        spaceBetween={0}
        pagination={
          pagination
            ? {
              el: '.custom-pagination',
              clickable: true,
            }
            : false
        }
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="CenterFocusSwiper"
      >
        

        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageCard src={image.src} index={index} activeIndex={activeIndex} showLoader = {showLoader} setShowLoader = {setShowLoader} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-8 flex justify-center"></div>
    </motion.div>
  );
}

interface ImageCardProps {
  src: string;
  index: number;
  activeIndex: number;
  showLoader : boolean,
  setShowLoader : React.Dispatch<SetStateAction<boolean>>
}

export function ImageCard({ src, index, activeIndex , showLoader , setShowLoader }: ImageCardProps) {
  const isActive = index === activeIndex;

  const [isHovered, setIsHovered] = useState(false);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        filter: index == activeIndex ? 'blur(0px)' : 'blur(4px)',
        rotateX: isActive ? 0 : index * -0.5,
      }}
      transition={{ duration: 0.3 }}
      className=" relative shadow-lg  overflow-hidden transform-gpu w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <img src={src} alt="" onLoad = {()=>setShowLoader(false)} className=" absolute w-full h-full object-cover" />
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
