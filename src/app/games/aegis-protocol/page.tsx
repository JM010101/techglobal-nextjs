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
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/game/Aegis Protocol/dashboard.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

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

