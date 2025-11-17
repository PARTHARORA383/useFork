"use client"

import CursorTrail from "@/components/cursor-trail";
import {LoaderCircle} from "@/components/loader-circle";
import { RevealButton, RevealButtonIcon } from "@/components/reveal-button";
import { RollOverText } from "@/components/roll-over-text";
import {  SaveToggle} from "@/components/save-toggle";
import { Bookmark, CheckIcon, SaveIcon, SplinePointerIcon } from "lucide-react";


export default function TestPage() {
  return(
    <div className=" flex items-center justify-center h-screen">

      <CursorTrail/>
    </div>
);
}
