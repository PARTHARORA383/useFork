'use client';

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
} from '@/components/code-block';
import { motion } from 'motion/react';

interface CodeBlockDataType {
  code: string;
  language?: string;
  fileName?: string;
}

interface DataProps {
  data?: CodeBlockDataType;
}

export function CodeBlockComponent({ data }: DataProps) {
  if (!data) return;
  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <CodeBlock data={data} className="rounded-lg">
        <CodeBlockHeader>
          <CodeBlockFilename></CodeBlockFilename>
          <CodeBlockCopyButton />
        </CodeBlockHeader>

        <CodeBlockContent className="max-h-[600px] "></CodeBlockContent>
      </CodeBlock>
    </motion.div>
  );
}
