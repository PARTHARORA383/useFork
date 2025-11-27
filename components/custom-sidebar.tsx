'use client';

import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement | null>(null);

  const docsData: DataProps[] = [
    {
      heading: 'overview',
      items: [{ title: 'Introduction', href: '/docs' }],
    },
  ];

  const data = [
    {
      heading: 'interactive',
      items: [
        { title: 'Reveal Button', href: '/docs/reveal-button' },
        { title: 'StopWatch', href: '/docs/stopwatch' },
        { title: 'Parallax Image', href: '/docs/parallax-images' },
        { title: 'Banner Carousal', href: '/docs/banner-carousal' },
        { title: 'Code Block', href: '/docs/code-block' },
        { title: 'Save Toggle', href: '/docs/save-toggle' },
        { title: 'Flip Card', href: '/docs/flip-card-hover' },
        { title: 'Side Navigation', href: '/docs/side-navigation' },
        { title: 'Text Video Mask', href: '/docs/text-video-mask' },
        { title: 'Text Hover Marquee', href: '/docs/text-hover-marquee' },
      ],
    },
    {
      heading: 'text-wrappers',
      items: [
        { title: 'Wave Effect', href: '/docs/wave-in-text' },
        { title: 'Rollin Effect ', href: '/docs/roll-in-text' },
        { title: 'RollOver Effect ', href: '/docs/roll-over-text' },
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
    sidebar.setOpen(false);
  }, []);

  const playDrop = () => {
    const drop = new Audio('/sounds/click.mp3');
    drop.volume = 0.4;
    drop.play().catch(() => {});
  };

  const handleOnClick = () => {
    playDrop();
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        sidebar.setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebar, ref]);

  return (
    <>
      <button
        className="fixed top-15 lg:top-7 left-4 md:left-6 p-1 text-muted-foreground hover:text-[var(--color-purple-500)] dark:hover:text-[var(--color-purple-300)] z-25 bg-background transition-colors duration-200 rounded-md"
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
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="p-4 space-y-2 fixed  top-0 left-0 z-20 md:bg-muted3 bg-muted dark:bg-muted/40 backdrop-blur-2xl ml-2 mb-2 mr-2  md:pl-8 pt-32 md:pt-32 pb-16  mt-4 border pr-12 rounded-l-lg h-[calc(100vh-2rem)] overflow-scroll no-scrollbar"
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
                        sidebar.setOpen(false);
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
                      sidebar.setOpen(false);
                    }}
                    className=" transform text-muted-foreground hover:scale-101 transition-transform  duration-200 hover:translate-x-3 hover:text-[var(--color-purple-500)]   hover:dark:text-[var(--color-purple-300)] pl-20 "
                  >
                    <Link
                      className="text-[15px]"
                      onClick={() => {
                        sidebar.setOpen(false);
                      }}
                      href={item.href}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
