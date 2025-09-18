'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const SudokuGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Handle score update when game is won
  useEffect(() => {
    if (gameWon) {
      onScoreUpdate(Math.max(0, 1000 - timeElapsed));
    }
  }, [gameWon, timeElapsed, onScoreUpdate]);

  useEffect(() => {
    generateSudoku();
  }, []);

  useEffect(() => {
    if (!gameWon) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameWon]);

  const generateSudoku = () => {
    const newBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    
    // Fill some cells with numbers (easy puzzle)
    const clues = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    setBoard(clues);
    setGameWon(false);
    setTimeElapsed(0);
  };

  const isValidMove = (row: number, col: number, num: number) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    
    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (isValidMove(row, col, num)) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = num;
      setBoard(newBoard);
      
      if (isComplete(newBoard)) {
        setGameWon(true);
      }
    }
  };

  const isComplete = (board: number[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return false;
      }
    }
    return true;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Sudoku</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Time: {formatTime(timeElapsed)}</div>
          <button onClick={generateSudoku} className="btn btn-secondary">
            New Game
          </button>
        </div>

        <div className="grid grid-cols-9 gap-1 w-96 h-96 mx-auto mb-4">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`w-10 h-10 border border-gray-300 flex items-center justify-center font-bold cursor-pointer ${
                  selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                    ? 'bg-blue-200'
                    : 'bg-white hover:bg-gray-100'
                } ${
                  (rowIndex + 1) % 3 === 0 ? 'border-b-2' : ''
                } ${
                  (colIndex + 1) % 3 === 0 ? 'border-r-2' : ''
                }`}
              >
                {cell > 0 ? cell : ''}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded font-bold"
            >
              {num}
            </button>
          ))}
        </div>

        {gameWon && (
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</p>
            <p className="mb-4">You completed the Sudoku in {formatTime(timeElapsed)}!</p>
            <button onClick={generateSudoku} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SudokuGame;
