"use client"

import { FlipCardOnHover } from "@/components/flip-card-hover";


export function FlipCardOnHoverDemo() {
  return (
    <FlipCardOnHover
      front={<Front />}
      back={<Back />}
    />
  )
}

function Front() {

  return (

    <div className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
      <img
        src="https://framerusercontent.com/images/GKmCpxDWc2mPXeyMGaJrcYyps.png?width=1920&height=2400"
        alt="useFork Demo"
        className="w-full h-full object-cover rounded-xl"
      />
      <span className="absolute top-3 z-10 text-white text-[18px] font-serif px-4 text-center">
       <span>If the dream does not scare you, it is too small.</span>
      </span>
      <span className="absolute bottom-2 z-10 left-1/2 -translate-x-1/2 text-white font-medium">
        useFork
      </span>
    </div>

  )
}

function Back() {

  return (

    <div className="w-full h-full bg-amber-50 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <p className="font-serif font-medium text-black mb-4 text-[17px]">
          Welcome to our Journey
        </p>
        <span className=" text-black font-serif font-medium">
          useFork began as a simple idea — to bridge the gap between design and development, so creators could spend less time fighting UI and more time building what matters
        </span>
      </div>

      <span className="absolute bottom-2 z-10 left-1/2 -translate-x-1/2 text-black font-medium">
        useFork
      </span>
    </div>

  )
}