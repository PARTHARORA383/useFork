'use client';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from '@/components/animate-ui/icons/menu';
import { createContext, useContext, useState } from 'react';
import { X } from './animate-ui/icons/x';
import Link from 'next/link';

interface AnimatedMenuContextProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const animatedMenuContext = createContext<AnimatedMenuContextProps | null>(null);
const useAnimatedMenuContext = () => {
  const context = useContext(animatedMenuContext);
  if (!context) throw new Error('useContext should be used inside the Provider');
  return context;
};

export function AnimatedMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <animatedMenuContext.Provider value={{ isActive, setIsActive }}>
      <motion.div
        style={{ justifyContent: 'flex-end' }}
        className="flex items-center gap-4 bg-background/40 backdrop-blur-2xl rounded-full p-2 origin-right"
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              layout
              initial={{ width: 0, opacity: 0, filter: 'blur(2px)' }}
              animate={{ width: 'auto', opacity: 1, filter: 'blur(0px)' }}
              exit={{ width: 0, opacity: 0, filter: 'blur(2px)' }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'right' }}
              className="overflow-hidden flex items-center gap-4 px-1 "
            >
              <NavigationItem text="Home" href="/" />
              <NavigationItem text="Documentation" href="/docs" />
            </motion.div>
          )}
        </AnimatePresence>

        <Menu
          animate={isActive == true ? true : false}
          className="w-5 h-5 flex-shrink-0"
          onClick={() => setIsActive(!isActive)}
        />
      </motion.div>
    </animatedMenuContext.Provider>
  );
}

function NavigationItem({ text, href }: { text: string; href: string }) {
  const { isActive, setIsActive } = useAnimatedMenuContext();
  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {isActive && (
          <Link
            onClick={() => {
              setIsActive(false);
            }}
            href={href}
            key={isActive ? `enter-${text}` : `exit-${text}`}
          >
            <motion.div
              key={isActive.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
              }}
              className={`
            relative 
            inline-block 
            after:content-[''] 
            after:absolute 
            after:left-0 
            after:bottom-0 
            after:h-[1px] 
            after:w-full 
            after:bg-foreground 
            after:scale-x-0 
            after:origin-left 
            after:transition-transform 
            after:duration-300
            hover:after:scale-x-100
           
            `}
            >
              {text}
            </motion.div>
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
