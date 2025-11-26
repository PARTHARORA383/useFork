'use client';

import { ReactNode, useEffect, useState } from 'react';
import { CodeBlockComponent } from '../code-block-component';
import { Installation } from '../installation';
import { ButtonCopy } from '../code-block';
import { motion } from 'motion/react';

interface CLIManualBlockProps {
  command: string;
  codePath: string;
}

export function CLIManualBlock({ command, codePath }: CLIManualBlockProps) {
  const [toggle, setToggle] = useState<'cli' | 'manual'>('cli');

  return (
    <div className="">
      <div className="relative flex items-center gap-4 mb-4 rounded bg-muted p-1 border max-w-[150px] justify-between">
        {/* Sliding Overlay */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
          className="absolute top-1 left-1 h-[calc(100%-8px)] rounded bg-[var(--color-purple-400)] shadow-sm "
          animate={{
            x: toggle === 'cli' ? 0 : '100%',
            width: 'calc(50% - 4px)',
          }}
        />

        {/* CLI Button */}
        <button
          onClick={() => setToggle('cli')}
          className={`relative flex-1 z-10 px-3 py-1 rounded-md text-sm transition
            ${toggle === 'cli' ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          CLI
        </button>

        {/* Manual Button */}
        <button
          onClick={() => setToggle('manual')}
          className={`relative z-10 px-3 flex-1 py-1 rounded-md text-sm transition
            ${toggle === 'manual' ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Manual
        </button>
      </div>

      {/* Content */}
      {toggle === 'manual' ? (
        <motion.div
          key="Manual"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
        >
          <Manual codePath={codePath} />
        </motion.div>
      ) : (
        <motion.div>
          <CLI command={command} />
        </motion.div>
      )}
    </div>
  );
}

interface CLIProps {
  command: string;
}

export function CLI({ command }: CLIProps) {
  return (
    <div>
      <Heading count="1" heading="Run the following command" />
      <Installation command={command} />
    </div>
  );
}

interface ManualProps {
  codePath: string;
}

const cnFile = `import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
`;

export function Manual({ codePath }: ManualProps) {
  return (
    <div>
      <Heading count={'1'} heading="Install Packages" />

      <DependencyBlock codePath={codePath} />

      <Heading count={'2'} heading="Create a file for utility functions" />

      <CodeBlockComponent code={cnFile} fileName="libs/utils.tsx" />

      <Heading count={'3'} heading="Copy Source" />
      <CodeBlockComponent codePath={codePath} id={0} />
    </div>
  );
}

function DependencyBlock({ codePath }: { codePath: string }) {
  const [dependancy, setDependancy] = useState<string[] | []>([]);

  useEffect(() => {
    if (!codePath) return;
    fetch(codePath)
      .then((res) => res.json())
      .then((data) => {
        setDependancy(data.dependencies);
      });
  }, []);

  const text = `npm install ${dependancy.join(' ')}`;

  const handlecopy = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative flex items-center justify-start gap-2 w-full bg-background dark:bg-card border-t px-8 py-3.5 rounded-xl border">
      <span className="text-[var(--color-purple-300)]">npm install</span>
      {dependancy.map((item) => (
        <div key={item} className="flex items-center gap-1">
          <span>{item}</span>
        </div>
      ))}
      <div className="absolute right-3">
        <ButtonCopy onCopy={handlecopy} />
      </div>
    </div>
  );
}

function Heading({ count, heading }: { count: string; heading: string }) {
  return (
    <div>
      <div className="flex items-baseline-last gap-3 mb-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-medium">
          {count}
        </div>
        <h3 className="text-[17px] font-medium text-muted-foreground">{heading}</h3>
      </div>
    </div>
  );
}
