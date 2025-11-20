"use client"

import { TextVideoMaskContainer , VideoBackground , MaskedText } from "@/components/text-video-mask";


export  function TextVideoMaskDemo() {
  return (
    <TextVideoMaskContainer>
      <VideoBackground src="/videos/usefork1.mp4" />
      <MaskedText
        texts={["DRIVE", "LEAD", "CREATE"]}
        className="text-[700px]"
        opacity={0.85}
      />
    </TextVideoMaskContainer>
  );
}
