export interface GraphicsSystem {
  id: string;
  name: string;
  type: 'webgl' | 'webgpu' | 'canvas2d' | 'svg';
  version: string;
  capabilities: GraphicsCapabilities;
  settings: GraphicsSettings;
  performance: GraphicsPerformance;
  isActive: boolean;
  lastUpdate: Date;
}

export interface GraphicsCapabilities {
  id: string;
  maxTextureSize: number;
  maxVertexAttribs: number;
  maxVaryingVectors: number;
  maxFragmentUniforms: number;
  maxVertexUniforms: number;
  maxTextureImageUnits: number;
  maxVertexTextureImageUnits: number;
  maxCombinedTextureImageUnits: number;
  maxCubeMapTextureSize: number;
  maxRenderBufferSize: number;
  maxViewportDims: number[];
  aliasedLineWidthRange: number[];
  aliasedPointSizeRange: number[];
  maxAnisotropy: number;
  maxSamples: number;
  extensions: string[];
  isActive: boolean;
}

export interface GraphicsSettings {
  id: string;
  resolution: Resolution;
  quality: GraphicsQuality;
  antiAliasing: AntiAliasingSettings;
  shadows: ShadowSettings;
  lighting: LightingSettings;
  postProcessing: PostProcessingSettings;
  particles: ParticleSettings;
  isActive: boolean;
}

export interface Resolution {
  width: number;
  height: number;
  aspectRatio: number;
  pixelRatio: number;
  isActive: boolean;
}

export interface GraphicsQuality {
  level: 'low' | 'medium' | 'high' | 'ultra';
  textureQuality: 'low' | 'medium' | 'high' | 'ultra';
  modelQuality: 'low' | 'medium' | 'high' | 'ultra';
  effectQuality: 'low' | 'medium' | 'high' | 'ultra';
  isActive: boolean;
}

export interface AntiAliasingSettings {
  enabled: boolean;
  type: 'none' | 'msaa' | 'fxaa' | 'smaa' | 'taa';
  samples: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  isActive: boolean;
}

export interface ShadowSettings {
  enabled: boolean;
  type: 'none' | 'hard' | 'soft' | 'pcf' | 'vsm' | 'esm';
  resolution: number;
  bias: number;
  normalBias: number;
  distance: number;
  isActive: boolean;
}

export interface LightingSettings {
  enabled: boolean;
  type: 'forward' | 'deferred' | 'clustered';
  maxLights: number;
  ambientIntensity: number;
  directionalIntensity: number;
  isActive: boolean;
}

export interface PostProcessingSettings {
  enabled: boolean;
  effects: PostProcessingEffect[];
  isActive: boolean;
}

export interface PostProcessingEffect {
  id: string;
  name: string;
  type: 'bloom' | 'ssao' | 'hdr' | 'dof' | 'motion_blur' | 'chromatic_aberration' | 'vignette' | 'color_grading';
  enabled: boolean;
  intensity: number;
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ParticleSettings {
  enabled: boolean;
  maxParticles: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  isActive: boolean;
}

export interface GraphicsPerformance {
  id: string;
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangles: number;
  vertices: number;
  textures: number;
  memoryUsage: number;
  gpuUsage: number;
  cpuUsage: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Renderer {
  id: string;
  name: string;
  type: 'forward' | 'deferred' | 'clustered';
  capabilities: RendererCapabilities;
  settings: RendererSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface RendererCapabilities {
  id: string;
  maxLights: number;
  maxShadows: number;
  maxParticles: number;
  maxTextures: number;
  maxMaterials: number;
  isActive: boolean;
}

export interface RendererSettings {
  id: string;
  culling: CullingSettings;
  lod: LODSettings;
  batching: BatchingSettings;
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

export interface BatchingSettings {
  enabled: boolean;
  maxBatchSize: number;
  isActive: boolean;
}

export interface Shader {
  id: string;
  name: string;
  type: 'vertex' | 'fragment' | 'compute' | 'geometry';
  source: string;
  uniforms: ShaderUniform[];
  attributes: ShaderAttribute[];
  isActive: boolean;
  lastCompiled: Date;
}

export interface ShaderUniform {
  id: string;
  name: string;
  type: 'float' | 'int' | 'bool' | 'vec2' | 'vec3' | 'vec4' | 'mat3' | 'mat4' | 'sampler2D' | 'samplerCube';
  location: number;
  value: unknown;
  isActive: boolean;
}

export interface ShaderAttribute {
  id: string;
  name: string;
  type: 'float' | 'int' | 'bool' | 'vec2' | 'vec3' | 'vec4';
  location: number;
  size: number;
  isActive: boolean;
}

export interface Material {
  id: string;
  name: string;
  type: 'standard' | 'pbr' | 'unlit' | 'transparent' | 'cutout';
  shader: string;
  properties: MaterialProperty[];
  textures: MaterialTexture[];
  isActive: boolean;
  lastUpdated: Date;
}

export interface MaterialProperty {
  id: string;
  name: string;
  type: 'color' | 'float' | 'int' | 'bool' | 'vector' | 'matrix';
  value: unknown;
  isActive: boolean;
}

export interface MaterialTexture {
  id: string;
  name: string;
  type: 'diffuse' | 'normal' | 'specular' | 'roughness' | 'metallic' | 'emission' | 'occlusion';
  texture: string;
  tiling: Vector2;
  offset: Vector2;
  isActive: boolean;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Matrix4 {
  elements: number[];
}

export interface Transform {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  matrix: Matrix4;
  isActive: boolean;
}

export interface Camera {
  id: string;
  name: string;
  type: 'perspective' | 'orthographic';
  position: Vector3;
  rotation: Vector3;
  fov: number;
  near: number;
  far: number;
  aspect: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Light {
  id: string;
  name: string;
  type: 'directional' | 'point' | 'spot' | 'ambient';
  position: Vector3;
  direction: Vector3;
  color: Vector3;
  intensity: number;
  range: number;
  angle: number;
  penumbra: number;
  decay: number;
  castShadow: boolean;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Mesh {
  id: string;
  name: string;
  geometry: Geometry;
  material: string;
  transform: Transform;
  visible: boolean;
  castShadow: boolean;
  receiveShadow: boolean;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Geometry {
  id: string;
  name: string;
  vertices: number[];
  normals: number[];
  uvs: number[];
  indices: number[];
  tangents: number[];
  colors: number[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface Texture {
  id: string;
  name: string;
  type: '2d' | 'cube' | '3d';
  format: 'rgba' | 'rgb' | 'luminance' | 'luminance_alpha';
  internalFormat: 'rgba8' | 'rgb8' | 'luminance8' | 'luminance8_alpha8';
  width: number;
  height: number;
  depth: number;
  mipmaps: boolean;
  wrapS: 'clamp' | 'repeat' | 'mirror';
  wrapT: 'clamp' | 'repeat' | 'mirror';
  minFilter: 'nearest' | 'linear' | 'nearest_mipmap_nearest' | 'nearest_mipmap_linear' | 'linear_mipmap_nearest' | 'linear_mipmap_linear';
  magFilter: 'nearest' | 'linear';
  anisotropy: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Animation {
  id: string;
  name: string;
  type: 'keyframe' | 'morph' | 'skeletal';
  duration: number;
  tracks: AnimationTrack[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AnimationTrack {
  id: string;
  name: string;
  type: 'position' | 'rotation' | 'scale' | 'morph' | 'bone';
  target: string;
  keyframes: Keyframe[];
  isActive: boolean;
}

export interface Keyframe {
  time: number;
  value: unknown;
  interpolation: 'linear' | 'step' | 'cubic';
}

export interface ParticleSystem {
  id: string;
  name: string;
  type: 'explosion' | 'smoke' | 'fire' | 'spark' | 'dust' | 'rain' | 'snow' | 'magic';
  emitter: ParticleEmitter;
  particles: Particle[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface ParticleEmitter {
  id: string;
  name: string;
  type: 'point' | 'line' | 'circle' | 'sphere' | 'box' | 'cone';
  position: Vector3;
  direction: Vector3;
  spread: number;
  speed: number;
  rate: number;
  lifetime: number;
  isActive: boolean;
}

export interface Particle {
  id: string;
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  rotation: number;
  angularVelocity: number;
  scale: number;
  color: Vector4;
  alpha: number;
  lifetime: number;
  age: number;
  isActive: boolean;
}

export interface VisualEffect {
  id: string;
  name: string;
  type: 'screen_shake' | 'slow_motion' | 'fade' | 'flash' | 'blur' | 'distortion';
  duration: number;
  intensity: number;
  parameters: Record<string, unknown>;
  isActive: boolean;
  lastUpdate: Date;
}

export interface PostProcessor {
  id: string;
  name: string;
  type: 'bloom' | 'ssao' | 'hdr' | 'dof' | 'motion_blur' | 'chromatic_aberration' | 'vignette' | 'color_grading';
  enabled: boolean;
  intensity: number;
  parameters: Record<string, unknown>;
  isActive: boolean;
  lastUpdate: Date;
}

export interface RenderTarget {
  id: string;
  name: string;
  type: 'color' | 'depth' | 'stencil' | 'color_depth';
  width: number;
  height: number;
  format: 'rgba8' | 'rgb8' | 'depth24' | 'depth32';
  isActive: boolean;
  lastUpdate: Date;
}

export interface GraphicsDebug {
  id: string;
  name: string;
  type: 'wireframe' | 'normals' | 'uvs' | 'shadows' | 'lighting' | 'performance';
  enabled: boolean;
  parameters: Record<string, unknown>;
  isActive: boolean;
  lastUpdate: Date;
}
