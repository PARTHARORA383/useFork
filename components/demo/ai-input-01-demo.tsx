import { AiChatFooter, AiChatHeader, AiChatInput, AiChatInputBody, AiChatReadyToSubmit } from '@/components/ai/ai-chat-input';
import { AiChatProvider } from '@/components/ai/ai-chat-context';
import { RevealButton, RevealButtonIcon } from '@/components/reveal-button';
import { Globe } from 'lucide-react';
import { AiUpload } from '@/components/ai/ai-upload';

export function AiInput01Demo() {

    const handleOnSubmit = async () => {
        await new Promise((resolve, reject) => {
            const math = Math.random() > 0.5;
            if (math) setTimeout(resolve, 2000);
            else {
                setTimeout(() => reject(new Error("Mock failure")), 2000);
            }
        })
    }

    return (
        <AiChatProvider>
            <AiChatInputBody>
                <AiChatHeader className=' flex items-center gap-2' />
                <AiChatInput onSubmit={handleOnSubmit} />
                <AiChatFooter className='w-full justify-between '>
                    <div className='flex items-center gap-2'>
                        <AiUpload />
                        <RevealButton title="Bookmark" className='py-2 text-foreground bg-muted border-0 hover:bg-muted'>
                            <RevealButtonIcon icon={<Globe className="w-5 h-5" />} />
                        </RevealButton>
                    </div>
                    <div>
                        <AiChatReadyToSubmit onClick={handleOnSubmit} />
                    </div>
                </AiChatFooter>
            </AiChatInputBody>
        </AiChatProvider>
    )

}