'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import chaptersData from '@/data/chapters.json';
import { User, Radio } from 'lucide-react';

const DialogueScreen = () => {
  const { currentChapter, currentSection, setCurrentScreen } = useGameStore();
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const dialoguePhase = 'before'; // Always show before dialogue for now

  const chapter = chaptersData.find(c => c.chapter === currentChapter);
  const section = chapter?.sections.find(s => s.section === currentSection);
  const dialogues = dialoguePhase === 'before' ? section?.dialogue_before : section?.dialogue_after;

  useEffect(() => {
    setShowText(true);
  }, [currentDialogueIndex]);

  useEffect(() => {
    // Auto-navigate if no dialogue
    if (!dialogues || dialogues.length === 0) {
      if (dialoguePhase === 'before') {
        setCurrentScreen('battle');
      } else {
        setCurrentScreen('home');
      }
    }
  }, [dialogues, dialoguePhase, setCurrentScreen]);

  const handleNext = () => {
    if (!dialogues) return;
    
    if (currentDialogueIndex < dialogues.length - 1) {
      setShowText(false);
      setTimeout(() => {
        setCurrentDialogueIndex(prev => prev + 1);
      }, 200);
    } else {
      if (dialoguePhase === 'before') {
        // Move to battle
        setCurrentScreen('battle');
      } else {
        // Back to home after mission
        setCurrentScreen('home');
      }
    }
  };

  const skipDialogue = () => {
    if (dialoguePhase === 'before') {
      setCurrentScreen('battle');
    } else {
      setCurrentScreen('home');
    }
  };

  if (!dialogues || dialogues.length === 0) {
    return null;
  }

  const currentDialogue = dialogues[currentDialogueIndex];

  return (
    <div 
      className="fixed inset-0 flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://picsum.photos/1920/1080?random=10)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="text-cyan-400 font-bold text-lg">
          Chapter {currentChapter} - Section {currentSection}
        </div>
        <button
          onClick={skipDialogue}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Skip →
        </button>
      </div>

      {/* Main Dialogue Area */}
      <div className="flex-1 flex items-end p-8">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key={currentDialogueIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Speaker Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentDialogue.speaker === 'Commander'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600'
                    : currentDialogue.speaker === 'RIFT'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                    : currentDialogue.speaker === 'HAVEN'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600'
                    : currentDialogue.speaker === 'EMBER'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}>
                  {currentDialogue.speaker === 'Commander' ? (
                    <Radio className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {currentDialogue.speaker}
                </h3>
              </div>

              {/* Dialogue Box */}
              <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-3xl p-6 border border-cyan-500/30">
                <p className="text-xl text-gray-100 leading-relaxed">
                  {currentDialogue.text}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {dialogues.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentDialogueIndex
                        ? 'w-8 bg-cyan-500'
                        : index < currentDialogueIndex
                        ? 'w-2 bg-cyan-700'
                        : 'w-2 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <div className="p-8 pt-0">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
        >
          {currentDialogueIndex < dialogues.length - 1 ? 'Continue' : dialoguePhase === 'before' ? 'Start Mission' : 'Return to Base'}
        </button>
      </div>
    </div>
  );
};

export default DialogueScreen;

