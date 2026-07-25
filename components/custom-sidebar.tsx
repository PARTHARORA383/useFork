'use client';

import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { NavigationLinkData, NavItem, NavSubheading } from '@/lib/navigation-link';
import { useCurrentIndex } from '@/hooks/use-prev-next';
import { getAllPages } from './previous-next';

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
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { currentIndex, setCurrentIndex } = useCurrentIndex();

  const pages = getAllPages();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1028);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Mobile starts closed, desktop starts open.
    sidebar.setOpen(window.innerWidth > 1028);
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

      {/* Always mounted (never unmounted on close) so scroll position and
          layout stay intact between opens — only visibility animates. */}
      <motion.div
        ref={ref}
        animate={{ opacity: sidebar.open ? 1 : 0, x: sidebar.open ? 0 : -100 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        aria-hidden={!sidebar.open}
        style={{ pointerEvents: sidebar.open ? 'auto' : 'none' }}
        className="p-4 space-y-2 fixed  top-0 left-0 z-20 md:bg-muted3 bg-muted dark:bg-muted/40 backdrop-blur-2xl ml-4 mb-2 mr-2  md:pl-8 pt-24 md:pt-32 pb-16  mt-4 border pr-12 rounded-lg h-[calc(100vh-2rem)] overflow-scroll no-scrollbar"
      >
        {NavigationLinkData.map((section) => (
          <div key={section.heading}>
            <div className="flex items-center justify-start gap-3 mb-4 ">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-purple-400)] to-amber-50"></div>
              <h1 className="cursor-default text-[17px]  font-medium text-accent-foreground">
                {section.heading}
              </h1>
            </div>

            <div>
              {section.subheadings.map((items: NavSubheading) => (
                <div key={items.subheading}>
                  <div className="delius-swash-caps-regular text-[17px] text-foreground flex items-center justify-center gap-2">
                    <span className="h-[1px] bg-foreground w-full border flex-1"></span>
                    <h1 className="whitespace-nowrap">{items.subheading}</h1>
                  </div>

                  {
                    //links-start
                  }
                  {items.items.map((link: NavItem) => {
                    const isActive = pathname === link.href;

                    return (
                      <motion.div
                        key={link.href}
                        className={`transform transition-transform duration-200 hover:scale-101 hover:translate-x-3 pl-20 ${
                          isActive
                            ? 'text-[var(--color-purple-500)] dark:text-[var(--color-purple-300)] font-medium'
                            : 'text-muted-foreground hover:text-[var(--color-purple-500)] hover:dark:text-[var(--color-purple-300)]'
                        }`}
                      >
                        <Link
                          className="text-[15px]"
                          onClick={() => {
                            // Prevent fumadocs' SidebarProvider from auto-closing
                            // the sidebar on this route change.
                            sidebar.closeOnRedirect.current = false;
                            setCurrentIndex(link.id);
                          }}
                          href={link.href}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    );
                  })}
                  {
                    //link--end
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
