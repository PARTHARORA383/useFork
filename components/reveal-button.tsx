import { cn } from '@/lib/cn';
import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface RevealButtonProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function RevealButton({ title, children, onClick, className }: RevealButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="flex items-center justify-center gap-2">
      <motion.div
        ref={containerRef}
        className={cn(
          'flex items-center justify-center border p-2 rounded-xl origin-left overflow-hidden cursor-pointer text-white',
          isActive
            ? `gap-2 bg-sky-400/40 border-sky-200 dark:bg-purple-400/40 dark:border-purple-200`
            : 'hover:bg-muted2 border-muted-foreground',
          className
        )}
        onClick={() => {
          setIsActive((prev)=>!prev)
          onClick?.();
        }}
      >
        {children}
        <RevealButtonTitle title={title} isActive={isActive} />
      </motion.div>
    </motion.div>
  );
}

interface RevealButtonIconProps {
  icon: React.ReactNode;
  className?: string;
}

function RevealButtonIcon({ icon, className }: RevealButtonIconProps) {
  return (
    <motion.div className={cn('', className)}>
      {icon}
    </motion.div>
  );
}
RevealButtonIcon.displayName = 'RevealButtonIcon';

interface RevealButtonTitleProps {
  title?: string;
  className?: string;
  isActive: boolean;
}
function RevealButtonTitle({ isActive, title, className }: RevealButtonTitleProps) {
  return (
    <motion.span
      animate={{
        maxWidth: isActive ? 200 : 0,
        opacity: isActive ? 1 : 0,
        filter: isActive ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        opacity: { duration: 0.25, ease: 'easeInOut' },
        filter: { duration: 0.25, ease: 'easeInOut' },
        maxWidth: {
          duration: 0.3,
          ease: 'easeInOut',
          delay: isActive ? 0 : 0.2, // wait for fade to finish before collapsing
        },
      }}
      initial={false}
      className={cn('flex-shrink-0 overflow-hidden whitespace-nowrap', className)}
    >
      {title}
    </motion.span>
  );
}

RevealButtonTitle.displayName = 'RevealButtonTitle';

export { RevealButton, RevealButtonIcon, RevealButtonTitle };