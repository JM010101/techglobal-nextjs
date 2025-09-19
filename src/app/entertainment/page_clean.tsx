'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Zap, 
  Star, 
  Timer, 
  Brain, 
  Play, 
  Trophy, 
  Users, 
  Target,
  Sparkles
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
    id: 'minecraft',
    title: 'Minecraft Creative',
    description: 'Build, explore, and create in an infinite sandbox world. Let your imagination run wild with endless blocks and tools.',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'Sandbox'
  },
  {
    id: 'fall-guys',
    title: 'Fall Guys',
    description: 'Race through hilarious obstacle courses with colorful characters. Last one standing wins the crown!',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Medium',
    category: 'Party'
  },
  {
    id: 'roblox',
    title: 'Roblox World',
    description: 'Explore thousands of games and create your own adventures. Customize your avatar and join friends in virtual worlds.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'Social'
  },
  {
    id: 'mario-kart',
    title: 'Mario Kart Racing',
    description: 'Race with iconic characters like Princess Peach and Mario. Use power-ups and drift your way to victory!',
    icon: Timer,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Medium',
    category: 'Racing'
  },
  {
    id: 'sims',
    title: 'The Sims Life',
    description: 'Create and control virtual people in a life simulation. Build homes, pursue careers, and live your dream life.',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'Simulation'
  },
  {
    id: 'love-nikki',
    title: 'Love Nikki Fashion',
    description: 'Design stunning outfits and style beautiful characters. Compete in fashion shows and unlock exclusive clothing.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Easy',
    category: 'Fashion'
  }
];

const EntertainmentPage = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [leaderboard, setLeaderboard] = useState<{[key: string]: number}>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side and load leaderboard from localStorage
    setIsClient(true);
    const savedLeaderboard = localStorage.getItem('gameLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const categories = ['all', 'Sandbox', 'Party', 'Social', 'Racing', 'Simulation', 'Fashion'];

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

  // Memoized score update functions

  const openGameInNewWindow = (gameId: string) => {
    const gameWindow = window.open(
      `/games/${gameId}`,
      `game-${gameId}`,
      'width=800,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no'
    );
    
    if (gameWindow) {
      // Listen for score updates from the game window
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GAME_SCORE_UPDATE') {
          const { gameId: messageGameId, score } = event.data;
          updateLeaderboard(messageGameId, score);
        }
        
        if (event.data.type === 'GAME_CLOSED') {
          window.removeEventListener('message', handleMessage);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Clean up listener when window is closed
      const checkClosed = setInterval(() => {
        if (gameWindow.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);
    }
  };


  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Entertainment Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the most popular and engaging games of 2025. From creative sandboxes to fashion shows, 
              there&apos;s something for everyone to enjoy!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: Gamepad2, text: '6 Amazing Games' },
                { icon: Users, text: 'Multiplayer Fun' },
                { icon: Trophy, text: 'Leaderboards' },
                { icon: Sparkles, text: 'Professional Quality' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Categories</h2>
            <p className="text-xl text-gray-600">Filter games by your preferred genre</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'All Games' : category}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGames.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop&auto=format&q=80';
                          }}
                        />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <Icon className="w-8 h-8 text-white" />
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${game.difficulty === 'Easy' ? 'bg-green-500' : ''}
                        ${game.difficulty === 'Medium' ? 'bg-yellow-500' : ''}
                        ${game.difficulty === 'Hard' ? 'bg-red-500' : ''}
                        text-white
                      `}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                    <p className="text-gray-600 mb-6">{game.description}</p>
                    <button
                      onClick={() => openGameInNewWindow(game.id)}
                      className="btn btn-primary w-full group"
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Play Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
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
                    {game.id === 'minecraft' ? 'blocks' :
                     game.id === 'fall-guys' ? 'wins' :
                     game.id === 'roblox' ? 'coins' :
                     game.id === 'mario-kart' ? 'points' :
                     game.id === 'sims' ? 'happiness' :
                     game.id === 'love-nikki' ? 'style' : 'score'}
                </div>
              </motion.div>
            )})}
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
    </main>
  );
};

export default EntertainmentPage;
