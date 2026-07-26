
"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-between border-t px-8 py-4">
      {/* Small spotlight wordmark logo */}
     <Link
          href="https://usefork.dev"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
         USEFORK
        </Link>

      {/* Right side links */}
      <div className="flex items-center gap-5">
        <Link
          href="https://github.com/Partharora383/usefork"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          3
        </Link>

        <Link
          href="https://partharora.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
          Built by Partharora
        </Link>
      </div>
    </footer>
  );
}