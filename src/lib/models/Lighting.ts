export interface LightingSystem {
  id: string;
  name: string;
  type: 'forward' | 'deferred' | 'clustered' | 'tiled';
  lights: Light[];
  shadows: ShadowSystem;
  ambient: AmbientLighting;
  settings: LightingSettings;
  performance: LightingPerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Light {
  id: string;
  name: string;
  type: 'directional' | 'point' | 'spot' | 'area' | 'ambient';
  position: Vector3;
  direction: Vector3;
  color: Color;
  intensity: number;
  range: number;
  angle: number;
  penumbra: number;
  decay: number;
  castShadow: boolean;
  shadowSettings: ShadowSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ShadowSettings {
  enabled: boolean;
  type: 'hard' | 'soft' | 'pcf' | 'vsm' | 'esm' | 'csm';
  resolution: number;
  bias: number;
  normalBias: number;
  distance: number;
  near: number;
  far: number;
  isActive: boolean;
}

export interface ShadowSystem {
  id: string;
  name: string;
  type: 'cascaded' | 'directional' | 'point' | 'spot';
  cascades: number;
  splitDistance: number;
  fadeDistance: number;
  fadeRange: number;
  isActive: boolean;
}

export interface AmbientLighting {
  id: string;
  name: string;
  type: 'constant' | 'hemisphere' | 'spherical_harmonics' | 'ambient_occlusion';
  color: Color;
  intensity: number;
  skyColor: Color;
  groundColor: Color;
  isActive: boolean;
}

export interface LightingSettings {
  id: string;
  maxLights: number;
  maxShadows: number;
  shadowDistance: number;
  shadowFadeDistance: number;
  ambientIntensity: number;
  directionalIntensity: number;
  isActive: boolean;
}

export interface LightingPerformance {
  id: string;
  totalLights: number;
  activeLights: number;
  shadowCasters: number;
  drawCalls: number;
  memoryUsage: number;
  fps: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightProbe {
  id: string;
  name: string;
  position: Vector3;
  coefficients: SphericalHarmonics;
  isActive: boolean;
  lastUpdate: Date;
}

export interface SphericalHarmonics {
  coefficients: number[][];
  isActive: boolean;
}

export interface Lightmap {
  id: string;
  name: string;
  texture: string;
  resolution: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ReflectionProbe {
  id: string;
  name: string;
  position: Vector3;
  size: Vector3;
  intensity: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface GlobalIllumination {
  id: string;
  name: string;
  type: 'lightmaps' | 'light_probes' | 'voxel_cone_tracing' | 'ray_tracing';
  settings: GISettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface GISettings {
  enabled: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  bounces: number;
  resolution: number;
  isActive: boolean;
}

export interface VolumetricLighting {
  id: string;
  name: string;
  enabled: boolean;
  intensity: number;
  scattering: number;
  absorption: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface GodRays {
  id: string;
  name: string;
  enabled: boolean;
  intensity: number;
  density: number;
  decay: number;
  weight: number;
  exposure: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightCookie {
  id: string;
  name: string;
  texture: string;
  intensity: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightFlicker {
  id: string;
  name: string;
  enabled: boolean;
  intensity: number;
  frequency: number;
  randomness: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightAnimation {
  id: string;
  name: string;
  type: 'rotation' | 'pulse' | 'flicker' | 'color_change' | 'intensity_change';
  duration: number;
  loop: boolean;
  curve: AnimationCurve;
  isActive: boolean;
  lastUpdate: Date;
}

export interface AnimationCurve {
  type: 'linear' | 'ease_in' | 'ease_out' | 'ease_in_out' | 'bounce' | 'elastic' | 'custom';
  keys: AnimationKey[];
  isActive: boolean;
}

export interface AnimationKey {
  time: number;
  value: number;
  inTangent: number;
  outTangent: number;
  isActive: boolean;
}

export interface LightGroup {
  id: string;
  name: string;
  lights: string[];
  settings: LightGroupSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightGroupSettings {
  enabled: boolean;
  intensity: number;
  color: Color;
  isActive: boolean;
}

export interface LightPreset {
  id: string;
  name: string;
  description: string;
  type: 'sunset' | 'sunrise' | 'noon' | 'night' | 'dungeon' | 'cave' | 'forest' | 'desert';
  lights: Light[];
  ambient: AmbientLighting;
  isActive: boolean;
  usageCount: number;
  lastUsed: Date;
}

export interface LightManager {
  id: string;
  name: string;
  lights: Light[];
  groups: LightGroup[];
  presets: LightPreset[];
  performance: LightingPerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightRenderer {
  id: string;
  name: string;
  type: 'forward' | 'deferred' | 'clustered' | 'tiled';
  settings: LightRendererSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface LightRendererSettings {
  maxLights: number;
  maxShadows: number;
  shadowDistance: number;
  shadowFadeDistance: number;
  isActive: boolean;
}

export interface LightDebug {
  id: string;
  name: string;
  type: 'bounds' | 'direction' | 'intensity' | 'shadows' | 'performance';
  enabled: boolean;
  color: Color;
  isActive: boolean;
}

export interface LightProfile {
  id: string;
  name: string;
  type: string;
  settings: LightingSettings;
  performance: LightingPerformance;
  isActive: boolean;
  lastUsed: Date;
}

export interface LightLibrary {
  id: string;
  name: string;
  presets: LightPreset[];
  isActive: boolean;
  lastUpdate: Date;
}
