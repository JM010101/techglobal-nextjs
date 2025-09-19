'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Star, 
  Timer, 
  Brain, 
  Play, 
  Trophy, 
  Users, 
  Target,
  Sparkles,
  X,
  RotateCcw
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
    id: 'fashion-tetris',
    title: 'Fashion Tetris',
    description: 'Arrange beautiful clothing pieces in this stylish twist on the classic puzzle game. Create perfect outfits and clear lines!',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format&q=80',
    difficulty: 'Medium',
    category: 'Fashion'
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

// Minecraft Creative Game Component
const MinecraftGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [blocks, setBlocks] = useState<Array<{x: number, y: number, type: string}>>([]);
  const [selectedBlock, setSelectedBlock] = useState('grass');
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const blockTypes = [
    { id: 'grass', color: '#4CAF50', name: 'Grass' },
    { id: 'stone', color: '#757575', name: 'Stone' },
    { id: 'wood', color: '#8D6E63', name: 'Wood' },
    { id: 'sand', color: '#FFC107', name: 'Sand' },
    { id: 'water', color: '#2196F3', name: 'Water' }
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 20);
    const y = Math.floor((e.clientY - rect.top) / 20);

    if (x >= 0 && x < 20 && y >= 0 && y < 15) {
      setBlocks(prev => {
        const newBlocks = prev.filter(block => !(block.x === x && block.y === y));
        newBlocks.push({ x, y, type: selectedBlock });
        setScore(prev => prev + 10);
        onScoreUpdate(score + 10);
        return newBlocks;
      });
    }
  };

  const clearCanvas = () => {
    setBlocks([]);
    setScore(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, 400, 300);

    // Draw grid
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 20; x++) {
      ctx.beginPath();
      ctx.moveTo(x * 20, 0);
      ctx.lineTo(x * 20, 300);
      ctx.stroke();
    }
    for (let y = 0; y <= 15; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * 20);
      ctx.lineTo(400, y * 20);
      ctx.stroke();
    }

    // Draw blocks
    blocks.forEach(block => {
      const blockType = blockTypes.find(bt => bt.id === block.type);
      if (blockType) {
        ctx.fillStyle = blockType.color;
        ctx.fillRect(block.x * 20, block.y * 20, 20, 20);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(block.x * 20, block.y * 20, 20, 20);
      }
    });
  }, [blocks]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Minecraft Creative</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Score: {score}</h3>
              <button onClick={clearCanvas} className="btn btn-secondary">
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear World
              </button>
            </div>
            
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="border-2 border-gray-300 rounded cursor-crosshair"
              onClick={handleCanvasClick}
            />
            
            <p className="text-sm text-gray-600 mt-2">
              Click on the grid to place blocks. Build your world!
            </p>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Blocks</h3>
            <div className="space-y-2">
              {blockTypes.map(block => (
                <button
                  key={block.id}
                  onClick={() => setSelectedBlock(block.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    selectedBlock === block.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: block.color }}
                    />
                    <span className="font-medium">{block.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Fashion Tetris Game Component
const FashionTetrisGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
  const [piecePosition, setPiecePosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [linesCleared, setLinesCleared] = useState(0);

  // Fashion pieces (clothing items)
  const fashionPieces = [
    { shape: [[1, 1, 1, 1]], name: 'Dress', color: '#E91E63' }, // I-piece (dress)
    { shape: [[1, 1], [1, 1]], name: 'Shirt', color: '#2196F3' }, // O-piece (shirt)
    { shape: [[1, 1, 1], [0, 1, 0]], name: 'Hat', color: '#9C27B0' }, // T-piece (hat)
    { shape: [[1, 1, 1], [1, 0, 0]], name: 'Shoe', color: '#FF5722' }, // L-piece (shoe)
    { shape: [[1, 1, 1], [0, 0, 1]], name: 'Bag', color: '#4CAF50' }, // J-piece (bag)
    { shape: [[0, 1, 1], [1, 1, 0]], name: 'Belt', color: '#FFC107' }, // S-piece (belt)
    { shape: [[1, 1, 0], [0, 1, 1]], name: 'Scarf', color: '#FF9800' }  // Z-piece (scarf)
  ];

  const initializeBoard = () => {
    const newBoard = Array(20).fill(null).map(() => Array(10).fill(0));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setLinesCleared(0);
  };

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const spawnPiece = () => {
    const randomPiece = fashionPieces[Math.floor(Math.random() * fashionPieces.length)];
    setCurrentPiece(randomPiece.shape);
    setPiecePosition({ x: 4, y: 0 });
  };

  const startGame = () => {
    setGameStarted(true);
    spawnPiece();
  };

  const movePiece = (dx: number, dy: number) => {
    if (!gameStarted || gameOver) return;
    
    setPiecePosition(prev => {
      const newPos = { x: prev.x + dx, y: prev.y + dy };
      if (isValidPosition(newPos, currentPiece)) {
        return newPos;
      }
      return prev;
    });
  };

  const isValidPosition = (pos: { x: number; y: number }, piece: number[][]) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          if (newX < 0 || newX >= 10 || newY >= 20 || (newY >= 0 && board[newY][newX])) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = () => {
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x]) {
          const boardY = piecePosition.y + y;
          const boardX = piecePosition.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }
    
    setBoard(newBoard);
    clearLines(newBoard);
    spawnPiece();
  };

  const clearLines = (board: number[][]) => {
    const newBoard = board.filter(row => !row.every(cell => cell === 1));
    const linesClearedCount = board.length - newBoard.length;
    
    if (linesClearedCount > 0) {
      setLinesCleared(prev => prev + linesClearedCount);
      setScore(prev => {
        const newScore = prev + linesClearedCount * 100;
        onScoreUpdate(newScore);
        return newScore;
      });
      const emptyRows = Array(linesClearedCount).fill(null).map(() => Array(10).fill(0));
      setBoard([...emptyRows, ...newBoard]);
    }
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameLoop = setInterval(() => {
      if (isValidPosition({ x: piecePosition.x, y: piecePosition.y + 1 }, currentPiece)) {
        setPiecePosition(prev => ({ ...prev, y: prev.y + 1 }));
      } else {
        placePiece();
      }
    }, 500);
    
    return () => clearInterval(gameLoop);
  }, [piecePosition, currentPiece, gameStarted, gameOver, isValidPosition, placePiece]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowLeft': movePiece(-1, 0); break;
        case 'ArrowRight': movePiece(1, 0); break;
        case 'ArrowDown': movePiece(0, 1); break;
        case ' ': e.preventDefault(); placePiece(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, movePiece, placePiece]);

  const getPieceColor = (piece: number[][]) => {
    const pieceIndex = fashionPieces.findIndex(fp => 
      JSON.stringify(fp.shape) === JSON.stringify(piece)
    );
    return pieceIndex >= 0 ? fashionPieces[pieceIndex].color : '#9E9E9E';
  };

  const getPieceName = (piece: number[][]) => {
    const pieceIndex = fashionPieces.findIndex(fp => 
      JSON.stringify(fp.shape) === JSON.stringify(piece)
    );
    return pieceIndex >= 0 ? fashionPieces[pieceIndex].name : 'Item';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Fashion Tetris</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          <div className="text-lg">Lines: {linesCleared}</div>
          {!gameStarted && (
            <button onClick={startGame} className="btn btn-primary">
              Start Game
            </button>
          )}
        </div>

        <div className="bg-pink-100 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-10 gap-1 w-80 h-96 mx-auto">
            {Array.from({ length: 200 }, (_, i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              const isOccupied = board[y] && board[y][x];
              const isCurrentPiece = currentPiece.some((row, py) => 
                row.some((cell, px) => 
                  cell && piecePosition.x + px === x && piecePosition.y + py === y
                )
              );
              
              return (
                <div
                  key={i}
                  className={`w-8 h-8 border border-pink-200 ${
                    isCurrentPiece ? 'bg-pink-400' : 
                    isOccupied ? 'bg-pink-500' : 
                    'bg-pink-50'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use arrow keys to move pieces. Press space to drop quickly!<br/>
          Current piece: <span className="font-bold" style={{ color: getPieceColor(currentPiece) }}>
            {getPieceName(currentPiece)}
          </span>
        </div>

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-4">Game Over!</p>
            <p className="mb-4">Final Score: {score}</p>
            <p className="mb-4">Lines Cleared: {linesCleared}</p>
            <button onClick={initializeBoard} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Roblox Game Component
const RobloxGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [avatar, setAvatar] = useState({
    hair: 'blonde',
    shirt: 'blue',
    pants: 'jeans',
    accessories: 'none'
  });
  const [coins, setCoins] = useState(0);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [gameStarted, setGameStarted] = useState(false);

  const avatarParts = {
    hair: [
      { id: 'blonde', color: '#FFD700', name: 'Blonde' },
      { id: 'brown', color: '#8B4513', name: 'Brown' },
      { id: 'black', color: '#000000', name: 'Black' },
      { id: 'red', color: '#FF0000', name: 'Red' }
    ],
    shirt: [
      { id: 'blue', color: '#2196F3', name: 'Blue Shirt' },
      { id: 'red', color: '#F44336', name: 'Red Shirt' },
      { id: 'green', color: '#4CAF50', name: 'Green Shirt' },
      { id: 'yellow', color: '#FFEB3B', name: 'Yellow Shirt' }
    ],
    pants: [
      { id: 'jeans', color: '#3F51B5', name: 'Jeans' },
      { id: 'black', color: '#212121', name: 'Black Pants' },
      { id: 'white', color: '#FFFFFF', name: 'White Pants' },
      { id: 'gray', color: '#9E9E9E', name: 'Gray Pants' }
    ]
  };

  const collectCoin = () => {
    setCoins(prev => {
      const newCoins = prev + 1;
      onScoreUpdate(newCoins);
      return newCoins;
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setPosition({ x: 200, y: 200 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Roblox World</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Coins: {coins}</h3>
              {!gameStarted && (
                <button onClick={startGame} className="btn btn-primary mt-2">
                  Start Adventure
                </button>
              )}
            </div>
            
            <div className="relative w-full h-96 bg-gradient-to-b from-green-300 to-blue-300 rounded-lg border-2 border-gray-300">
              {/* Avatar */}
              <div
                className="absolute w-12 h-12 bg-pink-300 rounded-full border-2 border-pink-500 cursor-pointer"
                style={{ left: position.x, top: position.y }}
                onClick={collectCoin}
              >
                {/* Hair */}
                <div
                  className="absolute w-8 h-8 rounded-full border-2"
                  style={{ 
                    backgroundColor: avatarParts.hair.find(h => h.id === avatar.hair)?.color,
                    top: -4,
                    left: 2
                  }}
                />
                {/* Shirt */}
                <div
                  className="absolute w-10 h-6 rounded border"
                  style={{ 
                    backgroundColor: avatarParts.shirt.find(s => s.id === avatar.shirt)?.color,
                    top: 8,
                    left: 1
                  }}
                />
                {/* Pants */}
                <div
                  className="absolute w-8 h-4 rounded border"
                  style={{ 
                    backgroundColor: avatarParts.pants.find(p => p.id === avatar.pants)?.color,
                    top: 14,
                    left: 2
                  }}
                />
              </div>
              
              {/* Coins */}
              {gameStarted && (
                <div
                  className="absolute w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 cursor-pointer animate-pulse"
                  style={{ left: 300, top: 150 }}
                  onClick={collectCoin}
                >
                  <div className="text-xs text-center mt-1">$</div>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Click on your avatar to collect coins and customize your look!
            </p>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Customize Avatar</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Hair</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.hair.map(hair => (
                    <button
                      key={hair.id}
                      onClick={() => setAvatar(prev => ({ ...prev, hair: hair.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.hair === hair.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: hair.color }}
                      />
                      <span className="text-xs">{hair.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Shirt</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.shirt.map(shirt => (
                    <button
                      key={shirt.id}
                      onClick={() => setAvatar(prev => ({ ...prev, shirt: shirt.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.shirt === shirt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded mx-auto mb-1"
                        style={{ backgroundColor: shirt.color }}
                      />
                      <span className="text-xs">{shirt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pants</h4>
                <div className="grid grid-cols-2 gap-2">
                  {avatarParts.pants.map(pants => (
                    <button
                      key={pants.id}
                      onClick={() => setAvatar(prev => ({ ...prev, pants: pants.id }))}
                      className={`p-2 rounded border-2 ${
                        avatar.pants === pants.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded mx-auto mb-1"
                        style={{ backgroundColor: pants.color }}
                      />
                      <span className="text-xs">{pants.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Mario Kart Game Component
const MarioKartGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [player, setPlayer] = useState({ x: 200, y: 300 });
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [powerUps, setPowerUps] = useState<Array<{x: number, y: number, type: string}>>([]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      setPlayer(prev => ({ ...prev, x: Math.max(50, Math.min(350, prev.x + speed)) }));
      
      setPowerUps(prev => {
        const newPowerUps = prev.map(pu => ({ ...pu, y: pu.y + 3 }));
        const filteredPowerUps = newPowerUps.filter(pu => pu.y < 400);
        
        if (Math.random() < 0.01) {
          filteredPowerUps.push({
            x: Math.random() * 300 + 50,
            y: -20,
            type: Math.random() < 0.5 ? 'mushroom' : 'star'
          });
        }
        
        return filteredPowerUps;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, speed]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!gameStarted) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        setSpeed(prev => Math.max(-5, prev - 1));
        break;
      case 'ArrowRight':
        setSpeed(prev => Math.min(5, prev + 1));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, handleKeyPress]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setSpeed(0);
  };

  const collectPowerUp = (index: number) => {
    setPowerUps(prev => prev.filter((_, i) => i !== index));
    setScore(prev => {
      const newScore = prev + 10;
      onScoreUpdate(newScore);
      return newScore;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Mario Kart Racing</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          {!gameStarted && (
            <button onClick={startGame} className="btn btn-primary mt-2">
              Start Race
            </button>
          )}
        </div>

        <div className="relative w-full h-96 bg-gradient-to-b from-green-400 to-green-600 rounded-lg overflow-hidden">
          {/* Road */}
          <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
          
          {/* Player Car */}
          <div
            className="absolute w-8 h-12 bg-red-500 rounded border-2 border-red-700"
            style={{ left: player.x, top: player.y }}
          >
            <div className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 left-1"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full absolute top-1 right-1"></div>
          </div>
          
          {/* Power-ups */}
          {powerUps.map((powerUp, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 cursor-pointer"
              style={{ left: powerUp.x, top: powerUp.y }}
              onClick={() => collectPowerUp(index)}
            >
              {powerUp.type === 'mushroom' ? (
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-2"></div>
                </div>
              ) : (
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600">
                  <div className="text-xs text-center mt-1">★</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use left/right arrow keys to steer and collect power-ups!
        </div>
      </motion.div>
    </div>
  );
};

// The Sims Game Component
const SimsGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [sim, setSim] = useState({
    name: 'Alex',
    happiness: 50,
    energy: 50,
    hunger: 50,
    social: 50
  });
  const [score, setScore] = useState(0);
  const [currentAction, setCurrentAction] = useState('idle');

  const actions = [
    { id: 'eat', name: 'Eat', icon: '🍎', effect: { hunger: 20, energy: -5, happiness: 0, social: 0 } },
    { id: 'sleep', name: 'Sleep', icon: '😴', effect: { energy: 30, hunger: -10, happiness: 0, social: 0 } },
    { id: 'play', name: 'Play', icon: '🎮', effect: { happiness: 25, energy: -15, hunger: 0, social: 0 } },
    { id: 'socialize', name: 'Socialize', icon: '👥', effect: { social: 20, happiness: 15, hunger: 0, energy: 0 } }
  ];

  const performAction = (action: typeof actions[0]) => {
    setCurrentAction(action.id);
    setSim(prev => ({
      ...prev,
      hunger: Math.max(0, Math.min(100, prev.hunger + action.effect.hunger)),
      energy: Math.max(0, Math.min(100, prev.energy + action.effect.energy)),
      happiness: Math.max(0, Math.min(100, prev.happiness + (action.effect.happiness || 0))),
      social: Math.max(0, Math.min(100, prev.social + (action.effect.social || 0)))
    }));
    
    setScore(prev => {
      const newScore = prev + 10;
      onScoreUpdate(newScore);
      return newScore;
    });

    setTimeout(() => setCurrentAction('idle'), 1000);
  };

  const getMoodColor = () => {
    const avg = (sim.happiness + sim.energy + sim.hunger + sim.social) / 4;
    if (avg > 75) return 'text-green-500';
    if (avg > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">The Sims Life</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-blue-100 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">{sim.name} the Sim</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Happiness</span>
                    <span className={getMoodColor()}>{sim.happiness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sim.happiness}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Energy</span>
                    <span className={getMoodColor()}>{sim.energy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${sim.energy}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hunger</span>
                    <span className={getMoodColor()}>{sim.hunger}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${sim.hunger}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Social</span>
                    <span className={getMoodColor()}>{sim.social}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${sim.social}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-2">
              {actions.map(action => (
                <button
                  key={action.id}
                  onClick={() => performAction(action)}
                  disabled={currentAction === action.id}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    currentAction === action.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{action.icon}</span>
                    <span className="font-medium">{action.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Love Nikki Game Component
const LoveNikkiGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [outfit, setOutfit] = useState({
    dress: 'none',
    hair: 'none',
    shoes: 'none',
    accessories: 'none'
  });
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState(0);

  const clothingItems = {
    dress: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'elegant', name: 'Elegant Dress', color: '#E91E63', style: 20 },
      { id: 'casual', name: 'Casual Dress', color: '#4CAF50', style: 15 },
      { id: 'party', name: 'Party Dress', color: '#9C27B0', style: 25 }
    ],
    hair: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'long', name: 'Long Hair', color: '#8B4513', style: 15 },
      { id: 'short', name: 'Short Hair', color: '#FFD700', style: 10 },
      { id: 'curly', name: 'Curly Hair', color: '#FF5722', style: 20 }
    ],
    shoes: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'heels', name: 'High Heels', color: '#000000', style: 15 },
      { id: 'sneakers', name: 'Sneakers', color: '#FFFFFF', style: 10 },
      { id: 'boots', name: 'Boots', color: '#795548', style: 12 }
    ],
    accessories: [
      { id: 'none', name: 'None', color: 'transparent', style: 0 },
      { id: 'necklace', name: 'Necklace', color: '#FFD700', style: 18 },
      { id: 'earrings', name: 'Earrings', color: '#E91E63', style: 12 },
      { id: 'bracelet', name: 'Bracelet', color: '#2196F3', style: 8 }
    ]
  };

  const updateOutfit = (category: keyof typeof outfit, itemId: string) => {
    setOutfit(prev => ({ ...prev, [category]: itemId }));
    
    const newStyle = Object.entries(clothingItems).reduce((total, [categoryKey, category]) => {
      const selectedItem = category.find(item => item.id === outfit[categoryKey as keyof typeof outfit]);
      return total + (selectedItem?.style || 0);
    }, 0);
    
    setStyle(newStyle);
    setScore(prev => {
      const newScore = prev + 5;
      onScoreUpdate(newScore);
      return newScore;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Love Nikki Fashion</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-xl font-bold">Style Score: {style}</div>
          <div className="text-lg">Total Score: {score}</div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-pink-100 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">Your Character</h3>
              
              <div className="relative w-32 h-48 mx-auto bg-gray-200 rounded-lg border-2 border-gray-300">
                {/* Character Base */}
                <div className="absolute inset-0 bg-pink-200 rounded-lg"></div>
                
                {/* Dress */}
                {outfit.dress !== 'none' && (
                  <div
                    className="absolute bottom-0 left-2 right-2 h-24 rounded-t-lg border"
                    style={{ backgroundColor: clothingItems.dress.find(d => d.id === outfit.dress)?.color }}
                  />
                )}
                
                {/* Hair */}
                {outfit.hair !== 'none' && (
                  <div
                    className="absolute top-0 left-4 right-4 h-16 rounded-t-lg border"
                    style={{ backgroundColor: clothingItems.hair.find(h => h.id === outfit.hair)?.color }}
                  />
                )}
                
                {/* Shoes */}
                {outfit.shoes !== 'none' && (
                  <div
                    className="absolute bottom-0 left-6 right-6 h-4 rounded border"
                    style={{ backgroundColor: clothingItems.shoes.find(s => s.id === outfit.shoes)?.color }}
                  />
                )}
                
                {/* Accessories */}
                {outfit.accessories !== 'none' && (
                  <div
                    className="absolute top-8 left-8 right-8 h-2 rounded border"
                    style={{ backgroundColor: clothingItems.accessories.find(a => a.id === outfit.accessories)?.color }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-48">
            <h3 className="text-lg font-semibold mb-4">Wardrobe</h3>
            
            {Object.entries(clothingItems).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h4 className="font-medium mb-2 capitalize">{category}</h4>
                <div className="space-y-1">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => updateOutfit(category as keyof typeof outfit, item.id)}
                      className={`w-full p-2 rounded border-2 text-sm ${
                        outfit[category as keyof typeof outfit] === item.id 
                          ? 'border-pink-500 bg-pink-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                        {item.style > 0 && <span className="text-xs text-gray-500">+{item.style}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

  const categories = ['all', 'Sandbox', 'Fashion', 'Social', 'Racing', 'Simulation'];

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
      case 'minecraft':
        return <MinecraftGame {...gameProps} />;
      case 'fashion-tetris':
        return <FashionTetrisGame {...gameProps} />;
      case 'roblox':
        return <RobloxGame {...gameProps} />;
      case 'mario-kart':
        return <MarioKartGame {...gameProps} />;
      case 'sims':
        return <SimsGame {...gameProps} />;
      case 'love-nikki':
        return <LoveNikkiGame {...gameProps} />;
      default:
        return null;
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
                       onClick={() => openGame(game.id)}
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
                      game.id === 'fashion-tetris' ? 'lines' :
                      game.id === 'roblox' ? 'coins' :
                      game.id === 'mario-kart' ? 'points' :
                      game.id === 'sims' ? 'happiness' :
                      game.id === 'love-nikki' ? 'style' : 'score'}
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
