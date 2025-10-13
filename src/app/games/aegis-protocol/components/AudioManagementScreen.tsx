'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { 
  Volume2, 
  Music, 
  Headphones, 
  Mic, 
  Play, 
  Pause, 
  Square, 
  Shuffle, 
  Repeat, 
  Settings, 
  BarChart3,
  Radio,
  Zap,
  Activity,
  Sliders
} from 'lucide-react';

const AudioManagementScreen: React.FC = () => {
  const {
    audioSettings,
    audioTracks,
    soundEffects,
    ambientSounds,
    voiceLines,
    audioEvents,
    audioAnalytics,
    playlists,
    setMasterVolume,
    setMusicVolume,
    setSFXVolume,
    setVoiceVolume,
    setAmbientVolume,
    setUIVolume,
    setAudioQuality,
    toggleSpatialAudio,
    toggleReverb,
    createAudioTrack,
    playAudioTrack,
    pauseAudioTrack,
    stopAudioTrack,
    createPlaylist,
    setPlaylistShuffle,
    setPlaylistRepeat,
    playPlaylist,
    createSoundEffect,
    playSoundEffect,
    stopSoundEffect,
    createAmbientSound,
    playAmbientSound,
    stopAmbientSound,
    createVoiceLine,
    playVoiceLine,
    stopVoiceLine,
    createAudioEvent,
    triggerAudioEvent,
    createEqualizerPreset,
    setAudioAnalytics
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'settings' | 'music' | 'sfx' | 'ambient' | 'voice' | 'events' | 'equalizer' | 'analytics'>('settings');

  const tabs = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'sfx', label: 'Sound Effects', icon: Zap },
    { id: 'ambient', label: 'Ambient', icon: Radio },
    { id: 'voice', label: 'Voice Lines', icon: Mic },
    { id: 'events', label: 'Events', icon: Activity },
    { id: 'equalizer', label: 'Equalizer', icon: Sliders },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const handleInitializeAudio = () => {
    console.log('Audio system initialized!');
  };

  const handleCreateAudioTrack = () => {
    createAudioTrack('New Track', 'Unknown Artist', '/audio/tracks/new_track.mp3');
  };

  const handleCreatePlaylist = () => {
    createPlaylist('New Playlist', 'A custom playlist');
  };

  const handleCreateSoundEffect = () => {
    createSoundEffect('New Sound Effect', 'ui', '/audio/sfx/new_effect.mp3');
  };

  const handleCreateAmbientSound = () => {
    createAmbientSound('New Ambient Sound', 'nature', '/audio/ambient/new_ambient.mp3');
  };

  const handleCreateVoiceLine = () => {
    createVoiceLine('character_1', 'Hello there!', 'neutral', 'dialogue');
  };

  const handleCreateAudioEvent = () => {
    createAudioEvent('New Event', 'play', 'track_1', { volume: 0.8, fadeIn: 1.0 });
  };

  const handleCreateEqualizerPreset = () => {
    createEqualizerPreset('Custom Preset', 'A custom equalizer preset', []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Audio Management</h1>
          <p className="text-slate-300">Manage audio systems, music, sound effects, and voice lines</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'settings' | 'music' | 'sfx' | 'ambient' | 'voice' | 'events' | 'equalizer' | 'analytics')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Audio Settings</h2>
                <button
                  onClick={handleInitializeAudio}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Initialize Audio
                </button>
              </div>

              {/* Volume Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Master Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.masterVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.masterVolume}
                      onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Music className="w-5 h-5 mr-2" />
                    Music Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.musicVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.musicVolume}
                      onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    SFX Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.sfxVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.sfxVolume}
                      onChange={(e) => setSFXVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Mic className="w-5 h-5 mr-2" />
                    Voice Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.voiceVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.voiceVolume}
                      onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Radio className="w-5 h-5 mr-2" />
                    Ambient Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.ambientVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.ambientVolume}
                      onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Headphones className="w-5 h-5 mr-2" />
                    UI Volume
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Volume</span>
                      <span className="text-white font-mono">{Math.round(audioSettings.uiVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={audioSettings.uiVolume}
                      onChange={(e) => setUIVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Audio Quality & Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Audio Quality</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-300 mb-2">Quality Level</label>
                      <select
                        value={audioSettings.quality}
                        onChange={(e) => setAudioQuality(e.target.value as 'low' | 'medium' | 'high' | 'ultra')}
                        className="w-full bg-slate-600 text-white rounded-lg px-3 py-2"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="ultra">Ultra</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Sample Rate</span>
                      <span className="text-white font-mono">{audioSettings.sampleRate} Hz</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Bit Depth</span>
                      <span className="text-white font-mono">{audioSettings.bitDepth} bit</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Audio Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Spatial Audio</span>
                      <button
                        onClick={() => toggleSpatialAudio(!audioSettings.spatialAudio)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          audioSettings.spatialAudio ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          audioSettings.spatialAudio ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Reverb</span>
                      <button
                        onClick={() => toggleReverb(!audioSettings.reverb)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          audioSettings.reverb ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          audioSettings.reverb ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Compression</span>
                      <span className={`text-sm ${audioSettings.compression ? 'text-green-400' : 'text-red-400'}`}>
                        {audioSettings.compression ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Music Tab */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Music Management</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCreateAudioTrack}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Add Track
                  </button>
                  <button
                    onClick={handleCreatePlaylist}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                  >
                    Create Playlist
                  </button>
                </div>
              </div>

              {/* Audio Tracks */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Audio Tracks ({audioTracks.length})</h3>
                <div className="space-y-3">
                  {audioTracks.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No audio tracks available</p>
                  ) : (
                    audioTracks.map((track) => (
                      <div key={track.id} className="bg-slate-600/50 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Music className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{track.name}</h4>
                            <p className="text-slate-300 text-sm">{track.artist}</p>
                            <p className="text-slate-400 text-xs">{track.format.toUpperCase()} • {track.bitrate} kbps</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => playAudioTrack(track.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => pauseAudioTrack(track.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => stopAudioTrack(track.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Playlists */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Playlists ({playlists.length})</h3>
                <div className="space-y-3">
                  {playlists.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No playlists available</p>
                  ) : (
                    playlists.map((playlist) => (
                      <div key={playlist.id} className="bg-slate-600/50 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Radio className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{playlist.name}</h4>
                            <p className="text-slate-300 text-sm">{playlist.description}</p>
                            <p className="text-slate-400 text-xs">{playlist.tracks.length} tracks • {playlist.shuffle ? 'Shuffle' : 'Normal'} • {playlist.repeat}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => playPlaylist(playlist.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPlaylistShuffle(playlist.id, !playlist.shuffle)}
                            className={`p-2 rounded-lg transition-colors ${playlist.shuffle ? 'bg-purple-500 hover:bg-purple-600' : 'bg-slate-600 hover:bg-slate-500'}`}
                          >
                            <Shuffle className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => setPlaylistRepeat(playlist.id, playlist.repeat === 'none' ? 'all' : playlist.repeat === 'all' ? 'one' : 'none')}
                            className={`p-2 rounded-lg transition-colors ${playlist.repeat !== 'none' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-slate-600 hover:bg-slate-500'}`}
                          >
                            <Repeat className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sound Effects Tab */}
          {activeTab === 'sfx' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Sound Effects</h2>
                <button
                  onClick={handleCreateSoundEffect}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                >
                  Add Sound Effect
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {soundEffects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Zap className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No sound effects available</p>
                  </div>
                ) : (
                  soundEffects.map((effect) => (
                    <div key={effect.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{effect.name}</h3>
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">{effect.category}</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-4">{effect.subcategory}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playSoundEffect(effect.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => stopSoundEffect(effect.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-400">
                          Intensity: {effect.intensity}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Ambient Sounds Tab */}
          {activeTab === 'ambient' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Ambient Sounds</h2>
                <button
                  onClick={handleCreateAmbientSound}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Add Ambient Sound
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ambientSounds.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Radio className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No ambient sounds available</p>
                  </div>
                ) : (
                  ambientSounds.map((sound) => (
                    <div key={sound.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{sound.name}</h3>
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">{sound.category}</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-4">Radius: {sound.radius}m • Falloff: {sound.falloff}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playAmbientSound(sound.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => stopAmbientSound(sound.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-400">
                          Intensity: {sound.intensity}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Voice Lines Tab */}
          {activeTab === 'voice' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Voice Lines</h2>
                <button
                  onClick={handleCreateVoiceLine}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
                >
                  Add Voice Line
                </button>
              </div>

              <div className="space-y-4">
                {voiceLines.length === 0 ? (
                  <div className="text-center py-12">
                    <Mic className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No voice lines available</p>
                  </div>
                ) : (
                  voiceLines.map((voice) => (
                    <div key={voice.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{voice.characterName}</h3>
                          <p className="text-slate-300 text-sm">{voice.text}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">{voice.emotion}</span>
                          <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">{voice.context}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => playVoiceLine(voice.id)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => stopVoiceLine(voice.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-400">
                          Priority: {voice.priority} • Cooldown: {voice.cooldown}s
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Audio Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Audio Events</h2>
                <button
                  onClick={handleCreateAudioEvent}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  Create Event
                </button>
              </div>

              <div className="space-y-4">
                {audioEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">No audio events available</p>
                  </div>
                ) : (
                  audioEvents.map((event) => (
                    <div key={event.id} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{event.name}</h3>
                          <p className="text-slate-300 text-sm">Type: {event.type} • Target: {event.target}</p>
                        </div>
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">{event.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => triggerAudioEvent(event.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <Zap className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-400">
                          Delay: {event.delay}s • Duration: {event.duration}s
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Equalizer Tab */}
          {activeTab === 'equalizer' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Equalizer</h2>
                <button
                  onClick={handleCreateEqualizerPreset}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                >
                  Create Preset
                </button>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Equalizer Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-10 gap-2">
                    {[32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000].map((freq) => (
                      <div key={freq} className="text-center">
                        <div className="text-xs text-slate-300 mb-2">{freq}Hz</div>
                        <input
                          type="range"
                          min="-12"
                          max="12"
                          step="1"
                          defaultValue="0"
                          className="w-full h-32 bg-slate-600 rounded-lg appearance-none cursor-pointer transform -rotate-90 origin-center"
                          style={{ writingMode: 'bt-lr' as React.CSSProperties['writingMode'] }}
                        />
                        <div className="text-xs text-slate-400 mt-2">0dB</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Audio Analytics</h2>
                <button
                  onClick={() => setAudioAnalytics(true)}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
                >
                  Enable Analytics
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Audio Events</h3>
                  <div className="text-3xl font-bold text-white mb-2">{audioAnalytics.length}</div>
                  <p className="text-slate-300 text-sm">Total events recorded</p>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Active Tracks</h3>
                  <div className="text-3xl font-bold text-white mb-2">{audioTracks.length}</div>
                  <p className="text-slate-300 text-sm">Available audio tracks</p>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Sound Effects</h3>
                  <div className="text-3xl font-bold text-white mb-2">{soundEffects.length}</div>
                  <p className="text-slate-300 text-sm">Available sound effects</p>
                </div>
              </div>

              {audioAnalytics.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
                  <div className="space-y-2">
                    {audioAnalytics.slice(-5).map((event) => (
                      <div key={event.id} className="bg-slate-600/50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{event.event}</p>
                          <p className="text-slate-300 text-sm">{event.action} • {event.audioId}</p>
                        </div>
                        <div className="text-xs text-slate-400">
                          {event.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioManagementScreen;
