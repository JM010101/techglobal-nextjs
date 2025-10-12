'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Monitor, Camera, Lightbulb, Zap, Settings, BarChart3, Palette, Eye, Layers, Sparkles } from 'lucide-react';

const GraphicsManagementScreen: React.FC = () => {
  const {
    graphics,
    renderer,
    shaders,
    materials,
    cameras,
    lights,
    particleSystems,
    visualEffects,
    postProcessors,
    lighting,
    cameraSystem,
    initializeGraphics,
    updateGraphics,
    setGraphicsQuality,
    toggleAntiAliasing,
    toggleShadows,
    createRenderer,
    createShader,
    createMaterial,
    createCamera,
    createLight,
    createParticleSystem,
    createVisualEffect,
    createPostProcessor,
    createLightingSystem,
    createCameraSystem
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'graphics' | 'renderer' | 'shaders' | 'materials' | 'cameras' | 'lights' | 'particles' | 'effects' | 'postprocessing' | 'lighting' | 'performance'>('graphics');

  const handleInitializeGraphics = () => {
    initializeGraphics();
    console.log('Graphics System Initialized!');
  };

  const handleUpdateGraphics = () => {
    updateGraphics(16.67); // 60 FPS
    console.log('Graphics System Updated!');
  };

  const handleSetQuality = (quality: 'low' | 'medium' | 'high' | 'ultra') => {
    setGraphicsQuality(quality);
    console.log('Graphics quality set to:', quality);
  };

  const handleToggleAntiAliasing = () => {
    toggleAntiAliasing(!graphics.settings.antiAliasing.enabled);
    console.log('Anti-aliasing toggled');
  };

  const handleToggleShadows = () => {
    toggleShadows(!graphics.settings.shadows.enabled);
    console.log('Shadows toggled');
  };

  const handleCreateRenderer = (type: 'forward' | 'deferred' | 'clustered' | 'tiled') => {
    createRenderer(type);
    console.log('Renderer created:', type);
  };

  const handleCreateShader = () => {
    createShader('Test Shader', 'fragment', 'void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }');
    console.log('Shader created');
  };

  const handleCreateMaterial = () => {
    createMaterial('Test Material', 'standard');
    console.log('Material created');
  };

  const handleCreateCamera = () => {
    createCamera('Test Camera', 'perspective');
    console.log('Camera created');
  };

  const handleCreateLight = () => {
    createLight('Test Light', 'directional');
    console.log('Light created');
  };

  const handleCreateParticleSystem = () => {
    createParticleSystem('Test Particles', 'explosion');
    console.log('Particle system created');
  };

  const handleCreateVisualEffect = () => {
    createVisualEffect('Test Effect', 'screen_shake');
    console.log('Visual effect created');
  };

  const handleCreatePostProcessor = () => {
    createPostProcessor('Test Post-Processor', 'bloom');
    console.log('Post-processor created');
  };

  const handleCreateLightingSystem = () => {
    createLightingSystem('forward');
    console.log('Lighting system created');
  };

  const handleCreateCameraSystem = () => {
    createCameraSystem();
    console.log('Camera system created');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Graphics Management Center
        </h1>
        <p className="text-slate-300 text-lg">
          Advanced graphics systems, visual effects, and rendering optimization
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-2 overflow-x-auto">
          {[
            { id: 'graphics', label: 'Graphics', icon: Monitor },
            { id: 'renderer', label: 'Renderer', icon: Layers },
            { id: 'shaders', label: 'Shaders', icon: Zap },
            { id: 'materials', label: 'Materials', icon: Palette },
            { id: 'cameras', label: 'Cameras', icon: Camera },
            { id: 'lights', label: 'Lights', icon: Lightbulb },
            { id: 'particles', label: 'Particles', icon: Sparkles },
            { id: 'effects', label: 'Effects', icon: Eye },
            { id: 'postprocessing', label: 'Post-Processing', icon: Settings },
            { id: 'lighting', label: 'Lighting', icon: Lightbulb },
            { id: 'performance', label: 'Performance', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'graphics' | 'renderer' | 'shaders' | 'materials' | 'cameras' | 'lights' | 'particles' | 'effects' | 'postprocessing' | 'lighting' | 'performance')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Graphics Tab */}
      {activeTab === 'graphics' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Monitor className="w-6 h-6 text-cyan-400" />
              <span>Graphics System Status</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">FPS</h3>
                <p className="text-2xl font-bold text-green-400">{graphics.performance.fps}</p>
                <p className="text-sm text-slate-400">Frames Per Second</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Frame Time</h3>
                <p className="text-2xl font-bold text-blue-400">{graphics.performance.frameTime.toFixed(2)}ms</p>
                <p className="text-sm text-slate-400">Milliseconds</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Draw Calls</h3>
                <p className="text-2xl font-bold text-purple-400">{graphics.performance.drawCalls}</p>
                <p className="text-sm text-slate-400">Per Frame</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Memory Usage</h3>
                <p className="text-2xl font-bold text-yellow-400">{graphics.performance.memoryUsage}MB</p>
                <p className="text-sm text-slate-400">GPU Memory</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Quality Settings</h3>
                <p className="text-sm text-slate-400 mb-2">Level: {graphics.settings.quality.level}</p>
                <p className="text-sm text-slate-400 mb-2">Texture Quality: {graphics.settings.quality.textureQuality}</p>
                <p className="text-sm text-slate-400 mb-2">Model Quality: {graphics.settings.quality.modelQuality}</p>
                <p className="text-sm text-slate-400 mb-4">Effect Quality: {graphics.settings.quality.effectQuality}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Graphics Features</h3>
                <p className="text-sm text-slate-400 mb-2">Anti-Aliasing: {graphics.settings.antiAliasing.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">Shadows: {graphics.settings.shadows.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">Particles: {graphics.settings.particles.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-4">Post-Processing: {graphics.settings.postProcessing.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleInitializeGraphics}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Initialize Graphics
              </button>
              <button
                onClick={handleUpdateGraphics}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Update Graphics
              </button>
              <button
                onClick={() => handleSetQuality('ultra')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Set Ultra Quality
              </button>
              <button
                onClick={handleToggleAntiAliasing}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Toggle Anti-Aliasing
              </button>
              <button
                onClick={handleToggleShadows}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Toggle Shadows
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Renderer Tab */}
      {activeTab === 'renderer' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Layers className="w-6 h-6 text-blue-400" />
              <span>Renderer System</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Renderer Info</h3>
                <p className="text-sm text-slate-400 mb-2">Type: {renderer.type}</p>
                <p className="text-sm text-slate-400 mb-2">Max Lights: {renderer.capabilities.maxLights}</p>
                <p className="text-sm text-slate-400 mb-2">Max Shadows: {renderer.capabilities.maxShadows}</p>
                <p className="text-sm text-slate-400 mb-4">Max Particles: {renderer.capabilities.maxParticles}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Renderer Settings</h3>
                <p className="text-sm text-slate-400 mb-2">Frustum Culling: {renderer.settings.culling.frustumCulling ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">Occlusion Culling: {renderer.settings.culling.occlusionCulling ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">LOD System: {renderer.settings.lod.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-4">Batching: {renderer.settings.batching.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleCreateRenderer('forward')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Forward Renderer
              </button>
              <button
                onClick={() => handleCreateRenderer('deferred')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Deferred Renderer
              </button>
              <button
                onClick={() => handleCreateRenderer('clustered')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Clustered Renderer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shaders Tab */}
      {activeTab === 'shaders' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span>Shader System</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-slate-400 mb-4">Total Shaders: {shaders.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shaders.map((shader) => (
                  <div key={shader.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{shader.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {shader.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Uniforms: {shader.uniforms.length}</p>
                    <p className="text-sm text-slate-400 mb-4">Attributes: {shader.attributes.length}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Compile
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateShader}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Shader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Materials Tab */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Palette className="w-6 h-6 text-pink-400" />
              <span>Material System</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-slate-400 mb-4">Total Materials: {materials.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <div key={material.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{material.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {material.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Properties: {material.properties.length}</p>
                    <p className="text-sm text-slate-400 mb-4">Textures: {material.textures.length}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Edit
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateMaterial}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Material
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cameras Tab */}
      {activeTab === 'cameras' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Camera className="w-6 h-6 text-indigo-400" />
              <span>Camera System</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Camera System Info</h3>
                <p className="text-sm text-slate-400 mb-2">Total Cameras: {cameras.length}</p>
                <p className="text-sm text-slate-400 mb-2">Active Camera: {cameraSystem.activeCamera || 'None'}</p>
                <p className="text-sm text-slate-400 mb-2">FPS: {cameraSystem.performance.fps}</p>
                <p className="text-sm text-slate-400 mb-4">Frame Time: {cameraSystem.performance.frameTime.toFixed(2)}ms</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Camera Settings</h3>
                <p className="text-sm text-slate-400 mb-2">Movement: {cameraSystem.settings.movement.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">Rotation: {cameraSystem.settings.rotation.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-2">Zoom: {cameraSystem.settings.zoom.enabled ? 'Enabled' : 'Disabled'}</p>
                <p className="text-sm text-slate-400 mb-4">Shake: {cameraSystem.settings.shake.enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cameras.map((camera) => (
                  <div key={camera.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{camera.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {camera.type}</p>
                    <p className="text-sm text-slate-400 mb-2">FOV: {camera.fov}°</p>
                    <p className="text-sm text-slate-400 mb-4">FOV: {camera.fov}°</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Set Active
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateCamera}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Camera
              </button>
              <button
                onClick={handleCreateCameraSystem}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Camera System
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lights Tab */}
      {activeTab === 'lights' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <span>Lighting System</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Lighting System Info</h3>
                <p className="text-sm text-slate-400 mb-2">Type: {lighting.type}</p>
                <p className="text-sm text-slate-400 mb-2">Total Lights: {lighting.lights.length}</p>
                <p className="text-sm text-slate-400 mb-2">Max Lights: {lighting.settings.maxLights}</p>
                <p className="text-sm text-slate-400 mb-4">Shadow Distance: {lighting.settings.shadowDistance}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Ambient Lighting</h3>
                <p className="text-sm text-slate-400 mb-2">Type: {lighting.ambient.type}</p>
                <p className="text-sm text-slate-400 mb-2">Intensity: {lighting.ambient.intensity}</p>
                <p className="text-sm text-slate-400 mb-2">Color: RGB({lighting.ambient.color.r}, {lighting.ambient.color.g}, {lighting.ambient.color.b})</p>
                <p className="text-sm text-slate-400 mb-4">Active: {lighting.ambient.isActive ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lights.map((light) => (
                  <div key={light.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{light.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {light.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Intensity: {light.intensity}</p>
                    <p className="text-sm text-slate-400 mb-2">Range: {light.range}</p>
                    <p className="text-sm text-slate-400 mb-4">Shadow: {light.castShadow ? 'Yes' : 'No'}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Configure
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Toggle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateLight}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Light
              </button>
              <button
                onClick={handleCreateLightingSystem}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Lighting System
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Particles Tab */}
      {activeTab === 'particles' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span>Particle Systems</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-slate-400 mb-4">Total Particle Systems: {particleSystems.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {particleSystems.map((system) => (
                  <div key={system.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{system.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {system.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Particles: {system.particles.length}</p>
                    <p className="text-sm text-slate-400 mb-2">Max Particles: 1000</p>
                    <p className="text-sm text-slate-400 mb-4">Active: {system.isActive ? 'Yes' : 'No'}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Play
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateParticleSystem}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Particle System
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Effects Tab */}
      {activeTab === 'effects' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Eye className="w-6 h-6 text-purple-400" />
              <span>Visual Effects</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-slate-400 mb-4">Total Visual Effects: {visualEffects.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visualEffects.map((effect) => (
                  <div key={effect.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{effect.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {effect.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Duration: {effect.duration}s</p>
                    <p className="text-sm text-slate-400 mb-2">Intensity: {effect.intensity}</p>
                    <p className="text-sm text-slate-400 mb-4">Active: {effect.isActive ? 'Yes' : 'No'}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Play
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreateVisualEffect}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Visual Effect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Processing Tab */}
      {activeTab === 'postprocessing' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Settings className="w-6 h-6 text-green-400" />
              <span>Post-Processing Effects</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-slate-400 mb-4">Total Post-Processors: {postProcessors.length}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {postProcessors.map((processor) => (
                  <div key={processor.id} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{processor.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">Type: {processor.type}</p>
                    <p className="text-sm text-slate-400 mb-2">Enabled: {processor.enabled ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-slate-400 mb-2">Intensity: {processor.intensity}</p>
                    <p className="text-sm text-slate-400 mb-4">Active: {processor.isActive ? 'Yes' : 'No'}</p>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Toggle
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCreatePostProcessor}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Post-Processor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-pink-400" />
              <span>Performance Analytics</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Graphics Performance</h3>
                <p className="text-2xl font-bold text-green-400">{graphics.performance.fps} FPS</p>
                <p className="text-sm text-slate-400">Frame Rate</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Memory Usage</h3>
                <p className="text-2xl font-bold text-blue-400">{graphics.performance.memoryUsage} MB</p>
                <p className="text-sm text-slate-400">GPU Memory</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Draw Calls</h3>
                <p className="text-2xl font-bold text-purple-400">{graphics.performance.drawCalls}</p>
                <p className="text-sm text-slate-400">Per Frame</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Triangles</h3>
                <p className="text-2xl font-bold text-yellow-400">{graphics.performance.triangles.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Rendered</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => useGameStore.getState().setCurrentScreen('home')}
          className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default GraphicsManagementScreen;
