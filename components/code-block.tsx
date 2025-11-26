'use client';

import { cn } from '@/lib/cn';
import {
  HTMLAttributes,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  MouseEvent,
  useRef,
} from 'react';
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type LanguageInput,
  type SpecialLanguage,
} from 'shiki';
import React from 'react';
import { Check, Copy, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter(lang: string, themes: string[]) {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes,
      langs: [lang],
    });
  }
  const highlighter = await highlighterPromise;

  // ensure language is loaded
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(lang as BundledLanguage | LanguageInput | SpecialLanguage);
  }

  return highlighter;
}

type CodeBlockDataProps = {
  lang: string;
  code: string;
  themes?: { light: string; dark: string };
};

const codeBlockClassName = cn(
  'mt-0 bg-card text-sm text-[17px]',
  '[&_pre]:py-4',
  '[&_.shiki]:!bg-transparent',
  '[&_code]:w-full',
  '[&_code]:grid',
  '[&_code]:bg-transparent',
  '[&_.line]:px-4',
  '[&_.line]:w-full',
  '[&_.line]:relative',
);

const darkModeClassNames = cn(
  'dark:[&_.shiki]:!text-[var(--shiki-dark)]',
  // "dark:[&_.shiki]:!bg-[var(--shiki-dark-bg)]",
  'dark:[&_.shiki]:![font-style:var(--shiki-dark-font-style)]',
  'dark:[&_.shiki]:![font-weight:var(--shiki-dark-font-weight)]',
  'dark:[&_.shiki]:![text-decoration:var(--shiki-dark-text-decoration)]',
  'dark:[&_.shiki_span]:!text-[var(--shiki-dark)]',
  'dark:[&_.shiki_span]:![font-style:var(--shiki-dark-font-style)]',
  'dark:[&_.shiki_span]:![font-weight:var(--shiki-dark-font-weight)]',
  'dark:[&_.shiki_span]:![text-decoration:var(--shiki-dark-text-decoration)]',
);

export async function codeToHtml({
  code,
  lang = 'tsx',
  themes = { light: 'github-light', dark: 'catppuccin-frappe' },
}: CodeBlockDataProps) {
  const highlighter = await getHighlighter(lang, [themes.light, themes.dark]);
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      dark: themes.dark,
      light: themes.light,
    },
    defaultColor: false,
    cssVariablePrefix: '--_s-',
  });
}

type CodeBlockData = {
  code: string;
  language?: string;
  fileName?: string;
};

export type CodeBlockContextType = {
  data: CodeBlockData;
};

const CodeContext = React.createContext<CodeBlockContextType | undefined>(undefined);

export const useCodeContext = () => {
  const context = React.useContext(CodeContext);
  if (!context) throw new Error('Data must be passed as an object in CodeBlock');

  return context;
};

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  data: CodeBlockData;
};

function CodeBlock({ children, className, data, ...props }: CodeBlockProps) {
  return (
    <CodeContext.Provider value={{ data }}>
      <div className={cn('relative rounded-lg border border-border bg-card', className)} {...props}>
        {children}
      </div>
    </CodeContext.Provider>
  );
}

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>;

function CodeBlockHeader({ children, className, ...props }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between  border-b border-border px-3 py-2 font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockFilename({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { data } = useCodeContext();

  return (
    <div className={cn('truncate text-sm opacity-80 cursor-default', className)} {...props}>
      {data.fileName ?? 'filename.tsx'}
    </div>
  );
}

export interface ButtonCopyProps {
  onCopy?: () => Promise<void> | void;
  idleIcon?: ReactNode;
  loadingIcon?: ReactNode;
  successIcon?: ReactNode;
  className?: string;
  duration?: number;
  loadingDuration?: number;
  disabled?: boolean;
}

const defaultIcons = {
  idle: <Copy size={14} />,
  loading: <LoaderCircle size={14} className="animate-spin" />,
  success: <Check size={14} />,
};

function ButtonCopy({
  onCopy,
  idleIcon = defaultIcons.idle,
  loadingIcon = defaultIcons.loading,
  successIcon = defaultIcons.success,
  className = '',
  duration = 1000,
  loadingDuration = 500,
  disabled = false,
}: ButtonCopyProps) {
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');
  const handleClick = useCallback(async () => {
    setButtonState('loading');
    if (onCopy) await onCopy();
    setTimeout(() => {
      setButtonState('success');
    }, loadingDuration);
    setTimeout(() => {
      setButtonState('idle');
    }, loadingDuration + duration);
  }, [onCopy, loadingDuration, duration]);

  const icons = {
    idle: idleIcon,
    loading: loadingIcon,
    success: successIcon,
  };

  return (
    <>
      <div className="relative flex justify-center">
        <button
          type="button"
          className={`bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 disabled:opacity-50 ${className}`}
          disabled={buttonState !== 'idle' || disabled}
          onClick={handleClick}
          aria-label={buttonState === 'loading' ? 'Copying...' : 'Copy'}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              initial={{ opacity: 0, y: -25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
              key={buttonState}
              className="flex w-full items-center justify-center"
            >
              {icons[buttonState]}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}

function CodeBlockCopyButton() {
  const { data } = useCodeContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ButtonCopy onCopy={handleCopy} className="text-xs opacity-70 hover:opacity-100 transition" />
  );
}

export type CodeBlockContentProps = HTMLAttributes<HTMLDivElement> & {
  themes?: { light: string; dark: string };
  rippleEffect?: boolean;
};

function CodeBlockContent({ className, themes, rippleEffect, ...props }: CodeBlockContentProps) {
  const [highlighted, setHighlighted] = useState<string>('');
  const { data } = useCodeContext();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [isExpanded, setIsExpanded] = useState(false);
  const compressTimeout = useRef<NodeJS.Timeout | null>(null);

 
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const playDrop = () => {
    const drop = new Audio('/sounds/click.mp3');
    drop.volume = 0.4;
    drop.play().catch(() => {});
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - 10);
    y.set(e.clientY - rect.top - 10);
  };

  const handleClick = () => {
    playDrop();
  };

  // --- existing highlight logic ---
  useEffect(() => {
    let mounted = true;
    const appliedThemes = themes ?? {
      light: 'github-light',
      dark: 'catppuccin-frappe',
    };

    async function highlight() {
      const lang = data.language ?? 'tsx';
      const code = data.code ?? '';
      const highlighter = await getHighlighter(lang, [appliedThemes.light, appliedThemes.dark]);
      const html = await highlighter.codeToHtml(code, {
        lang,
        themes: {
          light: appliedThemes.light,
          dark: appliedThemes.dark,
        },
        defaultColor: 'light',
      });
      if (mounted) setHighlighted(html);
    }

    highlight();
    return () => {
      mounted = false;
    };
  }, [data.code, data.language, themes]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
    const baseHeight = Math.max((el.clientHeight / el.scrollHeight) * el.clientHeight, 20);

    setThumbTop(ratio * (el.clientHeight - baseHeight));
    setThumbHeight(baseHeight);
    setIsExpanded(true);

    if (compressTimeout.current) clearTimeout(compressTimeout.current);
    compressTimeout.current = setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  return (
    <>
      {rippleEffect == false ? (
        <div className="relative">
          <div
            ref={containerRef}
            className={cn(
              'overflow-visible not-prose bg-muted dark:bg-card/50  cursor-none', // ⬅ cursor hidden
              className,
              codeBlockClassName,
              darkModeClassNames,
            )}
            onScroll={handleScroll}
            onMouseMove={handleMouseMove}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            dangerouslySetInnerHTML={{ __html: highlighted }}
            {...props}
          />

          {/* Smooth custom SVG scrollbar (existing) */}
          <svg className="absolute top-0 right-0 h-full w-2 z-20" style={{ pointerEvents: 'none' }}>
            <motion.rect
              width="8"
              rx="4"
              animate={{
                y: thumbTop,
                height: isExpanded ? thumbHeight + 10 : thumbHeight,
                opacity: isExpanded ? 0.8 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 28,
                mass: 0.8,
              }}
              className="fill-foreground/50"
              x="2"
            />
          </svg>

          <style jsx>{`
            div {
              overflow: auto;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      ) : (
        <div className="relative">
          <RippleEffect>
            <div
              ref={containerRef}
              className={cn(
                'overflow-visible not-prose bg-muted dark:bg-card',
                className,
                codeBlockClassName,
                darkModeClassNames,
              )}
              onScroll={handleScroll}
              onMouseMove={handleMouseMove}
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              dangerouslySetInnerHTML={{ __html: highlighted }}
              {...props}
            />
          </RippleEffect>

          <svg className="absolute top-0 right-0 h-full w-2 z-20" style={{ pointerEvents: 'none' }}>
            <motion.rect
              width="8"
              rx="4"
              animate={{
                y: thumbTop,
                height: isExpanded ? thumbHeight + 2 : thumbHeight,
                opacity: isExpanded ? 0.8 : 0.5,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 28,
                mass: 0.8,
              }}
              className="fill-foreground/50"
              x="2"
            />
          </svg>

          <style jsx>{`
            div {
              overflow: auto;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
}

export default function RippleEffect({
  children,
  color = 'rgba(255, 255, 255, 0.4)',
  duration = 0.6,
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const createRipple = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, duration * 1000);
  };

  return (
    <div onClick={createRipple} className="relative overflow-hidden cursor-pointer">
      {children}

      {/* Ripple Layer */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 9, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: 'easeOut' }}
            className="absolute rounded-full backdrop-blur-2xl z-20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockFilename,
  CodeBlockCopyButton,
  CodeBlockContent,
  ButtonCopy,
};
