export interface CameraSystem {
  id: string;
  name: string;
  cameras: Camera[];
  activeCamera: string;
  settings: CameraSettings;
  performance: CameraPerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Camera {
  id: string;
  name: string;
  type: 'perspective' | 'orthographic' | 'fisheye' | 'panoramic';
  position: Vector3;
  rotation: Vector3;
  target: Vector3;
  fov: number;
  near: number;
  far: number;
  aspect: number;
  zoom: number;
  settings: CameraSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface CameraSettings {
  id: string;
  movement: CameraMovement;
  rotation: CameraRotation;
  zoom: CameraZoom;
  shake: CameraShake;
  effects: CameraEffect[];
  isActive: boolean;
}

export interface CameraMovement {
  enabled: boolean;
  speed: number;
  acceleration: number;
  deceleration: number;
  smoothing: number;
  isActive: boolean;
}

export interface CameraRotation {
  enabled: boolean;
  speed: number;
  smoothing: number;
  limits: RotationLimits;
  isActive: boolean;
}

export interface RotationLimits {
  enabled: boolean;
  minPitch: number;
  maxPitch: number;
  minYaw: number;
  maxYaw: number;
  isActive: boolean;
}

export interface CameraZoom {
  enabled: boolean;
  speed: number;
  min: number;
  max: number;
  smoothing: number;
  isActive: boolean;
}

export interface CameraShake {
  enabled: boolean;
  intensity: number;
  frequency: number;
  duration: number;
  decay: number;
  isActive: boolean;
}

export interface CameraEffect {
  id: string;
  name: string;
  type: 'fade' | 'blur' | 'distortion' | 'color_grade' | 'chromatic_aberration' | 'vignette';
  enabled: boolean;
  intensity: number;
  duration: number;
  isActive: boolean;
}

export interface CameraPerformance {
  id: string;
  fps: number;
  frameTime: number;
  cullingTime: number;
  frustumCulling: boolean;
  occlusionCulling: boolean;
  isActive: boolean;
  lastUpdate: Date;
}

export interface CameraController {
  id: string;
  name: string;
  type: 'free' | 'orbit' | 'first_person' | 'third_person' | 'cinematic' | 'follow';
  camera: string;
  target: string;
  settings: ControllerSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ControllerSettings {
  id: string;
  movement: MovementSettings;
  rotation: RotationSettings;
  zoom: ZoomSettings;
  isActive: boolean;
}

export interface MovementSettings {
  enabled: boolean;
  speed: number;
  acceleration: number;
  deceleration: number;
  smoothing: number;
  isActive: boolean;
}

export interface RotationSettings {
  enabled: boolean;
  speed: number;
  smoothing: number;
  limits: RotationLimits;
  isActive: boolean;
}

export interface ZoomSettings {
  enabled: boolean;
  speed: number;
  min: number;
  max: number;
  smoothing: number;
  isActive: boolean;
}

export interface CameraTransition {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: number;
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

export interface CameraPath {
  id: string;
  name: string;
  points: CameraPathPoint[];
  duration: number;
  loop: boolean;
  isActive: boolean;
  lastUpdate: Date;
}

export interface CameraPathPoint {
  id: string;
  position: Vector3;
  rotation: Vector3;
  time: number;
  curve: AnimationCurve;
  isActive: boolean;
}

export interface CameraCutscene {
  id: string;
  name: string;
  cameras: CameraCutsceneCamera[];
  transitions: CameraTransition[];
  duration: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface CameraCutsceneCamera {
  id: string;
  camera: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
}

export interface CameraRig {
  id: string;
  name: string;
  type: 'dolly' | 'crane' | 'handheld' | 'steady_cam' | 'drone';
  position: Vector3;
  rotation: Vector3;
  settings: RigSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface RigSettings {
  id: string;
  movement: RigMovement;
  stabilization: RigStabilization;
  isActive: boolean;
}

export interface RigMovement {
  enabled: boolean;
  speed: number;
  acceleration: number;
  deceleration: number;
  smoothing: number;
  isActive: boolean;
}

export interface RigStabilization {
  enabled: boolean;
  intensity: number;
  smoothing: number;
  isActive: boolean;
}

export interface CameraPreset {
  id: string;
  name: string;
  description: string;
  type: 'action' | 'dramatic' | 'intimate' | 'wide' | 'close_up' | 'overhead';
  camera: Camera;
  settings: CameraSettings;
  isActive: boolean;
  usageCount: number;
  lastUsed: Date;
}

export interface CameraManager {
  id: string;
  name: string;
  cameras: Camera[];
  controllers: CameraController[];
  presets: CameraPreset[];
  performance: CameraPerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface CameraRenderer {
  id: string;
  name: string;
  type: 'forward' | 'deferred' | 'clustered' | 'tiled';
  settings: CameraRendererSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface CameraRendererSettings {
  culling: CullingSettings;
  lod: LODSettings;
  isActive: boolean;
}

export interface CullingSettings {
  enabled: boolean;
  frustumCulling: boolean;
  occlusionCulling: boolean;
  distanceCulling: boolean;
  isActive: boolean;
}

export interface LODSettings {
  enabled: boolean;
  distances: number[];
  qualities: string[];
  isActive: boolean;
}

export interface CameraDebug {
  id: string;
  name: string;
  type: 'frustum' | 'position' | 'rotation' | 'target' | 'performance';
  enabled: boolean;
  color: Color;
  isActive: boolean;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface CameraProfile {
  id: string;
  name: string;
  type: string;
  settings: CameraSettings;
  performance: CameraPerformance;
  isActive: boolean;
  lastUsed: Date;
}

export interface CameraLibrary {
  id: string;
  name: string;
  presets: CameraPreset[];
  isActive: boolean;
  lastUpdate: Date;
}
