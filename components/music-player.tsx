"use client"

import { AnimatePresence, motion } from "motion/react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  HTMLAttributes,
  SetStateAction,
} from "react"
import NoiseWrapper from "./noise-wrapper"

/* ---------- TYPES ---------- */
export interface TrackProps {
  id: string
  title: string
  artist: string
  url: string
  cover?: string
  duration?: number
  metadata?: Record<string, any>
}

interface TracksContextProps {
  tracks: TrackProps[]
  currentTrackIndex: number
  setTracks: React.Dispatch<SetStateAction<TrackProps[]>>
  setCurrentTrackIndex: React.Dispatch<SetStateAction<number>>
  isPaused: boolean
  setIsPaused: React.Dispatch<SetStateAction<boolean>>
}

const TracksContext = createContext<TracksContextProps | null>(null)
export const useTracks = () => {
  const ctx = useContext(TracksContext)
  if (!ctx) throw new Error("useTracks must be used inside MusicPlayer")
  return ctx
}

export interface MusicButtonProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  width?: number
  height?: number
  onClick?: () => void
}

export const MusicButton = ({
  icon,
  width = 40,
  height = 40,
  onClick,
  className,
  ...props
}: MusicButtonProps) => (
  <NoiseWrapper className="rounded-full">
    <motion.div
      className={`relative flex items-center justify-center rounded-full border-2 border-transparent hover:border-sky-500 hover:bg-muted2 cursor-pointer transition-colors duration-200 ${className ?? ""}`}
      style={{ width, height }}
      onClick={onClick}
      {...props}
    >
      {icon}
    </motion.div>
  </NoiseWrapper>
)

/* ---------- MUSIC DETAILS ---------- */
export const MusicDetails = ({ hovered }: { hovered: boolean }) => {
  const { tracks, currentTrackIndex } = useTracks()
  const track = tracks[currentTrackIndex]
  if (!track) return null

  const coverImg =
    track.cover ||
    "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg"

  return (
    <AnimatePresence>
      <motion.div
        key={track.id}
        initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
        animate={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        }}
        exit={{
          opacity: 0,
          x: 40,
          filter: "blur(12px)",
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
        className="flex flex-col items-center justify-center max-w-xs min-w-xs left-1/2 -translate-x-1/2 z-50 absolute bottom-full mb-2 rounded-xl border overflow-hidden shadow-lg"
        style={{ width: "180px", height: "200px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${coverImg})`,
            filter: "blur(25px) brightness(0.6)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-3 py-4">
          <motion.img
            src={coverImg}
            alt={track.title}
            width={100}
            height={100}
            className="rounded-lg border border-gray-400 shadow-md object-cover"
            animate={{ rotate: hovered ? 0 : 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.div
            className="text-sm font-semibold text-white text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {track.title}
          </motion.div>
          <motion.div
            className="text-xs text-gray-300 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {track.artist}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}


export const DefaultControls = () => {
  const { isPaused, setIsPaused, tracks, currentTrackIndex, setCurrentTrackIndex } = useTracks()
  const [hovered, setHovered] = useState(false)
  const coverImg =
    tracks[currentTrackIndex]?.cover ||
    "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg"

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  }

  const handlePrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 relative">
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MusicDetails hovered={hovered} />
          </motion.div>
        )}
      </AnimatePresence>
      <NoiseWrapper className="rounded-xl">
        <motion.div
          className="flex items-center justify-center border rounded-xl w-xs p-1 gap-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <MusicButton icon={<SkipBack size={20} />} onClick={handlePrev} />
          <div className="relative w-[45px] h-[45px]">
            <AnimatePresence>
              {isPaused ? (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <MusicButton
                    width={45}
                    height={45}
                    icon={<Play size={24} />}
                    onClick={() => setIsPaused(false)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <MusicButton
                    width={45}
                    height={45}
                    icon={
                      <motion.img
                        src={coverImg}
                        alt="Playing Track"
                        className="rounded-full border-4 border-gray-400 shadow-lg object-cover"
                        animate={{ rotate: hovered ? 0 : 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "linear",
                        }}
                      />
                    }
                    onClick={() => setIsPaused(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <MusicButton icon={<SkipForward size={20} />} onClick={handleNext} />
        </motion.div>
      </NoiseWrapper>
    </div>
  )
}

interface MusicPlayerProps {
  data: TrackProps[]
  children?: ReactNode
}

export const MusicPlayer = ({ data, children }: MusicPlayerProps) => {
  const [tracks, setTracks] = useState<TrackProps[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    setTracks(data)
  }, [data])

  const contextValue: TracksContextProps = {
    tracks,
    setTracks,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPaused,
    setIsPaused,
  }

  return (
    <TracksContext.Provider value={contextValue}>
      {children ? children : <DefaultControls />}
    </TracksContext.Provider>
  )
}
