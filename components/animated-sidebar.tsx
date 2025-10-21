"use client"

import Link from "next/link";
import {motion } from 'motion/react'
import { ReactNode } from "react";
import { cn } from "@/lib/cn";


type SidebarProps = {
  children ? : ReactNode,
  className ? : string,
}


function SideBar({children , className , ...props}:SidebarProps){
  return (
    <div className={cn("p-3" , className)} {...props}>
      {children}
    </div>
  )
}
type SidebarHeadingProps ={
  children ? : ReactNode,
  className ? : string,
}

function SideBarHeading({children , className , ...props } : SidebarHeadingProps){
  return (
    <div className={cn("" , className)} {...props}>
    {children}      
    </div>
  )
}


function AnimatedSidebarLink({
  href
} : {href : string}){
  return (
    <div>
      <Link href={href}></Link>
    </div>
  )
}
