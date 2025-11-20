"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/cn";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });


export function TextVideoMaskContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}


export function VideoBackground({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  );
}


export function MaskedText({
  texts = ["DRIVE", "DESIGN", "PASSION"],
  className,
  opacity = 0.8,
}: {
  texts?: string[];
  className?: string;
  opacity?: number;
}) {
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => (prev === texts.length - 1 ? 0 : prev + 1));
    }, 1200);

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div
      className={cn("font-bold text-white select-none bg-black flex items-center leading-tight tracking-tighter justify-center", bebas.className, className)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        mixBlendMode: "multiply",
      }}
    >
      {texts[activeId]}
    </div>
  );
}

