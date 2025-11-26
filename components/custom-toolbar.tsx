'use client';

import { motion, AnimatePresence, Variant, Variants } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CodePopupButton } from './preview/code-popup';
import { CommandK } from './command-k';

interface ToolbarItem {
  title: string;
  component: ReactNode;
}

export function CustomToolbar({ items }: { items?: ToolbarItem[] }) {
  const toolbarItems = [
    {
      title: 'Search',
      component: <CommandK />,
    },
    {
      title: 'Code',
      component: <CodePopupButton />,
    },
  ];

  const arr = items ?? toolbarItems;

  return (
    <>
      <div className="fixed right-6 top-7 z-10 bg-muted backdrop-blur-2xl border rounded-3xl flex items-center gap-3 px-4 py-2 ">
        {arr.map((item) => (
          <div>
            <ToolbarButton title={item.title} component={item.component} />
          </div>
        ))}
      </div>
    </>
  );
}

type Direction = 'top' | 'right' | 'left' | 'bottom';

const tooltipVariants: Record<Direction, Variants> = {
  top: {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 8, opacity: 0 },
  },
  bottom: {
    initial: { y: -8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -8, opacity: 0 },
  },
  left: {
    initial: { x: 8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 8, opacity: 0 },
  },
  right: {
    initial: { x: -8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -8, opacity: 0 },
  },
};

function ToolbarButton({ title, component }: ToolbarItem) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hovered || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (rect.top < 60) setDirection('bottom');
    else if (vh - rect.bottom < 60) setDirection('top');
    else if (vw - rect.right < 120) setDirection('left');
    else setDirection('right');
  }, [hovered]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setHovered(false);
      }}
      className={cn(
        'relative rounded-full border bg-muted3  flex items-center justify-center cursor-pointer',
      )}
    >
      {component}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            variants={tooltipVariants[direction]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18 }}
            className={cn(
              'absolute pointer-events-none whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 shadow-md dark:bg-muted3',
              direction === 'top' && 'bottom-full mb-2 left-1/2 -translate-x-1/2',
              direction === 'bottom' && 'top-full mt-4 left-1/2 -translate-x-1/2',
              direction === 'left' && 'right-full mr-4 top-1/2 -translate-y-1/2',
              direction === 'right' && 'left-full ml-4 top-1/2 -translate-y-1/2',
            )}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
