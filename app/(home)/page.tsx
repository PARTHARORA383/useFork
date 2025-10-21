"use client"

import { AnimatedInputBar } from '@/components/animated-inputbar';
import { AnimatedTabs, AnimatedTabsContent, AnimatedTabsList, AnimatedTabsTrigger } from '@/components/animated-tabs';
import { CodeBlockComponent } from '@/components/code-block-component';
import { CodeBlock, CodeBlockContent, CodeBlockFilename, CodeBlockHeader } from '@/components/code-block';
import { PreviewCode } from '@/components/preview-code';
import { WheelPickerDemo } from '@/components/wheel-picker-demo';
import { useEffect , useState } from 'react';
import { MusicPlayer } from '@/components/music-player';


interface PreviewCodeProps {
  component?: React.ReactNode;
  codePath?: string;
  lang?: string;
}


type CodeFileType = {
  content ? : string,
  path ?  : string,
language ? : string
}

export default function HomePage() {


  const [code, setCode] = useState<CodeFileType>({});
  const codePath = '/r/animated-tabs.json'
  useEffect(() => {
    if (!codePath) return;

    fetch(codePath)
      .then(res => res.json())
      .then((data) => {
        setCode(data.files[0].content);
        console.log("Loaded code:", data.files);
      }) 
      .catch(err => {
        console.error("Failed to load code:", err);
        setCode({});
      });
  }, []);


  
const tracks = [
  {
    id: "1",
    title: "Lost in Space",
    artist: "Synth Nova",
    url: "/songs/lost-in-space.mp3",
    cover: "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg",
  },
]

  return (
    
    <main className="flex h-screen items-center justify-center">
        <MusicPlayer tracks={tracks}/>
    </main>
  );
}
