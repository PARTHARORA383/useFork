'use client';


import { motion, AnimatePresence } from 'motion/react';

export default function TestPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {/* <CookingBeacon /> */}
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
