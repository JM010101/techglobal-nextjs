'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, Zap, Sparkles } from 'lucide-react';

const RecruitmentScreen = () => {
  const { signalKeys, gachaPityCounter, performGacha, setCurrentScreen } = useGameStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnHero, setDrawnHero] = useState<{id: string; codename: string; role: string; rarity: string; description: string; base_stats: {hp: number; atk: number; def: number}} | null>(null);

  const handleDraw = () => {
    if (signalKeys < 1) {
      alert('Not enough Signal Keys!');
      return;
    }

    setIsDrawing(true);
    setDrawnHero(null);

    setTimeout(() => {
      const hero = performGacha();
      setDrawnHero(hero);
      setIsDrawing(false);
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'SSR': return 'from-yellow-500 to-orange-500';
      case 'SR': return 'from-purple-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-purple-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          RECRUITMENT
        </h1>
        <div className="flex items-center gap-2 bg-purple-900/50 rounded-xl px-4 py-2">
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="text-purple-200 font-bold">{signalKeys}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Pity Counter */}
        <div className="mb-8 text-center">
          <p className="text-gray-400 mb-2">Pity Counter</p>
          <div className="flex items-center gap-2">
            <div className="w-64 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(gachaPityCounter / 90) * 100}%` }}
              ></div>
            </div>
            <span className="text-white font-bold">{gachaPityCounter}/90</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {gachaPityCounter >= 50 ? 'Soft pity active! Increased SSR rate!' : 'Guaranteed SSR at 90 pulls'}
          </p>
        </div>

        {/* Draw Animation / Result */}
        <AnimatePresence mode="wait">
          {isDrawing ? (
            <motion.div
              key="drawing"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 2, rotate: { repeat: Infinity, duration: 1 } }}
              className="w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <Sparkles className="w-32 h-32 text-white" />
            </motion.div>
          ) : drawnHero ? (
            <motion.div
              key="result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`bg-gradient-to-br ${getRarityColor(drawnHero.rarity)} rounded-3xl p-8 border-4 border-white/50 text-center max-w-md`}
            >
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-3xl font-black text-white mb-2">{drawnHero.codename}</h2>
              <p className="text-xl text-white/90 mb-4">{drawnHero.role}</p>
              <div className="bg-black/30 rounded-2xl p-4 mb-4">
                <p className="text-white/80 text-sm">{drawnHero.description}</p>
              </div>
              <div className="flex justify-center gap-4 text-white">
                <div>
                  <p className="text-xs opacity-75">HP</p>
                  <p className="font-bold">{drawnHero.base_stats.hp}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">ATK</p>
                  <p className="font-bold">{drawnHero.base_stats.atk}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">DEF</p>
                  <p className="font-bold">{drawnHero.base_stats.def}</p>
                </div>
              </div>
              <button
                onClick={() => setDrawnHero(null)}
                className="mt-6 bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
              >
                Continue
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-4 border-purple-500/50 flex items-center justify-center mb-8">
                <Sparkles className="w-32 h-32 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Standard Recruitment</h2>
              <p className="text-gray-400 mb-2">1 Signal Key per draw</p>
              <p className="text-sm text-gray-500 mb-8">Rates: SSR 3% | SR 15% | R 82%</p>
              <button
                onClick={handleDraw}
                disabled={signalKeys < 1}
                className={`px-12 py-4 rounded-2xl font-black text-xl transition-all duration-300 ${
                  signalKeys < 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                }`}
              >
                {signalKeys < 1 ? 'Not Enough Keys' : 'Draw x1'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecruitmentScreen;

