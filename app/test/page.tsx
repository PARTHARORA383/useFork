"use client"

import { RadialButton, RadialButtonIcon, RadialButtonTitle } from "@/components/radial-button";
import { Bookmark } from "lucide-react";


export default function TestPage() {
  return (
    <div className=" flex items-center justify-center h-screen">
      <RadialButton title="Bookmark">
        <RadialButtonIcon icon = {<Bookmark className="w-5 h-5"/>}/>
      </RadialButton>
    </div>
  );
}
