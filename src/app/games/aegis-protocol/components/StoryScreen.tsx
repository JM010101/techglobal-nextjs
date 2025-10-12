'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, BookOpen, Star, Clock, Users } from 'lucide-react';
import storyMissionsData from '@/lib/data/storyMissions.json';
import storyEventsData from '@/lib/data/storyEvents.json';
import { StoryMission, StoryBeat, StoryChoice } from '@/lib/models/StoryMission';

const StoryScreen = () => {
  const {
    setCurrentScreen,
    ownedHeroes,
    relationships,
    characterDevelopmentStage,
    baseFacilities,
    completedMissions,
    currentStoryMission,
    setCurrentStoryMission,
    completeStoryMission,
    triggerStoryEvent,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'missions' | 'events' | 'active'>('missions');
  const [selectedMission, setSelectedMission] = useState<StoryMission | null>(null);
  const [currentBeat, setCurrentBeat] = useState<StoryBeat | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'extreme': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const checkMissionRequirements = (mission: StoryMission) => {
    if (mission.requirements.heroLevel && ownedHeroes.length < mission.requirements.heroLevel) {
      return false;
    }
    if (mission.requirements.relationshipLevel) {
      // Convert relationship levels to numbers for comparison
      const relationshipLevels = ['stranger', 'acquaintance', 'friend', 'close_friend', 'best_friend', 'rival', 'enemy', 'lover'];
      const maxRelationshipLevel = Math.max(...Object.values(relationships).map(r => 
        relationshipLevels.indexOf(r.relationshipLevel)
      ));
      if (maxRelationshipLevel < mission.requirements.relationshipLevel) {
        return false;
      }
    }
    if (mission.requirements.baseFacilityLevel) {
      const maxFacilityLevel = Math.max(...Object.values(baseFacilities));
      if (maxFacilityLevel < mission.requirements.baseFacilityLevel) {
        return false;
      }
    }
    if (mission.requirements.completedMissions) {
      const hasAllRequired = mission.requirements.completedMissions.every(req => 
        completedMissions.includes(req)
      );
      if (!hasAllRequired) return false;
    }
    if (mission.requirements.characterDevelopment) {
      const maxDevelopment = Math.max(...Object.values(characterDevelopmentStage));
      if (maxDevelopment < mission.requirements.characterDevelopment) {
        return false;
      }
    }
    return true;
  };

  const startMission = (mission: StoryMission) => {
    setSelectedMission(mission);
    setCurrentStoryMission(mission);
    setActiveTab('active');
    setStoryProgress(0);
    
    if (mission.storyBeats.length > 0) {
      setCurrentBeat(mission.storyBeats[0]);
    }
  };

  const handleChoice = (choice: StoryChoice) => {
    if (!selectedMission) return;

    // Apply consequences
    if (choice.consequences.relationshipChange) {
      // Apply relationship changes
    }
    if (choice.consequences.characterDevelopment) {
      // Apply character development changes
    }

    // Move to next beat
    if (choice.nextBeatId) {
      const nextBeat = selectedMission.storyBeats.find(beat => beat.id === choice.nextBeatId);
      if (nextBeat) {
        setCurrentBeat(nextBeat);
      }
    } else {
      // Mission completed
      completeStoryMission(selectedMission.id);
      setCurrentBeat(null);
      setSelectedMission(null);
      setActiveTab('missions');
    }
  };

  const availableMissions = storyMissionsData.filter(mission => 
    checkMissionRequirements(mission as StoryMission) && 
    !completedMissions.includes(mission.id)
  );

  const availableEvents = storyEventsData.filter(event => 
    event.unlockConditions.every(() => {
      // Check if condition is met
      return true; // Simplified for now
    })
  );

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
          STORY & NARRATIVE
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('missions')}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'missions' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Story Missions
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'events' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Story Events
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'active' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Active Story
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Available Story Missions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableMissions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                        <p className="text-sm text-purple-300">Chapter {mission.chapter}, Section {mission.section}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 text-sm">{mission.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{mission.estimatedDuration} min</span>
                      </div>
                      <div className={`text-sm font-bold ${getDifficultyColor(mission.difficulty)}`}>
                        {mission.difficulty.toUpperCase()}
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-3 mb-4">
                      <h4 className="text-sm font-bold text-white mb-2">Rewards:</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-300">
                        <span>XP: {mission.rewards.experience}</span>
                        <span>Credits: {mission.rewards.credits}</span>
                        <span>Materials: {mission.rewards.materials}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => startMission(mission as StoryMission)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Start Mission
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Story Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Star className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">{event.name}</h3>
                        <p className="text-sm text-blue-300 capitalize">{event.type}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 text-sm">{event.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-300">{event.participants.length} participants</span>
                      </div>
                      <div className="text-sm text-gray-300 capitalize">
                        {event.frequency} event
                      </div>
                    </div>

                    <button
                      onClick={() => triggerStoryEvent(event.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                    >
                      Trigger Event
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStoryMission ? (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-purple-500/30">
                    <div className="flex items-center gap-4 mb-6">
                      <BookOpen className="w-8 h-8 text-purple-400" />
                      <div>
                        <h2 className="text-2xl font-bold text-white">{currentStoryMission.title}</h2>
                        <p className="text-purple-300">Chapter {currentStoryMission.chapter}, Section {currentStoryMission.section}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(storyProgress / currentStoryMission.storyBeats.length) * 100}%` }}
                      ></div>
                    </div>

                    {/* Current Story Beat */}
                    {currentBeat && (
                      <motion.div
                        key={currentBeat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700"
                      >
                        {currentBeat.type === 'cutscene' && (
                          <div className="text-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-purple-500">
                              <Image
                                src={`/images/game/Aegis Protocol/${currentBeat.character?.toUpperCase()}.jpg`}
                                alt={currentBeat.character || 'Character'}
                                width={128}
                                height={128}
                                className="object-cover"
                              />
                            </div>
                            <p className="text-lg text-white mb-4">{currentBeat.text}</p>
                            <div className="text-sm text-gray-400 capitalize">
                              {currentBeat.emotion} • {currentBeat.background}
                            </div>
                          </div>
                        )}

                        {currentBeat.type === 'dialogue' && (
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                              <Image
                                src={`/images/game/Aegis Protocol/${currentBeat.character?.toUpperCase()}.jpg`}
                                alt={currentBeat.character || 'Character'}
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2">{currentBeat.character}</h3>
                              <p className="text-gray-300">{currentBeat.text}</p>
                            </div>
                          </div>
                        )}

                        {currentBeat.type === 'choice' && (
                          <div>
                            <p className="text-lg text-white mb-4">{currentBeat.text}</p>
                            <div className="space-y-3">
                              {currentBeat.choices?.map((choice, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleChoice(choice)}
                                  className="w-full bg-gray-700/70 text-white py-3 px-6 rounded-xl hover:bg-gray-600/70 transition-all duration-300 text-left"
                                >
                                  {choice.text}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Controls */}
                    <div className="flex justify-between items-center mt-6">
                      <button
                        onClick={() => {
                          setCurrentBeat(null);
                          setSelectedMission(null);
                          setActiveTab('missions');
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-700 transition-all duration-300"
                      >
                        Exit Story
                      </button>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-400">
                          Progress: {storyProgress}/{currentStoryMission.storyBeats.length}
                        </div>
                        <button
                          onClick={() => {
                            // Auto-advance to next beat
                            const nextIndex = storyProgress + 1;
                            if (nextIndex < currentStoryMission.storyBeats.length) {
                              setCurrentBeat(currentStoryMission.storyBeats[nextIndex]);
                              setStoryProgress(nextIndex);
                            }
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Active Story</h3>
                  <p className="text-gray-400 mb-6">Start a story mission to begin your narrative journey.</p>
                  <button
                    onClick={() => setActiveTab('missions')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Browse Missions
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryScreen;
