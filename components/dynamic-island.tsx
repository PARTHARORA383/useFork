'use client';

import { CodeXml, Command, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { SiGithub } from 'react-icons/si';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PopoverContent, PopoverTrigger } from './popover';

import { useOpenCodeContext } from '@/hooks/use-opencode';

function SearchButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => console.log('Search Clicked')} // implement your search logic
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Search className="w-4 h-4" />
      {hovered && (
        <motion.span
          className="absolute bottom-full mb-4 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          Search
        </motion.span>
      )}
    </motion.div>
  );
}

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextTheme, setNextTheme] = useState<'light' | 'dark'>(theme as 'light' | 'dark');

  const handleSetTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setNextTheme(newTheme);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setTheme(nextTheme);
    setIsAnimating(false);
  };

  return (
    <>
      {/* Theme button */}
      <motion.div
        className={cn(
          'relative rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95',
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleSetTheme}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {hovered && (
          <motion.span
            className="absolute bottom-full mb-4 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            Theme
          </motion.span>
        )}
      </motion.div>

      {/* Full-screen theme overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            style={{ zIndex: -50 }}
            className={`fixed inset-0 ${nextTheme === 'light' ? 'bg-white' : 'bg-[#161616]'}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function GithubButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open('https://github.com/Partharora383/useFork', '_blank')}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SiGithub className="w-4 h-4" />
      {hovered && (
        <motion.span
          className="absolute bottom-full mb-4 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          GitHub
        </motion.span>
      )}
    </motion.div>
  );
}

function CommandButton() {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95',
      )}
    >
      <PopoverTrigger asChild icon={<Command className="w-4 h-4" />}>
        <PopoverContent />
      </PopoverTrigger>

      {hovered && (
        <motion.span
          className="absolute bottom-full mb-1 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          Cmd + K
        </motion.span>
      )}
    </motion.div>
  );
}

export function DynamicIsland() {
  return (
    <div className="fixed right-6 bottom-7 z-10">
      <div className="relative bg-muted2/50 backdrop-blur-2xl border  rounded-2xl flex items-center justify-between gap-3 px-4 py-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]">
        <ThemeButton />
        <GithubButton />
        <CodePopupButton />
        <CommandButton />
      </div>
    </div>
  );
}

export function CodePopupButton({}) {
  const { isOpen, setIsOpen } = useOpenCodeContext();
  const [hovered, setHovered] = useState(false);

  const handleOnClick = () => {
    setIsOpen(isOpen == true ? false : true);
  };

  return (
    <motion.div
      className="rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleOnClick}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CodeXml className="w-5 h-5" />

      {hovered && (
        <motion.span
          className="absolute bottom-full mb-1 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          onClick={handleOnClick}
        >
          Code
        </motion.span>
      )}
    </motion.div>
  );
}
