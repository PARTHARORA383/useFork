
"use client"

import { AnimatedTabs, AnimatedTabsContent, AnimatedTabsList, AnimatedTabsTrigger } from '@/components/animated-tabs';
import { WaveInText } from '@/components/wave-in-text';
import { ButtonCopy } from './code-block';

interface InstallationProps {
  command: string;
}

export function Installation({ command }: InstallationProps) {
  // Base install commands for different package managers
  const baseCommands = {
    npm: 'npx shadcn@latest add',
    pnpm: 'pnpm dlx shadcn@latest add',
    yarn: 'yarn create shadcn@latest',
    bun: 'bunx shadcn@latest  add',
  };

  const handleCopy = async (data:string) => {
    await navigator.clipboard.writeText(data)
  }

  return (
    <div className="lg:min-w-3xl max-w-4xl border rounded-xl overflow-x-auto no-scrollbar shadow-sm">
      <AnimatedTabs defaultValue="npm" className='relative bg-muted  dark:bg-muted2 gap-0'>
        <AnimatedTabsList className="gap-2 max-w-lg rounded-t-xl px-2 py-1 dark:bg-muted2">
          <AnimatedTabsTrigger value="npm">npm</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="pnpm">pnpm</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="yarn">yarn</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="bun">bun</AnimatedTabsTrigger>
        </AnimatedTabsList>

      
        {Object.entries(baseCommands).map(([key, base]) => (
          <AnimatedTabsContent  key={key} value={key} className=" w-full bg-background dark:bg-muted border-t px-8 py-3.5">
              <WaveInText yOffset={0} duration={0.5} className="">
                {`${base} ${command}`}
              </WaveInText>
              <div className='absolute right-5 top-2'>
              <ButtonCopy onCopy={()=>{handleCopy(`${base} ${command}`)}}/>
              </div>
          </AnimatedTabsContent>
        ))}
      </AnimatedTabs>
    </div>
  );
}


