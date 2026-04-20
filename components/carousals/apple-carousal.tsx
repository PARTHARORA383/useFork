'use client'

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/cn';
import React, { createContext, useContext, useState } from 'react';


interface CarouselContextProps {
    isActive: string,
    setIsActive: React.Dispatch<React.SetStateAction<string>>;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const ctx = useContext(CarouselContext);
    if (!ctx) throw new Error('useCarousel must be used inside <CarouselBody>');
    return ctx;
}

interface CarouselBodyProps {
    children: React.ReactNode;
    className?: string;
    defaultValue: string,
}

function CarouselBody({ children, className, defaultValue }: CarouselBodyProps) {
    const [isActive, setIsActive] = useState(defaultValue);

    return (
        <CarouselContext.Provider value={{ isActive, setIsActive }}>
            <div className={cn(' bg-[#f5f4f3] rounded-xl relative overflow-hidden max-w-7xl min-w-5xl ', className)}>
                {children}
            </div>
        </CarouselContext.Provider>
    );

}

interface CarouselListProps {
    children: React.ReactNode;
    className?: string;
}


function CarousalList({ children, className }: CarouselListProps) {
    return (
        <div className={cn('rounded-lg overflow-hidden', className)}>
            {children}
        </div>
    );
}


interface CarouselTriggerProps {
    title: string,
    children: React.ReactNode;
    className?: string;
    value: string
}

function CarouselTrigger({ title, children, className, value }: CarouselTriggerProps) {

    const { isActive, setIsActive } = useCarousel()
    const active = isActive === value

    return (
        <motion.div
            layout
            transition={{
                layout: { duration: 0.3, ease: 'easeInOut' },
            }}

            className={cn(`bg-[#fff] text-[#1D1D1F]  h-full rounded-lg p-3 overflow-hidden cursor-pointer`, className)}
            style={{
                width: active ? 400 : 180,
                backgroundColor: 'rgba(232, 232, 237, 0.72)', // ✅ Apple-like

            }}
            onClick={() => {
                setIsActive(value)
            }}
        >
            <AnimatePresence>

                {isActive === value ?
                    <motion.div
                        initial={{ filter: 'blur(4px)', opacity: 0 }}
                        animate={{ filter: 'blur(0px)', opacity: 1 }}
                        exit={{ filter: 'blur(4px)', opacity: 0 }}
                        transition={{
                            duration: 0.2,
                            delay: active ? 0.3 : 0,
                        }}
                        className="overflow-hidden rounded-lg "
                    >
                        {children}
                    </motion.div>
                    :
                    <motion.span
                        initial={{ filter: 'blur(4px)', opacity: 0 }}
                        animate={{ filter: 'blur(0px)', opacity: 1 }}
                        exit={{ filter: 'blur(4px)', opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: active ? 0.3 : 0,
                        }}
                        className='flex-shrink-0 whitespace-nowrap rounded-lg font-medium w-full' 
                    >
                        {title}
                    </motion.span>
                }
            </AnimatePresence>
        </motion.div>
    );
}

interface CarouselContentProps {
    children: React.ReactNode;
    className?: string;
    value: string  // ← this is what's missing
}
function CarouselContent({ children, className, value }: CarouselContentProps) {
    const { isActive } = useCarousel();
    const active = isActive === value;

    return (
        <AnimatePresence mode="wait">
            {active && (
                <motion.div
                    key={value}
                    initial={{
                        x: 40,
                        scale: 0.98,
                        filter: 'blur(2px)',
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                        x: -40,
                        scale: 0.96,
                        filter: 'blur(4px)',
                    }}
                    transition={{
                        duration: 0.35,
                        ease: 'easeInOut',
                    }}
                    className={cn('overflow-hidden will-change-transform rounded-lg', className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export {
    CarouselBody,
    CarouselContent,
    CarousalList,
    CarouselTrigger
}
