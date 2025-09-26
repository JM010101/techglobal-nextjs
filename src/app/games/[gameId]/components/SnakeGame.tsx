'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const SnakeGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [snake, setSnake] = useState<[number, number][]>([[10, 10]]);
  const [food, setFood] = useState<[number, number]>([15, 15]);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Handle score update when game ends
  useEffect(() => {
    if (gameOver) {
      onScoreUpdate(score);
    }
  }, [gameOver, score, onScoreUpdate]);

  const generateFood = useCallback(() => {
    const newFood: [number, number] = [
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20)
    ];
    setFood(newFood);
  }, []);

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]] as [number, number];

      switch (direction) {
        case 'up': head[1]--; break;
        case 'down': head[1]++; break;
        case 'left': head[0]--; break;
        case 'right': head[0]++; break;
      }

      // Check wall collision
      if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameStarted, gameOver, direction, food, generateFood]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [direction, gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
        case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
        case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
        case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([[10, 10]]);
    setDirection('right');
    generateFood();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setSnake([[10, 10]]);
    setDirection('right');
    generateFood();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Snake</h2>
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
          <div className="grid grid-cols-20 gap-0 w-80 h-80 mx-auto">
            {Array.from({ length: 400 }, (_, i) => {
              const x = i % 20;
              const y = Math.floor(i / 20);
              const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
              const isFood = food[0] === x && food[1] === y;
              
              return (
                <div
                  key={i}
                  className={`w-4 h-4 ${
                    isSnake ? 'bg-green-500' : 
                    isFood ? 'bg-red-500' : 
                    'bg-gray-700'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Use arrow keys to control the snake. Eat red food to grow and score points!
        </div>

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 mb-4">Game Over!</p>
            <p className="mb-4">Final Score: {score}</p>
            <button onClick={resetGame} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SnakeGame;
