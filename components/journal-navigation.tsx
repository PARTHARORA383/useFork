import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface JournalProps {
  journal: string;
}

interface JournalNavigationProps {
  data: JournalProps[];
  children?: ReactNode;
  className?: string;
}

export function JournalNavigation({ data, children, className, ...props }: JournalNavigationProps) {
  return <div className={cn('', className)}></div>;
}
