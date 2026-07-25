'use client';

import { OrbToolbar, OrbToolbarHeader, OrbToolbarBody } from '@/components/orb/orb-toolbar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ColorToolbarProps {
  colors: string[];
  setColor: (index: number, color: string) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
}

export function ColorToolbar({ colors, setColor, addColor, removeColor }: ColorToolbarProps) {
  return (
    <OrbToolbar className="left-2 no-scrollbar">
      <OrbToolbarHeader
        title="Colors"
        actions={
          <Button
            variant="ghost"
            size="icon"
            onClick={addColor}
            disabled={colors.length >= 16}
            className="h-7 w-7 rounded-md text-xs disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </Button>
        }
      />

      <OrbToolbarBody className="no-scrollbar">
        <div className="space-y-2">
      
          {colors.map((hex, i) => (
            <div key={i} className="group flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">Stop {i + 1}</span>

              <div className="flex items-center gap-2">
                <span className="w-16 text-right text-sm text-muted-foreground">
                  {hex.toUpperCase()}
                </span>

                <label
                  className="h-7 w-7 cursor-pointer overflow-hidden rounded border border-border"
                  style={{ backgroundColor: hex }}
                >
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => setColor(i, e.target.value)}
                    className="h-full w-full opacity-0"
                  />
                </label>

                <button
                  onClick={() => removeColor(i)}
                  disabled={colors.length <= 1}
                  className="text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addColor}
            disabled={colors.length >= 16}
            className="mt-2 w-full rounded-md border border-dashed border-border py-2 text-xs text-muted-foreground transition hover:border-foreground/40 hover:text-foreground disabled:opacity-40"
          >
            + Add Color Stop
          </button>
        </div>
      </OrbToolbarBody>
    </OrbToolbar>
  );
}
