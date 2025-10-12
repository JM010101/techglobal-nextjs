'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, Users, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const SocialHubScreen = () => {
  const { 
    ownedHeroes, 
    relationships, 
    currentSocialInteraction, 
    startSocialInteraction, 
    completeSocialInteraction,
    getRelationship,
    setCurrentScreen 
  } = useGameStore();
  
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const getRelationshipLevel = (hero1Id: string, hero2Id: string) => {
    const relationship = getRelationship(hero1Id, hero2Id);
    if (!relationship) return 'stranger';
    return relationship.relationshipLevel;
  };

  const getAffinityColor = (affinity: number) => {
    if (affinity >= 80) return 'text-green-400';
    if (affinity >= 60) return 'text-blue-400';
    if (affinity >= 40) return 'text-yellow-400';
    if (affinity >= 20) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRelationshipIcon = (relationshipType: string) => {
    switch (relationshipType) {
      case 'friendship': return '🤝';
      case 'rivalry': return '⚔️';
      case 'romance': return '💕';
      case 'mentor': return '👨‍🏫';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-pink-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-pink-400 hover:text-pink-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          SOCIAL HUB
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
              <p className="text-gray-400">Select a hero to view their relationships and social interactions</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {ownedHeroes.map((hero) => (
                <motion.button
                  key={hero.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedHero(hero.id)}
                  className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-3xl p-6 border-2 border-pink-500/50 hover:border-pink-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-pink-500/50">
                      <Image 
                        src={`/images/game/Aegis Protocol/${hero.codename.toUpperCase()}.${hero.codename === 'HAVEN' || hero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                        alt={hero.codename}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white">{hero.codename}</h3>
                      <p className="text-pink-300">{hero.role}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-gray-400">
                          {relationships.filter(r => r.hero1Id === hero.id || r.hero2Id === hero.id).length} relationships
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Hero Relationships */
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
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-pink-500/50">
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
                  <p className="text-pink-300">
                    {ownedHeroes.find(h => h.id === selectedHero)?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Relationships List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Relationships</h3>
              {ownedHeroes
                .filter(hero => hero.id !== selectedHero)
                .map((otherHero) => {
                  const relationship = getRelationship(selectedHero, otherHero.id);
                  const affinity = relationship?.affinity || 0;
                  const trust = relationship?.trust || 50;
                  const respect = relationship?.respect || 50;
                  const attraction = relationship?.attraction || 0;
                  
                  return (
                    <motion.div
                      key={otherHero.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-4 border border-gray-600/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-500/50">
                            <Image 
                              src={`/images/game/Aegis Protocol/${otherHero.codename.toUpperCase()}.${otherHero.codename === 'HAVEN' || otherHero.codename === 'EMBER' ? 'webp' : 'jpg'}`}
                              alt={otherHero.codename}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{otherHero.codename}</h4>
                            <p className="text-gray-400">{otherHero.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-2xl">{getRelationshipIcon(relationship?.relationshipType || 'neutral')}</span>
                              <span className="text-sm text-gray-500 capitalize">
                                {getRelationshipLevel(selectedHero, otherHero.id)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getAffinityColor(affinity)}`}>
                                {affinity > 0 ? '+' : ''}{affinity}
                              </div>
                              <div className="text-xs text-gray-400">Affinity</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-400">{trust}</div>
                              <div className="text-xs text-gray-400">Trust</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-400">{respect}</div>
                              <div className="text-xs text-gray-400">Respect</div>
                            </div>
                            {attraction > 0 && (
                              <div className="text-center">
                                <div className="text-lg font-bold text-pink-400">{attraction}</div>
                                <div className="text-xs text-gray-400">Attraction</div>
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => {
                              // Start a social interaction
                              const interaction = {
                                id: `interaction_${Date.now()}`,
                                hero1Id: selectedHero,
                                hero2Id: otherHero.id,
                                interactionType: 'conversation' as const,
                                topic: 'Casual Conversation',
                                choices: {
                                  option1: 'Ask about their day',
                                  option2: 'Discuss work and missions',
                                  option3: 'Share a personal story'
                                },
                                consequences: {
                                  affinityChange: [5, 10, 15],
                                  trustChange: [3, 8, 12],
                                  respectChange: [2, 6, 10],
                                  attractionChange: [1, 3, 5]
                                },
                                timestamp: new Date()
                              };
                              startSocialInteraction(interaction);
                            }}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                          >
                            <MessageCircle className="w-4 h-4 inline mr-2" />
                            Interact
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* Social Interaction Modal */}
        {currentSocialInteraction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-pink-900/90 to-purple-900/90 rounded-3xl p-8 max-w-2xl w-full mx-4 border-2 border-pink-500/50"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {currentSocialInteraction.topic}
              </h3>
              <p className="text-gray-300 mb-6">
                Choose how to respond to this social interaction:
              </p>
              
              <div className="space-y-3">
                {Object.entries(currentSocialInteraction.choices).map(([key, choice], index) => (
                  <button
                    key={key}
                    onClick={() => completeSocialInteraction(index + 1)}
                    className="w-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-pink-800/50 hover:to-purple-800/50 text-white p-4 rounded-xl border border-gray-600/50 hover:border-pink-500/50 transition-all duration-300 text-left"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialHubScreen;
