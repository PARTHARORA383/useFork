'use client';

import { MouseParallaxImages } from '@/components/parallax-images';

export function MouseParallaxImagesDemo() {
  const left = [
    { src: 'https://i.pinimg.com/736x/fa/2e/b8/fa2eb8fe7012d991cfb06b9ff58ebf2b.jpg' },
    { src: 'https://i.pinimg.com/1200x/28/ae/db/28aedb0c63b1cdf0739e90e08653af0b.jpg' },
  ];

  const right = [
    { src: 'https://i.pinimg.com/736x/f7/38/ac/f738ace16139857c6bbb173120bc5b84.jpg' },
    { src: 'https://i.pinimg.com/1200x/58/85/d1/5885d1f6220c22bd6018c3451a3cc23d.jpg' },
  ];

  return (
    <div className="w-full h-full">
      <MouseParallaxImages leftLane={left} rightLane={right} />
    </div>
  );
}

//Creator - Parth Arora
//X - https://x.com/partharora9128

