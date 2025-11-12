"use client"

import React, { useState, useEffect, useRef, HTMLAttributes } from "react";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { animate, AnimatePresence, motion, MotionProps } from 'framer-motion';
import { ChevronLeft } from "./animate-ui/icons/chevron-left";
import { AudioLines } from "./animate-ui/icons/audio-lines";
import { RefreshCw } from "./animate-ui/icons/refresh-cw";
import { Play } from "./animate-ui/icons/play";
import { Timer } from "./animate-ui/icons/timer";

export const Stopwatch = () => {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // format time as mm:ss:ms
  const formatTime = (time: number) => {
    // Convert total milliseconds into hours, minutes, seconds, milliseconds
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    // Helper function to pad numbers to 2 digits (e.g., 7 -> "07")
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  const handleReset = () => {
    setIsRunning(false);

    // Animate the "rolling" effect
    const startValue = time;
    const endValue = 0;
    const overshoot = startValue + 3000; // extra roll feel
    const duration = 1.2; // total animation duration (seconds)

    const controls = animate(0, 1, {
      duration,
      ease: "easeInOut",
      onUpdate: (progress) => {
        // simulate spinning effect — increase first, then decrease to zero
        const t =
          progress < 0.5
            ? startValue + (overshoot - startValue) * (progress * 2)
            : overshoot - (overshoot - endValue) * ((progress - 0.5) * 2);

        setTime(Math.max(0, Math.floor(t)));
      },
      onComplete: () => {
        setTime(0); // finally set it to zero
      },
    });
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative flex justify-center items-center gap-3 p-1 bg-background rounded-lg mb-4 ">

        <AnimatePresence>
          {isHover && isRunning && !isActive && (
            <motion.div
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border rounded-md bg-muted absolute bottom-full mb-2 z-10 origin-left text-sm"
            >
              <motion.div className="text-xl font-mono px-2">
                {formatTime(time)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHover && !isRunning && <motion.div
            layout
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 1, width: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute z-10 bg-muted bottom-full rounded-lg p-1 px-1.5 border mb-2 overflow-hidden origin-center text-sm "
          >
            StopWatch
          </motion.div>}
        </AnimatePresence>


        <AnimatePresence>
          {isActive ? (
            <motion.div
              layout
              key="timer"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden flex items-center gap-1 origin-center"
            >
              <IconButton title={"Hide"} icon={<ChevronLeft className="w-5 h-5" />} onClick={() => {
                setIsActive(false)
                setIsHover(false)
              }} />

              {isRunning ?

                <IconButton title={"Pause"} icon={<AnimateIcon animateOnView >
                  <AudioLines className="w-5 h-5" />
                </AnimateIcon>} onClick={() => {
                  setIsRunning(false)
                  setIsHover(false)
                }} />
                :
                <IconButton title={"Play"} icon={<Play className='w-5 h-5' />} onClick={() => {
                  setIsRunning(true)
                  setIsHover(false)
                }} />
              }
              <motion.div
                className="text-xl font-mono px-2 cursor-default">
                {formatTime(time)}
              </motion.div>

              <IconButton title={"Reset"} icon={<RefreshCw animateOnHover className="w-5 h-5" />
              } onClick={() => {
                if (isRunning) {
                  handleReset()
                }
                setIsHover(false)
              }} />
            </motion.div>
          ) : (
            <motion.div
              key='icon'
              onClick={() => {
                setIsActive(true)
                setIsRunning(true)
              }}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className={`p-1 hover:bg-muted  cursor-pointer rounded-lg overflow-hidden origin-right ${isRunning ? "text-sky-300" : "text-foreground"}`} >
              <AnimateIcon animateOnView>
                <Timer />
              </AnimateIcon>


            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>


    </div>
  );
};


const ani: MotionProps = {
  variants: {
    initial: (c: number) => ({
      transform: `translateX(${20 * (c === 1 ? 1 : -1)}px)`,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    animate: {
      transform: 'translateX(0px)',
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (c: number) => ({
      transform: `translateX(${-40 * (c === 1 ? 1 : -1)}px)`,
      opacity: 0,
      filter: 'blur(4px)',
    }),
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};



interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  onClick: () => void
  title: string
}


function IconButton({
  icon,
  onClick,
  title,
  className,
  ...props
}: IconButtonProps) {

  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}
    >
      <motion.div
        {...ani}
        className=" p-1 rounded-lg hover:bg-muted4 hover:text-sky-300" onClick={onClick}>
        {icon}
      </motion.div>
      <AnimatePresence>

        {isHover && <motion.div

          initial={{ opacity: 0, width: 0, y: 0 }}
          animate={{ opacity: 1, width: "auto", y: 0 }}
          exit={{ opacity: 1, width: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden border rounded-md bg-muted absolute px-1.5 py-0.5 bottom-full mb-2 z-10 origin-left text-sm"
        >
          {title}
        </motion.div>}

      </AnimatePresence>

    </motion.div>
  )
}




