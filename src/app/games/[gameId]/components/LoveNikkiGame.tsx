'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const LoveNikkiGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [character, setCharacter] = useState({
    hair: 'long-blonde',
    dress: 'elegant-blue',
    shoes: 'heels-black',
    accessories: 'pearl-necklace'
  });
  const [style, setStyle] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [wardrobe] = useState({
    hair: ['long-blonde', 'short-brown', 'curly-red', 'straight-black'],
    dresses: ['elegant-blue', 'casual-pink', 'formal-black', 'party-gold'],
    shoes: ['heels-black', 'sneakers-white', 'boots-brown', 'sandals-beige'],
    accessories: ['pearl-necklace', 'diamond-earrings', 'silver-bracelet', 'gold-ring']
  });

  const challenges = [
    { name: 'Casual Day Out', theme: 'casual', reward: 50 },
    { name: 'Formal Dinner', theme: 'formal', reward: 75 },
    { name: 'Party Night', theme: 'party', reward: 100 },
    { name: 'Beach Vacation', theme: 'beach', reward: 60 }
  ];

  const updateOutfit = (category: string, item: string) => {
    setCharacter(prev => ({ ...prev, [category]: item }));
  };

  const startChallenge = (challenge: typeof challenges[0]) => {
    setCurrentChallenge(challenge.name);
    // Simulate styling based on theme
    let stylePoints = 0;
    
    switch (challenge.theme) {
      case 'casual':
        if (character.dress.includes('casual')) stylePoints += 30;
        if (character.shoes.includes('sneakers')) stylePoints += 25;
        break;
      case 'formal':
        if (character.dress.includes('formal')) stylePoints += 40;
        if (character.shoes.includes('heels')) stylePoints += 30;
        if (character.accessories.includes('pearl')) stylePoints += 20;
        break;
      case 'party':
        if (character.dress.includes('party')) stylePoints += 35;
        if (character.accessories.includes('diamond')) stylePoints += 25;
        break;
      case 'beach':
        if (character.dress.includes('casual')) stylePoints += 25;
        if (character.shoes.includes('sandals')) stylePoints += 30;
        break;
    }
    
    setStyle(prev => prev + stylePoints);
    onScoreUpdate(style + stylePoints);
    
    setTimeout(() => setCurrentChallenge(null), 2000);
  };

  const getItemImage = (category: string, item: string) => {
    const colors = {
      'long-blonde': 'bg-yellow-200',
      'short-brown': 'bg-amber-600',
      'curly-red': 'bg-red-400',
      'straight-black': 'bg-gray-800',
      'elegant-blue': 'bg-blue-400',
      'casual-pink': 'bg-pink-300',
      'formal-black': 'bg-gray-900',
      'party-gold': 'bg-yellow-400',
      'heels-black': 'bg-gray-700',
      'sneakers-white': 'bg-white',
      'boots-brown': 'bg-amber-800',
      'sandals-beige': 'bg-amber-200',
      'pearl-necklace': 'bg-gray-100',
      'diamond-earrings': 'bg-blue-100',
      'silver-bracelet': 'bg-gray-300',
      'gold-ring': 'bg-yellow-300'
    };
    return colors[item as keyof typeof colors] || 'bg-gray-300';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Love Nikki Fashion</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Character</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-32 bg-gradient-to-b from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">👗</div>
                  </div>
                  <div>
                    <div className="font-medium text-lg">Nikki</div>
                    <div className="text-sm text-gray-600">Style Points: {style}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hair</label>
                    <div className="flex gap-2">
                      {wardrobe.hair.map(hair => (
                        <button
                          key={hair}
                          className={`w-8 h-8 rounded ${getItemImage('hair', hair)} ${
                            character.hair === hair ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => updateOutfit('hair', hair)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Dress</label>
                    <div className="flex gap-2">
                      {wardrobe.dresses.map(dress => (
                        <button
                          key={dress}
                          className={`w-8 h-8 rounded ${getItemImage('dress', dress)} ${
                            character.dress === dress ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => updateOutfit('dress', dress)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Shoes</label>
                    <div className="flex gap-2">
                      {wardrobe.shoes.map(shoes => (
                        <button
                          key={shoes}
                          className={`w-8 h-8 rounded ${getItemImage('shoes', shoes)} ${
                            character.shoes === shoes ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => updateOutfit('shoes', shoes)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Accessories</label>
                    <div className="flex gap-2">
                      {wardrobe.accessories.map(accessory => (
                        <button
                          key={accessory}
                          className={`w-8 h-8 rounded ${getItemImage('accessories', accessory)} ${
                            character.accessories === accessory ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => updateOutfit('accessories', accessory)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Fashion Challenges</h3>
              <div className="grid grid-cols-2 gap-4">
                {challenges.map(challenge => (
                  <div
                    key={challenge.name}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-lg text-white cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => startChallenge(challenge)}
                  >
                    <h4 className="font-bold mb-2">{challenge.name}</h4>
                    <div className="text-sm">Reward: {challenge.reward} style points</div>
                    {currentChallenge === challenge.name && (
                      <div className="mt-2 text-xs bg-white/20 p-1 rounded">
                        Styling...
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
                <div>Total Style: {style}</div>
                <div>Challenges Won: {Math.floor(style / 50)}</div>
                <div>Fashion Level: {Math.floor(style / 100) + 1}</div>
              </div>
            </div>

            <div className="mt-4 bg-pink-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Achievements</h3>
              <div className="space-y-1 text-sm">
                {style >= 100 && <div className="text-green-600">✓ Style Beginner</div>}
                {style >= 500 && <div className="text-green-600">✓ Fashion Enthusiast</div>}
                {style >= 1000 && <div className="text-green-600">✓ Style Icon</div>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoveNikkiGame;
