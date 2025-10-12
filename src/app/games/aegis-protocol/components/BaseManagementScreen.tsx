'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { ArrowLeft, Home, Utensils, Dumbbell, Gamepad2, Heart, Clock, Users, Wrench } from 'lucide-react';
import { useState } from 'react';

const BaseManagementScreen = () => {
  const { 
    baseFacilities, 
    heroNeeds, 
    currentTime, 
    currentDay, 
    baseMaterials,
    upgradeFacility,
    assignHeroToActivity,
    updateHeroNeeds,
    advanceTime,
    getFacilityLevel,
    setCurrentScreen 
  } = useGameStore();
  
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const facilities = [
    {
      id: 'barracks',
      name: 'Barracks',
      icon: Home,
      color: 'blue',
      description: 'Living quarters for heroes'
    },
    {
      id: 'mess_hall',
      name: 'Mess Hall',
      icon: Utensils,
      color: 'green',
      description: 'Dining and social area'
    },
    {
      id: 'training_room',
      name: 'Training Room',
      icon: Dumbbell,
      color: 'red',
      description: 'Combat training facility'
    },
    {
      id: 'recreation',
      name: 'Recreation Center',
      icon: Gamepad2,
      color: 'purple',
      description: 'Entertainment and relaxation'
    },
    {
      id: 'medical_bay',
      name: 'Medical Bay',
      icon: Heart,
      color: 'pink',
      description: 'Medical and health facility'
    }
  ];

  const getFacilityColor = (color: string) => {
    const colors = {
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      red: 'from-red-600 to-red-700',
      purple: 'from-purple-600 to-purple-700',
      pink: 'from-pink-600 to-pink-700'
    };
    return colors[color as keyof typeof colors] || 'from-gray-600 to-gray-700';
  };

  const getFacilityIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-400',
      green: 'text-green-400',
      red: 'text-red-400',
      purple: 'text-purple-400',
      pink: 'text-pink-400'
    };
    return colors[color as keyof typeof colors] || 'text-gray-400';
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getTimeOfDay = (time: number) => {
    if (time >= 6 && time < 12) return 'Morning';
    if (time >= 12 && time < 18) return 'Afternoon';
    if (time >= 18 && time < 22) return 'Evening';
    return 'Night';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-green-500/30">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-green-400 hover:text-green-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back</span>
        </button>
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          BASE MANAGEMENT
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-900/50 rounded-xl px-4 py-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-green-200 font-bold">
              Day {currentDay} - {formatTime(currentTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-blue-900/50 rounded-xl px-4 py-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 font-bold">{baseMaterials}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Time and Day Info */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Base Status</h2>
                <p className="text-gray-400">
                  Current time: {formatTime(currentTime)} ({getTimeOfDay(currentTime)})
                </p>
                <p className="text-gray-400">Day {currentDay} of operations</p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => advanceTime(1)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  Advance Time (+1h)
                </button>
              </div>
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-2 gap-6">
            {facilities.map((facility) => {
              const level = getFacilityLevel(facility.id);
              const Icon = facility.icon;
              
              return (
                <motion.div
                  key={facility.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border-2 border-gray-600/50 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getFacilityColor(facility.color)} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{facility.name}</h3>
                      <p className="text-gray-400 text-sm">{facility.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Level {level}/5</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${star <= level ? 'text-yellow-400' : 'text-gray-600'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Upgrade Cost:</span>
                      <span className="text-sm text-white font-bold">
                        {1000 * level} Credits + {1000 * level} Materials
                      </span>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (upgradeFacility(facility.id)) {
                          alert(`${facility.name} upgraded to level ${level + 1}!`);
                        } else {
                          alert('Not enough resources or already at max level!');
                        }
                      }}
                      disabled={level >= 5}
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                        level >= 5
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : `bg-gradient-to-r ${getFacilityColor(facility.color)} text-white hover:opacity-90`
                      }`}
                    >
                      {level >= 5 ? 'Max Level' : `Upgrade to Level ${level + 1}`}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hero Needs Overview */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Hero Needs Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(heroNeeds).map(([heroId, needs]) => (
                <div key={heroId} className="bg-gray-900/50 rounded-2xl p-4">
                  <h4 className="text-lg font-bold text-white mb-3">{heroId}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Morale:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${needs.morale.current}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{needs.morale.current}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Health:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${needs.health.current}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{needs.health.current}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Stress:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${needs.stress.current}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{needs.stress.current}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Social:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${needs.social.current}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{needs.social.current}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Activities */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-3xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Daily Activities</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'rest', name: 'Rest', icon: '😴', color: 'blue' },
                { id: 'training', name: 'Training', icon: '💪', color: 'red' },
                { id: 'social', name: 'Social', icon: '👥', color: 'green' },
                { id: 'recreation', name: 'Recreation', icon: '🎮', color: 'purple' },
                { id: 'medical', name: 'Medical', icon: '🏥', color: 'pink' },
                { id: 'personal', name: 'Personal', icon: '📚', color: 'yellow' }
              ].map((activity) => (
                <motion.button
                  key={activity.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl p-4 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{activity.icon}</div>
                  <h4 className="text-sm font-bold text-white">{activity.name}</h4>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BaseManagementScreen;
