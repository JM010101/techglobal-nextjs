'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import HomeScreen from './components/HomeScreen';
import SquadScreen from './components/SquadScreen';
import BattleScreen from './components/BattleScreen';
import RecruitmentScreen from './components/RecruitmentScreen';
import HeroDetailScreen from './components/HeroDetailScreen';
import DialogueScreen from './components/DialogueScreen';

const AegisProtocolGame = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const loadGame = useGameStore((state) => state.loadGame);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Screen Router */}
      <div className="relative z-10 w-full h-full">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'squad' && <SquadScreen />}
        {currentScreen === 'battle' && <BattleScreen />}
        {currentScreen === 'recruitment' && <RecruitmentScreen />}
        {currentScreen === 'hero-detail' && <HeroDetailScreen />}
        {currentScreen === 'dialogue' && <DialogueScreen />}
      </div>
    </div>
  );
};

export default AegisProtocolGame;

