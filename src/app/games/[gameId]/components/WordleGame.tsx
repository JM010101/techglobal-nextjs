'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const WordleGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const words = ['REACT', 'NEXTJS', 'TYPESCRIPT', 'JAVASCRIPT', 'PYTHON', 'NODEJS', 'MONGODB', 'EXPRESS'];
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Handle score update when game ends
  useEffect(() => {
    if (gameOver && gameWon) {
      onScoreUpdate(6 - guesses.length + 1);
    }
  }, [gameOver, gameWon, guesses.length, onScoreUpdate]);

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
  }, [words]);

  const checkGuess = (guess: string) => {
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    
    if (guess === targetWord) {
      setGameWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
    }
    
    setCurrentGuess('');
  };

  const getLetterStatus = (letter: string, position: number) => {
    if (targetWord[position] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameWon(false);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Wordle</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-2 mb-6">
          {[...Array(6)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {[...Array(5)].map((_, colIndex) => {
                const letter = guesses[rowIndex]?.[colIndex] || '';
                const status = guesses[rowIndex] ? getLetterStatus(letter, colIndex) : '';
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-lg ${
                      status === 'correct' ? 'bg-green-500 text-white border-green-500' :
                      status === 'present' ? 'bg-yellow-500 text-white border-yellow-500' :
                      status === 'absent' ? 'bg-gray-500 text-white border-gray-500' :
                      'border-gray-300'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {!gameOver && (
          <div className="text-center">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase().slice(0, 5))}
              onKeyPress={(e) => e.key === 'Enter' && currentGuess.length === 5 && checkGuess(currentGuess)}
              className="border-2 border-gray-300 rounded px-4 py-2 text-center text-lg font-bold uppercase"
              placeholder="Enter 5-letter word"
              maxLength={5}
            />
            <button
              onClick={() => currentGuess.length === 5 && checkGuess(currentGuess)}
              className="btn btn-primary ml-4"
              disabled={currentGuess.length !== 5}
            >
              Guess
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">
              {gameWon ? '🎉 Congratulations! 🎉' : '😞 Game Over!'}
            </p>
            <p className="mb-4">The word was: <span className="font-bold">{targetWord}</span></p>
            <button onClick={resetGame} className="btn btn-primary">
              Play Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WordleGame;
