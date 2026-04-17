
import { cn } from '@/lib/cn';
import { motion } from 'motion/react'
import React from 'react';
import { useAiChat } from '@/components/ai/ai-chat-context';
import { ArrowUp } from '../animate-ui/icons/arrow-up';

interface AiChatInputBodyProps {
    children: React.ReactNode,
    className?: string
}

function AiChatInputBody({
    children,
    className
}: AiChatInputBodyProps) {

    return (
        <div className={cn(`relative bg-background rounded-xl pt-8 border border-muted overflow-hidden `, className)}>
            {children}
        </div>
    )
}

interface AiChatHeaderProps {
    className?: string;
    onClose?: () => void;
}

function AiChatHeader({ className, onClose }: AiChatHeaderProps) {
    const { loading, error } = useAiChat();
    return (
        <div
            className={cn(
                `absolute top-0 left-0 right-0 w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-muted via-muted/80 to-muted border-b text-white rounded-tl-xl rounded-tr-xl`,
                className)}
        >
            {loading ? <AiChatInputHeaderLoader /> : error ? <AiChatInputHeaderError message={error} onRetry={onClose} /> : <AiChatInputHeaderIdle />}
        </div>
    );
}


interface AiChatInputHeaderIdleProps {
    message?: string;
    className?: string;
}

function AiChatInputHeaderIdle({
    message = "usefork.dev",
    className,
}: AiChatInputHeaderIdleProps) {
    return (
        <motion.div
            key="idle"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn("flex items-center gap-2", className)}
        >
            {/* Pulsing dot */}
            <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"
            />
            <span className="text-blue-300 text-sm">{message}</span>
        </motion.div>
    );
}

interface AiChatInputHeaderLoaderProps {
    message?: string;
    className?: string;
}

function AiChatInputHeaderLoader({
    message = "Thinking...",
    className,
}: AiChatInputHeaderLoaderProps) {
    return (
        <motion.div
            key="loader"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn("flex items-center gap-2", className)}
        >
            <Loader size={14} />
            <span className="text-sm text-muted-foreground/40">{message}</span>
        </motion.div>
    );
}

type LoaderProps = {
    color?: string;
    size?: number;
};

const BLADES = Array.from({ length: 12 });

export default function Loader({
    color = "#020000",
    size = 18,
}: LoaderProps) {
    return (
        <div
            className="relative inline-block"
            style={{ fontSize: size, width: "1em", height: "1em" }}
        >
            {BLADES.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: "0.4629em",
                        bottom: 0,
                        width: "0.074em",
                        height: "0.2777em",
                        borderRadius: "0.0555em",
                        transformOrigin: "center -0.2222em",
                        rotate: i * 30,
                        backgroundColor: color,
                    }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.083,
                    }}
                />
            ))}
        </div>
    );
}


interface AiChatInputHeaderErrorProps {
    message?: string;
    className?: string;
    onRetry?: () => void;
}

function AiChatInputHeaderError({
    message = "Oops, something went wrong.",
    className,
    onRetry,
}: AiChatInputHeaderErrorProps) {
    return (
        <motion.div
            key="error"
            initial={{ opacity: 0, x: -6 }}
            animate={{
                opacity: 1,
                x: [0, -4, 4, -3, 3, 0], // shake on enter
            }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn("flex items-center gap-2", className)}
        >
            {/* Warning icon */}
            <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 text-red-400"
            >
                <path
                    d="M7 2L12.5 11.5H1.5L7 2Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />
                <line x1="7" y1="6" x2="7" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
            </motion.svg>

            <span className="text-sm text-red-400">{message}</span>

            {onRetry && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRetry}
                    className="text-xs text-red-400 underline underline-offset-2 ml-1 cursor-pointer"
                >
                    Retry
                </motion.button>
            )}
        </motion.div>
    );
}

interface AiChatInputProps {
    className?: string;
    onSubmit: () => Promise<void>;
    minHeight?: number;
    maxHeight?: number;
}

function AiChatInput({
    className,
    onSubmit,
    minHeight,
    maxHeight
}: AiChatInputProps
) {
    const MIN_HEIGHT = minHeight ?? 100;
    const MAX_HEIGHT = maxHeight ?? 200;

    const { value, setValue, setLoading, setError, voiceState, setVoiceState } = useAiChat()

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>, value: string) => {
        setValue(value);
        if (value === '') {
            setVoiceState('idle')
        }
        else {
            setVoiceState('ready')
        }

    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (value == '') return;
            try {
                setLoading(true)
                setValue('');
                await onSubmit();
            }
            catch (e) {
                setError('Oops failed to send the response')
            }
            finally {
                setLoading(false)
                setTimeout(() => {
                    setError('')
                }, 1500)
                setValue('')
            }
        }
    }

    const handleTextAreaSize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;
        el.style.height = "auto";
        el.style.height = `${Math.min(Math.max(el.scrollHeight, MIN_HEIGHT), MAX_HEIGHT)}px`;
    }

    return (
        <textarea
            value={value}
            style={{
                minHeight: MIN_HEIGHT,
                maxHeight: MAX_HEIGHT,
                paddingTop: "12px",
                paddingBottom: "12px",
                lineHeight: "24px",
            }}
            placeholder='Type your message'
            onChange={(e) => { handleOnChange(e, e.target.value); handleTextAreaSize(e) }}
            className={cn(`
          w-full resize-none text-base  rounded-md bg-transparent border border-muted focus:ring-0 focus-visible:ring-0 focus-visible:outline-none
          outline-none shadow-none min-w-3xl  border-0 focus:ring-0
          focus-visible:ring-0 focus-visible:outline-none 
          no-scrollbar px-4 py-[12px] leading-6` , className)}
            onKeyDown={(e) => handleKeyDown(e)}
        />
    )
}

interface AiChatFooterProps {
    children: React.ReactNode;
    className?: string;
}

function AiChatFooter({ children, className }: AiChatFooterProps) {
    return (
        <div
            className={cn(
                "absolute bottom-0 left-0 right-0 w-full flex items-center justify-between px-2 py-2 bg-transparent rounded-bl-xl rounded-br-xl text-sm font-medium h-12",
                className
            )}
        >
                {children}
        </div>
    );
}

interface AiChatReadyToSubmitProps {
    size?: number,
    className?: string
    onClick: () => Promise<void>
}

function AiChatReadyToSubmit({ size, className , onClick }: AiChatReadyToSubmitProps) {
    return (
        <button className={cn(`bg-blue-300 rounded-xl p-1.5 text-white active:scale-98 transition-all duration-200 cursor-pointer`, className)} 
        onClick={onClick}
        >
            <ArrowUp animateOnTap size={size ?? 25} />
        </button>
    )
}



export { AiChatInputBody, AiChatInput, AiChatHeader, AiChatFooter, AiChatReadyToSubmit }
