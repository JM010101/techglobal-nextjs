'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Gamepad2, 
  Star, 
  Timer, 
  Brain, 
  Play, 
  Trophy, 
  Users, 
  Target,
  X,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const games: Game[] = [
  {
    id: 'game-1',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=1',
    difficulty: 'Easy',
    category: 'All'
  },
  {
    id: 'game-2',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=2',
    difficulty: 'Easy',
    category: 'All'
  },
  {
    id: 'game-3',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=3',
    difficulty: 'Easy',
    category: 'All'
  },
  {
    id: 'game-4',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=4',
    difficulty: 'Easy',
    category: 'All'
  },
  {
    id: 'game-5',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=5',
    difficulty: 'Easy',
    category: 'All'
  },
  {
    id: 'game-6',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=6',
    difficulty: 'Easy',
    category: 'All'
  }
];

// Placeholder Game Component
const PlaceholderGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full text-center"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Game Coming Soon</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="py-12">
          <Gamepad2 className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">This Game is Under Development</h3>
          <p className="text-gray-600 mb-8">
            We're working hard to bring you an amazing gaming experience. 
            This game will be available soon with exciting features and gameplay!
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">What to Expect:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Engaging gameplay mechanics</li>
              <li>• Professional development focus</li>
              <li>• Score tracking and leaderboards</li>
              <li>• Multiple difficulty levels</li>
            </ul>
          </div>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const EntertainmentPage = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [leaderboard, setLeaderboard] = useState<{[key: string]: number}>({});
  const [isClient, setIsClient] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    // Mark as client-side and load leaderboard from localStorage
    setIsClient(true);
    const savedLeaderboard = localStorage.getItem('gameLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const categories = ['all', 'All'];

  const filteredGames = filterCategory === 'all' 
    ? games 
    : games.filter(game => game.category === filterCategory);

  const updateLeaderboard = useCallback((gameId: string, score: number) => {
    if (!isClient) return;
    
    setLeaderboard(prev => {
      const newLeaderboard = { ...prev, [gameId]: Math.max(prev[gameId] || 0, score) };
      localStorage.setItem('gameLeaderboard', JSON.stringify(newLeaderboard));
      return newLeaderboard;
    });
  }, [isClient]);

  const openGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const gameProps = { 
      onClose: closeGame, 
      onScoreUpdate: (score: number) => updateLeaderboard(selectedGame, score) 
    };

    return <PlaceholderGame {...gameProps} />;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Professional <span className="text-yellow-400">Games</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
              Play engaging LinkedIn-style games that combine fun with professional development. 
              Build skills, make connections, and advance your career through interactive gameplay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Gamepad2 className="w-6 h-6 mr-3 text-blue-600" />
                  Game Categories
                </h3>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        filterCategory === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'all' ? 'All Games' : category}
                      <span className="float-right text-sm opacity-75">
                        {category === 'all' ? games.length : games.filter(g => g.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Leaderboard Preview */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Top Scores
                  </h4>
                  <div className="space-y-2">
                    {games.slice(0, 3).map((game) => (
                      <div key={game.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate">{game.title}</span>
                        <span className="font-semibold text-blue-600">
                          {isClient ? (leaderboard[game.id] || 0) : 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {filterCategory === 'all' ? 'All Games' : filterCategory} Games
                </h2>
                <p className="text-gray-600">
                  {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} available
                </p>
              </div>

              {filteredGames.length === 0 ? (
                <div className="text-center py-12">
                  <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No games found</h3>
                  <p className="text-gray-600">Try selecting a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredGames.map((game, index) => {
                    const Icon = game.icon;
                    return (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={game.image}
                            alt={game.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://picsum.photos/800/600?random=fallback';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <Icon className="w-6 h-6 text-white" />
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${game.difficulty === 'Easy' ? 'bg-green-500' : ''}
                              ${game.difficulty === 'Medium' ? 'bg-yellow-500' : ''}
                              ${game.difficulty === 'Hard' ? 'bg-red-500' : ''}
                              text-white
                            `}>
                              {game.difficulty}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                              {game.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-gray-900">{game.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{game.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              High Score: <span className="font-semibold text-blue-600">
                                {isClient ? (leaderboard[game.id] || 0) : 0}
                              </span>
                            </div>
                            <button
                              onClick={() => openGame(game.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Play
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Leaderboard</h2>
            <p className="text-xl text-gray-600">Track your progress across all games</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {games.map((game, index) => {
              const Icon = game.icon;
              return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold text-sm mb-2">{game.title}</h3>
                <div className="text-2xl font-bold text-purple-600">
                  {isClient ? (leaderboard[game.id] || 0) : 0}
                </div>
                 <div className="text-xs text-gray-500 mt-1">
                     score
                 </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Games?</h2>
            <p className="text-xl text-gray-600">Professional quality entertainment at your fingertips</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Target, text: 'Professional Quality' },
              { icon: Users, text: 'Multiplayer Ready' },
              { icon: Timer, text: 'Quick Sessions' },
              { icon: Trophy, text: 'Track Progress' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Game Modal */}
      {renderGame()}
    </main>
  );
};

export default EntertainmentPage;