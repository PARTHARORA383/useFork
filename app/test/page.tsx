'use client';

import { Carousal01 } from '@/components/carousals/carousal-01';

import { motion, AnimatePresence } from 'motion/react';
import { ParallaxSlider } from '@/components/carousals/parallax-slider';
import { useState } from 'react';
import { HoldRevealButton, HoldRevealButtonOverlay } from '@/components/buttons/hold-reveal-button';

const images = [
  { src: '/images/usefork20.jpg' },
  { src: '/images/usefork12.jpg' },
  { src: '/images/usefork11.jpg' },
  { src: '/images/usefork9.jpg' },
  { src: '/images/usefork8.jpg' },
];

export default function TestPage() {
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        <HoldRevealButton >
          <HoldRevealButtonOverlay />
        </HoldRevealButton>
      </div>
    </>
  );
}

interface AnimatedTextProps {
  text: string;
  image: string;
}

function AnimatedText({ text, image }: AnimatedTextProps) {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="text-9xl font-medium bg-cover bg-center text-transparent bg-clip-text"
      style={{ backgroundImage: `url(${image})` }}
    >
      {text}
    </motion.h1>
  );
}


function ClipPathButton() {

  const [isHolding, setIsHolding] = useState(false);

  return (
    <div>

      <button
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onMouseLeave={() => setIsHolding(false)}
        className='relative   rounded-full p-2 px-5 overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200 shadow-[0_8px_20px_rgba(255,255,255,0.15)_inset,0_4px_30px_rgba(0,0,0,0.3)]
backdrop-blur-md flex items-center gap-2'>

        <div className='absolute inset-0 p-2 px-5 text-white bg-red-400 transition-[clip-path] duration-1000 linear flex items-center gap-2 justify-center'
          style={{
            clipPath: isHolding ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
          }}
        >
          <TrashedButton />
          Hold the button

        </div>
        <TrashedButton />
        Hold the button
      </button>
    </div>
  )
}

function TrashedButton() {
  return (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
        fill="currentColor"
      />
    </svg>
  );
}

// import { useRef } from "react";

// export  function ParallaxCard({ image }) {
//   const bgRef = useRef(null);

//   const handleMove = (e) => {
//     const movement = e.movementX;
//     if (bgRef.current) {
//       bgRef.current.style.transform = `translateX(${movement * 0.3}px)`; // slower drift
//     }
//   };

//   return (
//     <motion.div
//       transition={{type : 'spring', stiffness: 300, damping: 30}}
//       className="relative overflow-hidden w-[500px] h-[450px] "
//       onMouseMove={handleMove}
//     >
//       <motion.img
//       transition={{type : 'spring' , damping : 200, duration : 0.3 , delay : 0.3}}
//         ref={bgRef}
//         src={'/Images/usefork7.jpeg'}
//         className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
//       />
//     </motion.div>
//   );
// }


// export function StairsLoader() {
//   const [activeId, setActiveId] = useState(0);
//   const [showLoader, setShowLoader] = useState(true);
//   const [exitParts, setExitParts] = useState(false);

//   const texts = ['WHERE', 'DESIGN', 'MEETS', 'DEVELOPMENT'];

//   const imageUrl = 'https://i.pinimg.com/1200x/15/29/de/1529dec3f7e010bd71a3b02f4fe9e156.jpg';

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveId((prev) => {
//         if (prev >= texts.length - 1) {
//           clearInterval(interval);
//           setExitParts(true);
//           return prev;
//         }
//         return prev + 1;
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const parts = Array.from({ length: 5 });

//   return (
//     <AnimatePresence>
//       {showLoader && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 w-screen h-screen  flex bg-muted z-50"
//         >
//           {parts.map((_, index) => (
//             <motion.div
//               key={index}
//               initial={{ y: 0 }}
//               animate={{ y: exitParts ? '-100%' : 0 }}
//               transition={{
//                 duration: 0.4,
//                 ease: 'easeInOut',
//                 delay: exitParts ? index * 0.2 : 0,
//               }}
//               onAnimationComplete={() => {
//                 if (exitParts && index === parts.length - 1) {
//                   setShowLoader(false);
//                 }
//               }}
//               className="relative  bg-muted2 flex-1 h-full"
//             />
//           ))}
//           {/*
//             <div className="absolute  inset-0 w-full h-full flex items-center justify-center">
//             <AnimatedText text={texts[activeId]} image={imageUrl} />
//           </div> */}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
