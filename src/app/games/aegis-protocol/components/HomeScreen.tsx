'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGameStore } from '@/store/gameStore';
import { Zap, Users, Trophy, ShoppingBag, X, MessageCircle, BookOpen, Home, UserPlus } from 'lucide-react';
import chaptersData from '@/data/chapters.json';

const HomeScreen = () => {
  const { credits, signalKeys, currentSquad, ownedHeroes, setCurrentScreen, currentChapter, currentSection, completedMissions } = useGameStore();

  const squadHeroes = ownedHeroes.filter(h => currentSquad.includes(h.id));
  const currentChapterData = chaptersData[0]; // Chapter 1 for now

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-cyan-500/30">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 tracking-wider">
          AEGIS PROTOCOL
        </h1>
        
        {/* Currency HUD */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-xl px-4 py-2 border border-yellow-600/50">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
              <span className="text-xs font-bold">₵</span>
            </div>
            <span className="text-yellow-200 font-bold">{credits.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl px-4 py-2 border border-purple-600/50">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-200 font-bold">{signalKeys}</span>
          </div>
          
          <button 
            onClick={() => window.close()} 
            className="p-2 hover:bg-red-600/50 rounded-full text-white transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Squad Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-cyan-500/30 backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              CURRENT SQUAD
            </h2>
            <button
              onClick={() => setCurrentScreen('squad')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
            >
              <Users className="w-4 h-4 inline mr-2" />
              Manage
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => {
              const hero = squadHeroes[index];
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-2xl border-2 ${
                    hero 
                      ? 'bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-500/50' 
                      : 'bg-gray-800/30 border-gray-600/30 border-dashed'
                  } flex flex-col items-center justify-center p-4`}
                >
                  {hero ? (
                    <>
                      <div className="w-16 h-16 rounded-xl overflow-hidden mb-2 border-2 border-cyan-500/50">
                        <Image 
                          src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                          alt={hero.codename}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{hero.codename}</h3>
                      <p className="text-sm text-gray-400">{hero.role}</p>
                      <p className="text-xs text-cyan-400 mt-1">Lv.{hero.level}</p>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm">Empty Slot</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission Select */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-orange-500/30 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4">
            CHAPTER {currentChapterData.chapter}: {currentChapterData.title.toUpperCase()}
          </h2>
          <p className="text-gray-300 mb-6">{currentChapterData.description}</p>
          
          <div className="space-y-3">
            {currentChapterData.sections.map((section, index) => {
              const isCompleted = completedMissions.includes(`${currentChapter}_${index + 1}`);
              const isLocked = index > 0 && !completedMissions.includes(`${currentChapter}_${index}`);
              const isCurrent = index + 1 === currentSection && !isCompleted;
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isLocked
                      ? 'bg-gray-800/30 border-gray-600/30 opacity-50'
                      : isCompleted
                      ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-600/50'
                      : 'bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-600/50 hover:border-orange-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Section {index + 1}: {section.name}
                      </h3>
                      <p className="text-sm text-gray-400">{section.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">{section.environment}</span>
                        {isCompleted && <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">✓ Completed</span>}
                        {isCurrent && <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded animate-pulse">→ Current</span>}
                      </div>
                    </div>
                    
                    {!isLocked && (
                      <button
                        onClick={() => {
                          if (squadHeroes.length === 0) {
                            alert('Please add at least one hero to your squad!');
                            return;
                          }
                          useGameStore.getState().startMission(`chapter_${currentChapter}_section_${index + 1}`);
                        }}
                        className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                            : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
                        }`}
                      >
                        {isCompleted ? 'Replay' : 'Start Mission'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-7 gap-4"
        >
          <button
            onClick={() => setCurrentScreen('squad')}
            className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-2 border-cyan-600/50 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300"
          >
            <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-white font-bold">Squad</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('recruitment')}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-600/50 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300"
          >
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-bold">Recruit</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('social')}
            className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-2 border-pink-600/50 rounded-2xl p-6 hover:border-pink-500 transition-all duration-300"
          >
            <MessageCircle className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-bold">Social</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('character-development')}
            className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-2 border-indigo-600/50 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300"
          >
            <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <p className="text-white font-bold">Development</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('base-management')}
            className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-600/50 rounded-2xl p-6 hover:border-green-500 transition-all duration-300"
          >
            <Home className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white font-bold">Base</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('recruitment-event')}
            className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-2 border-yellow-600/50 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300"
          >
            <UserPlus className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-bold">Recruit</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('story')}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-600/50 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300"
          >
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-bold">Story</p>
          </button>
          
          <button
            onClick={() => alert('Shop coming soon!')}
            className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-2 border-orange-600/50 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300"
          >
            <ShoppingBag className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-white font-bold">Shop</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;

