
"use client"
import React, { useState } from "react"
import { cn } from "@/lib/cn";

interface HoldRevealContextProps {
  isHolding: boolean;
  setIsHolding: React.Dispatch<React.SetStateAction<boolean>>;
}

const HoldRevealContext = React.createContext<HoldRevealContextProps | undefined>(undefined);

const useHoldRevealContext = () => {

  const context = React.useContext(HoldRevealContext);
  if (!context) {
    throw new Error("useHoldRevealContext must be used within a HoldRevealProvider");
  }
  return context;
}

interface HoldRevealButtonProps {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onComplete?: () => void;
}

export function HoldRevealButton({ children, className, text = 'Hold to delete', icon = <TrashedIcon />, onComplete }: HoldRevealButtonProps) {

  const [isHolding, setIsHolding] = useState(false);

  return (
    <HoldRevealContext.Provider value={{ isHolding, setIsHolding }}>
      <button
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onMouseLeave={() => setIsHolding(false)}
        className={cn('relative rounded-full p-2 px-5 overflow-hidden bg-background cursor-pointer active:scale-95 transition-transform duration-200 flex items-center gap-2', className)}>

        {children}
        {icon}
        {text}

      </button>
    </HoldRevealContext.Provider>
  )
}


interface HoldRevealButtonProps {
  className?: string;
  text?: string;
  icon?: React.ReactNode;
}


export function HoldRevealButtonOverlay({ className, text = 'Hold to delete', icon = <TrashedIcon /> }: HoldRevealButtonProps) {

  const { isHolding } = useHoldRevealContext();

  return (
    <div className={cn('absolute inset-0 p-2 px-5 text-white bg-red-400 transition-[clip-path] duration-1000 linear flex items-center gap-2 justify-center', className)}
      style={{
        clipPath: isHolding ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
      }}
    >
      {icon}
      {text}
    </div>

  )
}

function TrashedIcon() {
  return (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
        fill="currentColor"
      />
    </svg>
  );
}