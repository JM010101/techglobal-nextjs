'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const TetrisGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
  const [piecePosition, setPiecePosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const pieces = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]]  // Z
  ];

  // Handle score update when game ends
  useEffect(() => {
    if (gameOver) {
      onScoreUpdate(score);
    }
  }, [gameOver, score, onScoreUpdate]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(20).fill(null).map(() => Array(10).fill(0));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const spawnPiece = () => {
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    setCurrentPiece(randomPiece);
    setPiecePosition({ x: 4, y: 0 });
  };

  const startGame = () => {
    setGameStarted(true);
    spawnPiece();
  };

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!gameStarted || gameOver) return;
    
    setPiecePosition(prev => {
      const newPos = { x: prev.x + dx, y: prev.y + dy };
      if (isValidPosition(newPos, currentPiece)) {
        return newPos;
      }
      return prev;
    });
  }, [gameStarted, gameOver, currentPiece, isValidPosition]);

  const isValidPosition = useCallback((pos: { x: number; y: number }, piece: number[][]) => {
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
  }, [board]);

  const placePiece = useCallback(() => {
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
  }, [board, currentPiece, piecePosition, spawnPiece]);

  const clearLines = (board: number[][]) => {
    const newBoard = board.filter(row => !row.every(cell => cell === 1));
    const linesCleared = board.length - newBoard.length;
    
    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
      const emptyRows = Array(linesCleared).fill(null).map(() => Array(10).fill(0));
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Tetris</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          {!gameStarted && (
            <button onClick={startGame} className="btn btn-primary">
              Start Game
            </button>
          )}
        </div>

        <div className="bg-gray-800 p-2 rounded-lg mb-4">
          <div className="grid grid-cols-10 gap-0 w-80 h-96 mx-auto">
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
                  className={`w-8 h-8 ${
                    isCurrentPiece ? 'bg-blue-500' : 
                    isOccupied ? 'bg-gray-500' : 
                    'bg-gray-700'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use arrow keys to move and rotate pieces. Press space to drop quickly!
        </div>

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-4">Game Over!</p>
            <p className="mb-4">Final Score: {score}</p>
            <button onClick={initializeBoard} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TetrisGame;
