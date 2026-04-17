'use client';

import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({ src, title, className }: VideoPlayerProps) {
  return (
    <div
      className={cn(
        // Default: fixed square
        'relative w-80 aspect-square overflow-hidden rounded-2xl bg-black',
        className,
      )}
    >
      {/* Video */}
      <video src={src} controls className="absolute inset-0 h-full w-full object-cover" />

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-end justify-between text-white">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="text-xs opacity-70 tracking-wider">USEFORK</div>
        </div>
      </div>
    </div>
  );
}
