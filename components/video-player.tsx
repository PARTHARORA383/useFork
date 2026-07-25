"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import Link from "next/link";
import { Loader } from "@/components/animate-ui/icons/loader";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  className?: string;
  title?: string;
  href?: string;
}

export const VideoPlayer = memo(function VideoPlayer({
  src,
  className = "",
  title,
  href,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lazy-load the src once the card is near/in view (doesn't autoplay anymore)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(container);

    const rect = container.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
    if (inView) setIsVisible(true);

    return () => observer.disconnect();
  }, []);

  // Play on hover, pause + reset on leave
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  // Track mouse position for the glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-xl bg-muted p-2",
        "cursor-pointer transition-colors duration-300",
        className,
      )}
    >
      {/* Glow overlay — follows cursor, only visible on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 70%)",
        }}
      />

      <div ref={containerRef} className="relative rounded-xl">
        <div className="flex items-center justify-between transition-all duration-200 rounded-xl px-1 py-1.5">
          <span className="text-foreground font-medium">{title}</span>
        </div>
        <div className="relative overflow-hidden rounded-xl border aspect-video bg-muted2">
          {/* Loader */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <VideoLoader text="Loading Video" />
              </motion.div>
            </div>
          )}

          <video
            ref={videoRef}
            src={isVisible ? src : undefined}
            muted
            loop
            playsInline
            preload="none"
            style={{ willChange: "opacity" }}
            onLoadedData={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
});

VideoPlayer.displayName = "VideoPlayer";

function VideoLoader({ text }: { text: string }) {
  return (
    <motion.div
      className="relative flex items-center gap-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Loader size={20} animate />
      <motion.div className="text-sm font-medium select-none text-foreground/50">
        {text}
      </motion.div>
    </motion.div>
  );
}