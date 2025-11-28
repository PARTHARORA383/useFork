'use client';

import { motion, AnimatePresence, Variant, Variants, number } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CodePopupButton } from './preview/code-popup';
import { CommandK } from './command-k';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPages } from './previous-next';
import { CurrentIndexItemProps, useCurrentIndex } from '@/hooks/use-prev-next';
import Link from 'next/link';

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
          <div key={item.title}>
            <ToolbarButton title={item.title} component={item.component} />
          </div>
        ))}
        <Previous />
        <Next />
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

function Previous() {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');
  const ref = useRef<HTMLDivElement>(null);

  const pages = getAllPages();
  const { currentIndex, setCurrentIndex, prevIndex, setPrevIndex } = useCurrentIndex();

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

  // Find current page index
  const currentPage = pages.findIndex((p) => p.id === currentIndex);

  useEffect(() => {
    const nextPrev = currentIndex <= 0 ? pages.length - 1 : currentIndex - 1;
    setPrevIndex(nextPrev);
  }, [currentIndex, pages.length, setPrevIndex]);

  const prevPage = pages[prevIndex];

  const handlePrev = () => {
    setCurrentIndex((curr) => (curr === 0 ? pages.length - 1 : currentIndex - 1));
  };

  return (
    <Link href={prevPage.href}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setHovered(false);
          handlePrev();
        }}
        className={cn(
          'relative rounded-full border bg-muted3  flex items-center justify-center cursor-pointer p-2',
        )}
      >
        <ChevronLeft className="w-4 h-4" />

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
              {prevPage.title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

function Next() {
  const pages = getAllPages();
  const { currentIndex, setCurrentIndex, nextIndex, setNextIndex } = useCurrentIndex();
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('top');
  const ref = useRef<HTMLDivElement>(null);

  // Find current page index
  const currentId = pages.findIndex((p) => p.id === currentIndex);

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

  useEffect(() => {
    const nextPrev = currentIndex === pages.length - 1 ? 0 : currentIndex + 1;
    setNextIndex(nextPrev);
  }, [currentIndex, pages.length, setNextIndex]);

  const nextPage = pages[nextIndex];

  const handleNext = () => {
    setCurrentIndex(currentIndex === pages.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <Link href={nextPage.href}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setHovered(false);
          handleNext();
        }}
        className={cn(
          'relative rounded-full border bg-muted3  flex items-center justify-center cursor-pointer p-2',
        )}
      >
        <ChevronRight className="w-4 h-4" />

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
              {nextPage.title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
