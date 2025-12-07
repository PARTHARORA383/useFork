import { Carousal01 } from '@/components/carousals/carousal-01';
import HoverCursor from '@/components/hover-cursor';

export function Carousal01Demo() {
  const images = [
    { src: '/images/usefork7.jpeg' },
    { src: '/images/usefork6.jpeg' },
    { src: '/images/usefork5.jpeg' },
    { src: '/images/usefork4.jpeg' },
  ];

  return (
    <HoverCursor className="bg-muted3 font-medium" color="#232323">
      <Carousal01 images={images} />
    </HoverCursor>
  );
}
