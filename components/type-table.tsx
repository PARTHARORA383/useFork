'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/cn';
import { type ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

export interface ParameterNode {
  name: string;
  description: ReactNode;
}

export interface TypeNode {
  description?: ReactNode;
  type: ReactNode;
  typeDescription?: ReactNode;
  typeDescriptionLink?: string;
  default?: ReactNode;
  required?: boolean;
  deprecated?: boolean;
  parameters?: ParameterNode[];
  returns?: ReactNode;
}

// Name styling: purple and optional strikethrough if deprecated
const keyVariants = cva('font-sans text-[16px] dark:bg-gradient-to-br text-purple-400  dark:from-[var(--color-purple-300)] dark:to-white bg-clip-text dark:text-transparent ', {
  variants: {
    deprecated: {
      true: 'line-through text-[var(--color-purple-300)/50]',
    },
  },
});

// Field labels like "Type", "Default"
const fieldVariants = cva('font-sans text-[16px] text-fd-muted-foreground not-prose pe-2');

export function TypeTable({ type }: { type: Record<string, TypeNode> }) {
  return (
    <div className="flex flex-col p-2 bg-muted2 rounded-2xl border my-6 text-[16px] font-sans overflow-hidden">
      <div className="flex font-medium items-center px-3 py-1 not-prose text-fd-muted-foreground">
        <p className="w-[25%]">Prop</p>
        <p className="max-xl:hidden">Type</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item key={key} name={key} item={value} />
      ))}
    </div>
  );
}

function Item({
  name,
  item: {
    parameters = [],
    description,
    required = false,
    deprecated,
    typeDescription,
    default: defaultValue,
    type,
    typeDescriptionLink,
    returns,
  },
}: {
  name: string;
  item: TypeNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        'rounded-xl border overflow-hidden transition-all',
        open
          ? 'shadow-sm  not-last:mb-2 bg-muted3/50'
          : 'border-transparent',
      )}
    >
      <CollapsibleTrigger className="relative flex flex-row items-center w-full group text-start px-3 py-2 not-prose hover:bg-muted3/50">
        <code
          className={cn(
            keyVariants({
              deprecated,
              className: 'min-w-fit w-[25%] font-medium',
            }),
          )}
        >
          {name}
          {!required && '?'}
        </code>
        {typeDescriptionLink ? (
          <Link href={typeDescriptionLink} className="underline max-xl:hidden">
            {type}
          </Link>
        ) : (
          <span className="max-xl:hidden">{type}</span>
        )}
        <ChevronDown className="absolute end-2 size-4 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 p-3 overflow-auto fd-scroll-container border-t text-[16px] font-sans">
          <div className="text-[16px] prose col-span-full prose-no-margin empty:hidden">
            {description}
          </div>
          {typeDescription && (
            <>
              <p className={cn(fieldVariants())}>Type</p>
              <p className="my-auto not-prose">{typeDescription}</p>
            </>
          )}
          {defaultValue && (
            <>
              <p className={cn(fieldVariants())}>Default</p>
              <p className="my-auto not-prose">{defaultValue}</p>
            </>
          )}
          {parameters.length > 0 && (
            <>
              <p className={cn(fieldVariants())}>Parameters</p>
              <div className="flex flex-col gap-2">
                {parameters.map((param) => (
                  <div
                    key={param.name}
                    className="inline-flex items-center flex-wrap gap-1"
                  >
                    <p className="font-medium not-prose bg-gradient-to-br from-[var(--color-purple-300)] to-[var(--color-purple-500)] bg-clip-text text-transparent">
                      {param.name} -
                    </p>
                    <div className="text-[16px] prose prose-no-margin">
                      {param.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {returns && (
            <>
              <p className={cn(fieldVariants())}>Returns</p>
              <div className="my-auto text-[16px] prose prose-no-margin">
                {returns}
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
