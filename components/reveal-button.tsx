
import { cn } from '@/lib/cn';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';


interface RevealButtonProps {
  title?: string
  children: React.ReactNode; // expects RadialIcon and RadialTitle
  onClick?: () => void;
  className?: string;
}


function RevealButton({
  title, children, onClick, className
}: RevealButtonProps) {

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
            <RevealButtonTitle title={title} />
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  )
}

interface RevealButtonIconProps {
  icon: React.ReactNode
  className?: string
}

function RevealButtonIcon({ icon, className, ...props }: RevealButtonIconProps) {
  return (
    <motion.div
      className={cn('', className)}
      {...props}
    >
      {icon}
    </motion.div>
  )
}

RevealButtonIcon.displayName = 'RevealButtonIcon';

interface RadialTitleProps {
  title?: string;
  
  className?: string;
}

function RevealButtonTitle({ title, className }: RadialTitleProps) {
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

RevealButtonTitle.displayName = 'RevealButtonTitle'


export { RevealButton, RevealButtonIcon, RevealButtonTitle }