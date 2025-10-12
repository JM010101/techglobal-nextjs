'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, Heart, Sword, Shield, Zap } from 'lucide-react';

const HeroDetailScreen = () => {
  const { selectedHeroForDetail, ownedHeroes, setCurrentScreen, setSelectedHeroForDetail } = useGameStore();
  
  const hero = ownedHeroes.find(h => h.id === selectedHeroForDetail);

  if (!hero) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white">Hero not found</p>
      </div>
    );
  }

  const xpForNextLevel = hero.level * 100;
  const xpProgress = (hero.xp / xpForNextLevel) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-cyan-500/30">
        <button
          onClick={() => {
            setSelectedHeroForDetail(null);
            setCurrentScreen('squad');
          }}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
          HERO DETAILS
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-3xl p-8 border-2 border-cyan-500/50">
            <div className="flex gap-8">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-cyan-500/50">
                <Image 
                  src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                  alt={hero.codename}
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-4xl font-black text-white mb-2">{hero.codename}</h2>
                <p className="text-xl text-cyan-300 mb-4">{hero.role} • {hero.weapon}</p>
                <p className="text-gray-300 mb-4">{hero.description}</p>
                
                {/* Level & XP */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Level {hero.level}</span>
                    <span className="text-sm text-gray-400">{hero.xp}/{xpForNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${xpProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-black/30 rounded-xl p-3 text-center">
                    <Heart className="w-6 h-6 text-red-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-white">{hero.base_stats.hp}</p>
                    <p className="text-xs text-gray-400">HP</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-3 text-center">
                    <Sword className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-white">{hero.base_stats.atk}</p>
                    <p className="text-xs text-gray-400">ATK</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-3 text-center">
                    <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-white">{hero.base_stats.def}</p>
                    <p className="text-xs text-gray-400">DEF</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-3 text-center">
                    <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-white">{(hero.base_stats.crit * 100).toFixed(0)}%</p>
                    <p className="text-xs text-gray-400">CRIT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-orange-500/30">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">SKILLS</h3>
            <div className="space-y-4">
              {hero.skills.map((skill, index) => (
                <div key={index} className="bg-gray-900/50 rounded-2xl p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                    <span className="text-sm text-cyan-400">CD: {skill.cooldown}T</span>
                  </div>
                  <p className="text-gray-300">{skill.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded">{skill.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ultimate */}
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-6 border-2 border-purple-500/50">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">ULTIMATE</h3>
            <div className="bg-black/30 rounded-2xl p-4">
              <h4 className="text-xl font-bold text-white mb-2">{hero.ultimate.name}</h4>
              <p className="text-gray-300 mb-3">{hero.ultimate.description}</p>
              <span className="text-sm text-purple-400">Charge Required: {hero.ultimate.charge_required}</span>
            </div>
          </div>

          {/* Synergies */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-cyan-500/30">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">SYNERGIES</h3>
            <div className="flex flex-wrap gap-2">
              {hero.synergy_tags.map((tag, index) => (
                <span key={index} className="bg-cyan-900/50 text-cyan-300 px-4 py-2 rounded-xl text-sm font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroDetailScreen;

