export interface AudioState {
  isPlaying: boolean;
  currentTrack: string | null;
  volume: AudioVolume;
  settings: AudioSettings;
  playlists: Playlist[];
  soundEffects: SoundEffect[];
  ambientSounds: AmbientSound[];
  voiceLines: VoiceLine[];
  isMuted: boolean;
  isPaused: boolean;
}

export interface AudioVolume {
  master: number; // 0-100
  music: number; // 0-100
  sfx: number; // 0-100
  voice: number; // 0-100
  ambient: number; // 0-100
}

export interface AudioSettings {
  quality: 'low' | 'medium' | 'high' | 'ultra';
  compression: boolean;
  spatialAudio: boolean;
  reverb: boolean;
  equalizer: EqualizerSettings;
  crossfade: boolean;
  fadeTime: number;
  loopMusic: boolean;
  randomPlay: boolean;
}

export interface EqualizerSettings {
  enabled: boolean;
  presets: EqualizerPreset[];
  currentPreset: string;
  custom: EqualizerBand[];
}

export interface EqualizerPreset {
  id: string;
  name: string;
  description: string;
  bands: EqualizerBand[];
}

export interface EqualizerBand {
  frequency: number;
  gain: number;
  q: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: AudioTrack[];
  isShuffled: boolean;
  isLooping: boolean;
  currentIndex: number;
  isPlaying: boolean;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  filePath: string;
  format: 'mp3' | 'wav' | 'ogg' | 'flac';
  bitrate: number;
  sampleRate: number;
  channels: number;
  tags: string[];
  isFavorite: boolean;
  playCount: number;
  lastPlayed: Date;
}

export interface SoundEffect {
  id: string;
  name: string;
  description: string;
  filePath: string;
  category: SoundCategory;
  volume: number;
  pitch: number;
  isLooping: boolean;
  maxInstances: number;
  spatialAudio: boolean;
  falloffDistance: number;
  is3D: boolean;
}

export interface SoundCategory {
  id: string;
  name: string;
  description: string;
  volume: number;
  isMuted: boolean;
  effects: string[];
}

export interface AmbientSound {
  id: string;
  name: string;
  description: string;
  filePath: string;
  volume: number;
  isLooping: boolean;
  fadeIn: number;
  fadeOut: number;
  spatialAudio: boolean;
  position?: { x: number; y: number; z: number };
  radius: number;
  isPlaying: boolean;
}

export interface VoiceLine {
  id: string;
  characterId: string;
  text: string;
  filePath: string;
  emotion: VoiceEmotion;
  context: VoiceContext;
  volume: number;
  pitch: number;
  speed: number;
  isSubtitle: boolean;
  subtitle: string;
  duration: number;
}

export interface VoiceEmotion {
  type: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited' | 'worried' | 'determined' | 'confused';
  intensity: number; // 0-100
  description: string;
}

export interface VoiceContext {
  situation: 'combat' | 'dialogue' | 'story' | 'menu' | 'notification';
  priority: 'low' | 'medium' | 'high' | 'critical';
  interruptible: boolean;
  queueable: boolean;
}

export interface AudioEvent {
  id: string;
  type: 'play' | 'pause' | 'stop' | 'volume' | 'mute' | 'unmute';
  target: string;
  data: unknown;
  timestamp: Date;
}

export interface AudioAnalytics {
  totalPlayTime: number;
  mostPlayedTracks: AudioTrack[];
  favoriteGenres: string[];
  listeningPatterns: ListeningPattern[];
  volumeUsage: VolumeUsage[];
  skipRate: number;
  completionRate: number;
}

export interface ListeningPattern {
  timeOfDay: string;
  duration: number;
  tracksPlayed: number;
  genres: string[];
}

export interface VolumeUsage {
  timestamp: Date;
  master: number;
  music: number;
  sfx: number;
  voice: number;
  ambient: number;
}

export interface AudioPreset {
  id: string;
  name: string;
  description: string;
  settings: AudioSettings;
  volume: AudioVolume;
  equalizer: EqualizerSettings;
  isDefault: boolean;
  isCustom: boolean;
}

export interface AudioPlayback {
  trackId: string;
  startTime: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isPaused: boolean;
  isLooping: boolean;
  volume: number;
  pitch: number;
  speed: number;
}

export interface AudioQueue {
  tracks: AudioTrack[];
  currentIndex: number;
  isShuffled: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  nextTrack: AudioTrack | null;
  previousTrack: AudioTrack | null;
}
