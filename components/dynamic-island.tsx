"use client"

import { Command, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from 'motion/react'
import { SiGithub } from "react-icons/si";
import { useState } from "react";


export function DynamicIsland() {

  const { setTheme, theme, resolvedTheme } = useTheme();



  return (
    <div className="">
      <div className=" fixed right-3 bottom-5 bg-muted2 rounded-2xl flex items-center justify-between gap-3 border px-4 py-2  shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] cursor-pointer z-20 ">

        <div className="rounded-full bg-muted3 border p-2 flex items-center justify-center  shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)] active:scale-98">
          <Search className="w-4 h-4 font-bold cursor-pointer" />
        </div>
        <motion.div
          className="rounded-full border bg-muted3 p-2 flex items-center justify-center
    shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]
    dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]"
          key={theme} // re-render when theme changes
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 360, scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >

          {theme === "light" ? (
            <Sun className="w-4 h-4 font-bold" />
          ) : (
            <Moon className="w-4 h-4 font-bold" />
          )}

        </motion.div>
        <motion.div className="relative rounded-full border p-2 flex bg-muted3 items-center justify-center  shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]">
          <SiGithub className="w-4 h-4 font-bold" />
        </motion.div>
        <div className="rounded-full border p-2 flex bg-muted3 items-center justify-center  shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_3px_rgba(255,255,255,0.1)]">
          <Command className="w-4 h-4 font-bold" />
        </div>

      </div>
    </div>
  )
}