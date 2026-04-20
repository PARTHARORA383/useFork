import {
  CarouselBody,
  CarouselContent,
  CarousalList,
  CarouselTrigger,
} from '@/components/carousals/apple-carousal'


interface ResponsivePictureProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

function ResponsivePicture({
  src,
  alt,
  className,
  imgClassName,
}: ResponsivePictureProps) {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imgClassName}
      />
    </div>
  )
}

export function AppleCarouselDemo() {
  return (
    <CarouselBody defaultValue="slide-1" className=" h-[650px] w-full">
      <CarousalList className="absolute top-20 left-10 z-20 flex flex-col gap-4">
        <CarouselTrigger value="slide-1" title="Colours">
          <span className='text-[17px]'>
             <span className='font-semibold'>Colours :</span>
         The most colourful MacBook line-up ever. Choose from four stunning colours with colour-coordinated keyboards
          </span>
        </CarouselTrigger>

        <CarouselTrigger value="slide-2" title="Connectivity">
          <span className='text-[17px]'>
            <span className='font-medium'>Connectivity :</span>
           Two USB-C ports and a headphone jack let you connect a variety of accessories, transfer your data and charge MacBook Neo
          </span>
        </CarouselTrigger>

        <CarouselTrigger value="slide-3" title="Display">
          <span className='text-[17px]'>
            <span className='font-medium'>Display : </span>
            With outstanding resolution and 500 nits of brightness, the 33.02cm. Liquid Retina display brings photos, websites and video to life.
          </span>
        </CarouselTrigger>

        <CarouselTrigger value="slide-4" title="Touch ID">
          <span className='text-[17px]'>
            <span className='font-medium'>Touch ID : </span>
            The model with Touch ID lets you easily unlock your MacBook Neo, sign in to websites and apps and download apps with the touch of you finger.
          </span>
        </CarouselTrigger>

        <CarouselTrigger value="slide-5" title="Camera">
          <span className='text-[17px]'>
            <span className='font-medium'>Camera : </span>
            The 1080p FaceTime HD camera gives you a clear and crisp appearance on video calls.
          </span>
        </CarouselTrigger>
        <CarouselTrigger value="slide-6" title="Mics and speakers">
          <span className='text-[17px]'>
            <span className='font-medium'>Mics and speakers :</span>
            Two side-firing speakers deliver immersive sound, and
            dual microphones isolate and enhance your voice for crystal clarity
          </span>
        </CarouselTrigger>
      </CarousalList>

      <CarouselContent value="slide-1" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_hero_endframe__czpdxe2dmawm_large.jpg" alt="Apple 1"
        />
      </CarouselContent>

      <CarouselContent value="slide-2" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_connectivity__f4pmdvbke2mq_large.jpg" alt="Apple 2"
        />

      </CarouselContent>

      <CarouselContent value="slide-3" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_display__itqbv51zruy6_large.jpg" alt="Apple 3"
        />
      </CarouselContent>

      <CarouselContent value="slide-4" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_keyboard_endframe__bsph9ace3meq_large.jpg" alt="Apple 4"
        />
      </CarouselContent>

      <CarouselContent value="slide-5" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_camera__wehr0awavaam_large.jpg" alt="Apple 5"
        />
      </CarouselContent>

      <CarouselContent value="slide-6" className="">
        <ResponsivePicture
          src="https://www.apple.com/v/macbook-neo/b/images/overview/product-viewer/pv_audio_static__d4jggipelfe6_large.jpg" alt="Apple 6"
        />
      </CarouselContent>

    </CarouselBody>
  )
}