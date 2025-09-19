'use client';

import { useParams } from 'next/navigation';

// Import game components
import MinecraftGame from './components/MinecraftGame';
import FallGuysGame from './components/FallGuysGame';
import RobloxGame from './components/RobloxGame';
import MarioKartGame from './components/MarioKartGame';
import SimsGame from './components/SimsGame';
import LoveNikkiGame from './components/LoveNikkiGame';

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

export default GamePage;
