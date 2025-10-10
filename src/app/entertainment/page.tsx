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
    id: 'grid-tactics',
    title: 'Grid Tactics',
    description: 'Turn-based tactical combat on an 8x8 grid. Command your warrior to defeat the enemy in strategic battles!',
    icon: Target,
    image: 'https://picsum.photos/800/600?random=1',
    difficulty: 'Medium',
    category: 'Strategy'
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

// Grid Tactics Game Component
const GridTacticsGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'enemy' | null>(null);
  const [score, setScore] = useState(0);

  const [player, setPlayer] = useState({
    row: 1,
    col: 1,
    health: 3,
    maxHealth: 3,
    weapon: '⚔️',
    name: 'Warrior'
  });

  const [enemy, setEnemy] = useState({
    row: 6,
    col: 6,
    health: 7,
    maxHealth: 7,
    weapon: '🗡️',
    name: 'Goblin'
  });

  const [grid, setGrid] = useState<Array<Array<string>>>(() => {
    const newGrid = Array(8).fill(null).map(() => Array(8).fill(''));
    newGrid[1][1] = 'player';
    newGrid[6][6] = 'enemy';
    return newGrid;
  });

  const startGame = () => {
    setGameStarted(true);
    setCurrentTurn('player');
    setGameOver(false);
    setWinner(null);
    setScore(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTurn('player');
    setSelectedCell(null);
    setGameOver(false);
    setWinner(null);
    setScore(0);
    
    setPlayer({
      row: 1,
      col: 1,
      health: 3,
      maxHealth: 3,
      weapon: '⚔️',
      name: 'Warrior'
    });
    
    setEnemy({
      row: 6,
      col: 6,
      health: 7,
      maxHealth: 7,
      weapon: '🗡️',
      name: 'Goblin'
    });

    const newGrid = Array(8).fill(null).map(() => Array(8).fill(''));
    newGrid[1][1] = 'player';
    newGrid[6][6] = 'enemy';
    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || currentTurn !== 'player') return;

    if (selectedCell) {
      // Try to move or attack
      if (grid[row][col] === '') {
        // Move to empty cell
        const newGrid = [...grid];
        newGrid[selectedCell.row][selectedCell.col] = '';
        newGrid[row][col] = 'player';
        setGrid(newGrid);
        setPlayer(prev => ({ ...prev, row, col }));
        setSelectedCell(null);
        setCurrentTurn('enemy');
        setTimeout(() => enemyTurn(), 1000);
      } else if (grid[row][col] === 'enemy') {
        // Attack enemy
        attackEnemy();
      }
    } else {
      // Select player cell
      if (grid[row][col] === 'player') {
        setSelectedCell({ row, col });
      }
    }
  };

  const attackEnemy = () => {
    const damage = 1;
    const newEnemyHealth = Math.max(0, enemy.health - damage);
    setEnemy(prev => ({ ...prev, health: newEnemyHealth }));
    
    if (newEnemyHealth <= 0) {
      setGameOver(true);
      setWinner('player');
      const newScore = score + 100;
      setScore(newScore);
      onScoreUpdate(newScore);
    } else {
      setCurrentTurn('enemy');
      setTimeout(() => enemyTurn(), 1000);
    }
    setSelectedCell(null);
  };

  const enemyTurn = () => {
    if (gameOver) return;

    // Simple AI: move towards player or attack if adjacent
    const distance = Math.abs(player.row - enemy.row) + Math.abs(player.col - enemy.col);
    
    if (distance === 1) {
      // Attack player
      const damage = 1;
      const newPlayerHealth = Math.max(0, player.health - damage);
      setPlayer(prev => ({ ...prev, health: newPlayerHealth }));
      
      if (newPlayerHealth <= 0) {
        setGameOver(true);
        setWinner('enemy');
      }
    } else {
      // Move towards player
      const newGrid = [...grid];
      newGrid[enemy.row][enemy.col] = '';
      
      let newRow = enemy.row;
      let newCol = enemy.col;
      
      if (enemy.row < player.row) newRow++;
      else if (enemy.row > player.row) newRow--;
      else if (enemy.col < player.col) newCol++;
      else if (enemy.col > player.col) newCol--;
      
      newGrid[newRow][newCol] = 'enemy';
      setGrid(newGrid);
      setEnemy(prev => ({ ...prev, row: newRow, col: newCol }));
    }
    
    setCurrentTurn('player');
  };

  const getCellContent = (row: number, col: number) => {
    if (grid[row][col] === 'player') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl">{player.weapon}</div>
          <div className="text-xs font-bold text-blue-600">{player.health}</div>
        </div>
      );
    }
    if (grid[row][col] === 'enemy') {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl">{enemy.weapon}</div>
          <div className="text-xs font-bold text-red-600">{enemy.health}</div>
        </div>
      );
    }
    return '';
  };

  const isAdjacent = (row1: number, col1: number, row2: number, col2: number) => {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const canAttack = (row: number, col: number) => {
    if (!selectedCell) return false;
    return isAdjacent(selectedCell.row, selectedCell.col, row, col) && grid[row][col] === 'enemy';
  };

  const canMove = (row: number, col: number) => {
    if (!selectedCell) return false;
    return isAdjacent(selectedCell.row, selectedCell.col, row, col) && grid[row][col] === '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Grid Tactics</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!gameStarted ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">⚔️</div>
            <h3 className="text-2xl font-bold mb-4">Welcome to Grid Tactics</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Command your warrior in tactical combat! Move strategically and attack your enemy. 
              Reduce their health to zero to win the battle!
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-800 mb-4">How to Play:</h4>
              <ul className="text-sm text-blue-700 space-y-2 text-left">
                <li>• Click on your warrior to select them</li>
                <li>• Click adjacent empty cells to move</li>
                <li>• Click adjacent enemies to attack</li>
                <li>• Reduce enemy health to 0 to win!</li>
              </ul>
            </div>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Battle
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">{winner === 'player' ? '🏆' : '💀'}</div>
            <h3 className="text-2xl font-bold mb-4">
              {winner === 'player' ? 'Victory!' : 'Defeat!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {winner === 'player' 
                ? `You defeated the enemy! Final Score: ${score}` 
                : 'The enemy was too strong this time...'
              }
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={resetGame} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Play Again
              </button>
              <button onClick={onClose} className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Game Status */}
            <div className="flex justify-between items-center">
              <div className="flex gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{player.weapon}</span>
                    <span className="font-bold">{player.name}</span>
                  </div>
                  <div className="text-sm text-blue-700">Health: {player.health}/{player.maxHealth}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{enemy.weapon}</span>
                    <span className="font-bold">{enemy.name}</span>
                  </div>
                  <div className="text-sm text-red-700">Health: {enemy.health}/{enemy.maxHealth}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {currentTurn === 'player' ? 'Your Turn' : 'Enemy Turn'}
                </div>
                <div className="text-sm text-gray-600">Score: {score}</div>
              </div>
            </div>

            {/* Game Grid */}
            <div className="flex justify-center">
              <div className="grid grid-cols-8 gap-1 bg-gray-200 p-2 rounded-lg">
                {Array(8).fill(null).map((_, row) => 
                  Array(8).fill(null).map((_, col) => (
                    <button
                      key={`${row}-${col}`}
                      onClick={() => handleCellClick(row, col)}
                      className={`
                        w-12 h-12 border-2 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200
                        ${grid[row][col] === 'player' 
                          ? 'bg-blue-500 text-white border-blue-600' 
                          : grid[row][col] === 'enemy'
                          ? 'bg-red-500 text-white border-red-600'
                          : selectedCell && selectedCell.row === row && selectedCell.col === col
                          ? 'bg-yellow-300 border-yellow-500'
                          : canMove(row, col)
                          ? 'bg-green-100 border-green-300 hover:bg-green-200'
                          : canAttack(row, col)
                          ? 'bg-orange-100 border-orange-300 hover:bg-orange-200'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                        }
                        ${currentTurn !== 'player' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      disabled={currentTurn !== 'player'}
                    >
                      {getCellContent(row, col)}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center text-sm text-gray-600">
              {selectedCell ? (
                <p>Click an adjacent cell to move or attack!</p>
              ) : (
                <p>Click on your warrior to select them</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

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

  const categories = ['all', 'Strategy', 'All'];

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

    switch (selectedGame) {
      case 'grid-tactics':
        return <GridTacticsGame {...gameProps} />;
      default:
        return <PlaceholderGame {...gameProps} />;
    }
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