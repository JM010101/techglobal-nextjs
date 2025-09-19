'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const MinecraftGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [world, setWorld] = useState<number[][]>([]);
  const [selectedBlock, setSelectedBlock] = useState(1);
  const [blocksPlaced, setBlocksPlaced] = useState(0);
  const [inventory, setInventory] = useState([10, 10, 10, 10, 10]); // Different block types

  const blockTypes = [
    { id: 0, name: 'Air', color: 'bg-blue-200' },
    { id: 1, name: 'Grass', color: 'bg-green-500' },
    { id: 2, name: 'Stone', color: 'bg-gray-500' },
    { id: 3, name: 'Wood', color: 'bg-yellow-600' },
    { id: 4, name: 'Diamond', color: 'bg-cyan-400' }
  ];

  useEffect(() => {
    // Initialize 10x10 world
    const newWorld = Array(10).fill(null).map(() => Array(10).fill(0));
    setWorld(newWorld);
  }, []);

  const placeBlock = (x: number, y: number) => {
    if (inventory[selectedBlock] > 0) {
      setWorld(prev => {
        const newWorld = prev.map(row => [...row]);
        newWorld[y][x] = selectedBlock;
        return newWorld;
      });
      setInventory(prev => {
        const newInv = [...prev];
        newInv[selectedBlock]--;
        return newInv;
      });
      setBlocksPlaced(prev => prev + 1);
      onScoreUpdate(blocksPlaced + 1);
    }
  };

  const removeBlock = (x: number, y: number) => {
    if (world[y][x] !== 0) {
      setWorld(prev => {
        const newWorld = prev.map(row => [...row]);
        newWorld[y][x] = 0;
        return newWorld;
      });
      setInventory(prev => {
        const newInv = [...prev];
        newInv[world[y][x]]++;
        return newInv;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
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
              <h3 className="text-lg font-semibold mb-2">World Builder</h3>
              <div className="grid grid-cols-10 gap-1 w-80 h-80 bg-blue-200 p-2 rounded">
                {world.map((row, y) =>
                  row.map((block, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`w-7 h-7 border border-gray-300 cursor-pointer ${
                        blockTypes[block].color
                      }`}
                      onClick={() => placeBlock(x, y)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        removeBlock(x, y);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-64">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Inventory</h3>
              <div className="space-y-2">
                {blockTypes.slice(1).map((block) => (
                  <div
                    key={block.id}
                    className={`p-3 rounded cursor-pointer border-2 ${
                      selectedBlock === block.id ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 ${block.color} rounded`} />
                      <div className="flex-1">
                        <div className="font-medium">{block.name}</div>
                        <div className="text-sm text-gray-500">x{inventory[block.id]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="text-sm space-y-1">
                <div>Blocks Placed: {blocksPlaced}</div>
                <div>Selected: {blockTypes[selectedBlock].name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Click to place blocks, right-click to remove. Build your dream world!
        </div>
      </motion.div>
    </div>
  );
};

export default MinecraftGame;
