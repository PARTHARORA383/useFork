'use client';

import { cn } from '@/lib/utils';
import { createContext, useContext, useRef, useState, HTMLAttributes, ReactNode } from 'react';
import {
  motion,
  AnimatePresence,
  useDragControls,
  DragControls,
} from 'motion/react';
import { GripHorizontal, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

interface ToolbarSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface ToolbarHeaderProps extends ToolbarSectionProps {
  title?: string;
  actions?: ReactNode;
}

type ToolbarContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dragControls: DragControls;
};

const ToolbarContext = createContext<ToolbarContextType | null>(null);

function useToolbar() {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error('OrbToolbar components must be used inside <OrbToolbar>');
  }
  return context;
}

function OrbToolbar({ children, className, defaultOpen = true }: ToolbarProps) {
  const [open, setOpen] = useState(defaultOpen);
  const dragControls = useDragControls();
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <ToolbarContext.Provider value={{ open, setOpen, dragControls }}>
      {/* Invisible full-page bounds — keeps the toolbar draggable anywhere
          on the page without ever letting it drift off-screen. */}
      <div ref={boundsRef} aria-hidden className="pointer-events-none fixed inset-4 z-0" />

      <motion.aside
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum
        dragElastic={0.05}
        dragConstraints={boundsRef}
        dragTransition={{ power: 0.25, timeConstant: 250, bounceStiffness: 400, bounceDamping: 40 }}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        className={cn(
          'fixed top-1/2 z-20 -translate-y-1/2',
          'no-scrollbar xl:min-w-[300px] xl:max-w-[300px] 2xl:min-w-[340px] 2xl:max-w-[340px]',
          'max-h-[85vh] overflow-hidden',
          'rounded-3xl border border-border bg-card/60 shadow-lg backdrop-blur-md',
          'flex flex-col',
          className
        )}
      >
        {children}
      </motion.aside>
    </ToolbarContext.Provider>
  );
}

function OrbToolbarHeader({ title, actions, children, className, ...props }: ToolbarHeaderProps) {
  const { open, setOpen, dragControls } = useToolbar();

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 border-b border-border bg-card/60 px-3 py-2.5 backdrop-blur-md',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span
          onPointerDown={(e) => dragControls.start(e)}
          style={{ touchAction: 'none' }}
          className="cursor-grab select-none text-muted-foreground active:cursor-grabbing"
        >
          <GripHorizontal className="h-4 w-4" />
        </span>
        {title ? (
          <span className="truncate text-sm font-medium tracking-wider text-foreground">
            {title}
          </span>
        ) : null}
        {children}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {actions}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="h-7 w-7 rounded-md text-muted-foreground"
        >
          <motion.span
            animate={{ rotate: open ? 0 : -180 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex"
          >
            <ChevronsUpDown className="h-4 w-4" />
          </motion.span>
        </Button>
      </div>
    </div>
  );
}

function OrbToolbarBody({ children, className, ...props }: ToolbarSectionProps) {
  const { open } = useToolbar();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="orb-toolbar-body"
          initial={{ height: 0, opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
          animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ height: 0, opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div
            className={cn('max-h-[65vh] flex-1 space-y-5 overflow-y-auto px-3 py-5', className)}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { OrbToolbar, OrbToolbarHeader, OrbToolbarBody };
