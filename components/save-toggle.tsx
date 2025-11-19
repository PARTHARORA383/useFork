'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { LoaderCircle } from '@/components/loader-circle';
import { CheckCircle2 } from 'lucide-react';

type SaveButtonState = 'idle' | 'loading' | 'completed';

interface SaveToggleProps {
  onClick?: () => Promise<void> | void;
  title?: string;
  completedTitle?: string;
  className?: string;
}

export function SaveToggle({
  onClick,
  title = 'Save Changes',
  completedTitle = 'Saved',
  className,
}: SaveToggleProps) {
  const [state, setState] = useState<SaveButtonState>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');

    try {
      await onClick?.();
      setTimeout(() => {
        setState('completed');
      }, 4000);
      setTimeout(() => {
        setState('idle');
      }, 7000);
    } catch (e) {
      console.log(e);
    }
  };

  const text = title.split('').map((char) => (char === ' ' ? '\u00A0' : char));

  const completed = completedTitle.split('').map((char) => (char === ' ' ? '\u00A0' : char));

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={cn('flex items-center justify-center', className)}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key={'idle'}
            initial={{ width: 0, opacity: 0, filter: 'blur(2px)', originX: 0.5 }}
            animate={{ width: '100%', opacity: 1, filter: 'blur(0px)', originX: 0.5 }}
            exit={{ width: 0, opacity: 0, filter: 'blur(2px)', originX: 0.5 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={cn(
              'flex items-center border  justify-center p-2 px-4 overflow-hidden font-medium rounded-full  shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] ',
              className,
            )}
          >
            {text.map((char, index) => (
              <motion.span key={index} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}

        {state === 'loading' && (
          <motion.div
            key="loading"
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center  rounded-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]  "
          >
            <LoaderCircle radius={100} />
          </motion.div>
        )}

        {state === 'completed' && (
          <motion.div
            key="completed"
            initial={{ width: 0, opacity: 0, filter: 'blur(2px)', originX: 0.5 }}
            animate={{ width: '100%', opacity: 1, filter: 'blur(0px)', originX: 0.5 }}
            exit={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
              'flex items-center justify-center py-2 overflow-hidden rounded-full px-4 border border-muted shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] ',
              className,
            )}
          >
            <CheckCircle2 className="w-5 h-5 mr-1" />
            {completed.map((char, index) => (
              <motion.span key={index} className="inline ">
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
