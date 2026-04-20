
import { Plus } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useState } from "react";
import { motion } from "motion/react";

export function AiUpload() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DropdownMenu onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <div className={`rounded-xl p-2 cursor-pointer bg-muted transition-colors duration-200`}
                    >
                        <motion.div
                            animate={{ rotate: open ? 45 : 0 }}
                            transition={{ duration: 0.08, ease: "easeInOut" }}
                        >
                            <Plus  className="w-5 h-5"/>
                        </motion.div>
                    </div>
                </DropdownMenuTrigger>
                <FadeInLeft delay={0.1}>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <FadeInLeft delay={0.05}>
                                <DropdownMenuItem>Images</DropdownMenuItem>
                            </FadeInLeft>

                            <FadeInLeft delay={0.05}>
                                <DropdownMenuItem>Documents</DropdownMenuItem>
                            </FadeInLeft>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </FadeInLeft>
            </DropdownMenu>
        </div>
    );
}


interface FadeInLeftProps {
    children: React.ReactNode;
    delay?: number;
}

export function FadeInLeft({ children, delay = 0 }: FadeInLeftProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{
                duration: 0.2,
                ease: "easeOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}