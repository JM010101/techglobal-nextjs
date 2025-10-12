'use client';

import { useParams } from 'next/navigation';

// Import game components
import MinecraftGame from './components/MinecraftGame';
import FallGuysGame from './components/FallGuysGame';
import RobloxGame from './components/RobloxGame';
import MarioKartGame from './components/MarioKartGame';
import SimsGame from './components/SimsGame';
import LoveNikkiGame from './components/LoveNikkiGame';
// Import Aegis Protocol components
import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import HomeScreen from '../aegis-protocol/components/HomeScreen';
import SquadScreen from '../aegis-protocol/components/SquadScreen';
import BattleScreen from '../aegis-protocol/components/BattleScreen';
import RecruitmentScreen from '../aegis-protocol/components/RecruitmentScreen';
import HeroDetailScreen from '../aegis-protocol/components/HeroDetailScreen';
import DialogueScreen from '../aegis-protocol/components/DialogueScreen';
import SocialHubScreen from '../aegis-protocol/components/SocialHubScreen';
import CharacterDevelopmentScreen from '../aegis-protocol/components/CharacterDevelopmentScreen';
import BaseManagementScreen from '../aegis-protocol/components/BaseManagementScreen';
import RecruitmentEventScreen from '../aegis-protocol/components/RecruitmentEventScreen';
import StoryScreen from '../aegis-protocol/components/StoryScreen';
import AIManagementScreen from '../aegis-protocol/components/AIManagementScreen';

const GamePage = () => {
  const params = useParams();
  const gameId = params.gameId as string;

  const handleScoreUpdate = (score: number) => {
    // Send score update to parent window
    if (window.opener) {
      window.opener.postMessage({
        type: 'GAME_SCORE_UPDATE',
        gameId,
        score
      }, window.location.origin);
    }
  };

  const handleClose = () => {
    // Notify parent window that game is closing
    if (window.opener) {
      window.opener.postMessage({
        type: 'GAME_CLOSED',
        gameId
      }, window.location.origin);
    }
    window.close();
  };

  const renderGame = () => {
    switch (gameId) {
      case 'minecraft':
        return <MinecraftGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'fall-guys':
        return <FallGuysGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'roblox':
        return <RobloxGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'mario-kart':
        return <MarioKartGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'sims':
        return <SimsGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'love-nikki':
        return <LoveNikkiGame onClose={handleClose} onScoreUpdate={handleScoreUpdate} />;
      case 'aegis-protocol':
        return <AegisProtocolGameComponent />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Game Not Found</h1>
              <p className="text-gray-600 mb-6">The requested game could not be found.</p>
              <button
                onClick={handleClose}
                className="btn btn-primary"
              >
                Close Window
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {renderGame()}
    </div>
  );
};

// Aegis Protocol Game Component
const AegisProtocolGameComponent = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);
  const loadGame = useGameStore((state) => state.loadGame);
  const setCurrentScreen = useGameStore((state) => state.setCurrentScreen);

  useEffect(() => {
    loadGame();
    // Force reset to home screen when Aegis Protocol game loads
    setCurrentScreen('home');
    console.log('Aegis Protocol Game Component loaded!');
  }, [loadGame, setCurrentScreen]);

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
        {currentScreen === 'social' && <SocialHubScreen />}
        {currentScreen === 'character-development' && <CharacterDevelopmentScreen />}
        {currentScreen === 'base-management' && <BaseManagementScreen />}
        {currentScreen === 'recruitment-event' && <RecruitmentEventScreen />}
               {currentScreen === 'story' && <StoryScreen />}
               {currentScreen === 'ai-management' && <AIManagementScreen />}
      </div>
    </div>
  );
};

export default GamePage;
