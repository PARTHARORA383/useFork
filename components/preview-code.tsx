
"use client"
import { useEffect, useState } from "react"
import { AnimatedTabs, AnimatedTabsContent, AnimatedTabsList, AnimatedTabsTrigger } from "@/components/animated-tabs"
import { CodeBlockComponent } from "@/components/code-block-component"
import RippleEffect, { CodeBlockContextType } from "./code-block";



interface PreviewCodeProps {
  component?: React.ReactNode;
  codePath?: string;
  lang?: string;
}


type CodeFileType = {
  content?: string,
  path?: string,
  language?: string
}

interface CodeBlockDataType {
code : string,
language ?: string
fileName  ? : string
}

export function PreviewCode({ codePath, component, lang }: PreviewCodeProps) {

  const [data , setData ] = useState<CodeBlockDataType>()

  useEffect(() => {
    if (!codePath) return;

    fetch(codePath)
      .then(res => res.json())
      .then((data) => {
        console.log("Loaded code:", data.files);
        setData({code : data.files[1].content , language : data.files[1].language , fileName : data.files[1].path})

      })
      .catch(err => {
        console.error("Failed to load code:", err);
        setData({
          code : ""
        });
      });
  }, []);

  return (
    <>
      <AnimatedTabs defaultValue="preview" className="max-w-3xl flex">

        <AnimatedTabsList className="max-w-[300px]">
          <AnimatedTabsTrigger className="text-sm p-1.5" value="preview">Preview</AnimatedTabsTrigger>
          <AnimatedTabsTrigger className='text-sm p-1.5' value="code">Code</AnimatedTabsTrigger>
        </AnimatedTabsList>

        <AnimatedTabsContent value="preview">
          <div className="relative bg-[var(--muted2)] dark:bg-[var(--muted2)] border rounded-lg min-h-[500px] flex items-center justify-center">
            <div className="lg:min-w-2xl">
            {component}
            </div>
          </div>
        </AnimatedTabsContent>

        <AnimatedTabsContent value="code" className="">
          <div className="">

            <CodeBlockComponent data = {data} />
          </div>
        </AnimatedTabsContent>
      </AnimatedTabs>

    </>
  )
}