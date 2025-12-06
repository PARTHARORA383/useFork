'use client';

import {  CenterFocusSwiper } from '@/components/carousals/card-carousal';
import { Introduction } from '@/components/introduction';
import { TextHoverMarquee, TextMarquee } from '@/components/text-hover-marquee';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  { src: "/images/usefork3.jpeg" },
  { src: "/images/usefork2.jpeg" },
  { src: "/images/usefork3.jpeg" },
  { src: "/images/usefork2.jpeg" },
  { src: "/images/usefork3.jpeg" },
  { src: "/images/usefork2.jpeg" },
  { src: "/images/usefork3.jpeg" },
];


const testimonials = [
  {
    name: "Alice Johnson",
    role: "CEO – NovaTech",
    message:
      "This platform transformed the way our team collaborates. Productivity has never been higher!",
    image: "/images/usefork3.jpeg",
  },
  {
    name: "Bob Smith",
    role: "CTO – CloudCore",
    message:
      "The performance and stability are exceptional. It integrates seamlessly with our workflow.",
    image: "/images/avatars/2.jpg",
  },
  {
    name: "Carol Williams",
    role: "Lead Designer – PixelForge",
    message:
      "The UI/UX is outstanding. Clean, elegant, and thoughtfully designed. I love using it daily!",
    image: "/images/avatars/3.jpg",
  },
  {
    name: "David Lee",
    role: "Marketing Head – GrowthLabs",
    message:
      "Our campaigns became drastically more efficient. Clients love the results we're getting.",
    image: "/images/avatars/4.jpg",
  },
  {
    name: "Emma Brown",
    role: "Software Engineer – CodeSphere",
    message:
      "Super smooth performance, intuitive interface, and great customer support. Highly recommended!",
    image: "/images/avatars/5.jpg",
  },
  {
    name: "Frank Wilson",
    role: "Product Manager – InnovateX",
    message:
      "Amazing flexibility and customization options. It fits our product pipeline perfectly.",
    image: "/images/avatars/6.jpg",
  },
  {
    name: "Grace Taylor",
    role: "HR Manager – PeopleFirst",
    message:
      "It simplified onboarding and internal communication dramatically. Our team is more aligned now.",
    image: "/images/avatars/7.jpg",
  },
];



export default function TestPage() {
  return (
    <>
      <div className="flex items-center justify-center mt-8">
        {/* <CardCarousal testimonials={testimonials} /> */}
        <CenterFocusSwiper images={images} />
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
