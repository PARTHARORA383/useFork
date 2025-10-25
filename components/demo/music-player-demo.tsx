
"use client"

import { MusicPlayer } from "@/components/music-player"


export function MusicPlayerDemo (){

  const tracks = [
  {
    id: "1",
    title: "Lost in Space",
    artist: "Synth Nova",
    url: "/songs/lost-in-space.mp3",
    cover: "https://i.pinimg.com/736x/49/2d/e1/492de1d0dd1007de094678cb86c81dfa.jpg",
  },
  {
    id: "2",
    title: "Midnight Mirage",
    artist: "Shadow Echo",
    url: "/songs/midnight-mirage.mp3",
    cover: "https://i.pinimg.com/736x/73/e3/c1/73e3c183f2e948e62ea9e8fce20dffc8.jpg",
  },
  {
    id: "3",
    title: "Streetlight Whispers",
    artist: "Noir Waves",
    url: "/songs/streetlight-whispers.mp3",
    cover: "https://i.pinimg.com/1200x/a6/e1/34/a6e1347b23f882e5351bb303bda93b09.jpg",
  },
  {
    id: "4",
    title: "Under Neon Shadows",
    artist: "Velvet Drift",
    url: "/songs/under-neon-shadows.mp3",
    cover: "https://i.pinimg.com/1200x/d5/7d/34/d57d343d76214e7a20a884dd433936a9.jpg",
  },
  {
    id: "5",
    title: "Echoes In The Alley",
    artist: "Midnight Static",
    url: "/songs/echoes-in-the-alley.mp3",
    cover: "https://i.pinimg.com/736x/3f/54/96/3f549606a9ce899a713dd1310ef02d0d.jpg",
  },
]


  return (
    <MusicPlayer data={tracks}/>
  )

}