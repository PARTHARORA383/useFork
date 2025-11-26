import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AnimatedInputBar } from './components/animated-inputbar';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { PreviewCode } from '@/components/preview/preview-code';
import { CodePopup } from '@/components/preview/code-popup';
import { CodeBlockComponent } from '@/components/code-block-component';
import { CLIManualBlock } from '@/components/preview/cli-manual';
import { Table } from '@/components/table';
import { HeadingDescription } from '@/components/preview/heading-description';
import { AnimatedTabsDemo } from '@/components/demo/animated-tabs-demo';
import { CodeBlockDemo } from '@/components/demo/code-block-demo';
import { ToolbarDemo } from '@/components/demo/toolbar-demo';
// import { MusicPlayerDemo } from '@/components/demo/music-player-demo';
import { WaveInTextDemo } from '@/components/demo/wave-in-text-demo';
import { Installation } from '@/components/installation';
import { RollInTextDemo } from '@/components/demo/roll-in-text-demo';
import { MouseParallaxImagesDemo } from '@/components/demo/parallax-images-demo';
import { StopwatchDemo } from '@/components/demo/stopwatch-demo';
import { BannerCarousalDemo } from '@/components/demo/banner-carousal-demo';
import { RevealButtonDemo } from '@/components/demo/reveal-button-demo';
import { RollOverTextDemo } from '@/components/demo/roll-over-text-demo';
import { SaveToggleDemo } from '@/components/demo/save-toggle-demo';
import { FlipCardOnHoverDemo } from '@/components/demo/flip-card-hover-demo';
import { SideNavigationDemo } from '@/components/demo/side-navigation-demo';
import { TextVideoMaskDemo } from '@/components/demo/text-video-mask-demo';
import { NotificationDemo } from '@/components/demo/notification-demo';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Tabs: (props) => <Tabs {...props} className="font-sans bg-transparent border-0 " />,
    Tab: (props) => <Tab {...props} className=" rounded-md mt-8" />,
    DynamicCodeBlock,
    PreviewCode,
    Installation,
    Table,
    CodePopup,
    HeadingDescription,
    CLIManualBlock,
    CodeBlockComponent,
    AnimatedInputBar,
    AnimatedTabsDemo,
    CodeBlockDemo,
    ToolbarDemo,
    // MusicPlayerDemo,
    WaveInTextDemo,
    RollInTextDemo,
    RollOverTextDemo,
    MouseParallaxImagesDemo,
    BannerCarousalDemo,
    StopwatchDemo,
    RevealButtonDemo,
    SaveToggleDemo,
    FlipCardOnHoverDemo,
    SideNavigationDemo,
    TextVideoMaskDemo,
    NotificationDemo,
  };
}
