import { cn } from "@/lib/cn"
import { ReactNode } from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import {motion} from 'motion/react'
import { WaveInText } from "./wave-in-text"






function InstallationBlock({className , ...props }:React.ComponentProps<typeof TabsPrimitive.Root>){

  return (
    <TabsPrimitive.Root className={cn("border rounded-xl flex flex-col",className)} {...props}>
      {props.children}
    </TabsPrimitive.Root>
  )
}



function InstallationTabsList({children , className ,...props}:React.ComponentProps<typeof TabsPrimitive.List>){

  return (
    <TabsPrimitive.List className={cn("",className)} {...props}>
      {children}
    </TabsPrimitive.List>
  )
}


function InstallationTabTrigger({ className , ...props}:React.ComponentProps<typeof TabsPrimitive.Trigger>){

  return (
     <TabsPrimitive.Trigger className={cn("",className)} {...props}>
      {props.children}
    </TabsPrimitive.Trigger>
  )
}


interface InstallationContentProps
  extends React.ComponentProps<typeof TabsPrimitive.Content> {
  yOffset?: number
  blurAmount?: number
  duration?: number
  children : string
}


function InstallationContent({  children , className , yOffset =0 , blurAmount , duration = 0.5 ,...props}:InstallationContentProps){

const text = children.split("").map((char) => (char === " " ? "\u00A0" : char))

  return (
     <TabsPrimitive.Content className={cn("",className)} {...props}>
        {text.map((char : string, index:number)  => (
            <motion.span
              key={index}
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: yOffset, filter: `blur(${blurAmount}px)` }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: yOffset, filter: `blur(${blurAmount}px)` }}
              transition={{
                duration,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>))}
    </TabsPrimitive.Content>
  )
}

export {InstallationBlock , InstallationContent , InstallationTabTrigger , InstallationTabsList}