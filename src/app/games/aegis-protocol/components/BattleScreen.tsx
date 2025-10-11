'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import chaptersData from '@/data/chapters.json';
import enemiesData from '@/data/enemies.json';
import { Shield, Target } from 'lucide-react';

interface BattleUnit {
  id: string;
  name: string;
  type: 'hero' | 'enemy';
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  speed: number;
  position: { row: number; col: number };
  acted: boolean;
  skills?: unknown[];
  ultimate?: unknown;
}

const BattleScreen = () => {
  const { currentChapter, currentSection, currentSquad, ownedHeroes, setCurrentScreen, completeMission } = useGameStore();
  
  const [grid, setGrid] = useState<(BattleUnit | null)[][]>([]);
  const [selectedUnit, setSelectedUnit] = useState<BattleUnit | null>(null);
  const [turn, setTurn] = useState(1);
  const [phase, setPhase] = useState<'player' | 'enemy'>('player');
  const [battleLog, setBattleLog] = useState<string[]>(['Battle started!']);
  const [battleEnded, setBattleEnded] = useState(false);
  const [victory, setVictory] = useState(false);

  // Initialize battle
  useEffect(() => {
    const chapter = chaptersData.find(c => c.chapter === currentChapter);
    const section = chapter?.sections.find(s => s.section === currentSection);
    
    if (!section) return;

    const gridSize = section.grid_size;
    const newGrid: (BattleUnit | null)[][] = Array(gridSize.rows).fill(null).map(() => 
      Array(gridSize.cols).fill(null)
    );

    // Place player units
    const squadHeroes = ownedHeroes.filter(h => currentSquad.includes(h.id));
    section.player_spawn.forEach((spawn, index) => {
      const hero = squadHeroes[index];
      if (hero) {
        const unit: BattleUnit = {
          id: hero.id,
          name: hero.codename,
          type: 'hero',
          hp: hero.base_stats.hp,
          maxHp: hero.base_stats.hp,
          atk: hero.base_stats.atk,
          def: hero.base_stats.def,
          speed: hero.base_stats.speed,
          position: spawn,
          acted: false,
          skills: hero.skills,
          ultimate: hero.ultimate
        };
        newGrid[spawn.row][spawn.col] = unit;
      }
    });

    // Place first wave enemies
    const firstWave = section.waves[0];
    firstWave.enemies.forEach((enemySpawn) => {
      const enemyData = enemiesData.find(e => e.id === enemySpawn.id);
      if (enemyData) {
        const unit: BattleUnit = {
          id: `${enemyData.id}_${Math.random()}`,
          name: enemyData.name,
          type: 'enemy',
          hp: enemyData.hp,
          maxHp: enemyData.hp,
          atk: enemyData.atk,
          def: enemyData.def,
          speed: enemyData.speed,
          position: enemySpawn.spawn,
          acted: false
        };
        newGrid[enemySpawn.spawn.row][enemySpawn.spawn.col] = unit;
      }
    });

    setGrid(newGrid);
    addLog('Heroes deployed! Eliminate all enemies!');
  }, [currentChapter, currentSection, currentSquad, ownedHeroes]);

  const addLog = (message: string) => {
    setBattleLog(prev => [message, ...prev].slice(0, 10));
  };

  const getUnit = (row: number, col: number) => {
    return grid[row]?.[col];
  };

  const moveUnit = (unit: BattleUnit, newRow: number, newCol: number) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[unit.position.row][unit.position.col] = null;
    newGrid[newRow][newCol] = { ...unit, position: { row: newRow, col: newCol }, acted: true };
    setGrid(newGrid);
    addLog(`${unit.name} moved to (${newRow}, ${newCol})`);
  };

  const attack = (attacker: BattleUnit, defender: BattleUnit) => {
    const damage = Math.max(1, attacker.atk - defender.def);
    const newHp = Math.max(0, defender.hp - damage);
    
    const newGrid = grid.map(row => row.map(unit => {
      if (unit?.id === attacker.id) {
        return { ...unit, acted: true };
      }
      if (unit?.id === defender.id) {
        return { ...unit, hp: newHp };
      }
      return unit;
    }));

    setGrid(newGrid);
    addLog(`${attacker.name} attacks ${defender.name} for ${damage} damage!`);

    if (newHp === 0) {
      addLog(`${defender.name} has been defeated!`);
      setTimeout(() => {
        checkBattleEnd();
      }, 500);
    }

    setSelectedUnit(null);
  };

  const isAdjacent = (pos1: { row: number; col: number }, pos2: { row: number; col: number }) => {
    return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col) === 1;
  };

  const handleCellClick = (row: number, col: number) => {
    if (phase !== 'player' || battleEnded) return;

    const unit = getUnit(row, col);

    if (!selectedUnit) {
      // Select a hero
      if (unit?.type === 'hero' && !unit.acted) {
        setSelectedUnit(unit);
        addLog(`${unit.name} selected`);
      }
    } else {
      // Already have a unit selected
      if (unit?.type === 'hero') {
        // Switch selection
        if (!unit.acted) {
          setSelectedUnit(unit);
          addLog(`${unit.name} selected`);
        }
      } else if (unit?.type === 'enemy') {
        // Attack enemy
        if (isAdjacent(selectedUnit.position, unit.position)) {
          attack(selectedUnit, unit);
        } else {
          addLog('Target too far away!');
        }
      } else {
        // Move to empty cell
        if (isAdjacent(selectedUnit.position, { row, col })) {
          moveUnit(selectedUnit, row, col);
          setSelectedUnit(null);
        } else {
          addLog('Can only move to adjacent cells!');
        }
      }
    }
  };

  const endPlayerTurn = () => {
    // Reset acted status for next turn
    const newGrid = grid.map(row => row.map(unit => 
      unit ? { ...unit, acted: false } : null
    ));
    setGrid(newGrid);
    setPhase('enemy');
    setSelectedUnit(null);
    addLog('Enemy turn...');

    // Simple enemy AI
    setTimeout(() => {
      performEnemyTurn(newGrid);
    }, 1000);
  };

  const performEnemyTurn = (currentGrid: (BattleUnit | null)[][]) => {
    let updatedGrid = currentGrid.map(row => [...row]);
    
    // Find all enemies
    const enemies = updatedGrid.flat().filter(u => u?.type === 'enemy');
    
    enemies.forEach(enemy => {
      if (!enemy) return;
      
      // Find nearest hero
      const heroes = updatedGrid.flat().filter(u => u?.type === 'hero');
      if (heroes.length === 0) return;

      const nearestHero = heroes.reduce((nearest, hero) => {
        if (!hero || !nearest) return hero || nearest;
        const distToHero = Math.abs(hero.position.row - enemy.position.row) + Math.abs(hero.position.col - enemy.position.col);
        const distToNearest = Math.abs(nearest.position.row - enemy.position.row) + Math.abs(nearest.position.col - enemy.position.col);
        return distToHero < distToNearest ? hero : nearest;
      });

      if (!nearestHero) return;

      // If adjacent, attack
      if (isAdjacent(enemy.position, nearestHero.position)) {
        const damage = Math.max(1, enemy.atk - nearestHero.def);
        updatedGrid = updatedGrid.map(row => row.map(unit => {
          if (unit?.id === nearestHero.id) {
            const newHp = Math.max(0, unit.hp - damage);
            addLog(`${enemy.name} attacks ${nearestHero.name} for ${damage} damage!`);
            if (newHp === 0) {
              addLog(`${nearestHero.name} has been defeated!`);
            }
            return { ...unit, hp: newHp };
          }
          return unit;
        }));
      } else {
        // Move towards hero
        const rowDiff = nearestHero.position.row - enemy.position.row;
        const colDiff = nearestHero.position.col - enemy.position.col;
        
        let newRow = enemy.position.row;
        let newCol = enemy.position.col;

        if (Math.abs(rowDiff) > Math.abs(colDiff)) {
          newRow += rowDiff > 0 ? 1 : -1;
        } else {
          newCol += colDiff > 0 ? 1 : -1;
        }

        // Check if new position is empty
        if (!updatedGrid[newRow]?.[newCol]) {
          updatedGrid[enemy.position.row][enemy.position.col] = null;
          updatedGrid[newRow][newCol] = { ...enemy, position: { row: newRow, col: newCol } };
        }
      }
    });

    setGrid(updatedGrid);
    setPhase('player');
    setTurn(prev => prev + 1);
    addLog('Player turn!');
    
    setTimeout(() => {
      checkBattleEnd();
    }, 500);
  };

  const checkBattleEnd = () => {
    const heroes = grid.flat().filter(u => u?.type === 'hero' && u.hp > 0);
    const enemies = grid.flat().filter(u => u?.type === 'enemy' && u.hp > 0);

    if (heroes.length === 0) {
      setBattleEnded(true);
      setVictory(false);
      addLog('Mission failed...');
    } else if (enemies.length === 0) {
      setBattleEnded(true);
      setVictory(true);
      addLog('Victory! All enemies defeated!');
      
      // Complete mission
      const chapter = chaptersData.find(c => c.chapter === currentChapter);
      const section = chapter?.sections.find(s => s.section === currentSection);
      if (section) {
        completeMission(section.rewards);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm border-b border-cyan-500/30">
        <div>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
            BATTLE - Turn {turn}
          </h1>
          <p className="text-sm text-gray-400">{phase === 'player' ? 'Your Turn' : 'Enemy Turn'}</p>
        </div>
        
        {phase === 'player' && !battleEnded && (
          <button
            onClick={endPlayerTurn}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
          >
            End Turn
          </button>
        )}
      </div>

      {/* Main Battle Area */}
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        {/* Battle Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="inline-grid gap-1 bg-gray-800/50 p-2 rounded-2xl border border-cyan-500/30"
            style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 8}, minmax(0, 1fr))` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((unit, colIndex) => (
                <motion.button
                  key={`${rowIndex}-${colIndex}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center text-xs transition-all
                    ${selectedUnit?.position.row === rowIndex && selectedUnit?.position.col === colIndex
                      ? 'border-green-500 bg-green-900/50 shadow-lg shadow-green-500/50'
                      : unit?.type === 'hero'
                      ? 'border-cyan-500 bg-cyan-900/50 hover:bg-cyan-800/50'
                      : unit?.type === 'enemy'
                      ? 'border-red-500 bg-red-900/50 hover:bg-red-800/50'
                      : 'border-gray-600 bg-gray-900/30 hover:bg-gray-800/30'
                    }
                  `}
                  disabled={phase === 'enemy' || battleEnded}
                >
                  {unit && (
                    <>
                      <div className="mb-1">
                        {unit.type === 'hero' ? (
                          <Shield className="w-6 h-6 text-cyan-400" />
                        ) : (
                          <Target className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-white truncate w-full text-center">
                        {unit.name.substring(0, 6)}
                      </div>
                      <div className="text-[9px] text-gray-300">
                        {unit.hp}/{unit.maxHp}
                      </div>
                    </>
                  )}
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Battle Log */}
        <div className="w-80 bg-gradient-to-b from-gray-800/80 to-gray-900/80 rounded-2xl p-4 border border-cyan-500/30">
          <h3 className="text-lg font-bold text-cyan-400 mb-3">Battle Log</h3>
          <div className="space-y-2 text-sm text-gray-300 max-h-[600px] overflow-y-auto">
            {battleLog.map((log, index) => (
              <div key={index} className="p-2 bg-gray-900/50 rounded">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Battle End Screen */}
      {battleEnded && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border-2 border-cyan-500/50 text-center max-w-md"
          >
            <div className="text-6xl mb-4">
              {victory ? '🏆' : '💀'}
            </div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 mb-4">
              {victory ? 'VICTORY!' : 'DEFEATED'}
            </h2>
            <p className="text-gray-300 mb-8">
              {victory ? 'Mission accomplished!' : 'Your squad was defeated...'}
            </p>
            <button
              onClick={() => setCurrentScreen('home')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
            >
              Return to Base
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BattleScreen;

