"use client"

import { motion } from "framer-motion"
import { SkipForward } from "lucide-react"
import { useState } from "react"

export interface TrackProps {
  id: string
  title: string
  artist: string
  url: string         // Audio file URL
  cover?: string      // Optional album cover
  duration?: number   // Optional preloaded duration
  metadata?: Record<string, any> // for custom data
}

interface TracksProps {
  tracks: TrackProps[]
}

export function MusicPlayer({ tracks }: TracksProps) {
  const [hovered, setHovered] = useState(false)

  const coverImg = tracks[0]?.cover || "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg"

  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4">

    <div className="flex flex-col items-center justify-center  gap-6 border rounded-xl p-4">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center "
        >
        {/* Rotating button (vinyl style) */}
        <motion.img
          src={coverImg}
          alt="Play Button"
          className="w-32 h-32 rounded-full border-4 border-gray-400 shadow-lg cursor-pointer object-cover"
          animate={{
            rotate: hovered ? 0 : 360,
          }}
          transition={{
            repeat:  Infinity,
            duration: 4,
            ease: "linear",
          }}
          />
    </motion.div>
     

      {/* Track Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{tracks[0]?.title || "Unknown Track"}</h3>
        <p className="text-sm text-gray-500">{tracks[0]?.artist || "Unknown Artist"}</p>
      </div>
    </div>

    <motion.div className="flex items-center justify-center border rounded-xl w-sm p-1 ">
        <MusicNextButton/>
    </motion.div>

          </div>

          </>
  )
}


function MusicNextButton(){

  const [clicked , setClicked] = useState(false)

  return (
    <motion.div
      className="relative flex items-center justify-center rounded-full border-2 border-transparent hover:bg-muted2 cursor-pointer"
      style={{ width: 60, height: 60 }}
      onClick={() => setClicked(!clicked)}
    >
      {/* SVG Circle Border Path */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="red"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="289" // circumference = 2πr ≈ 289
          strokeDashoffset={clicked ? 0 : 289}
          initial={false}
          animate={{
            strokeDashoffset: clicked ? 0 : 289,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Icon */}
      <SkipForward size={24} className="text-foreground" />
    </motion.div>
  )
}