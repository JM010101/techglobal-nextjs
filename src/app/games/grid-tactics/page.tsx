'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Timer, 
  Play, 
  Trophy, 
  Users, 
  Target,
  X,
} from 'lucide-react';

interface Card {
  id: string;
  team: 'male' | 'female';
  health: number;
  maxHealth: number;
  attackRate: number;
  isOpen: boolean;
  isDead: boolean;
  row: number;
  col: number;
  imageIndex: number;
  name: string;
}

const GridTacticsGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<'male' | 'female'>('male');
  const [selectedCard, setSelectedCard] = useState<{row: number, col: number} | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'male' | 'female' | null>(null);
  const [score, setScore] = useState(0);

  const [cards, setCards] = useState<Card[]>([]);
  const [grid, setGrid] = useState<Array<Array<string>>>(() => {
    return Array(8).fill(null).map(() => Array(8).fill(''));
  });
  const [attackAnimation, setAttackAnimation] = useState<{
    attacker: {row: number, col: number} | null;
    target: {row: number, col: number} | null;
  }>({ attacker: null, target: null });

  // Name generation arrays
  const maleNames = [
    'Alex', 'Blade', 'Cyrus', 'Dante', 'Erik', 'Finn', 'Gareth', 'Hector',
    'Ivan', 'Jax', 'Kane', 'Liam', 'Marcus', 'Nero', 'Orion', 'Phoenix',
    'Quinn', 'Rex', 'Sage', 'Titan', 'Ulysses', 'Viktor', 'Wade', 'Xander',
    'Yuki', 'Zane', 'Ares', 'Blaze', 'Cade', 'Drake', 'Echo', 'Frost'
  ];

  const femaleNames = [
    'Aria', 'Blaze', 'Cora', 'Diana', 'Eve', 'Faye', 'Grace', 'Hope',
    'Iris', 'Jade', 'Kira', 'Luna', 'Maya', 'Nova', 'Opal', 'Pixie',
    'Quinn', 'Ruby', 'Sage', 'Tara', 'Uma', 'Vera', 'Willow', 'Xara',
    'Yara', 'Zara', 'Aura', 'Belle', 'Crystal', 'Dawn', 'Ember', 'Flame'
  ];

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
      const isMale = i < 32; // First 32 are male, last 32 are female
      const nameIndex = i % 32;
      const card: Card = {
        id: `${isMale ? 'male' : 'female'}-${i % 32}`,
        team: isMale ? 'male' : 'female',
        health: Math.floor(Math.random() * 5) + 3, // 3-7 health
        maxHealth: Math.floor(Math.random() * 5) + 3,
        attackRate: Math.floor(Math.random() * 3) + 1, // 1-3 attack
        isOpen: false,
        isDead: false,
        row,
        col,
        imageIndex: (i % 32) + 1, // 1-32 for male, 1-24 for female
        name: isMale ? maleNames[nameIndex] : femaleNames[nameIndex]
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
    setCurrentTurn('male');
    setGameOver(false);
    setWinner(null);
    setScore(0);
    setSelectedCard(null);
    initializeCards();
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTurn('male');
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

        // If it's an enemy card and open, check if it's adjacent before attacking
        if (targetCard.team !== selectedCardData.team && targetCard.isOpen) {
          if (isAdjacent(selectedCard.row, selectedCard.col, row, col)) {
            attackCard(selectedCardData, targetCard);
          } else {
            // If not adjacent, deselect
            setSelectedCard(null);
          }
        } else if (targetCard.team === currentTurn && targetCard.isOpen) {
          // If it's current team's open card, switch selection
          setSelectedCard({ row, col });
        } else if (!targetCard.isOpen) {
          // If it's a closed card, open all border cards and deselect current
          openBorderCards(targetCard);
          setSelectedCard(null);
          // Switch to the opposite team after opening border cards
          const newTurn = currentTurn === 'male' ? 'female' : 'male';
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
          const newTurn = currentTurn === 'male' ? 'female' : 'male';
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
    const newTurn = currentTurn === 'male' ? 'female' : 'male';
    setCurrentTurn(newTurn);
  };

  const attackCard = (attacker: Card, defender: Card) => {
    if (!attacker.isOpen || !defender.isOpen) return;

    // Start attack animation
    setAttackAnimation({
      attacker: { row: attacker.row, col: attacker.col },
      target: { row: defender.row, col: defender.col }
    });

    const newHealth = Math.max(0, defender.health - attacker.attackRate);
    
    setCards(prev => prev.map(c => 
      c.id === defender.id ? { ...c, health: newHealth, isDead: newHealth === 0 } : c
    ));

    // Create a more controlled animation sequence
    let animationStep = 0;
    const animationInterval = setInterval(() => {
      animationStep++;
      
      if (animationStep >= 6) { // 6 steps = 300ms total
        clearInterval(animationInterval);
        setAttackAnimation({ attacker: null, target: null });
      }
    }, 50); // 50ms per step

    if (newHealth === 0) {
      // Remove dead card from grid after animation
      setTimeout(() => {
        const newGrid = [...grid];
        newGrid[defender.row][defender.col] = '';
        setGrid(newGrid);
        
        // Check for game over
        checkGameOver();
      }, 350);
    }

    setSelectedCard(null);
    const newTurn = currentTurn === 'male' ? 'female' : 'male';
    setCurrentTurn(newTurn);
  };

  const checkGameOver = () => {
    const maleAlive = cards.filter(c => c.team === 'male' && !c.isDead).length;
    const femaleAlive = cards.filter(c => c.team === 'female' && !c.isDead).length;

    if (maleAlive === 0) {
      setGameOver(true);
      setWinner('female');
      setScore(score + 200);
    } else if (femaleAlive === 0) {
      setGameOver(true);
      setWinner('male');
      setScore(score + 200);
    }
  };

  const getCellContent = (row: number, col: number) => {
    const cardId = grid[row][col];
    if (!cardId) return '';

    const card = cards.find(c => c.id === cardId);
    if (!card) return '';

    if (card.isDead) return '';

    if (!card.isOpen) {
      // Closed card - show shield image with matching background
      return (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
          <img 
            src="/images/game/grid_tactical/shield.jpg" 
            alt="Shield" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      );
    } else {
      // Open card - show character image with stats
      const getHealthColor = (health: number) => {
        if (health >= 6) return 'text-green-400';
        if (health >= 4) return 'text-yellow-400';
        return 'text-red-400';
      };

      const getAttackColor = (attack: number) => {
        if (attack >= 3) return 'text-red-400';
        if (attack >= 2) return 'text-orange-400';
        return 'text-blue-400';
      };

      const getTeamColor = (team: string) => {
        return team === 'male' ? 'bg-blue-600' : 'bg-pink-600';
      };

      return (
        <div className={`w-full h-full flex flex-col items-center justify-center ${getTeamColor(card.team)} rounded-lg relative overflow-hidden`}>
          <img 
            src={`/images/game/grid_tactical/${card.team}/${String(card.imageIndex).padStart(5, '0')}.jpg`}
            alt={`${card.team} character`}
            className="w-full h-full object-cover opacity-90"
          />
          {/* Team Logo in top left corner */}
          <div className="absolute top-1 left-1 bg-black bg-opacity-80 rounded-full p-1">
            <span className="text-lg">
              {card.team === 'male' ? '⚔️' : '❤️'}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1 rounded-b-lg">
            <div className="flex flex-col items-center gap-1">
              {/* Health Bar */}
              <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    card.health >= 6 ? 'bg-green-500' : 
                    card.health >= 4 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${(card.health / 7) * 100}%` }}
                ></div>
              </div>
              {/* Attack Number */}
              <div className="flex justify-center items-center gap-1 text-xs">
                <span className="text-yellow-400">⚡</span>
                <span className={`font-bold ${getAttackColor(card.attackRate)}`}>
                  {card.attackRate}
                </span>
              </div>
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
    <div 
      className="fixed inset-0 flex flex-col"
      style={{
        backgroundImage: 'url(/images/game/grid_tactical/dashboard.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl flex-shrink-0 border-b border-gray-700">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-wider">
          GRID TACTICS
        </h1>
        <button 
          onClick={() => window.close()} 
          className="p-3 hover:bg-red-600 rounded-full text-white transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col p-2 overflow-auto">

        {!gameStarted ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-8 animate-pulse">⚔️</div>
            <h3 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 tracking-wider">
              WELCOME TO GRID TACTICS
            </h3>
            <p className="text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Epic tactical combat awaits! Command your warriors in strategic battles. 
              <span className="text-yellow-400 font-bold"> Male vs Female</span> teams clash in this intense grid-based warfare!
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-12 border border-gray-600 shadow-2xl">
              <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 tracking-wide">
                HOW TO PLAY
              </h4>
              <ul className="text-lg text-gray-200 space-y-3 text-left font-medium">
                <li className="flex items-center"><span className="text-yellow-400 mr-3">⚡</span> Click closed cards to reveal ALL adjacent cards</li>
                <li className="flex items-center"><span className="text-blue-400 mr-3">🎯</span> Click open cards to select them for movement/attack</li>
                <li className="flex items-center"><span className="text-green-400 mr-3">🚀</span> Move to adjacent empty cells or attack enemy cards</li>
                <li className="flex items-center"><span className="text-red-400 mr-3">💀</span> Eliminate all opponent cards to win!</li>
                <li className="flex items-center"><span className="text-purple-400 mr-3">👑</span> Male team starts first, then alternate turns</li>
              </ul>
            </div>
            <button onClick={startGame} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-black text-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-2xl">
              START BATTLE
            </button>
          </div>
        ) : gameOver ? (
          <div 
            className="text-center py-16 relative min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: 'url(/images/game/grid_tactical/win_result.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Victory Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Victory Icon with Animation */}
              <div className="text-9xl mb-8 animate-bounce">
                {winner === 'male' ? '👑' : '💎'}
              </div>
              
              {/* Victory Title */}
              <h2 className="text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 tracking-wider animate-pulse">
                {winner === 'male' ? 'MALE DOMINANCE!' : 'FEMALE SUPREMACY!'}
              </h2>
              
              {/* Victory Subtitle */}
              <h3 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
                {winner === 'male' ? '⚔️ WARRIORS TRIUMPH ⚔️' : '❤️ CHAMPIONS VICTORY ❤️'}
              </h3>
              
              {/* Victory Message */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 mb-12 border border-gray-600 shadow-2xl max-w-4xl mx-auto">
                <p className="text-2xl text-gray-200 mb-6 font-medium leading-relaxed">
                  {winner === 'male' 
                    ? `🏆 The Male warriors have achieved total domination! 🏆\nTheir strategic prowess and combat skills led to complete victory!\n\nFinal Battle Score: ${score} points`
                    : `💎 The Female champions have secured absolute supremacy! 💎\nTheir tactical brilliance and warrior spirit conquered all enemies!\n\nFinal Battle Score: ${score} points`
                  }
                </p>
                
                {/* Team Statistics */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 border border-blue-600">
                    <div className="text-3xl font-black text-blue-200 mb-2">MALE WARRIORS</div>
                    <div className="text-lg text-blue-300">
                      Survivors: {cards.filter(c => c.team === 'male' && !c.isDead).length}/32
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-900 to-pink-800 rounded-2xl p-6 border border-pink-600">
                    <div className="text-3xl font-black text-pink-200 mb-2">FEMALE CHAMPIONS</div>
                    <div className="text-lg text-pink-300">
                      Survivors: {cards.filter(c => c.team === 'female' && !c.isDead).length}/32
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-8 justify-center">
                <button 
                  onClick={resetGame} 
                  className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:from-green-700 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-green-400"
                >
                  🎮 PLAY AGAIN
                </button>
                <button 
                  onClick={() => window.close()} 
                  className="bg-gradient-to-r from-red-600 via-pink-500 to-rose-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:from-red-700 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-red-400"
                >
                  🚪 EXIT GAME
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-1">
            {/* Game Status */}
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 shadow-2xl flex-shrink-0 border border-gray-600">
              <div className="flex gap-4">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-3 border border-blue-600 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚔️</span>
                    <span className="font-black text-sm text-blue-200 tracking-wide">MALE: {cards.filter(c => c.team === 'male' && !c.isDead).length}/32</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-pink-900 to-pink-800 rounded-xl p-3 border border-pink-600 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">❤️</span>
                    <span className="font-black text-sm text-pink-200 tracking-wide">FEMALE: {cards.filter(c => c.team === 'female' && !c.isDead).length}/32</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 tracking-wide">
                  {currentTurn === 'male' ? 'MALE TURN' : 'FEMALE TURN'} | SCORE: {score}
                </div>
              </div>
            </div>

            {/* Selected Card Info - Fixed Position */}
            {getSelectedCard() && (
              <div className="fixed top-20 left-4 z-50 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-600 shadow-2xl">
                <h4 className="text-xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wide">SELECTED WARRIOR</h4>
                <div className="flex items-center gap-6">
                  <span className="text-4xl">{getSelectedCard()?.team === 'male' ? '⚔️' : '❤️'}</span>
                  <div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 tracking-wide mb-2">
                      {getSelectedCard()?.name}
                    </div>
                    <div className="text-xl font-black text-white tracking-wide mb-2">{getSelectedCard()?.team.toUpperCase()} TEAM</div>
                    <div className="text-lg text-gray-200 font-medium">
                      Health: <span className="text-red-400 font-black">{getSelectedCard()?.health}</span> | Attack: <span className="text-yellow-400 font-black">{getSelectedCard()?.attackRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Game Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="grid grid-cols-8 gap-1 bg-black bg-opacity-30 p-1 rounded-lg shadow-lg border border-gray-400"
                style={{
                  width: '1600px',
                  height: '600px'
                }}
              >
                {Array(8).fill(null).map((_, row) => 
                  Array(8).fill(null).map((_, col) => (
                    <button
                      key={`${row}-${col}`}
                      onClick={() => handleCellClick(row, col)}
                      className={`
                        w-full h-full border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200
                        ${grid[row][col] && cards.find(c => c.id === grid[row][col])?.isOpen && cards.find(c => c.id === grid[row][col])?.team === 'male'
                          ? 'bg-blue-500 text-white border-blue-600' 
                          : grid[row][col] && cards.find(c => c.id === grid[row][col])?.isOpen && cards.find(c => c.id === grid[row][col])?.team === 'female'
                          ? 'bg-pink-500 text-white border-pink-600'
                          : selectedCard && selectedCard.row === row && selectedCard.col === col
                          ? 'bg-green-200 border-green-600 border-4 shadow-lg shadow-green-500/50'
                          : canMove(row, col)
                          ? 'bg-green-100 border-green-300 hover:bg-green-200'
                          : canAttack(row, col)
                          ? 'bg-orange-100 border-orange-300 hover:bg-orange-200'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                        }
                        cursor-pointer
                      `}
                      style={{
                        transform: attackAnimation.attacker && attackAnimation.attacker.row === row && attackAnimation.attacker.col === col
                          ? 'translateX(3px) translateY(-1px) scale(1.05)'
                          : attackAnimation.target && attackAnimation.target.row === row && attackAnimation.target.col === col
                          ? 'translateX(-2px) translateY(1px) scale(0.98)'
                          : 'translateX(0) translateY(0) scale(1)',
                        transition: 'transform 0.1s ease-in-out',
                        position: 'relative',
                        zIndex: attackAnimation.attacker && attackAnimation.attacker.row === row && attackAnimation.attacker.col === col
                          ? 10
                          : attackAnimation.target && attackAnimation.target.row === row && attackAnimation.target.col === col
                          ? 5
                          : 1
                      }}
                    >
                      {getCellContent(row, col)}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center text-lg text-gray-200 pb-4 flex-shrink-0">
              {selectedCard ? (
                <div>
                  <p className="mb-2 font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">CLICK ADJACENT CELL TO MOVE OR ATTACK!</p>
                  <p className="text-sm text-gray-400 font-medium">
                    Click selected card again to deselect • Click empty space to cancel • Click different card to switch
                  </p>
                </div>
              ) : (
                <p className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  CLICK ON ANY CARD TO OPEN IT, OR CLICK YOUR {currentTurn.toUpperCase()} CARDS TO SELECT THEM
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridTacticsGame;
