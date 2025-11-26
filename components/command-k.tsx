import { PopoverTrigger, PopoverContent } from '@/components/popover';
import { Command } from 'lucide-react';

export function CommandK() {
  return (
    <div>
      <PopoverTrigger className="p-2" icon={<Command className="w-4 h-4" />}>
        <PopoverContent position="center" />
      </PopoverTrigger>
    </div>
  );
}
