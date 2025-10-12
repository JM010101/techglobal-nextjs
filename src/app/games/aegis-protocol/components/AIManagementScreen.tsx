'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Brain, Cpu, Zap, BarChart3, Users, Target } from 'lucide-react';

const AIManagementScreen: React.FC = () => {
  const {
    ai,
    enemyAI,
    contentGeneration,
    multiAgent,
    playerBehavior,
    adaptiveContent,
    predictiveAnalytics,
    initializeAI,
    updateAI,
    createEnemyAI,
    setEnemyBehavior,
    trainMLModel,
    predictPlayerBehavior,
    generateAdaptiveContent,
    createMultiAgentSystem,
    updateMultiAgentSystem
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'ai' | 'enemies' | 'learning' | 'content' | 'agents' | 'analytics'>('ai');

  const handleInitializeAI = () => {
    initializeAI();
    console.log('AI System Initialized!');
  };

  const handleUpdateAI = () => {
    updateAI(16.67); // 60 FPS
    console.log('AI System Updated!');
  };

  const handleCreateEnemyAI = () => {
    const personality = {
      id: `personality_${Date.now()}`,
      name: `Personality ${Date.now()}`,
      aggression: 50,
      caution: 50,
      intelligence: 50,
      adaptability: 50,
      socialTendency: 50,
      learningRate: 50,
      creativity: 50,
      riskTolerance: 50,
      leadership: 50,
      empathy: 50,
      traits: [],
      motivations: [],
      fears: [],
      preferences: [],
      isActive: true
    };
    createEnemyAI(`enemy_${Date.now()}`, personality);
    console.log('Enemy AI Created!');
  };

  const handleTrainMLModel = () => {
    const modelId = 'main_model';
    const data = [
      { input: { playerAction: 'attack' }, output: { difficulty: 0.7 } },
      { input: { playerAction: 'defend' }, output: { difficulty: 0.3 } }
    ];
    trainMLModel(modelId, data);
    console.log('ML Model Training Started!');
  };

  const handleGenerateContent = () => {
    generateAdaptiveContent('mission', { difficulty: 0.5, theme: 'combat' });
    console.log('Adaptive Content Generated!');
  };

  const handleCreateMultiAgentSystem = () => {
    createMultiAgentSystem('social', ['agent1', 'agent2', 'agent3']);
    console.log('Multi-Agent System Created!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          AI Management Center
        </h1>
        <p className="text-slate-300 text-lg">
          Advanced AI systems, enemy behaviors, and intelligent content generation
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-2">
          {[
            { id: 'ai', label: 'AI Systems', icon: Brain },
            { id: 'enemies', label: 'Enemy AI', icon: Target },
            { id: 'learning', label: 'Machine Learning', icon: Cpu },
            { id: 'content', label: 'Content Generation', icon: Zap },
            { id: 'agents', label: 'Multi-Agent', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'ai' | 'enemies' | 'learning' | 'content' | 'agents' | 'analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
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

      {/* AI Systems Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span>AI System Status</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Behavior Trees</h3>
                <p className="text-2xl font-bold text-cyan-400">{ai.behaviorTrees.length}</p>
                <p className="text-sm text-slate-400">Active Trees</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Learning Models</h3>
                <p className="text-2xl font-bold text-purple-400">{ai.learningModels.length}</p>
                <p className="text-sm text-slate-400">Active Models</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Performance Score</h3>
                <p className="text-2xl font-bold text-green-400">{ai.performanceMetrics.performanceScore}%</p>
                <p className="text-sm text-slate-400">Overall Performance</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleInitializeAI}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Initialize AI
              </button>
              <button
                onClick={handleUpdateAI}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Update AI
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Decision Engine</h3>
            <div className="space-y-2">
              <p><span className="text-slate-400">Current Strategy:</span> {ai.decisionEngine.currentStrategy || 'None'}</p>
              <p><span className="text-slate-400">Confidence:</span> {ai.decisionEngine.confidence}%</p>
              <p><span className="text-slate-400">Total Decisions:</span> {ai.performanceMetrics.totalDecisions}</p>
              <p><span className="text-slate-400">Success Rate:</span> {ai.performanceMetrics.successfulDecisions}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Enemy AI Tab */}
      {activeTab === 'enemies' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Target className="w-6 h-6 text-red-400" />
              <span>Enemy AI Systems</span>
            </h2>
            
            <div className="mb-6">
              <button
                onClick={handleCreateEnemyAI}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Enemy AI
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enemyAI.map((enemy) => (
                <div key={enemy.id} className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{enemy.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">Type: {enemy.type}</p>
                  <p className="text-sm text-slate-400 mb-2">Combat Style: {enemy.combatStyle.type}</p>
                  <p className="text-sm text-slate-400 mb-4">Tactics: {enemy.tactics.length}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => console.log('Configure enemy:', enemy.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Configure
                    </button>
                    <button
                      onClick={() => setEnemyBehavior(enemy.id, 'defensive')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Set Defensive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Machine Learning Tab */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-green-400" />
              <span>Machine Learning Systems</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Player Behavior Analysis</h3>
                <p className="text-sm text-slate-400 mb-2">Playstyle: {playerBehavior.playstyle.type}</p>
                <p className="text-sm text-slate-400 mb-2">Overall Skill: {playerBehavior.skillLevel.overall}%</p>
                <p className="text-sm text-slate-400 mb-4">Engagement: {playerBehavior.engagement.level}%</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Predictive Analytics</h3>
                <p className="text-sm text-slate-400 mb-2">Accuracy: {predictiveAnalytics.accuracy}%</p>
                <p className="text-sm text-slate-400 mb-2">Predictions: {predictiveAnalytics.predictions.length}</p>
                <p className="text-sm text-slate-400 mb-4">Last Prediction: {predictiveAnalytics.lastPrediction.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleTrainMLModel}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Train ML Model
              </button>
              <button
                onClick={() => predictPlayerBehavior('current_player')}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Predict Behavior
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Generation Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span>Content Generation Systems</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Content Generator</h3>
                <p className="text-sm text-slate-400 mb-2">Type: {contentGeneration.type}</p>
                <p className="text-sm text-slate-400 mb-2">Generators: {contentGeneration.generators.length}</p>
                <p className="text-sm text-slate-400 mb-4">Templates: {contentGeneration.templates.length}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Adaptive Content</h3>
                <p className="text-sm text-slate-400 mb-2">Type: {adaptiveContent.type}</p>
                <p className="text-sm text-slate-400 mb-2">Algorithm: {adaptiveContent.generator.algorithm}</p>
                <p className="text-sm text-slate-400 mb-4">Last Generated: {adaptiveContent.lastGenerated.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleGenerateContent}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Generate Content
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Agent Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Users className="w-6 h-6 text-indigo-400" />
              <span>Multi-Agent Systems</span>
            </h2>
            
            <div className="mb-6">
              <button
                onClick={handleCreateMultiAgentSystem}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Create Multi-Agent System
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {multiAgent.map((system) => (
                <div key={system.id} className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{system.name}</h3>
                  <p className="text-sm text-slate-400 mb-2">Type: {system.type}</p>
                  <p className="text-sm text-slate-400 mb-2">Agents: {system.agents.length}</p>
                  <p className="text-sm text-slate-400 mb-2">Relationships: {system.relationships.length}</p>
                  <p className="text-sm text-slate-400 mb-4">Interactions: {system.interactions.length}</p>
                  
                  <button
                    onClick={() => updateMultiAgentSystem(system.id, 16.67)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Update System
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-pink-400" />
              <span>AI Analytics & Performance</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">AI Performance</h3>
                <p className="text-2xl font-bold text-cyan-400">{ai.performanceMetrics.performanceScore}%</p>
                <p className="text-sm text-slate-400">Overall Score</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
                <p className="text-2xl font-bold text-green-400">{ai.performanceMetrics.learningProgress}%</p>
                <p className="text-sm text-slate-400">Progress</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Adaptations</h3>
                <p className="text-2xl font-bold text-purple-400">{ai.performanceMetrics.adaptationCount}</p>
                <p className="text-sm text-slate-400">Total Adaptations</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Decision Time</h3>
                <p className="text-2xl font-bold text-yellow-400">{ai.performanceMetrics.averageDecisionTime}ms</p>
                <p className="text-sm text-slate-400">Average Time</p>
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

export default AIManagementScreen;
