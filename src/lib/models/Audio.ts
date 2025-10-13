// Audio System Interfaces for Aegis Protocol: Tactical Horizon

export interface AudioState {
  id: string;
  name: string;
  type: 'music' | 'sfx' | 'voice' | 'ambient' | 'ui';
  volume: number;
  pitch: number;
  pan: number;
  loop: boolean;
  fadeIn: number;
  fadeOut: number;
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  priority: number;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  lastUpdate: Date;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  ambientVolume: number;
  uiVolume: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  sampleRate: number;
  bitDepth: number;
  channels: number;
  compression: boolean;
  spatialAudio: boolean;
  reverb: boolean;
  equalizer: EqualizerSettings;
  isActive: boolean;
  lastUpdate: Date;
}

export interface EqualizerSettings {
  id: string;
  name: string;
  presets: EqualizerPreset[];
  activePreset: string;
  customBands: EqualizerBand[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface EqualizerPreset {
  id: string;
  name: string;
  description: string;
  bands: EqualizerBand[];
  category: 'music' | 'gaming' | 'voice' | 'custom';
  isActive: boolean;
  lastUpdate: Date;
}

export interface EqualizerBand {
  id: string;
  frequency: number;
  gain: number;
  q: number;
  type: 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass';
  isActive: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: AudioTrack[];
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  currentTrack: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface AudioTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  mood: string;
  intensity: number;
  bpm: number;
  key: string;
  tags: string[];
  filePath: string;
  format: 'mp3' | 'wav' | 'ogg' | 'flac' | 'aac';
  bitrate: number;
  sampleRate: number;
  channels: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface SoundEffect {
  id: string;
  name: string;
  category: 'weapon' | 'explosion' | 'impact' | 'movement' | 'ui' | 'environment' | 'character';
  subcategory: string;
  intensity: number;
  distance: number;
  direction: Vector3;
  reverb: boolean;
  echo: boolean;
  distortion: boolean;
  filters: AudioFilter[];
  triggers: AudioTrigger[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AudioFilter {
  id: string;
  type: 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass' | 'reverb' | 'echo' | 'distortion';
  frequency: number;
  gain: number;
  q: number;
  wet: number;
  dry: number;
  isActive: boolean;
}

export interface AudioTrigger {
  id: string;
  type: 'event' | 'condition' | 'timer' | 'proximity' | 'collision';
  parameters: Record<string, unknown>;
  probability: number;
  cooldown: number;
  isActive: boolean;
}

export interface AmbientSound {
  id: string;
  name: string;
  category: 'nature' | 'urban' | 'industrial' | 'space' | 'fantasy' | 'sci-fi';
  intensity: number;
  radius: number;
  falloff: number;
  loop: boolean;
  randomize: boolean;
  layers: AmbientLayer[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AmbientLayer {
  id: string;
  name: string;
  volume: number;
  pitch: number;
  pan: number;
  loop: boolean;
  randomize: boolean;
  filePath: string;
  isActive: boolean;
}

export interface VoiceLine {
  id: string;
  characterId: string;
  characterName: string;
  text: string;
  emotion: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited' | 'worried' | 'confident' | 'surprised';
  context: 'combat' | 'dialogue' | 'idle' | 'victory' | 'defeat' | 'discovery' | 'warning';
  priority: number;
  cooldown: number;
  conditions: VoiceCondition[];
  audioFile: string;
  duration: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface VoiceCondition {
  id: string;
  type: 'health' | 'ammo' | 'enemy_count' | 'time' | 'location' | 'event';
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals';
  value: unknown;
  isActive: boolean;
}

export interface AudioEvent {
  id: string;
  name: string;
  type: 'play' | 'stop' | 'pause' | 'resume' | 'fade_in' | 'fade_out' | 'crossfade' | 'loop' | 'random';
  target: string;
  parameters: Record<string, unknown>;
  delay: number;
  duration: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface AudioAnalytics {
  id: string;
  sessionId: string;
  event: string;
  audioId: string;
  action: 'play' | 'stop' | 'pause' | 'resume' | 'skip' | 'volume_change';
  timestamp: Date;
  duration: number;
  volume: number;
  userAgent: string;
  deviceInfo: DeviceInfo;
  isActive: boolean;
  lastUpdate: Date;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet' | 'console' | 'vr';
  os: string;
  browser: string;
  audioCodec: string;
  maxChannels: number;
  sampleRate: number;
  bitDepth: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface AudioManager {
  id: string;
  name: string;
  type: 'music' | 'sfx' | 'voice' | 'ambient' | 'ui';
  tracks: AudioTrack[];
  playlists: Playlist[];
  soundEffects: SoundEffect[];
  ambientSounds: AmbientSound[];
  voiceLines: VoiceLine[];
  events: AudioEvent[];
  settings: AudioSettings;
  analytics: AudioAnalytics[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AudioSystem {
  id: string;
  name: string;
  version: string;
  managers: AudioManager[];
  globalSettings: AudioSettings;
  equalizer: EqualizerSettings;
  playlists: Playlist[];
  analytics: AudioAnalytics[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AudioPerformance {
  id: string;
  fps: number;
  frameTime: number;
  audioLatency: number;
  bufferSize: number;
  droppedFrames: number;
  cpuUsage: number;
  memoryUsage: number;
  activeChannels: number;
  maxChannels: number;
  isActive: boolean;
  lastUpdate: Date;
}