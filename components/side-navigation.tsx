"use client"

import React, { ReactNode, useState } from "react"
import { AnimatePresence, motion } from 'motion/react';
import Link from "next/link";
import { cn } from "@/lib/cn";

interface SideNavigationProps {
  children?: ReactNode,
}

export function SideNavigation({ children, ...props }: SideNavigationProps) {

  const [show, setShow] = useState(false);

  const items = React.Children.toArray(children)

  return (
    <motion.div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col  rounded-r-lg gap-0.5 bg-foreground border"
      {...props}
      layout
      onMouseEnter={() => {
        setShow(true)
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      initial={{ x: "-100%" }}
      animate={{ x: show ? 0 : "-75%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {items.map((item, index) => (
        <motion.div key={index} className="flex justify-between items-center gap-4 py-1 px-2">
          {/* Links */}
          <AnimatePresence>
            <motion.div
              animate={{ opacity: show ? 1 : 0, x: show ? 0 : "-20%", filter: show ? "blur(0px)" : 'blur(2px)' }}
              transition={{ duration: 0.2 }}
              className=" text-sm ">
              {item}
            </motion.div>
          </AnimatePresence>

          {/* index  */}
          <AnimatePresence>
            <motion.div
              animate={show ? { x: "20%", opacity: 0 } : { x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=" w-5 h-5 text-background rounded flex items-center justify-center text-right ">
              {index + 1}
            </motion.div>
          </AnimatePresence>

        </motion.div>
      ))}
    </motion.div>
  )
}


interface SideNavigationItemProps {
  className?: string,
  title: string,
  href: string
}

export function SideNavigationItem({ title, href, className, ...props }: SideNavigationItemProps) {
  return (
    <Link className={cn("text-muted3 hover:text-background transition-colors duration-200", className)}
      {...props} href={href} >
      {title}
    </Link>

  )
}