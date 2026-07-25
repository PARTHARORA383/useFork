'use client';

import { useState } from 'react';
import { CloudOrb, DEFAULT_COLORS, type OrbConfig, type OrbState } from '@/components/orb/cloud-orb';
import { OrbToolbar, OrbToolbarHeader, OrbToolbarBody } from '@/components/orb/orb-toolbar';
import { ColorToolbar } from '@/components/orb/color-toolbar';
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
  const [flowXSpeed, setFlowXSpeed] = useState(0.8);
  const [speed, setSpeed] = useState(0.06);
  const [warpStrength, setWarpStrength] = useState(0.28);
  const [ribbonOpacityCap, setRibbonOpacityCap] = useState(0.52);
  const [ribbonBreatheAmp, setRibbonBreatheAmp] = useState(0.25);
  const [ribbonBreatheSpeed, setRibbonBreatheSpeed] = useState(0.31);
  const [grainAmount, setGrainAmount] = useState(0.04);
  const [colors, setColors] = useState<string[]>([...DEFAULT_COLORS]);

  const setColor = (index: number, hex: string) => {
    setColors((prev) => {
      const next = [...prev];
      next[index] = hex;
      return next;
    });
  };

  const addColor = () => {
    setColors((prev) => (prev.length < 16 ? [...prev, '#ffffff'] : prev));
  };

  const removeColor = (index: number) => {
    setColors((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  };

  const resetAll = () => {
    setFlowX(0.15);
    setFlowY(0);
    setFlowXSpeed(0.8);
    setSpeed(0.06);
    setWarpStrength(0.28);
    setRibbonOpacityCap(0.52);
    setRibbonBreatheAmp(0.25);
    setRibbonBreatheSpeed(0.31);
    setGrainAmount(0.04);
    setColors([...DEFAULT_COLORS]);
  };

  const config: OrbConfig = {
    flowX,
    flowY,
    flowXSpeed,
    speed,
    warpStrength,
    colors,
    ribbonOpacityCap,
    ribbonBreatheAmp,
    ribbonBreatheSpeed,
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
      </div>

      <OrbToolbar className="right-2">
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
              label="Flow speed"
              value={flowXSpeed}
              min={0.1}
              max={3}
              step={0.05}
              onValueChange={setFlowXSpeed}
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
              max={0.8}
              step={0.01}
              onValueChange={setWarpStrength}
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-medium text-muted-foreground">White Ribbon</span>

            <ElasticSlider
              label="Opacity cap"
              value={ribbonOpacityCap}
              min={0}
              max={1}
              step={0.01}
              onValueChange={setRibbonOpacityCap}
            />

            <ElasticSlider
              label="Breathe amplitude"
              value={ribbonBreatheAmp}
              min={0}
              max={0.5}
              step={0.01}
              onValueChange={setRibbonBreatheAmp}
            />

            <ElasticSlider
              label="Breathe speed"
              value={ribbonBreatheSpeed}
              min={0.05}
              max={2}
              step={0.05}
              onValueChange={setRibbonBreatheSpeed}
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

      <ColorToolbar
        colors={colors}
        setColor={setColor}
        addColor={addColor}
        removeColor={removeColor}
      />
    </div>
  );
}
