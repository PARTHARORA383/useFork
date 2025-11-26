'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const TabsContext = React.createContext<string | undefined>(undefined);
export const useActiveTab = () => React.useContext(TabsContext);

// Main Tabs component with context to track active tab
export function AnimatedTabs({
  className,
  defaultValue,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={activeTab}
      onValueChange={setActiveTab}
      data-slot="tabs"
      className={cn('flex flex-col gap-2 ', className)}
      {...props}
    >
      {/* Pass activeTab down via context */}
      <TabsContext.Provider value={activeTab}>{props.children}</TabsContext.Provider>
    </TabsPrimitive.Root>
  );
}

// Tabs List for containing triggers
export function AnimatedTabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'relative inline-flex bg-muted rounded-md ',
        'text-sm font-medium text-muted-foreground ',
        className,
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
}

// Tabs Trigger with sliding highlight animation
export function AnimatedTabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const activeTab = useActiveTab();

  const playDrop = () => {
    const drop = new Audio('/sounds/click.mp3');
    drop.volume = 0.4;
    drop.play().catch(() => {});
  };

  const handleOnClick = () => {
    playDrop();
  };

  return (
    <TabsPrimitive.Trigger
      value={value}
      data-slot="tabs-trigger"
      className={cn(
        'relative z-10 flex-1 rounded-md px-4 py-2 transition-colors',
        'data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground active:scale-95 transition-transform duration-200 ease-in-out ',
        className,
      )}
      onClick={handleOnClick}
      {...props}
    >
      {props.children}
      {
        //This code controls the sliding highlight animation you can customise the motion div for your needs
      }
      {activeTab === value && (
        <motion.div
          layoutId="tab-highlight"
          className="absolute inset-0 -z-10 bg-muted2 dark:bg-muted3 rounded-sm shadow-md"
          transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.05 }}
        />
      )}
    </TabsPrimitive.Trigger>
  );
}

// Tabs Content with fade animation
export function AnimatedTabsContent({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content value={value} asChild {...props}>
      <AnimatePresence mode="wait">
        <motion.div key={value} className={cn('flex-1', className)}>
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsPrimitive.Content>
  );
}
