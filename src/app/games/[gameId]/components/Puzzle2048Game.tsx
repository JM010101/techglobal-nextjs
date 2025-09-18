'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Puzzle2048Game = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameWon(false);
    setGameOver(false);
  };

  const addRandomTile = (board: number[][]) => {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveLeft = (board: number[][]) => {
    const newBoard = board.map(row => {
      const filtered = row.filter(cell => cell !== 0);
      const merged = [];
      
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          setScore(prev => prev + filtered[i] * 2);
          if (filtered[i] * 2 === 2048) setGameWon(true);
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }
      
      while (merged.length < 4) merged.push(0);
      return merged;
    });
    
    return newBoard;
  };

  const moveRight = (board: number[][]) => {
    return moveLeft(board.map(row => [...row].reverse())).map(row => [...row].reverse());
  };

  const moveUp = (board: number[][]) => {
    const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const moved = moveLeft(transposed);
    return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
  };

  const moveDown = (board: number[][]) => {
    const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    const moved = moveRight(transposed);
    return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
  };

  const handleMove = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;
    
    let newBoard: number[][];
    switch (direction) {
      case 'left': newBoard = moveLeft(board); break;
      case 'right': newBoard = moveRight(board); break;
      case 'up': newBoard = moveUp(board); break;
      case 'down': newBoard = moveDown(board); break;
    }
    
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  const isGameOver = (board: number[][]) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false;
        if (i < 3 && board[i][j] === board[i + 1][j]) return false;
        if (j < 3 && board[i][j] === board[i][j + 1]) return false;
      }
    }
    return true;
  };

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: 'bg-gray-200',
      2: 'bg-gray-100',
      4: 'bg-yellow-100',
      8: 'bg-yellow-200',
      16: 'bg-orange-200',
      32: 'bg-orange-300',
      64: 'bg-red-300',
      128: 'bg-red-400',
      256: 'bg-pink-400',
      512: 'bg-pink-500',
      1024: 'bg-purple-500',
      2048: 'bg-purple-600'
    };
    return colors[value] || 'bg-purple-700';
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': handleMove('left'); break;
        case 'ArrowRight': handleMove('right'); break;
        case 'ArrowUp': handleMove('up'); break;
        case 'ArrowDown': handleMove('down'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [board, gameOver]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">2048</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          <button onClick={initializeBoard} className="btn btn-secondary">
            New Game
          </button>
        </div>

        <div className="bg-gray-300 p-2 rounded-lg mb-4">
          <div className="grid grid-cols-4 gap-2">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-16 h-16 flex items-center justify-center font-bold text-lg rounded ${
                    cell === 0 ? 'bg-gray-200' : getTileColor(cell)
                  } ${cell > 0 ? 'text-white' : 'text-gray-400'}`}
                >
                  {cell > 0 ? cell : ''}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use arrow keys to move tiles. Combine tiles with the same number to reach 2048!
        </div>

        {gameWon && !gameOver && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-green-600">🎉 You reached 2048! 🎉</p>
            <p className="text-gray-600">Keep playing to get a higher score!</p>
          </div>
        )}

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

export default Puzzle2048Game;
