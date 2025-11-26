'use client';

import { createContext, ReactNode, SetStateAction, useContext, useRef, useState } from 'react';

interface OpenCodeContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  popupRef: React.RefObject<HTMLDivElement | null>;
}

export const openCodeContext = createContext<OpenCodeContextProps | null>(null);

function OpenCodeContextfunc({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <openCodeContext.Provider value={{ isOpen, setIsOpen, popupRef: popupRef }}>
      <div>{children}</div>
    </openCodeContext.Provider>
  );
}

const useOpenCodeContext = () => {
  const context = useContext(openCodeContext);
  if (!context) throw new Error('useContext must be used inside CodePopup');
  return context;
};

export { OpenCodeContextfunc, useOpenCodeContext };
