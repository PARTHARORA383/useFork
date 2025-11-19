'use client';

import { RollInText } from '@/components/roll-in-text';

export function RollInTextDemo() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
        <RollInText className=" playfair-display-400 font-bold text-xl md:text-2xl lg:text-4xl text-red-500  ">
          REDEFINING
        </RollInText>
        <RollInText className="font-medium  text-xl md:text-2xl lg:text-4xl ">LIMITS,</RollInText>
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <RollInText className="font-medium text-xl md:text-2xl lg:text-4xl ">
          FIGHTING FOR
        </RollInText>
        <RollInText className="font-bold  playfair-display-400  text-red-500 text-xl md:text-2xl lg:text-4xl ">
          WINS
        </RollInText>
      </div>
    </div>
  );
}

//Creator - Parth Arora
//X - https://x.com/partharora9128
