'use client';

import { useState } from 'react';
import { CloudOrb, DEFAULT_COLORS, type OrbConfig, type OrbState } from '@/components/orb/cloud-orb';

export function OrbDemo() {
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

  const config: OrbConfig = {
    flowX, flowY, flowXSpeed, speed, warpStrength,
    colors,
    ribbonOpacityCap, ribbonBreatheAmp, ribbonBreatheSpeed,
    grainAmount,
    state: orbState,
  };

  return (
    <div className="h-[230px] w-[230px]">
      <CloudOrb {...config} />
    </div>
  );
}
