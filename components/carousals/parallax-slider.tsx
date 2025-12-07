'use client';

import { motion } from 'motion/react';
import { FreeMode, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '@/lib/cn';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/parallax';

interface ImageProps {
  src: string;
}

interface ParallaxSliderProps {
  images: ImageProps[];
  className?: string;
}

export function ParallaxSlider({ images, className }: ParallaxSliderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(' ml-[1rem] max-w-[calc(100%-2rem)] h-[400px]', className)}
    >
      <style>{`
         .ParallaxSliderSwiper {
           width: 100%;
           height: 100%          
         }
    
         .ParallaxSliderSwiper .swiper-slide {
           background-position: center;
           background-size: cover;
           width: 300px;
         }
         `}</style>

      <Swiper
        modules={[FreeMode, Parallax]}
        slidesPerView="auto"
        centeredSlides={true}
        parallax={true}
        freeMode={true}
        spaceBetween={20}
        grabCursor={true}
        className="ParallaxSliderSwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className=" relative overflow-hidden ">
            <div
              className="absolute inset-0 bg-cover scale-[1.6] bg-center w-[300px]"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
              data-swiper-parallax="-20%"
            ></div>
            <motion.div
              transition={{ delay: 0.5 }}
              className="absolute inset-0 z-10 w-[350px] pointer-events-none "
              data-swiper-parallax="0"
            ></motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
