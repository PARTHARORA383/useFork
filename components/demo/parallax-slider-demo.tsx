import { ParallaxSlider } from '../carousals/parallax-slider';

export function ParallaxSliderDemo() {
  const images = [
    { src: '/images/usefork20.jpg' },
    { src: '/images/usefork12.jpg' },
    { src: '/images/usefork11.jpg' },
    { src: '/images/usefork9.jpg' },
    { src: '/images/usefork8.jpg' },
  ];

  return (
    <div>
      <ParallaxSlider images={images} />
    </div>
  );
}
