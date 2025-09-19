'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const RobloxGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [avatar, setAvatar] = useState({
    hair: 'brown',
    shirt: 'blue',
    pants: 'black',
    hat: 'none'
  });
  const [coins, setCoins] = useState(100);
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    { id: 'obstacle-course', name: 'Obstacle Course', reward: 50 },
    { id: 'tycoon', name: 'Tycoon Builder', reward: 75 },
    { id: 'simulator', name: 'Pet Simulator', reward: 100 },
    { id: 'racing', name: 'Racing Game', reward: 60 }
  ];

  const avatarOptions = {
    hair: ['brown', 'blonde', 'black', 'red'],
    shirt: ['blue', 'red', 'green', 'yellow'],
    pants: ['black', 'blue', 'red', 'white'],
    hat: ['none', 'cap', 'crown', 'helmet']
  };

  const playGame = (gameId: string) => {
    setCurrentGame(gameId);
    const game = games.find(g => g.id === gameId);
    if (game) {
      setCoins(prev => prev + game.reward);
      onScoreUpdate(coins + game.reward);
    }
    setTimeout(() => setCurrentGame(null), 2000);
  };

  const updateAvatar = (part: string, value: string) => {
    setAvatar(prev => ({ ...prev, [part]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Roblox World</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Avatar Customization</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {avatar.hair[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">Your Avatar</div>
                    <div className="text-sm text-gray-600">Coins: {coins}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(avatarOptions).map(([part, options]) => (
                    <div key={part}>
                      <label className="block text-sm font-medium mb-2 capitalize">{part}</label>
                      <select
                        value={avatar[part as keyof typeof avatar]}
                        onChange={(e) => updateAvatar(part, e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        {options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Games Library</h3>
              <div className="grid grid-cols-2 gap-4">
                {games.map(game => (
                  <div
                    key={game.id}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => playGame(game.id)}
                  >
                    <h4 className="font-bold mb-2">{game.name}</h4>
                    <div className="text-sm">Reward: {game.reward} coins</div>
                    {currentGame === game.id && (
                      <div className="mt-2 text-xs bg-white/20 p-1 rounded">
                        Playing...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-64">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="space-y-2 text-sm">
                <div>Total Coins: {coins}</div>
                <div>Games Played: {Math.floor(coins / 50)}</div>
                <div>Avatar Level: {Math.floor(coins / 100) + 1}</div>
              </div>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Achievements</h3>
              <div className="space-y-1 text-sm">
                {coins >= 100 && <div className="text-green-600">✓ First 100 Coins</div>}
                {coins >= 500 && <div className="text-green-600">✓ Coin Collector</div>}
                {coins >= 1000 && <div className="text-green-600">✓ Roblox Master</div>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RobloxGame;
