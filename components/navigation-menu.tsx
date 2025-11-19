"use client"
import React, { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cross, CrossIcon, Hamburger, Menu } from 'lucide-react';
import { X } from '@/components/animate-ui/icons/x';
import Link from 'next/link';
interface navigationContextProps {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const navigationContext = React.createContext<navigationContextProps | null>(null);
const useNavigation = () => {
  const context = useContext(navigationContext)
  if (!context) throw new Error('useContext should be used inside the Provider');
  return context;
}

export function NavigationMenu() {

  const [active, setActive] = useState(false);


  return (
    <navigationContext.Provider value={{ active, setActive }}>
      <div className='overflow-hidden cursor-pointer'
        onClick={() => {
          setActive(!active)
        }}
      >
        <AnimatePresence>
          {!active &&
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            >
              <Menu className='w-5 h-5 text-white' />
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {active &&
          <div>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.6, ease: "easeInOut",
                delay: 0.3,
              staggerChildren: 0.12,   
                delayChildren: 0.3     

              }}
              className=' min-h-[100vh] min-w-[100wh] max-h-[100vh] max-w-[100wh] bg-amber-50 fixed inset-0 z-50 flex flex-col items-start gap-4 px-6 justify-center'>


              <NavigationItem text='home' href='/' />
              <NavigationItem text='components' href='/docs' />
              <NavigationItem text='documentation' href='/docs' />
              <NavigationItem text='contact us' href='/' />
              <NavigationItem text='fork us' href='/' />


            </motion.div>

            <div className='fixed top-5 left-6 z-60 overflow-hidden cursor-pointer'
              onClick={() => {
                setActive(false)
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.8, ease: "easeIn" }}
                className='text-2xl font-medium text-black'
              >
                useFork
              </motion.div>
            </div>

            <div className='fixed top-5 right-5 z-60 overflow-hidden cursor-pointer'
              onClick={() => {
                setActive(false)
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.8, ease: "easeIn" }}
              >
                <X animateOnTap className='w-7 h-7 text-black' />
              </motion.div>
            </div>


          </div>
        }
      </AnimatePresence>
    </navigationContext.Provider>
  )
}



function NavigationItem({ text, href }: { text: string, href: string }) {
  const { active, setActive } = useNavigation()
  return (
    <div className="overflow-hidden border z-50">
      <AnimatePresence>
        {active &&
          <Link href={href} key={active ? `enter-${text}` : `exit-${text}`}>
            <motion.div
              key={active.toString()}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 0.7, ease: "easeInOut",
              }}
              className={`
            text-2xl 
            relative 
            inline-block 
            text-black 
            delius-swash-caps-regular 
            after:content-[''] 
            after:absolute 
            after:left-0 
            after:bottom-0 
            after:h-[3px] 
            after:w-full 
            after:bg-black 
            after:scale-x-0 
            after:origin-left 
            after:transition-transform 
            after:duration-300
            hover:after:scale-x-100
            hover:text-sky-500
            `}
            >
              {text}
            </motion.div>
          </Link>
        }
      </AnimatePresence>
    </div>
  )
}
