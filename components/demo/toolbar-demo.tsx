"use client"

import { Toolbar, ToolbarButton, ToolbarButtonOverlay } from "@/components/toolbar"
import { Command, Moon, Search, Sun } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { CodeBlockDemo } from "./code-block-demo"
import { MusicPlayer } from "../music-player"

const tracks = [
  {
    id: "1",
    title: "Lost in Space",
    artist: "Synth Nova",
    url: "/songs/lost-in-space.mp3",
    cover: "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg",
  },
]


export function ToolbarDemo (){

  return (
    <Toolbar position="center">
      <ToolbarButton heading="Search" icon={<Search  size={18}/>}>
      <ToolbarButtonOverlay component= {<CodeBlockDemo/>}/>
      </ToolbarButton>
      <ToolbarButton heading = 'Theme' icon={<Moon size={18}/> }>
      <ToolbarButtonOverlay component= {<MusicPlayer data={tracks}/>}/>
      </ToolbarButton>
      <ToolbarButton heading="Github" icon={<SiGithub size={18}/>}>
      <ToolbarButtonOverlay/>
      </ToolbarButton>
      <ToolbarButton heading="Command" icon={<Command size={18}/>}>
      <ToolbarButtonOverlay/>
      </ToolbarButton>
    </Toolbar>

  )
}