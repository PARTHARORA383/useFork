'use client';

import { RevealButton, RevealButtonIcon } from '@/components/reveal-button';
import { Bookmark } from 'lucide-react';

export function RevealButtonDemo() {
  return (
    <RevealButton title="Bookmark">
      <RevealButtonIcon icon={<Bookmark className="w-5 h-5" />} />
    </RevealButton>
  );
}
