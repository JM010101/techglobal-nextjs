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
        imageIndex: (i % 32) + 1 // 1-32 for male, 1-24 for female
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
            <div className="flex justify-center items-center gap-2 text-xs">
              <div className={`font-bold ${getHealthColor(card.health)}`}>
                ❤️{card.health}
              </div>
              <div className={`font-bold ${getAttackColor(card.attackRate)}`}>
                ⚡{card.attackRate}
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
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-800 shadow-lg flex-shrink-0">
        <h1 className="text-xl font-bold text-white">Grid Tactics</h1>
        <button 
          onClick={() => window.close()} 
          className="p-2 hover:bg-gray-700 rounded-full text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col p-2 overflow-auto">

        {!gameStarted ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">⚔️</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Welcome to Grid Tactics</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Two-player tactical combat! Male team vs Female team. Click closed cards to reveal all adjacent cards, 
              move your warriors, and attack the enemy. Eliminate all opponent cards to win!
            </p>
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-4">How to Play:</h4>
              <ul className="text-sm text-gray-300 space-y-2 text-left">
                <li>• Click closed cards to reveal ALL adjacent cards</li>
                <li>• Click open cards to select them for movement/attack</li>
                <li>• Move to adjacent empty cells or attack enemy cards</li>
                <li>• Eliminate all opponent cards to win!</li>
                <li>• Male team starts first, then alternate turns</li>
              </ul>
            </div>
            <button onClick={startGame} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Battle
            </button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">{winner === 'male' ? '🏆' : '💀'}</div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              {winner === 'male' ? 'Male Team Victory!' : 'Female Team Victory!'}
            </h3>
            <p className="text-gray-300 mb-6">
              {winner === 'male' 
                ? `Male team eliminated all female cards! Final Score: ${score}` 
                : 'Female team eliminated all male cards!'
              }
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={resetGame} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Play Again
              </button>
              <button onClick={() => window.close()} className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-1">
            {/* Game Status */}
            <div className="flex justify-between items-center bg-gray-800 rounded-lg p-1 shadow-sm flex-shrink-0 border border-gray-700">
              <div className="flex gap-2">
                <div className="bg-blue-900 rounded-lg p-1 border border-blue-700">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">👨</span>
                    <span className="font-bold text-xs text-blue-200">Male: {cards.filter(c => c.team === 'male' && !c.isDead).length}/32</span>
                  </div>
                </div>
                <div className="bg-pink-900 rounded-lg p-1 border border-pink-700">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">👩</span>
                    <span className="font-bold text-xs text-pink-200">Female: {cards.filter(c => c.team === 'female' && !c.isDead).length}/32</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white">
                  {currentTurn === 'male' ? 'Male Turn' : 'Female Turn'} | Score: {score}
                </div>
              </div>
            </div>

            {/* Selected Card Info */}
            {getSelectedCard() && (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold mb-2 text-white">Selected Card:</h4>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getSelectedCard()?.team === 'male' ? '👨' : '👩'}</span>
                  <div>
                    <div className="font-medium">{getSelectedCard()?.team} Team</div>
                    <div className="text-sm text-gray-300">
                      Health: {getSelectedCard()?.health} | Attack: {getSelectedCard()?.attackRate}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Game Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                className="grid grid-cols-8 gap-1 bg-gray-700 p-1 rounded-lg shadow-lg border border-gray-600"
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
            <div className="text-center text-xs text-gray-300 pb-1 flex-shrink-0">
              {selectedCard ? (
                <div>
                  <p className="mb-1">Click an adjacent cell to move or attack!</p>
                  <p className="text-xs text-gray-400">
                    Click selected card again to deselect • Click empty space to cancel • Click different card to switch
                  </p>
                </div>
              ) : (
                <p>Click on any card to open it, or click your {currentTurn} cards to select them</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridTacticsGame;
