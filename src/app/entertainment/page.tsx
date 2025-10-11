'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Gamepad2, 
  Timer, 
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
    image: '/images/game/grid_tactical/dashboard.png',
    difficulty: 'Medium',
    category: 'Strategy'
  },
  {
    id: 'game-2',
    title: 'Coming Soon',
    description: 'A new exciting game will be available here soon. Stay tuned for updates!',
    icon: Gamepad2,
    image: 'https://picsum.photos/800/600?random=3',
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
  const [currentTurn, setCurrentTurn] = useState<'blue' | 'red'>('blue');
  const [selectedCard, setSelectedCard] = useState<{row: number, col: number} | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'blue' | 'red' | null>(null);
  const [score, setScore] = useState(0);

  interface Card {
    id: string;
    team: 'blue' | 'red';
    health: number;
    maxHealth: number;
    attackRate: number;
    isOpen: boolean;
    isDead: boolean;
    row: number;
    col: number;
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [grid, setGrid] = useState<Array<Array<string>>>(() => {
    return Array(8).fill(null).map(() => Array(8).fill(''));
  });

  // Shuffle function to randomize array
  const shuffleArray = (array: Card[]): Card[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Find all adjacent closed cards around a position
  const getAdjacentCards = (row: number, col: number) => {
    const adjacentCards = [];
    
    // Check all 8 directions around the clicked card
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue; // Skip center card
        
        const newRow = row + dr;
        const newCol = col + dc;
        
        // Check if position is within grid bounds
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const cardId = grid[newRow][newCol];
          if (cardId) {
            const card = cards.find(c => c.id === cardId);
            if (card && !card.isOpen && !card.isDead) {
              adjacentCards.push(card);
            }
          }
        }
      }
    }
    
    return adjacentCards;
  };

  // Open all border cards around a center card (including the center card itself)
  const openBorderCards = (centerCard: Card) => {
    const adjacentCards = getAdjacentCards(centerCard.row, centerCard.col);
    
    // Add the center card to the list of cards to open
    const cardsToOpen = [...adjacentCards, centerCard];
    
    // Open all cards (adjacent + center)
    setCards(prev => prev.map(card => 
      cardsToOpen.some(cardToOpen => cardToOpen.id === card.id) 
        ? { ...card, isOpen: true } 
        : card
    ));
  };

  const initializeCards = () => {
    const newCards: Card[] = [];
    const newGrid = Array(8).fill(null).map(() => Array(8).fill(''));
    
    // Create all 64 cards first
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      const isBlue = i < 32; // First 32 are blue, last 32 are red
      const card: Card = {
        id: `${isBlue ? 'blue' : 'red'}-${i % 32}`,
        team: isBlue ? 'blue' : 'red',
        health: Math.floor(Math.random() * 5) + 3, // 3-7 health
        maxHealth: Math.floor(Math.random() * 5) + 3,
        attackRate: Math.floor(Math.random() * 3) + 1, // 1-3 attack
        isOpen: false,
        isDead: false,
        row,
        col
      };
      newCards.push(card);
    }
    
    // Shuffle all cards to randomize positions
    const shuffledCards = shuffleArray(newCards);
    
    // Update card positions and grid
    shuffledCards.forEach((card, index) => {
      const row = Math.floor(index / 8);
      const col = index % 8;
      card.row = row;
      card.col = col;
      newGrid[row][col] = card.id;
    });
    
    setCards(shuffledCards);
    setGrid(newGrid);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentTurn('blue');
    setGameOver(false);
    setWinner(null);
    setScore(0);
    setSelectedCard(null);
    initializeCards();
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTurn('blue');
    setSelectedCard(null);
    setGameOver(false);
    setWinner(null);
    setScore(0);
    setCards([]);
    setGrid(Array(8).fill(null).map(() => Array(8).fill('')));
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return; // Allow both teams to click

    const cardId = grid[row][col];
    
    if (selectedCard) {
      // If clicking the same selected card, deselect it
      if (selectedCard.row === row && selectedCard.col === col) {
        setSelectedCard(null);
        return;
      }

      // Get the selected card data
      const selectedCardData = cards.find(c => c.id === grid[selectedCard.row][selectedCard.col]);
      if (!selectedCardData) return;

      // If clicking empty space, check if it's adjacent for movement
      if (grid[row][col] === '') {
        if (isAdjacent(selectedCard.row, selectedCard.col, row, col)) {
          // Move to adjacent empty cell
          moveCard(selectedCardData, row, col);
        } else {
          // If not adjacent, deselect
          setSelectedCard(null);
        }
        return;
      }

      // If clicking a different card, handle it
      if (cardId) {
        const targetCard = cards.find(c => c.id === cardId);
        if (!targetCard) return;

        // If it's an enemy card and open, attack it
        if (targetCard.team !== selectedCardData.team && targetCard.isOpen) {
          attackCard(selectedCardData, targetCard);
        } else if (targetCard.team === currentTurn && targetCard.isOpen) {
          // If it's current team's open card, switch selection
          setSelectedCard({ row, col });
        } else if (!targetCard.isOpen) {
          // If it's a closed card, open all border cards and deselect current
          openBorderCards(targetCard);
          setSelectedCard(null);
          // Switch to the opposite team after opening border cards
          const newTurn = currentTurn === 'blue' ? 'red' : 'blue';
          setCurrentTurn(newTurn);
        }
      }
    } else {
      // Handle card interaction (only if there's a card in this cell)
      if (cardId) {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;

        if (!card.isOpen) {
          // Open all border cards around the clicked card
          openBorderCards(card);
          // Switch to the opposite team after opening border cards
          const newTurn = currentTurn === 'blue' ? 'red' : 'blue';
          setCurrentTurn(newTurn);
        } else {
          // Select open card for movement/attack (only current team's cards)
          if (card.team === currentTurn) {
            setSelectedCard({ row, col });
          }
        }
      }
    }
  };

  const openCard = (card: Card) => {
    setCards(prev => prev.map(c => 
      c.id === card.id ? { ...c, isOpen: true } : c
    ));
    // Switch to the opposite team after opening a card
    const newTurn = currentTurn === 'blue' ? 'red' : 'blue';
    setCurrentTurn(newTurn);
  };

  const moveCard = (card: Card, newRow: number, newCol: number) => {
    if (!card.isOpen) return;

    const newGrid = [...grid];
    newGrid[card.row][card.col] = '';
    newGrid[newRow][newCol] = card.id;

    setCards(prev => prev.map(c => 
      c.id === card.id ? { ...c, row: newRow, col: newCol } : c
    ));
    setGrid(newGrid);
    setSelectedCard(null);
    const newTurn = currentTurn === 'blue' ? 'red' : 'blue';
    setCurrentTurn(newTurn);
  };

  const attackCard = (attacker: Card, defender: Card) => {
    if (!attacker.isOpen || !defender.isOpen) return;

    const newHealth = Math.max(0, defender.health - attacker.attackRate);
    
    setCards(prev => prev.map(c => 
      c.id === defender.id ? { ...c, health: newHealth, isDead: newHealth === 0 } : c
    ));

    if (newHealth === 0) {
      // Remove dead card from grid
      const newGrid = [...grid];
      newGrid[defender.row][defender.col] = '';
      setGrid(newGrid);
      
      // Check for game over
      checkGameOver();
    }

    setSelectedCard(null);
    const newTurn = currentTurn === 'blue' ? 'red' : 'blue';
    setCurrentTurn(newTurn);
  };

  const checkGameOver = () => {
    const blueAlive = cards.filter(c => c.team === 'blue' && !c.isDead).length;
    const redAlive = cards.filter(c => c.team === 'red' && !c.isDead).length;

    if (blueAlive === 0) {
      setGameOver(true);
      setWinner('red');
      setScore(score + 200);
      onScoreUpdate(score + 200);
    } else if (redAlive === 0) {
      setGameOver(true);
      setWinner('blue');
      setScore(score + 200);
      onScoreUpdate(score + 200);
    }
  };


  const getCellContent = (row: number, col: number) => {
    const cardId = grid[row][col];
    if (!cardId) return '';

    const card = cards.find(c => c.id === cardId);
    if (!card) return '';

    if (card.isDead) return '';

    if (!card.isOpen) {
      // Closed card - show mystery icon (same for all teams)
              return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl">❓</div>
          <div className="text-xs opacity-60">?</div>
    </div>
  );
    } else {
      // Open card - show different warrior types based on stats
      const getWarriorIcon = (card: Card) => {
        if (card.attackRate >= 3) {
          return card.team === 'blue' ? '⚔️' : '🗡️'; // High attack - swords
        } else if (card.health >= 6) {
          return card.team === 'blue' ? '🛡️' : '🛡️'; // High health - shields
        } else if (card.attackRate === 1) {
          return card.team === 'blue' ? '🏹' : '🏹'; // Low attack - archers
        } else {
          return card.team === 'blue' ? '⚔️' : '🗡️'; // Default - swords
        }
      };

      const getHealthColor = (health: number) => {
        if (health >= 6) return 'text-green-600';
        if (health >= 4) return 'text-yellow-600';
        return 'text-red-600';
      };

      const getAttackColor = (attack: number) => {
        if (attack >= 3) return 'text-red-600';
        if (attack >= 2) return 'text-orange-600';
        return 'text-blue-600';
  };

  return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl">{getWarriorIcon(card)}</div>
          <div className="flex flex-col items-center text-xs">
            <div className={`font-bold ${getHealthColor(card.health)}`}>
              ❤️{card.health}
        </div>
            <div className={`font-bold ${getAttackColor(card.attackRate)}`}>
              ⚡{card.attackRate}
            </div>
              </div>
    </div>
  );
    }
  };

  const isAdjacent = (row1: number, col1: number, row2: number, col2: number) => {
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const canAttack = (row: number, col: number) => {
    if (!selectedCard) return false;
    const selectedCardData = cards.find(c => c.id === grid[selectedCard.row][selectedCard.col]);
    if (!selectedCardData) return false;
    
    const targetCard = cards.find(c => c.id === grid[row][col]);
    if (!targetCard) return false;
    
    return isAdjacent(selectedCard.row, selectedCard.col, row, col) && 
           targetCard.team !== selectedCardData.team;
  };

  const canMove = (row: number, col: number) => {
    if (!selectedCard) return false;
    return isAdjacent(selectedCard.row, selectedCard.col, row, col) && grid[row][col] === '';
  };

  const getSelectedCard = () => {
    if (!selectedCard) return null;
    return cards.find(c => c.id === grid[selectedCard.row][selectedCard.col]);
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
              Two-player tactical combat! Blue team vs Red team. Click closed cards to reveal all adjacent cards, 
              move your warriors, and attack the enemy. Eliminate all opponent cards to win!
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-800 mb-4">How to Play:</h4>
              <ul className="text-sm text-blue-700 space-y-2 text-left">
                <li>• Click closed cards to reveal ALL adjacent cards</li>
                <li>• Click open cards to select them for movement/attack</li>
                <li>• Move to adjacent empty cells or attack enemy cards</li>
                <li>• Eliminate all opponent cards to win!</li>
                <li>• Blue team starts first, then alternate turns</li>
              </ul>
            </div>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Battle
            </button>
        </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">{winner === 'blue' ? '🏆' : '💀'}</div>
            <h3 className="text-2xl font-bold mb-4">
              {winner === 'blue' ? 'Blue Team Victory!' : 'Red Team Victory!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {winner === 'blue' 
                ? `Blue team eliminated all red cards! Final Score: ${score}` 
                : 'Red team eliminated all blue cards!'
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
                    <span className="text-2xl">🔵</span>
                    <span className="font-bold">Blue Team</span>
                </div>
                  <div className="text-sm text-blue-700">
                    Alive: {cards.filter(c => c.team === 'blue' && !c.isDead).length}/32
            </div>
        </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔴</span>
                    <span className="font-bold">Red Team</span>
        </div>
                  <div className="text-sm text-red-700">
                    Alive: {cards.filter(c => c.team === 'red' && !c.isDead).length}/32
    </div>
        </div>
        </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {currentTurn === 'blue' ? 'Blue Team Turn' : 'Red Team Turn'}
                  </div>
                <div className="text-sm text-gray-600">Score: {score}</div>
                  </div>
                </div>
                
            {/* Selected Card Info */}
            {getSelectedCard() && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Selected Card:</h4>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getSelectedCard()?.team === 'blue' ? '⚔️' : '🗡️'}</span>
                <div>
                    <div className="font-medium">{getSelectedCard()?.team} Team</div>
                    <div className="text-sm text-gray-600">
                      Health: {getSelectedCard()?.health} | Attack: {getSelectedCard()?.attackRate}
                  </div>
                  </div>
                </div>
                  </div>
            )}

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
                        ${grid[row][col] && cards.find(c => c.id === grid[row][col])?.isOpen && cards.find(c => c.id === grid[row][col])?.team === 'blue'
                          ? 'bg-blue-500 text-white border-blue-600' 
                          : grid[row][col] && cards.find(c => c.id === grid[row][col])?.isOpen && cards.find(c => c.id === grid[row][col])?.team === 'red'
                          ? 'bg-red-500 text-white border-red-600'
                          : selectedCard && selectedCard.row === row && selectedCard.col === col
                          ? 'bg-yellow-300 border-yellow-500'
                          : canMove(row, col)
                          ? 'bg-green-100 border-green-300 hover:bg-green-200'
                          : canAttack(row, col)
                          ? 'bg-orange-100 border-orange-300 hover:bg-orange-200'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                        }
                        cursor-pointer
                      `}
                    >
                      {getCellContent(row, col)}
                </button>
                  ))
                )}
            </div>
          </div>

            {/* Instructions */}
            <div className="text-center text-sm text-gray-600">
              {selectedCard ? (
                <div>
                  <p>Click an adjacent cell to move or attack!</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click selected card again to deselect • Click empty space to cancel • Click different card to switch
                  </p>
        </div>
              ) : (
                <p>Click on any card to open it, or click your {currentTurn} cards to select them</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Placeholder Game Component
const PlaceholderGame = ({ onClose }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
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
            We&apos;re working hard to bring you an amazing gaming experience. 
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
    // Open game in new tab in same browser
    const gameUrl = `/games/${gameId}`;
    window.open(gameUrl, '_blank');
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
