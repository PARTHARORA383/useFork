'use client';

interface ColorPreset {
  name: string;
  colors: [string, string];
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Blue', colors: ['#3B82F6', '#FFFFFF'] },
  { name: 'Teal', colors: ['#14B8A6', '#FFFFFF'] },
  { name: 'Green', colors: ['#22C55E', '#FFFFFF'] },
  { name: 'Yellow', colors: ['#EAB308', '#FFFFFF'] },
  { name: 'Orange', colors: ['#F97316', '#FFFFFF'] },
  { name: 'Purple', colors: ['#9333EA', '#FFFFFF'] },
];

interface ColorPresetsProps {
  colors: string[];
  onSelect: (colors: string[]) => void;
}

export function ColorPresets({ colors, onSelect }: ColorPresetsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
      {COLOR_PRESETS.map((preset) => {
        const active = colors[0]?.toLowerCase() === preset.colors[0].toLowerCase();

        return (
          <button
            key={preset.name}
            type="button"
            aria-label={preset.name}
            onClick={() => onSelect(preset.colors)}
            className={`h-9 w-9 shrink-0 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${
              active ? 'border-foreground' : 'border-transparent'
            }`}
            style={{
              background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
            }}
          />
        );
      })}
    </div>
  );
}
