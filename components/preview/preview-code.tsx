'use client';

import { useEffect, useState } from 'react';
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from '@/components/animated-tabs';
import { CodeBlockComponent } from '@/components/code-block-component';
import { cn } from '@/lib/cn';

type position =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

interface PreviewCodeProps {
  secondClassName?: string;
  className?: string;
  component?: React.ReactNode;
  codePath?: string;
  position?: position;
}

interface CodeBlockDataType {
  code: string;
  language?: string;
  fileName?: string;
}

export function PreviewCode({
  className,
  secondClassName,
  codePath,
  component,
  position = 'center',
}: PreviewCodeProps) {

  const positionClasses = {
    center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    top: 'absolute top-5 left-1/2 -translate-x-1/2',
    bottom: 'absolute bottom-5 left-1/2 -translate-x-1/2',
    left: 'absolute left-0 top-1/2 -translate-y-1/2',
    right: 'absolute right-5 top-1/2 -translate-y-1/2',
    'top-right': 'absolute top-5 right-5',
    'top-left': 'absolute top-5 left-5',
    'bottom-right': 'absolute bottom-5 right-5',
    'bottom-left': 'absolute bottom-5 left-5',
  }[position];

  const [data, setData] = useState<CodeBlockDataType>();

  useEffect(() => {
    if (!codePath) return;

    fetch(codePath)
      .then((res) => res.json())
      .then((data) => {
        console.log('Loaded code:', data.files);
        setData({
          code: data.files[1].content,
          language: data.files[1].language,
          fileName: data.files[1].path,
        });
      })
      .catch((err) => {
        console.error('Failed to load code:', err);
        setData({
          code: '',
        });
      });
  }, []);

  return (
    <>
      <AnimatedTabs defaultValue="preview" className="max-w-4xl flex gap-4">
        <AnimatedTabsList className="max-w-[300px] py-1.5 px-2">
          <AnimatedTabsTrigger className="text-sm p-1.5" value="preview">
            Preview
          </AnimatedTabsTrigger>
          <AnimatedTabsTrigger className="text-sm p-1.5" value="code">
            Code
          </AnimatedTabsTrigger>
        </AnimatedTabsList>

        <AnimatedTabsContent value="preview">
          <div
            className={cn(
              ' bg-[var(--muted2)] dark:bg-[var(--muted2)] border rounded-lg overflow-hidden min-h-[500px]',
              className,
            )}
          >
            <div className={cn('', positionClasses , secondClassName )}>{component}</div>
          </div>
        </AnimatedTabsContent>

        <AnimatedTabsContent value="code" className="">
          <div className="">
            <CodeBlockComponent data={data} />
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </>
  );
}
