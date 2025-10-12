'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const CharacterDevelopmentScreen = () => {
  const { 
    ownedHeroes, 
    unlockedBackstories, 
    completedPersonalQuests, 
    characterDevelopmentStage,
    setCurrentScreen 
  } = useGameStore();
  
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'backstory' | 'quests' | 'development'>('backstory');

  const getDevelopmentStage = (heroId: string) => {
    return characterDevelopmentStage[heroId] || 0;
  };

  const getBackstoryProgress = (heroId: string) => {
    const unlocked = unlockedBackstories.filter(key => key.startsWith(`${heroId}_backstory`));
    return unlocked.length;
  };

  const getQuestProgress = (heroId: string) => {
    const completed = completedPersonalQuests.filter(questId => questId.startsWith(heroId));
    return completed.length;
  };

  const getDevelopmentStageName = (stage: number) => {
    const stages = ['Beginning', 'Growth', 'Mastery', 'Transcendence'];
    return stages[stage] || 'Unknown';
  };

  const getDevelopmentColor = (stage: number) => {
    const colors = ['text-gray-400', 'text-blue-400', 'text-green-400', 'text-purple-400'];
    return colors[stage] || 'text-gray-400';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-purple-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          CHARACTER DEVELOPMENT
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selectedHero ? (
          /* Hero Selection */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Choose a Hero</h2>
              <p className="text-gray-400">View their backstory, personal quests, and development arc</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {ownedHeroes.map((hero) => {
                const backstoryProgress = getBackstoryProgress(hero.id);
                const questProgress = getQuestProgress(hero.id);
                const developmentStage = getDevelopmentStage(hero.id);
                
                return (
                  <motion.button
                    key={hero.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedHero(hero.id)}
                    className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-6 border-2 border-purple-500/50 hover:border-purple-400 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-500/50">
                        <Image 
                          src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                          alt={hero.codename}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-xl font-bold text-white">{hero.codename}</h3>
                        <p className="text-purple-300">{hero.role}</p>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-400">
                              Backstory: {backstoryProgress}/3 chapters
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-400">
                              Quests: {questProgress}/2 completed
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span className={`text-sm font-bold ${getDevelopmentColor(developmentStage)}`}>
                              Stage: {getDevelopmentStageName(developmentStage)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Hero Development Details */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedHero(null)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-purple-500/50">
                  <Image 
                    src={`/images/game/Aegis Protocol/${ownedHeroes.find(h => h.id === selectedHero)?.codename.toUpperCase()}.${ownedHeroes.find(h => h.id === selectedHero)?.codename === 'HAVEN' || ownedHeroes.find(h => h.id === selectedHero)?.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                    alt={ownedHeroes.find(h => h.id === selectedHero)?.codename || 'Hero'}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {ownedHeroes.find(h => h.id === selectedHero)?.codename}
                  </h2>
                  <p className="text-purple-300">
                    {ownedHeroes.find(h => h.id === selectedHero)?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('backstory')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'backstory'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Backstory
              </button>
              <button
                onClick={() => setActiveTab('quests')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'quests'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Personal Quests
              </button>
              <button
                onClick={() => setActiveTab('development')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'development'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Development Arc
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'backstory' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Character Backstory</h3>
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-blue-500/30">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Backstory Chapters</h4>
                    <p className="text-gray-400 mb-4">
                      Complete story missions to unlock {ownedHeroes.find(h => h.id === selectedHero)?.codename}&apos;s backstory chapters
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((chapter) => {
                        const isUnlocked = unlockedBackstories.includes(`${selectedHero}_backstory_chapter_${chapter}`);
                        return (
                          <div
                            key={chapter}
                            className={`p-4 rounded-xl border-2 ${
                              isUnlocked
                                ? 'bg-green-900/30 border-green-600/50'
                                : 'bg-gray-800/30 border-gray-600/30'
                            }`}
                          >
                            <div className="text-2xl mb-2">
                              {isUnlocked ? '📖' : '🔒'}
                            </div>
                            <h5 className="font-bold text-white">Chapter {chapter}</h5>
                            <p className="text-sm text-gray-400">
                              {isUnlocked ? 'Unlocked' : 'Locked'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quests' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Personal Quests</h3>
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-green-500/30">
                  <div className="text-center">
                    <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Personal Quests</h4>
                    <p className="text-gray-400 mb-4">
                      Complete personal quests to unlock unique abilities and deepen relationships
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((quest) => {
                        const isCompleted = completedPersonalQuests.includes(`${selectedHero}_quest_${quest}`);
                        return (
                          <div
                            key={quest}
                            className={`p-4 rounded-xl border-2 ${
                              isCompleted
                                ? 'bg-green-900/30 border-green-600/50'
                                : 'bg-gray-800/30 border-gray-600/30'
                            }`}
                          >
                            <div className="text-2xl mb-2">
                              {isCompleted ? '✅' : '🎯'}
                            </div>
                            <h5 className="font-bold text-white">Quest {quest}</h5>
                            <p className="text-sm text-gray-400">
                              {isCompleted ? 'Completed' : 'Available'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'development' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Character Development Arc</h3>
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-purple-500/30">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Development Stages</h4>
                    <p className="text-gray-400 mb-4">
                      Watch {ownedHeroes.find(h => h.id === selectedHero)?.codename} grow and evolve through their journey
                    </p>
                    <div className="space-y-3">
                      {[0, 1, 2, 3].map((stage) => {
                        const currentStage = getDevelopmentStage(selectedHero);
                        const isReached = currentStage >= stage;
                        const isCurrent = currentStage === stage;
                        
                        return (
                          <div
                            key={stage}
                            className={`p-4 rounded-xl border-2 ${
                              isCurrent
                                ? 'bg-purple-900/30 border-purple-600/50'
                                : isReached
                                ? 'bg-green-900/30 border-green-600/50'
                                : 'bg-gray-800/30 border-gray-600/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {isCurrent ? '🌟' : isReached ? '✅' : '🔒'}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-white">
                                  Stage {stage + 1}: {getDevelopmentStageName(stage)}
                                </h5>
                                <p className="text-sm text-gray-400">
                                  {isCurrent ? 'Current Stage' : isReached ? 'Completed' : 'Locked'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CharacterDevelopmentScreen;
