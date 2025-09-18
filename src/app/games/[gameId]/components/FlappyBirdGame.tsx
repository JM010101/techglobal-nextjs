'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const FlappyBirdGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [birdY, setBirdY] = useState(250);
  const [pipes, setPipes] = useState<Array<{ x: number; topHeight: number }>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [velocity, setVelocity] = useState(0);

  // Handle score update when game ends
  useEffect(() => {
    if (gameOver) {
      onScoreUpdate(score);
    }
  }, [gameOver, score, onScoreUpdate]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameLoop = setInterval(() => {
      setBirdY(prev => {
        const newY = prev + velocity;
        setVelocity(prev => prev + 0.5);
        
        if (newY > 500 || newY < 0) {
          setGameOver(true);
          return prev;
        }
        
        return newY;
      });
      
      setPipes(prev => {
        const newPipes = prev.map(pipe => ({ ...pipe, x: pipe.x - 2 }));
        const filteredPipes = newPipes.filter(pipe => pipe.x > -50);
        
        if (filteredPipes.length === 0 || filteredPipes[filteredPipes.length - 1].x < 200) {
          filteredPipes.push({
            x: 400,
            topHeight: Math.random() * 200 + 100
          });
        }
        
        return filteredPipes;
      });
    }, 16);
    
    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, velocity, score]);

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setVelocity(-8);
    } else if (!gameOver) {
      setVelocity(-8);
    }
  };

  const resetGame = () => {
    setBirdY(250);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setVelocity(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Flappy Bird</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Score: {score}</div>
          {!gameStarted && (
            <button onClick={jump} className="btn btn-primary">
              Start Game
            </button>
          )}
        </div>

        <div 
          className="bg-blue-300 relative w-80 h-96 mx-auto rounded-lg overflow-hidden cursor-pointer"
          onClick={jump}
        >
          {/* Bird */}
          <div
            className="absolute w-8 h-8 bg-yellow-400 rounded-full"
            style={{ left: 50, top: birdY }}
          />
          
          {/* Pipes */}
          {pipes.map((pipe, index) => (
            <div key={index}>
              <div
                className="absolute bg-green-500"
                style={{
                  left: pipe.x,
                  top: 0,
                  width: 50,
                  height: pipe.topHeight
                }}
              />
              <div
                className="absolute bg-green-500"
                style={{
                  left: pipe.x,
                  top: pipe.topHeight + 100,
                  width: 50,
                  height: 400 - pipe.topHeight - 100
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Click or press space to make the bird fly. Avoid the pipes!
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

export default FlappyBirdGame;
