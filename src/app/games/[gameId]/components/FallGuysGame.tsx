'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const FallGuysGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 300 });
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number; type: string }>>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wins, setWins] = useState(0);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        const newY = prev.y + 2; // Gravity
        if (newY > 400) {
          setGameOver(true);
          return prev;
        }
        return { ...prev, y: newY };
      });

      setObstacles(prev => {
        const newObstacles = prev.map(obs => ({ ...obs, x: obs.x - 3 }));
        const filteredObstacles = newObstacles.filter(obs => obs.x > -50);
        
        if (Math.random() < 0.02) {
          filteredObstacles.push({
            x: 400,
            y: Math.random() * 200 + 100,
            type: Math.random() < 0.5 ? 'spinner' : 'platform'
          });
        }
        
        return filteredObstacles;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver]);

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    } else if (!gameOver) {
      setPlayerPos(prev => ({ ...prev, y: prev.y - 50 }));
    }
  };

  const resetGame = () => {
    setPlayerPos({ x: 200, y: 300 });
    setObstacles([]);
    setScore(0);
    setGameStarted(false);
    setGameOver(false);
  };

  const startNewRound = () => {
    setWins(prev => prev + 1);
    onScoreUpdate(wins + 1);
    resetGame();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Fall Guys</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Wins: {wins}</div>
          {!gameStarted && (
            <button onClick={jump} className="btn btn-primary">
              Start Race
            </button>
          )}
        </div>

        <div 
          className="bg-gradient-to-b from-blue-300 to-green-300 relative w-80 h-96 mx-auto rounded-lg overflow-hidden cursor-pointer"
          onClick={jump}
        >
          {/* Player */}
          <div
            className="absolute w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"
            style={{ left: playerPos.x, top: playerPos.y }}
          />
          
          {/* Obstacles */}
          {obstacles.map((obstacle, index) => (
            <div key={index}>
              {obstacle.type === 'spinner' ? (
                <div
                  className="absolute w-12 h-12 bg-red-500 rounded-full border-2 border-white animate-spin"
                  style={{ left: obstacle.x, top: obstacle.y }}
                />
              ) : (
                <div
                  className="absolute w-16 h-4 bg-purple-500 rounded border-2 border-white"
                  style={{ left: obstacle.x, top: obstacle.y }}
                />
              )}
            </div>
          ))}

          {/* Finish Line */}
          <div className="absolute right-0 top-0 w-4 h-full bg-yellow-400 border-2 border-white">
            <div className="text-white text-xs font-bold transform rotate-90 mt-20">FINISH</div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Click to jump! Avoid obstacles and reach the finish line!
        </div>

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-4">Round Over!</p>
            <p className="mb-4">You made it {score} obstacles!</p>
            <button onClick={startNewRound} className="btn btn-primary">
              Next Round
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FallGuysGame;
