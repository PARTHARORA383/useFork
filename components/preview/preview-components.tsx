
"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Palette, Check, Sun, Moon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PreviewComponentsProps {
  className?: string;
  children?: React.ReactNode;
  registryName?: string;
}

export function PreviewComponents({ className, children, registryName }: PreviewComponentsProps) {
  const registryUrl = `https://billingsdk.com/r/${registryName}.json`;

  // Open-in helpers
  const openInV0 = () => {
    window.open(`https://v0.dev/chat/api/open?url=${registryUrl}`, '_blank')
  }

  const openInLovable = () => {
    const prompt = encodeURIComponent(
      `Import this component from ${registryUrl} and open the code for editing. IMPORTANT: preserve the component exactly as-is. Do NOT change colors, CSS variables, Tailwind classes, spacing, fonts, or any visual styles. Do NOT regenerate or restyle the UI. Create files from the registry JSON verbatim and show the code tree.`
    )
    const lovableUrl = `https://lovable.dev/?prompt=${prompt}&autosubmit=true`
    window.open(lovableUrl, '_blank')
  }

  const openInBolt = async () => {
    try {
      const res = await fetch(registryUrl)
      const text = await res.text()
      const MAX_EMBED = 1400
      if (text.length <= MAX_EMBED) {
        const prompt = encodeURIComponent(
          `Here is a shadcn registry JSON for a component. Create a new project with these files and open the code for editing. IMPORTANT: import files verbatim and preserve ALL styles/colors/classes/fonts as-is. Do NOT restyle or regenerate the UI. JSON contents below as inline text.\n\n${text}`,
        )
        const boltUrl = `https://bolt.new/?prompt=${prompt}&autosubmit=true`
        window.open(boltUrl, '_blank')
      } else {
        try {
          await navigator.clipboard.writeText(text)
        } catch { }
        const prompt = encodeURIComponent(
          `I have copied a shadcn registry JSON for a component to the clipboard. Create the project by pasting the JSON I will provide and generate the files, then open the code for editing. IMPORTANT: import files verbatim and preserve ALL styles/colors/classes/fonts as-is. Do NOT restyle or regenerate the UI. If clipboard is not available, ask me to paste the JSON.`,
        )
        const boltUrl = `https://bolt.new/?prompt=${prompt}&autosubmit=true`
        window.open(boltUrl, '_blank')
      }
    } catch {
      const promptFallback = encodeURIComponent(
        `Import this component from ${registryUrl} and open the code for editing. IMPORTANT: preserve the component exactly as-is (no color/style/layout changes). If you cannot fetch external URLs, ask me to paste the JSON from that link.`,
      )
      const boltUrl = `https://bolt.new/?prompt=${promptFallback}&autosubmit=true`
      window.open(boltUrl, '_blank')
    }
  }

  return (
    <Card
      className={cn("not-prose bg-background", className)}
    >
      <CardHeader className="pb-0" >
        <div className="flex gap-2 justify-end">
          <div className="flex gap-2">
            {registryName && (
              <div className="flex items-center">

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>

                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={4} className="w-fit min-w-full">
                    <DropdownMenuItem onClick={openInLovable}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 transform rotate-45"
                      >
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="currentColor"
                        />
                      </svg>
                      Lovable
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openInBolt}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                      >
                        <path
                          d="M13 2L3 14h9l-1 8 12-12h-9l1-8z"
                          fill="currentColor"
                        />
                      </svg>
                      Bolt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 w-full h-full justify-center items-center">
        {children}
      </CardContent>
    </Card>
  );
}