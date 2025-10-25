
import { PopoverTrigger , PopoverContent } from "@/components/popover"
import { Command } from "lucide-react"

export function CommandK() {


  return (
    <div>


      <PopoverTrigger icon={<Command className="w-4 h-4" />}>
        <PopoverContent />
      </PopoverTrigger>

      </div>

  )
}

