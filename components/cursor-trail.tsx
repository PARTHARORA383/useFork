'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorTrail() {
  const images = [
    '/gradient2.png',
    '/gradient2.png',
    '/gradient2.png',
    '/gradient2.png',
    '/gradient2.png',
  ]; // your images

  const [currentImages, setCurrentImages] = useState<
    { id: number; x: number; y: number; src: string }[]
  >([]);

  let index = 0; // cycles through images in order

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nextImage = images[index % images.length];
      index++;

      const newEntry = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        src: nextImage,
      };

      setCurrentImages((prev) => {
        const updated = [...prev, newEntry];

        // keep only last 4
        if (updated.length > 4) updated.shift();

        return updated;
      });
    };

    window.addEventListener('mousemove', handleMove);

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {currentImages.map((img, i) => (
        <motion.img
          key={img.id}
          src={img.src}
          className="fixed pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1 - i * 0.2,
            scale: 1 - i * 0.05,
            x: img.x,
            y: img.y,
            transition: { duration: 0.18 },
          }}
          style={{
            width: 40,
            height: 40,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}
