export interface ParticleSystem {
  id: string;
  name: string;
  type: 'explosion' | 'smoke' | 'fire' | 'spark' | 'dust' | 'rain' | 'snow' | 'magic' | 'trail' | 'aura';
  emitter: ParticleEmitter;
  particles: Particle[];
  settings: ParticleSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleEmitter {
  id: string;
  name: string;
  type: 'point' | 'line' | 'circle' | 'sphere' | 'box' | 'cone' | 'mesh';
  position: Vector3;
  direction: Vector3;
  spread: number;
  speed: ParticleSpeed;
  rate: ParticleRate;
  lifetime: ParticleLifetime;
  size: ParticleSize;
  color: ParticleColor;
  rotation: ParticleRotation;
  isActive: boolean;
}

export interface ParticleSpeed {
  min: number;
  max: number;
  curve: AnimationCurve;
  isActive: boolean;
}

export interface ParticleRate {
  particlesPerSecond: number;
  burst: ParticleBurst[];
  isActive: boolean;
}

export interface ParticleBurst {
  time: number;
  count: number;
  isActive: boolean;
}

export interface ParticleLifetime {
  min: number;
  max: number;
  curve: AnimationCurve;
  isActive: boolean;
}

export interface ParticleSize {
  start: number;
  end: number;
  curve: AnimationCurve;
  isActive: boolean;
}

export interface ParticleColor {
  start: Color;
  end: Color;
  curve: AnimationCurve;
  isActive: boolean;
}

export interface ParticleRotation {
  start: number;
  end: number;
  curve: AnimationCurve;
  isActive: boolean;
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

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Particle {
  id: string;
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  rotation: number;
  angularVelocity: number;
  scale: number;
  color: Color;
  alpha: number;
  lifetime: number;
  age: number;
  isActive: boolean;
}

export interface ParticleSettings {
  id: string;
  maxParticles: number;
  sorting: ParticleSorting;
  blending: ParticleBlending;
  culling: ParticleCulling;
  isActive: boolean;
}

export interface ParticleSorting {
  enabled: boolean;
  type: 'none' | 'distance' | 'age' | 'size';
  isActive: boolean;
}

export interface ParticleBlending {
  enabled: boolean;
  type: 'additive' | 'alpha' | 'multiply' | 'screen';
  isActive: boolean;
}

export interface ParticleCulling {
  enabled: boolean;
  frustum: boolean;
  distance: boolean;
  isActive: boolean;
}

export interface ParticleEffect {
  id: string;
  name: string;
  type: 'explosion' | 'impact' | 'muzzle_flash' | 'smoke_trail' | 'magic_aura' | 'blood_splash' | 'spark_burst';
  system: string;
  trigger: ParticleTrigger;
  isActive: boolean;
  lastUsed: Date;
}

export interface ParticleTrigger {
  type: 'on_hit' | 'on_death' | 'on_ability' | 'on_movement' | 'continuous' | 'manual';
  condition: string;
  isActive: boolean;
}

export interface ParticlePreset {
  id: string;
  name: string;
  description: string;
  type: 'explosion' | 'smoke' | 'fire' | 'spark' | 'dust' | 'rain' | 'snow' | 'magic';
  settings: ParticleSettings;
  emitter: ParticleEmitter;
  isActive: boolean;
  usageCount: number;
  lastUsed: Date;
}

export interface ParticleManager {
  id: string;
  name: string;
  systems: ParticleSystem[];
  presets: ParticlePreset[];
  effects: ParticleEffect[];
  performance: ParticlePerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticlePerformance {
  id: string;
  totalParticles: number;
  activeSystems: number;
  drawCalls: number;
  memoryUsage: number;
  fps: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleRenderer {
  id: string;
  name: string;
  type: 'billboard' | 'mesh' | 'trail' | 'ribbon';
  material: string;
  shader: string;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleTexture {
  id: string;
  name: string;
  type: 'atlas' | 'single' | 'animated';
  texture: string;
  frames: number;
  frameRate: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleForce {
  id: string;
  name: string;
  type: 'gravity' | 'wind' | 'turbulence' | 'vortex' | 'attraction' | 'repulsion';
  strength: number;
  direction: Vector3;
  isActive: boolean;
}

export interface ParticleConstraint {
  id: string;
  name: string;
  type: 'collision' | 'bounce' | 'stick' | 'kill' | 'teleport';
  target: string;
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ParticleModifier {
  id: string;
  name: string;
  type: 'size_over_lifetime' | 'color_over_lifetime' | 'speed_over_lifetime' | 'rotation_over_lifetime';
  curve: AnimationCurve;
  isActive: boolean;
}

export interface ParticleSubSystem {
  id: string;
  name: string;
  parent: string;
  type: 'spawn' | 'trail' | 'collision';
  settings: ParticleSettings;
  isActive: boolean;
}

export interface ParticleEvent {
  id: string;
  name: string;
  type: 'spawn' | 'death' | 'collision' | 'custom';
  callback: string;
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ParticlePool {
  id: string;
  name: string;
  type: string;
  size: number;
  available: number;
  used: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleDebug {
  id: string;
  name: string;
  type: 'bounds' | 'emitter' | 'forces' | 'constraints' | 'performance';
  enabled: boolean;
  color: Color;
  isActive: boolean;
}

export interface ParticleProfile {
  id: string;
  name: string;
  type: string;
  settings: ParticleSettings;
  emitter: ParticleEmitter;
  performance: ParticlePerformance;
  isActive: boolean;
  lastUsed: Date;
}

export interface ParticleLibrary {
  id: string;
  name: string;
  presets: ParticlePreset[];
  effects: ParticleEffect[];
  textures: ParticleTexture[];
  isActive: boolean;
  lastUpdate: Date;
}
