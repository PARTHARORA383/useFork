import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from '@/components/animated-tabs';

export function AnimatedTabsDemo() {
  return (
    <>
      <AnimatedTabs defaultValue="preview">
        <AnimatedTabsList>
          <AnimatedTabsTrigger value="preview">Preview</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="code">Code</AnimatedTabsTrigger>
        </AnimatedTabsList>
        <AnimatedTabsContent value="preview">
          <div className="p-4 rounded-lg border">Preview Content</div>
        </AnimatedTabsContent>
        <AnimatedTabsContent value="code">
          <div className="p-4 rounded-lg border">Code Content</div>
        </AnimatedTabsContent>
      </AnimatedTabs>
    </>
  );
}

//Creator - Partharora
//X - https://x.com/partharora9128
