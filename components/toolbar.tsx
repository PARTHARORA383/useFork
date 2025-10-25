"use client"

import { cn } from "@/lib/cn"
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from 'motion/react'


type ToolbarProps = {
  position?: "bottom-right" | "bottom-left" | 'bottom-center' | "top-center" | "center" | "relative-bottom",
  variant?: "light" | 'dark' | 'muted'
  children?: ReactNode
  className?: string
}

type ToolbarActiveButtonProps = {
  activeButton: string | null
  setActiveButton: (id: string) => void
}

const activeButtonContext = createContext<ToolbarActiveButtonProps | undefined>(undefined)

const useActiveButton = () => {
  const context = useContext(activeButtonContext)
  if (!context) throw new Error('useActiveButton should be use inside Toolbar')
  return context;
}

function Toolbar({ children, className, position = "bottom-right", variant = "dark", ...props }: ToolbarProps) {

  const [activeButton, setActiveButton] = useState("")

  const positionClasses = {
    "bottom-right": "fixed bottom-5 right-5",
    "bottom-left": "fixed bottom-5 left-5",
    "bottom-center": "fixed bottom-5 left-1/2 -translate-x-1/2",
    "top-center": "fixed top-5 left-1/2 -translate-x-1/2",
    "center": "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "relative-bottom" : "absolute left-1/2 bottom-25 -translate-x-1/2 "
  }[position]

  const bgVariants = {
    light: " shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]",
    dark: "shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]"
  }


  return (
    <activeButtonContext.Provider value={{ activeButton, setActiveButton }}>
      <div className={cn(" relative flex items-center justify-center border gap-3 rounded-2xl p-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] ", className, positionClasses)} {...props}
      >
        {children}
      </div>
    </activeButtonContext.Provider>
  )
}

export type ToolbarButtonProps = {
  children?: ReactNode;
  className?: string;
  heading?: string
  /** Accepts all icon types: Lucide, React Icons, custom SVGs, etc. */
  icon?: ReactNode
  onClick?: () => void
  size?: number;
} & React.HTMLAttributes<HTMLDivElement>;




function ToolbarButton({
  children,
  className,
  heading,
  icon,
  onClick,
  size = 16,
  ...props
}: ToolbarButtonProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const { activeButton, setActiveButton } = useActiveButton()
  const [isMobile ,setIsMobile] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("left");
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const fromLeft = e.clientX - rect.left < rect.width / 2;
    setDirection(fromLeft ? "left" : "right");
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  const handleMobile = ()=>{
    setIsMobile(window.innerWidth <= 1028)
  }

  useEffect(()=>{
    handleMobile()
    window.addEventListener('resize' , handleMobile)
    return ()=>window.removeEventListener('resize' , handleMobile)
  },[])

  return (
    <motion.div
      ref={ref}
      className={cn(
        " rounded-full flex items-center justify-center border p-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] cursor-pointer z-20 ",
        className
      )}
      onClick={() => {
        setIsRender(!isRender);
        setIsHovered(false);
        setActiveButton(heading)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {icon}

      {/* Tooltip Animation */}
      <AnimatePresence>
        {isHovered && (isMobile == false) && (
          <motion.section
            key="tooltip"
            layout
            initial={{
              opacity: 0.8,

              scaleX: 0,
              originX: 0.5,
            }}
            animate={{
              opacity: 1,

              scaleX: 1,
              originX: 0.5,
            }}
            exit={{
              opacity: 0,

              scaleX: 0,
              originX: 0.5
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="absolute bottom-full mb-4 rounded-lg border z-30 px-2 py-1 text-center text-sm backdrop-blur-md bg-card/80 border-border shadow-lg origin-center flex justify-center items-center"
          >
            {heading}
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Expanded Content */}
        {isRender && (activeButton === heading) && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0, scaleY: 0, y: 10, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0, originX: 0, originY: 1 }}
            exit={{ opacity: 0, scaleX: 0, scaleY: 0, y: 10, originX: 0, originY: 1 }}

            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded-xl border z-50  origin-bottom backdrop-blur-md bg-card/80 border-border/30 shadow-lg truncate whitespace-nowrap"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type ToolbarButtonOverlayProps = {
  component?: ReactNode
}



function ToolbarButtonOverlay({ component }: ToolbarButtonOverlayProps) {
  return (
    <div>
      {component ?
        <motion.div className="z-50">
          {component}
        </motion.div> :
        <motion.div className="min-w-xs flex items-center justify-center h-[100px] z-50">
          Pass in the component you wanna see
        </motion.div>
      }
    </div>
  )
}


export { Toolbar, ToolbarButton, ToolbarButtonOverlay }