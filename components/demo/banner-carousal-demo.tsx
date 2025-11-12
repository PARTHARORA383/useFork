'use client';

import { BannerSlides, BannerCarousal } from '@/components/carousals/banner-carousal';

const data = [
  {
    src: 'https://i.pinimg.com/736x/6d/2b/a8/6d2ba8add2b39bba3a630922bcbbfce5.jpg',
  },
  {
    src: 'https://i.pinimg.com/736x/b2/fb/20/b2fb20cd5286f15c7b4aeade50a948d1.jpg',
  },
  {
    src: 'https://i.pinimg.com/1200x/15/29/de/1529dec3f7e010bd71a3b02f4fe9e156.jpg',
  },
  {
    src: 'https://i.pinimg.com/1200x/22/46/c2/2246c21e61d756b8d6821e72799bf0e1.jpg',
  },
];

export function BannerCarousalDemo() {
  return (
    <div>
      <BannerCarousal images={data} className="h-[600px]">
        <BannerSlides />
      </BannerCarousal>
    </div>
  );
}

//Creator - Parth Arora
//X - https://x.com/partharora9128
