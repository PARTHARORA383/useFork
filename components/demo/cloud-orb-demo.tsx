'use client';

import { useState } from 'react';
import { CloudOrb, DEFAULT_COLORS, type OrbConfig, type OrbState } from '@/components/orb/cloud-orb';
import { OrbToolbar, OrbToolbarHeader, OrbToolbarBody } from '@/components/orb/orb-toolbar';
import { ColorPresets } from '@/components/orb/color-presets';
import { ElasticSlider } from '@/components/elastic-slider';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

function OrbStateSelector({
  orbState,
  setOrbState,
}: {
  orbState: OrbState;
  setOrbState: (state: OrbState) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 pt-6">
      <span className="text-xs font-medium text-muted-foreground">Orb State</span>
      <div className="grid grid-cols-3 gap-2">
        {(['idle', 'listening', 'speaking'] as const).map((state) => (
          <Button
            key={state}
            variant="outline"
            size="sm"
            onClick={() => setOrbState(state)}
            className={`rounded-md border px-4 py-2 text-xs capitalize transition-colors ${
              orbState === state
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {state}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function CloudOrbDemo() {
  const [orbState, setOrbState] = useState<OrbState>('idle');

  const [flowX, setFlowX] = useState(0.15);
  const [flowY, setFlowY] = useState(0);
  const [speed, setSpeed] = useState(0.15);
  const [warpStrength, setWarpStrength] = useState(0.08);
  const [grainAmount, setGrainAmount] = useState(0.03);
  const [colors, setColors] = useState<string[]>([...DEFAULT_COLORS]);

  const resetAll = () => {
    setFlowX(0.15);
    setFlowY(0);
    setSpeed(0.15);
    setWarpStrength(0.08);
    setGrainAmount(0.03);
    setColors([...DEFAULT_COLORS]);
  };

  const config: OrbConfig = {
    flowX,
    flowY,
    speed,
    warpStrength,
    colors,
    grainAmount,
    state: orbState,
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-[230px] w-[230px]">
          <CloudOrb {...config} />
        </div>
        <OrbStateSelector orbState={orbState} setOrbState={setOrbState} />
        <ColorPresets colors={colors} onSelect={setColors} />
      </div>

      <OrbToolbar className="right-4 ">
        <OrbToolbarHeader
          title="Controls"
          actions={
            <Button
              variant="ghost"
              size="icon"
              onClick={resetAll}
              className="h-7 w-7 rounded-md text-xs"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          }
        />

        <OrbToolbarBody className="no-scrollbar">
          <div className="space-y-3">
            <span className="text-xs font-medium text-muted-foreground">Flow &amp; Movement</span>

            <ElasticSlider
              label="Flow X amplitude"
              value={flowX}
              min={0}
              max={0.5}
              step={0.01}
              onValueChange={setFlowX}
            />

            <ElasticSlider
              label="Flow Y amplitude"
              value={flowY}
              min={0}
              max={0.5}
              step={0.01}
              onValueChange={setFlowY}
            />

            <ElasticSlider
              label="Global speed"
              value={speed}
              min={0.005}
              max={0.3}
              step={0.005}
              onValueChange={setSpeed}
            />

            <ElasticSlider
              label="Warp strength"
              value={warpStrength}
              min={0}
              max={0.3}
              step={0.005}
              onValueChange={setWarpStrength}
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-medium text-muted-foreground">Grain</span>

            <ElasticSlider
              label="Grain amount"
              value={grainAmount}
              min={0}
              max={0.15}
              step={0.005}
              onValueChange={setGrainAmount}
            />
          </div>
        </OrbToolbarBody>
      </OrbToolbar>
    </div>
  );
}
