import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AnimatedInputBar } from './components/animated-inputbar';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { PreviewComponents } from './components/preview/preview-components';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { PreviewCode } from './components/preview-code';
import {AnimatedTabsDemo} from '@/components/demo/animated-tabs-demo'
import { CodeBlockDemo } from '@/components/demo/code-block-demo';
import { ToolbarDemo } from '@/components/demo/toolbar-demo';
// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Tabs: (props) => <Tabs {...props} className="font-sans bg-transparent border-0 " />,
    Tab: (props) => <Tab {...props} className=" rounded-md mt-8" />,
    DynamicCodeBlock,
    PreviewComponents,
    PreviewCode,
    AnimatedInputBar,
    AnimatedTabsDemo,
    CodeBlockDemo,
    ToolbarDemo,
  };
}
