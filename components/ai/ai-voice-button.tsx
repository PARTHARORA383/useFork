import { useAiChat } from "@/components/ai/ai-chat-context";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { ArrowUp } from "../animate-ui/icons/arrow-up";
import { AudioLines } from "../animate-ui/icons/audio-lines";

interface AiVoiceButtonProps {
    className?: string;
    onSubmit: () => Promise<void>;
}

export function AiVoiceButton({
    className,
    onSubmit,
}: AiVoiceButtonProps) {
    const { value, setValue, voiceState  ,setVoiceState} = useAiChat();

    const handleClick = async () => {
        if (!value) return;

        try {
            await onSubmit();
            setVoiceState('streaming')
            setTimeout(()=>{
            setVoiceState('idle')
            },2000)
            setValue("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.button
            className={cn("flex items-center gap-2", className)}
            onClick={handleClick}
        >
            {voiceState === 'idle' && <AiVoiceButtonIdle />
            }
            {voiceState === 'streaming' && <AiVoiceButtonOnStreaming  />
            }
        </motion.button>
    );
}

function AiVoiceButtonIdle() {
    return (
        <div className="bg-blue-300 rounded-xl p-1.5 text-white" 
        >
            <AudioLines animateOnHover size={25}/>
        </div>
    )
}

function AiVoiceButtonReadyToSubmit(){
    return (
         <div className="bg-blue-300 rounded-xl p-1.5 text-white active:scale-98 transition-all duration-200 cursor-pointer">
            <ArrowUp animateOnTap size={25} />
        </div>
    )
}

function AiVoiceButtonOnStreaming() {
  return (
    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
      {/* Inner square (recording stop icon) */}
      <div className="w-4 h-4  bg-foreground z-10"></div>
    </div>
  );
}