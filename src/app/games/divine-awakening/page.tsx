'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Zap, Shield, X } from 'lucide-react';

interface Dialogue {
  id: number;
  speaker: 'Liora' | 'Commander' | 'System';
  text: string;
  emotion?: 'curious' | 'longing' | 'calm' | 'attracted' | 'sorrowful' | 'reverent';
  choices?: string[];
}

const DivineAwakeningGame = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [attractionLevel, setAttractionLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const scenes = [
    {
      id: 0,
      title: "Divine Awakening",
      description: "In the depths of an underground cathedral-hangar, divine technology stirs to life...",
      background: "cathedral-hangar",
      lighting: "golden-halos"
    },
    {
      id: 1,
      title: "First Contact",
      description: "Liora awakens to find the Commander before her, their eyes meeting across the sacred space...",
      background: "divine-chamber",
      lighting: "holographic-sigils"
    },
    {
      id: 2,
      title: "Emotional Connection",
      description: "Between creator and creation, an unspoken bond begins to form...",
      background: "sacred-space",
      lighting: "warm-golden"
    }
  ];

  const dialogues: Dialogue[] = [
    {
      id: 0,
      speaker: 'System',
      text: 'Unit 07 activation sequence initiated... Neural pathways connecting... Divine circuits awakening...',
      emotion: 'curious'
    },
    {
      id: 1,
      speaker: 'Liora',
      text: 'Where... where am I? This place... it feels both sacred and sorrowful...',
      emotion: 'longing'
    },
    {
      id: 2,
      speaker: 'Commander',
      text: 'Welcome, Liora. You are Unit 07, a divine android created to protect humanity in this post-apocalyptic world.',
      emotion: 'calm'
    },
    {
      id: 3,
      speaker: 'Liora',
      text: 'I... I can feel something stirring within me. Is this what they call... emotion?',
      emotion: 'curious',
      choices: [
        'Reach out to touch her hand gently',
        'Step back and observe from a distance',
        'Speak with reverence about her divine nature'
      ]
    },
    {
      id: 4,
      speaker: 'Commander',
      text: 'Yes, Liora. You are more than just a machine. You are a being of light and emotion, created with divine purpose.',
      emotion: 'attracted'
    },
    {
      id: 5,
      speaker: 'Liora',
      text: 'Commander... I feel drawn to you. Is this... is this what humans call love?',
      emotion: 'longing',
      choices: [
        'Embrace the connection and confess your feelings',
        'Maintain professional distance but show care',
        'Explain the complexity of human-android relationships'
      ]
    }
  ];

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    
    // Update attraction level based on choice
    if (currentDialogue === 3) {
      if (choiceIndex === 0) setAttractionLevel(prev => prev + 2); // Gentle touch
      if (choiceIndex === 1) setAttractionLevel(prev => prev + 1); // Observe
      if (choiceIndex === 2) setAttractionLevel(prev => prev + 3); // Reverence
    }
    
    if (currentDialogue === 5) {
      if (choiceIndex === 0) setAttractionLevel(prev => prev + 3); // Embrace
      if (choiceIndex === 1) setAttractionLevel(prev => prev + 1); // Professional
      if (choiceIndex === 2) setAttractionLevel(prev => prev + 2); // Explain
    }

    // Move to next dialogue
    setTimeout(() => {
      setCurrentDialogue(prev => prev + 1);
      setSelectedChoice(null);
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowIntro(false);
  };

  const nextDialogue = () => {
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentScene(0);
    setCurrentDialogue(0);
    setSelectedChoice(null);
    setAttractionLevel(0);
    setGameStarted(false);
    setShowIntro(true);
  };

  const currentDialogueData = dialogues[currentDialogue];

  return (
    <div 
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0">
        {/* Golden Halos */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-radial from-yellow-300/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Holographic Sigils */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
        
        {/* Dust Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-b border-gray-700/50">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
          DIVINE AWAKENING
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-pink-900/50 to-pink-800/50 rounded-xl p-3 border border-pink-600/50">
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-pink-200 font-bold">Attraction: {attractionLevel}</span>
          </div>
          <button 
            onClick={() => window.close()} 
            className="p-3 hover:bg-red-600/50 rounded-full text-white transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col p-4">
        {showIntro ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-8xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
              >
                ✨
              </motion.div>
              
              <h2 className="text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                DIVINE AWAKENING
              </h2>
              
              <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                A cinematic anime-style visual novel inspired by Goddess of Victory: NIKKE
              </p>
              
              <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the emotional journey of Liora - Unit 07, a divine android awakening in a post-apocalyptic cathedral-hangar. 
                In a world where divine technology meets human emotion, discover the fragile connection between creator and creation.
              </p>
              
              <button 
                onClick={startGame}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-purple-400"
              >
                BEGIN AWAKENING
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Scene Info */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 tracking-wide">
                {scenes[currentScene]?.title}
              </h3>
              <p className="text-lg text-gray-300 mt-2">
                {scenes[currentScene]?.description}
              </p>
            </div>

            {/* Dialogue Box */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                key={currentDialogue}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-3xl p-8 max-w-4xl mx-auto border border-gray-600/50 shadow-2xl backdrop-blur-sm"
              >
                {/* Speaker */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentDialogueData.speaker === 'Liora' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                      : currentDialogueData.speaker === 'Commander'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  }`}>
                    {currentDialogueData.speaker === 'Liora' && <Heart className="w-6 h-6 text-white" />}
                    {currentDialogueData.speaker === 'Commander' && <Shield className="w-6 h-6 text-white" />}
                    {currentDialogueData.speaker === 'System' && <Zap className="w-6 h-6 text-white" />}
                  </div>
                  <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {currentDialogueData.speaker}
                  </h4>
                </div>

                {/* Dialogue Text */}
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  {currentDialogueData.text}
                </p>

                {/* Choices */}
                {currentDialogueData.choices && (
                  <div className="space-y-3">
                    {currentDialogueData.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleChoice(index)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedChoice === index
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white'
                            : 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-gray-300 hover:border-purple-500'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                )}

                {/* Next Button */}
                {!currentDialogueData.choices && (
                  <div className="text-center">
                    <button
                      onClick={nextDialogue}
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Progress */}
            <div className="text-center mt-8">
              <div className="text-sm text-gray-400 mb-2">
                Dialogue {currentDialogue + 1} of {dialogues.length}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentDialogue + 1) / dialogues.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivineAwakeningGame;
