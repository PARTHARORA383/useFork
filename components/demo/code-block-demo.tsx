import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
} from '@/components/code-block';

export function CodeBlockDemo() {
  const data = {
    code: `import React from "react";

export default function CodeBlock() {
  return (
    <div>
      <h1>Hello, beautifull code block here! </h1>
    </div>
  )
}`,
    language: 'tsx',
    fileName: 'components/code-block.tsx',
  };

  return (
    <CodeBlock data={data}>
      <CodeBlockHeader>
        <CodeBlockFilename />
        <CodeBlockCopyButton />
      </CodeBlockHeader>
      <CodeBlockContent />
    </CodeBlock>
  );
}

//Creator - Partharora
//X - https://x.com/partharora9128
