import { Carousal01 } from '../carousals/carousal-01';

export function Carousal01Demo() {
  const images = [
    { src: '/images/usefork6.jpeg' },
    { src: '/images/usefork7.jpeg' },
    { src: '/images/usefork5.jpeg' },
    { src: '/images/usefork4.jpeg' },
  ];

  return <Carousal01 images={images} />;
}
