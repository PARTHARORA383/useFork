"use client";

import { Command, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { CommandK } from "@/components/command-k";
import { useState } from "react";
import { cn } from "@/lib/utils"; // if you have a className merge util, else remove this

export function DynamicIsland() {
  const { setTheme, theme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  const icons = [
    {
      id: "search",
      icon: <Search className="w-4 h-4" />,
      tooltip: "Search",
      onClick: () => {},
    },
    {
      id: "theme",
      icon: theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      tooltip: "Theme",
      onClick: () => setTheme(theme === "light" ? "dark" : "light"),
    },
    {
      id: "github",
      icon: <SiGithub className="w-4 h-4" />,
      tooltip: "GitHub",
      onClick: () => window.open("https://github.com/Partharora383/useFork", "_blank"),
    },
    {
      id: "cmdk",
      icon: <CommandK />,
      tooltip: "Command + K",
      onClick: () => {},
    },
  ];

  return (
    <div className="fixed right-3 bottom-5 z-20">
      <div className="relative bg-muted2 border rounded-2xl flex items-center justify-between gap-3 px-4 py-2 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]">
        {icons.map((item) => (
          <motion.div
            key={item.id}
            className={cn(
              "relative rounded-full border bg-muted3 p-2 flex items-center justify-center cursor-pointer shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
            )}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={item.onClick}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {item.icon}

            {/* Tooltip */}
            {hovered === item.id && (
              <motion.span
                className="absolute bottom-full mb-4 whitespace-nowrap bg-muted2 text-xs border rounded-md px-2 py-1 text-foreground shadow-md dark:bg-muted2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.tooltip}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
