'use client';

import { useState } from 'react';
import { CloudOrb, DEFAULT_COLORS, type OrbConfig, type OrbState } from '@/components/orb/cloud-orb';

export function OrbDemo() {
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [flowX, setFlowX] = useState(0.15);
  const [flowY, setFlowY] = useState(0);
  const [speed, setSpeed] = useState(0.06);
  const [warpStrength, setWarpStrength] = useState(0.08);
  const [grainAmount, setGrainAmount] = useState(0.03);
  const [colors, setColors] = useState<string[]>([...DEFAULT_COLORS]);

  const config: OrbConfig = {
    flowX, flowY, speed, warpStrength,
    colors,
    grainAmount,
    state: orbState,
  };

  return (
    <div className="h-[230px] w-[230px]">
      <CloudOrb {...config} />
    </div>
  );
}
