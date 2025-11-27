'use client';

import React, { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

export interface CurrentIndexItemProps {
  id: number;
  title: string;
  href: string;
}

export interface CurrentIndexContextProps {
  currentIndex: CurrentIndexItemProps;
  setCurrentIndex: React.Dispatch<SetStateAction<CurrentIndexItemProps>>;
}

export const currentIndexContext = createContext<CurrentIndexContextProps | null>(null);

export function PrevNext({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState<CurrentIndexItemProps>({
    id: 1,
    title: 'Introduction',
    href: '/docs',
  });

  return (
    <currentIndexContext.Provider value={{ currentIndex, setCurrentIndex }}>
      <div>{children}</div>
    </currentIndexContext.Provider>
  );
}

export const useCurrentIndex = () => {
  const context = useContext(currentIndexContext);
  if (!context) throw new Error('use inside usePrevNext');
  return context;
};
