'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const MarioKartGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [playerPos, setPlayerPos] = useState({ x: 200, y: 300 });
  const [speed, setSpeed] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);
  const [position, setPosition] = useState(1);
  const [powerUps, setPowerUps] = useState<Array<{ x: number; y: number; type: string }>>([]);
  const [currentPowerUp, setCurrentPowerUp] = useState<string | null>(null);
  const [points, setPoints] = useState(0);

  const characters = [
    { name: 'Mario', color: 'bg-red-500' },
    { name: 'Princess Peach', color: 'bg-pink-500' },
    { name: 'Luigi', color: 'bg-green-500' },
    { name: 'Yoshi', color: 'bg-yellow-500' }
  ];

  const [selectedCharacter, setSelectedCharacter] = useState(0);

  useEffect(() => {
    if (!raceStarted || raceFinished) return;

    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        const newX = prev.x + speed;
        if (newX > 350) {
          setRaceFinished(true);
          setPoints(prev => prev + (4 - position) * 25);
          onScoreUpdate(points + (4 - position) * 25);
          return prev;
        }
        return { ...prev, x: newX };
      });

      // Generate power-ups
      if (Math.random() < 0.01) {
        setPowerUps(prev => [...prev, {
          x: Math.random() * 300 + 50,
          y: Math.random() * 200 + 100,
          type: ['mushroom', 'star', 'shell'][Math.floor(Math.random() * 3)]
        }]);
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [raceStarted, raceFinished, speed, position, points, onScoreUpdate]);

  const startRace = () => {
    setRaceStarted(true);
    setSpeed(2);
  };

  const usePowerUp = () => {
    if (currentPowerUp) {
      switch (currentPowerUp) {
        case 'mushroom':
          setSpeed(prev => Math.min(prev + 1, 5));
          break;
        case 'star':
          setSpeed(prev => Math.min(prev + 2, 5));
          break;
        case 'shell':
          setSpeed(prev => Math.min(prev + 1.5, 5));
          break;
      }
      setCurrentPowerUp(null);
    }
  };

  const collectPowerUp = (powerUp: { x: number; y: number; type: string }) => {
    setCurrentPowerUp(powerUp.type);
    setPowerUps(prev => prev.filter(p => p !== powerUp));
  };

  const resetRace = () => {
    setPlayerPos({ x: 200, y: 300 });
    setSpeed(0);
    setRaceStarted(false);
    setRaceFinished(false);
    setPosition(1);
    setPowerUps([]);
    setCurrentPowerUp(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Mario Kart Racing</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Points: {points}</div>
          {!raceStarted && (
            <button onClick={startRace} className="btn btn-primary">
              Start Race
            </button>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Choose Character</h3>
          <div className="flex gap-2">
            {characters.map((char, index) => (
              <button
                key={index}
                className={`p-2 rounded ${char.color} text-white text-sm ${
                  selectedCharacter === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCharacter(index)}
              >
                {char.name}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="bg-gradient-to-r from-green-400 to-blue-400 relative w-80 h-64 mx-auto rounded-lg overflow-hidden"
        >
          {/* Player */}
          <div
            className={`absolute w-8 h-8 ${characters[selectedCharacter].color} rounded-full border-2 border-white`}
            style={{ left: playerPos.x, top: playerPos.y }}
          />
          
          {/* Power-ups */}
          {powerUps.map((powerUp, index) => (
            <div
              key={index}
              className={`absolute w-6 h-6 rounded-full cursor-pointer ${
                powerUp.type === 'mushroom' ? 'bg-red-500' :
                powerUp.type === 'star' ? 'bg-yellow-400' :
                'bg-orange-500'
              }`}
              style={{ left: powerUp.x, top: powerUp.y }}
              onClick={() => collectPowerUp(powerUp)}
            />
          ))}

          {/* Finish Line */}
          <div className="absolute right-0 top-0 w-4 h-full bg-yellow-400 border-2 border-white">
            <div className="text-white text-xs font-bold transform rotate-90 mt-20">FINISH</div>
          </div>
        </div>

        {currentPowerUp && (
          <div className="text-center mt-4">
            <p className="text-sm mb-2">Power-up: {currentPowerUp}</p>
            <button onClick={usePowerUp} className="btn btn-secondary">
              Use Power-up
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 mb-4">
          Collect power-ups and race to the finish line!
        </div>

        {raceFinished && (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-4">Race Finished!</p>
            <p className="mb-4">You finished in position {position}!</p>
            <button onClick={resetRace} className="btn btn-primary">
              Race Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MarioKartGame;
