"use client"

import { RollInText } from "@/components/roll-in-text";


export function RollInTextDemo() {
  return (
    <div>
      <div className='flex flex-col md:flex-row justify-center md:items-center md:gap-4'>
        <RollInText className=' playfair-display-400 font-bold text-3xl md:text-5xl text-red-500 '>
          REDEFINING
        </RollInText>
        <RollInText className='font-medium text-3xl md:text-5xl '>
          LIMITS,
        </RollInText>
      </div>
      <div className='flex md:items-center flex-col md:flex-row justify-center  md:gap-4'>
        <RollInText className='font-medium text-3xl md:text-5xl '>
          FIGHTING FOR
        </RollInText>
        <RollInText className='font-bold  playfair-display-400  text-red-500 text-3xl md:text-5xl '>
          WINS
        </RollInText>
      </div>
    </div>
  )
}

