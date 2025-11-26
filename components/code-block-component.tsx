'use client'


import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
} from '@/components/code-block';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CodeBlockDataType {
  code: string;
  language?: string;
  fileName?: string;
}

interface DataProps {
  code?: string;
  fileName?: string;
  codePath?: string;
  id?: number;
}

export function CodeBlockComponent({ code, fileName, codePath, id }: DataProps) {
  const [data, setData] = useState<CodeBlockDataType>();
  const activeId = id ?? 1;

  useEffect(() => {
    if (!codePath) {
      if (code && fileName) {
        setData({
          code: code,
          language: 'tsx',
          fileName: fileName,
        });
      }
      return;
    }

    fetch(codePath)
      .then((res) => res.json())
      .then((data) => {
        console.log('Loaded code:', data.files);
        setData({
          code: data.files[activeId].content,
          language: data.files[activeId].language,
          fileName: data.files[activeId].path,
        });
      })
      .catch((err) => {
        console.error('Failed to load code:', err);
        setData({
          code: '',
        });
      });
  }, []);

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
