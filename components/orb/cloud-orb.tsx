'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const DEFAULT_COLORS: string[] = ['#9333EA', '#f5eff2'];

const MAX_COLORS = 4;

const simplexNoise = `
vec3 mod289v3(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec4 mod289v4(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
vec4 permute(vec4 x){ return mod289v4(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x  = x_ * ns.x + ns.y;
  vec4 y  = y_ * ns.x + ns.y;
  vec4 h  = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const fbmGlsl = `
${simplexNoise}

mat2 rotate2D(float a){
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float fbm(vec3 p){
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for(int i = 0; i < 5; i++){
    value += amplitude * snoise(p * frequency);
    p.xy *= rotate2D(0.5);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec2 flowField(vec2 uv, float t){
  float x = fbm(vec3(uv * 2.5,       t));
  float y = fbm(vec3(uv * 2.5 + 8.3, t));
  return vec2(x, y);
}
`;

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormalW;
void main(){
  vUv = uv;
  vNormalW = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
#define MAX_COLORS ${MAX_COLORS}

uniform float uTime;
uniform float uFlowX;
uniform float uFlowY;
uniform float uWarp;
uniform float uFlowDir;
uniform float uGrainAmount;
uniform vec3  uColors[MAX_COLORS];
uniform int   uColorCount;

varying vec2 vUv;
varying vec3 vNormalW;

${fbmGlsl}

// ── Smooth continuous gradient across all color stops, in order, with soft
// blurred transitions (smoothstep) rather than discrete bands. ──
vec3 gradientColor(float t){
  vec3 color = uColors[0];
  for(int i = 1; i < MAX_COLORS; i++){
    if(i >= uColorCount) break;
    float stopT = float(i) / float(uColorCount - 1);
    float prevT = float(i - 1) / float(uColorCount - 1);
    color = mix(color, uColors[i], smoothstep(prevT, stopT, t));
  }
  return color;
}

float grain(vec2 uv, float time){
  return fract(sin(dot(uv * 200.0 + time * 0.3, vec2(127.1, 311.7))) * 43758.5453);
}

float cloudLayer(vec2 uv, float t){
  vec2 p = uv * 1.5;
  vec2 drift = vec2(t * 0.05, t * 0.025);
  p += drift;
  vec2 warp = vec2(fbm(vec3(p * 0.8, t * 0.04)), fbm(vec3(p * 0.8 + 11.3, t * 0.04))) * 0.7;
  float n1 = fbm(vec3((p + warp) * 1.1, t * 0.07));
  float n2 = fbm(vec3((p + warp) * 2.6 + 5.2, t * 0.11));
  float n = n1 * 0.7 + n2 * 0.3;
  return smoothstep(-0.15, 0.65, n * 0.5 + 0.5);
}

void main(){
  // ── Use the sphere's real surface normal (not the equirectangular UV) as the
  // coordinate space for everything below. Since normal.xy is always inside the
  // unit disc on the visible (front-facing) hemisphere, every effect is
  // guaranteed to stay wrapped on the globe — nothing can drift "outside" it —
  // and the pattern naturally foreshortens near the rim like a real sphere. ──
  vec3 n = normalize(vNormalW);
  vec2 base = n.xy;

  // ── uFlowDir smoothly reverses the scroll direction: +1 normal, -1 reversed ──
  vec2 centered = base + vec2(uFlowX, uFlowY) * uFlowDir;

  // ── Flow field, used to warp the gradient softly rather than leaving it
  // perfectly straight — like currents stirring through liquid. ──
  vec2 flow = flowField(centered, uTime) * uFlowDir;
  vec2 uv2 = centered + flow * uWarp * 1.4;
  vec2 flow2 = flowField(uv2, uTime + 3.7) * uFlowDir;
  vec2 warped = centered + flow * uWarp + flow2 * (uWarp * 0.6);

  // ── Fixed vertical gradient axis so the color bands sit horizontally, with
  // the ripple below moving along that horizontal line like waves on water. ──
  vec2 axis = vec2(0.0, 1.0);
  vec2 axisPerp = vec2(1.0, 0.0);

  float pos = dot(warped, axis) * 1.05 + 0.5;
  float perp = dot(centered, axisPerp);
  float wave1 = sin(perp * 5.0 - uTime * 0.6 * uFlowDir) * 0.05;
  float wave2 = sin(perp * 3.2 - uTime * 0.42 * uFlowDir + 1.3) * 0.03;
  float noiseDisplace = fbm(vec3(centered * 2.2, uTime * 2.0)) * 0.09;
  float rawGt = pos + wave1 + wave2 + noiseDisplace;

  // ── Cloud puffs perturb the gradient position itself, so pockets of each
  // color drift and billow into the other like clouds mixing, rather than
  // just adding a white haze on top. ──
  float clouds = cloudLayer(base, uTime);
  rawGt += (clouds - 0.5) * 0.4;

  float gt = abs(fract(rawGt * 0.5) * 2.0 - 1.0);
  vec3 color = gradientColor(gt);

  // ── Simple volumetric shading so the globe reads as a real lit sphere:
  // a soft key light plus edge darkening, and a glassy fresnel rim glow. ──
  vec3 lightDir = normalize(vec3(0.45, 0.55, 0.8));
  float diffuse = clamp(dot(n, lightDir), 0.0, 1.0);
  color *= mix(0.62, 1.12, diffuse);

  float fresnel = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.5);
  color += fresnel * 0.16;

  float g = grain(vUv, uTime) * uGrainAmount;
  color += g - uGrainAmount * 0.5;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function colorsToFloat32(hexColors: string[]): Float32Array {
  const arr = new Float32Array(MAX_COLORS * 3);
  const tmp = new THREE.Color();
  hexColors.forEach((hex, i) => {
    if (i >= MAX_COLORS) return;
    tmp.set(hex);
    arr[i * 3 + 0] = tmp.r;
    arr[i * 3 + 1] = tmp.g;
    arr[i * 3 + 2] = tmp.b;
  });
  return arr;
}

interface MaterialProps {
  configRef: React.MutableRefObject<ResolvedConfig>;
}

function GradientMaterial({ configRef }: MaterialProps) {
  // Smoothed flow direction: +1 idle/listening, -1 speaking
  const flowDirRef = useRef(1.0);

  const material = useMemo(() => {
    const cfg = configRef.current;
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uFlowX: { value: 0 },
        uFlowY: { value: 0 },
        uWarp: { value: cfg.warpStrength },
        uFlowDir: { value: 1.0 },
        uGrainAmount: { value: cfg.grainAmount },
        uColors: { value: colorsToFloat32(cfg.colors) },
        uColorCount: { value: Math.min(cfg.colors.length, MAX_COLORS) },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    const cfg = configRef.current;
    const dt = Math.min(delta, 0.1);
    const isSpeaking = cfg.state === 'speaking';

    // ── Smooth direction flip: target -1 when speaking, +1 otherwise ──
    const dirTarget = isSpeaking ? -1.0 : 1.0;
    flowDirRef.current += (dirTarget - flowDirRef.current) * dt * 1.5;

    // ── Speed: much faster when speaking so the color-merge is clearly felt,
    // slightly quicker when listening ──
    const isListening = cfg.state === 'listening';
    const speedMult = isSpeaking ? 4.5 : isListening ? 1.3 : 1.0;
    material.uniforms.uTime.value += dt * cfg.speed * speedMult;

    const t = material.uniforms.uTime.value;
    // Fixed internal oscillation frequency (no longer exposed as a prop).
    const flowFrequency = 0.8;
    material.uniforms.uFlowX.value = Math.sin(t * flowFrequency) * cfg.flowX;
    material.uniforms.uFlowY.value = Math.sin(t * flowFrequency * 0.7 + 1.2) * cfg.flowY;

    material.uniforms.uFlowDir.value = flowDirRef.current;
    material.uniforms.uWarp.value = cfg.warpStrength;
    material.uniforms.uGrainAmount.value = cfg.grainAmount;

    colorsToFloat32(cfg.colors).forEach((v, i) => {
      (material.uniforms.uColors.value as Float32Array)[i] = v;
    });
    material.uniforms.uColorCount.value = Math.min(cfg.colors.length, MAX_COLORS);
  });

  return <primitive object={material} attach="material" />;
}

interface AnimatedOrbProps {
  configRef: React.MutableRefObject<ResolvedConfig>;
}

function AnimatedOrb({ configRef }: AnimatedOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1.0);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const { state } = configRef.current;
    const dt = Math.min(delta, 0.1);

    timeRef.current += dt;
    const t = timeRef.current;

    // ── Listening shrinks the globe a touch — a single smooth resize (no
    // pulsing) to read as "listening" — and eases back for idle/speaking. ──
    const snapTarget = state === 'listening' ? 0.85 : 1.0;
    scaleRef.current += (snapTarget - scaleRef.current) * dt * 8.0;

    // ── Intro reveal: grow from a tiny point up to full size once, on mount ──
    const introDuration = 1.1;
    const introT = Math.min(t / introDuration, 1);
    const introEase = 1 - Math.pow(1 - introT, 3);

    const s = scaleRef.current * introEase;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 256, 256]} />
      <GradientMaterial configRef={configRef} />
    </mesh>
  );
}

export type OrbState = 'idle' | 'listening' | 'speaking';

export interface OrbConfig {
  flowX?: number;
  flowY?: number;
  speed?: number;
  warpStrength?: number;
  colors?: string[];
  grainAmount?: number;
  state?: OrbState;
}

interface ResolvedConfig extends Required<Omit<OrbConfig, 'colors'>> {
  colors: string[];
}

export function CloudOrb({
  flowX = 0.15,
  flowY = 0.07,
  speed = 0.15,
  warpStrength = 0.08,
  colors,
  grainAmount = 0.03,
  state = 'idle',
}: OrbConfig) {
  const resolvedColors = colors && colors.length > 0 ? colors : DEFAULT_COLORS;

  const configRef = useRef<ResolvedConfig>({
    flowX, flowY, speed, warpStrength,
    colors: resolvedColors,
    grainAmount, state,
  });

  useEffect(() => {
    configRef.current = {
      flowX, flowY, speed, warpStrength,
      colors: resolvedColors,
      grainAmount, state,
    };
  });

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={1} />
      <AnimatedOrb configRef={configRef} />
    </Canvas>
  );
}
