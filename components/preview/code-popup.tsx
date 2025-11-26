'use client';

import { CodeXml } from 'lucide-react';
import { X } from '@/components/animate-ui/icons/x';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useOpenCodeContext } from '@/hooks/use-opencode';
import { AnimatePresence, motion } from 'motion/react';

export function CodePopup({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen, popupRef } = useOpenCodeContext();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupRef]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed z-30 top-0 right-0 w-[calc(100vw)-2rem] md:w-[calc(50vw)]  h-[calc(100vh-2rem)] bg-muted2/80 backdrop-blur-xl border mt-4 ml-2 mb-2 mr-2  overflow-y-scroll no-scrollbar rounded-lg md:rounded-l-xs px-4"
          >
            <div
              className="fixed right-5 top-2 rounded-full w-8 h-8 bg-background/40  p-1 flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X className="w-5 h-5" animateOnHover />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CodePopupButton({}) {
  const { isOpen, setIsOpen } = useOpenCodeContext();

  const handleOnClick = () => {
    setIsOpen(isOpen == true ? false : true);
  };

  return (
    <motion.div className="p-2" onClick={handleOnClick}>
      <CodeXml className="w-4 h-4" />
    </motion.div>
  );
}
