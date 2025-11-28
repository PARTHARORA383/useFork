'use client';

import React, { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

export interface CurrentIndexItemProps {
  id: number;
  title: string;
  href: string;
}

export interface CurrentIndexContextProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<SetStateAction<number>>;
  prevIndex: number;
  setPrevIndex: React.Dispatch<SetStateAction<number>>;
  nextIndex: number;
  setNextIndex: React.Dispatch<SetStateAction<number>>;
}

export const currentIndexContext = createContext<CurrentIndexContextProps | null>(null);

export function PrevNext({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);

  return (
    <currentIndexContext.Provider
      value={{ currentIndex, setCurrentIndex, prevIndex, setPrevIndex, nextIndex, setNextIndex }}
    >
      <div>{children}</div>
    </currentIndexContext.Provider>
  );
}

export const useCurrentIndex = () => {
  const context = useContext(currentIndexContext);
  if (!context) throw new Error('use inside usePrevNext');
  return context;
};
