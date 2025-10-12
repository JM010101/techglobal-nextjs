'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, Plus, X } from 'lucide-react';

const SquadScreen = () => {
  const { ownedHeroes, currentSquad, setSquad, setCurrentScreen } = useGameStore();

  const toggleHeroInSquad = (heroId: string) => {
    if (currentSquad.includes(heroId)) {
      setSquad(currentSquad.filter(id => id !== heroId));
    } else if (currentSquad.length < 3) {
      setSquad([...currentSquad, heroId]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-cyan-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
          SQUAD MANAGEMENT
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current Squad */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-cyan-500/30">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Current Squad ({currentSquad.length}/3)</h2>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => {
              const heroId = currentSquad[index];
              const hero = ownedHeroes.find(h => h.id === heroId);
              
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-2xl border-2 ${
                    hero 
                      ? 'bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-500/50' 
                      : 'bg-gray-800/30 border-gray-600/30 border-dashed'
                  } flex flex-col items-center justify-center p-4 relative`}
                >
                  {hero ? (
                    <>
                      <button
                        onClick={() => toggleHeroInSquad(hero.id)}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="w-16 h-16 rounded-xl overflow-hidden mb-2 border-2 border-cyan-500/50">
                        <img 
                          src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                          alt={hero.codename}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{hero.codename}</h3>
                      <p className="text-sm text-gray-400">{hero.role}</p>
                      <p className="text-xs text-cyan-400 mt-1">Lv.{hero.level}</p>
                    </>
                  ) : (
                    <Plus className="w-12 h-12 text-gray-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Heroes */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-orange-500/30">
          <h2 className="text-xl font-bold text-orange-400 mb-4">Available Heroes ({ownedHeroes.length})</h2>
          <div className="grid grid-cols-4 gap-4">
            {ownedHeroes.map((hero) => {
              const inSquad = currentSquad.includes(hero.id);
              
              return (
                <motion.button
                  key={hero.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleHeroInSquad(hero.id)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    inSquad
                      ? 'bg-green-900/50 border-green-500'
                      : 'bg-gray-800/50 border-gray-600 hover:border-cyan-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden mb-2 border border-gray-500/50">
                    <img 
                      src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                      alt={hero.codename}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-white">{hero.codename}</h3>
                  <p className="text-xs text-gray-400">{hero.role}</p>
                  <p className="text-xs text-cyan-400">Lv.{hero.level}</p>
                  <div className="mt-2 text-xs">
                    <div className="text-gray-300">HP: {hero.base_stats.hp}</div>
                    <div className="text-gray-300">ATK: {hero.base_stats.atk}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;

