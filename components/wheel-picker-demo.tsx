"use client";

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/wheel-picker";
import { useState, useEffect, useRef } from "react";

const options: WheelPickerOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
];

export function WheelPickerDemo() {
  const [value, setValue] = useState("react");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload the click sound once
  useEffect(() => {
    audioRef.current = new Audio("/sounds/click.mp3");
    audioRef.current.volume = 0.3; // subtle sound
  }, []);

  // Play sound on value change
  useEffect(() => {
    if (audioRef.current) {
      // restart the sound each time to ensure consistent click
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [value]);

  return (
    <WheelPickerWrapper className="max-w-lg">
      <WheelPicker options={options} value={value} onValueChange={setValue} />
    </WheelPickerWrapper>
  );
}
