import { GhostIcon } from "lucide-react";
import { HoldRevealButton, HoldRevealButtonOverlay } from "@/components/buttons/hold-reveal-button";
import { OriginButton, OriginButtonOverlay } from "@/components/buttons/origin-button";
import { RollRevealButton, RollRevealButtonText } from "@/components/buttons/roll-reveal-button";

export function CoolButtonsDemo() {
  return (

    <div className="flex flex-col gap-8 items-center">

      <div className="flex items-center justify-center gap-6">

        {/* Roll Reveal Button Example */}
        <RollRevealButton>
          <RollRevealButtonText />
        </RollRevealButton>
        
        {/* Origin Button Example */}
        <OriginButton icon={<GhostIcon className="w-5 h-5" />}>
          <OriginButtonOverlay icon={<GhostIcon className="w-5 h-5" />} />
        </OriginButton>

      </div>

      {/* Hold Reveal Button Example */}
      <HoldRevealButton>
        <HoldRevealButtonOverlay />
      </HoldRevealButton>

    </div>
  )
}