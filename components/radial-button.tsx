
import { cn } from '@/lib/cn';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import { AnimatePresence, motion } from 'motion/react';
import React, { cloneElement, useContext, useEffect, useRef, useState } from 'react';


interface RadialButtonProps {
  title?: string
  children: React.ReactNode; // expects RadialIcon and RadialTitle
  onClick?: () => void;
  className?: string;
}


function RadialButton({
  title, children, onClick, className
}: RadialButtonProps) {

  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isActive && containerRef.current && !containerRef.current.contains(e.target as Node)
      ) {
        console.log("outside")
        setIsActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [isActive])

  return (
    <motion.div className='flex items-center justify-center gap-2'>
      <motion.div
        ref={containerRef}
        className={`flex items-center justify-center gap-2 border rounded-full p-1.5 border-muted-foreground origin-left overflow-hidden  ${isActive ? 'hover:bg-muted3 cursor-pointer' : "hover:bg-muted2 cursor-default"}`}
        onClick={() => {
          isActive ? onClick?.() : setIsActive(true)
        }}>

          {children}
          <AnimatePresence>
          {isActive && (
            <RadialButtonTitle title={title} />
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  )
}

interface RadialButtonIconProps {
  icon: React.ReactNode
  className?: string
}

function RadialButtonIcon({ icon, className, ...props }: RadialButtonIconProps) {
  return (
    <motion.div
      className={cn('', className)}
      {...props}
    >
      {icon}
    </motion.div>
  )
}

RadialButtonIcon.displayName = 'RadialButtonIcon';

interface RadialTitleProps {
  title?: string;
  
  className?: string;
}

function RadialButtonTitle({ title, className }: RadialTitleProps) {
  return (
    <motion.div
      layout
      initial={{ width: 0, opacity: 0, filter: 'blur(2px)' }}
      animate={{ width: 'auto', opacity: 1, filter: 'blur(0px)' }}
      exit={{ width: 0, opacity: 0, filter: 'blur(2px)' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn('', className)}
    >
      {title}
    </motion.div>
  );
};

RadialButtonTitle.displayName = 'RadialButtonTitle'


export { RadialButton, RadialButtonIcon, RadialButtonTitle }