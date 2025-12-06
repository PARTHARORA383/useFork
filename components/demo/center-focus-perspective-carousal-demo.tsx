import { CenterFocusSwiper } from "../carousals/card-carousal";




export function TestimonialSwiperDemo() {
const images = [
  { src: "/images/usefork2.jpeg" },
  { src: "/images/usefork6.jpeg" },
  { src: "/images/usefork7.jpeg" },
  { src: "/images/usefork5.jpeg" },
  { src: "/images/usefork4.jpeg" },
];

  return (
    <CenterFocusSwiper images={images} />
  )
}