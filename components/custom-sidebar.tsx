'use client';

import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

interface ItemProps {
  title: string;
  href: string;
}

interface DataProps {
  heading: string;
  items: ItemProps[];
}

export function CustomSidebar() {
  const sidebar = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  const docsData: DataProps[] = [
    {
      heading: 'overview',
      items: [{ title: 'Introduction', href: '/docs' }],
    },
  ];

  const data = [
    {
      heading: 'utilities',
      items: [{ title: 'Code block', href: '/docs/code-block' }],
    },
    {
      heading: 'minimilistic',
      items: [
        { title: 'Music Player', href: '/docs/music-player' },
        { title: 'Parallax Image', href: '/docs/parallax-images' },
      ],
    },
    {
      heading: 'text-wrappers',
      items: [
        { title: 'Wave text wrapper', href: '/docs/wave-in-text' },
        { title: 'Text roll wrapper ', href: '/docs/roll-in-text' },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1028);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      sidebar.setOpen(false);
    } else {
      sidebar.setOpen(true);
    }
  }, [isMobile]);

  const playDrop = () => {
    const drop = new Audio('/sounds/click.mp3');
    drop.volume = 0.4;
    drop.play().catch(() => {});
  };

  const handleOnClick = () => {
    playDrop();
  };

  return (
    <>
      <button
        className="fixed top-15 lg:top-17 left-4 md:left-10 p-1 text-muted-foreground hover:text-[var(--color-purple-500)] dark:hover:text-[var(--color-purple-300)] z-50 hover:bg-muted3 transition-colors duration-200 rounded-md"
        onClick={() => {
          handleOnClick();
          sidebar.setOpen(!sidebar.open);
        }}
      >
        {sidebar.open ? (
          <ArrowLeftToLine className="w-6 h-6" />
        ) : (
          <ArrowRightToLine className="w-6 h-6" />
        )}
      </button>
      <AnimatePresence>
        {sidebar.open && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="p-4 space-y-2 fixed  top-0 left-0 z-20 md:bg-background bg-muted dark:bg-muted ml-2 md:pl-8 pt-32 md:pt-32 pb-16 mt-13 border md:border-0  pr-12 rounded-xl max-h-[calc(100vh-1rem)] min-h-[calc(100vh-4rem)] overflow-scroll no-scrollbar"
          >
            <div className="flex items-center justify-start gap-3 mb-4 ">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-purple-400)] to-amber-50"></div>
              <h1 className="cursor-default text-[17px]  font-medium text-accent-foreground">
                Documentation
              </h1>
            </div>

            {docsData.map((section) => (
              <div key={section.heading}>
                <div className="delius-swash-caps-regular text-[17px] text-foreground flex items-center justify-center gap-2">
                  <span className="h-[1px] bg-foreground w-full border flex-1"></span>
                  <h1 className="whitespace-nowrap">{section.heading}</h1>
                </div>
                {section.items.map((item: ItemProps) => (
                  <motion.div
                    key={item.href}
                    onClick={() => {}}
                    className=" transform text-muted-foreground hover:scale-101 transition-transform  duration-200 hover:translate-x-3 hover:text-[var(--color-purple-500)]  hover:dark:text-[var(--color-purple-300)] pl-20 "
                  >
                    <Link
                      onClick={() => {
                        if (isMobile) {
                          sidebar.setOpen(false);
                        } else {
                          sidebar.setOpen(true);
                        }
                      }}
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}

            <div className="flex items-center justify-start gap-3 mb-4 ">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-purple-400)] to-amber-50"></div>
              <h1 className="cursor-default text-[17px]  font-medium text-accent-foreground">
                Components
              </h1>
            </div>

            {data.map((section) => (
              <div key={section.heading}>
                <div className="delius-swash-caps-regular text-[17px] text-foreground flex items-center justify-center gap-2">
                  <span className="h-[1px] bg-foreground w-full border flex-1"></span>
                  <h1 className="whitespace-nowrap">{section.heading}</h1>
                </div>
                {section.items.map((item: ItemProps) => (
                  <motion.div
                    key={item.href}
                    onClick={() => {
                      if (isMobile) sidebar.setOpen(false);
                    }}
                    className=" transform text-muted-foreground hover:scale-101 transition-transform  duration-200 hover:translate-x-3 hover:text-[var(--color-purple-500)]   hover:dark:text-[var(--color-purple-300)] pl-20 "
                  >
                    <Link
                      className="text-[15px]"
                      onClick={() => {
                        if (isMobile) {
                          sidebar.setOpen(false);
                        } else {
                          sidebar.setOpen(true);
                        }
                      }}
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}

            <div className="fixed pointer-events-none  bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/80 to-transparent backdrop-blur-xs max-w-xs rounded-b-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
