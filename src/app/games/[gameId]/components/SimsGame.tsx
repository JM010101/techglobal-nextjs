'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const SimsGame = ({ onClose, onScoreUpdate }: { onClose: () => void; onScoreUpdate: (score: number) => void }) => {
  const [sim, setSim] = useState({
    name: 'Alex',
    happiness: 50,
    energy: 80,
    hunger: 60,
    social: 40,
    career: 'Unemployed',
    money: 1000
  });
  const [currentRoom, setCurrentRoom] = useState('living');
  const [happiness, setHappiness] = useState(50);

  const rooms = [
    { id: 'living', name: 'Living Room', activities: ['Watch TV', 'Read Book', 'Play Games'] },
    { id: 'kitchen', name: 'Kitchen', activities: ['Cook Food', 'Eat Meal', 'Make Coffee'] },
    { id: 'bedroom', name: 'Bedroom', activities: ['Sleep', 'Change Clothes', 'Exercise'] },
    { id: 'bathroom', name: 'Bathroom', activities: ['Shower', 'Brush Teeth', 'Relax'] }
  ];

  const careers = [
    { name: 'Unemployed', salary: 0, happiness: 0 },
    { name: 'Artist', salary: 500, happiness: 20 },
    { name: 'Programmer', salary: 800, happiness: 15 },
    { name: 'Doctor', salary: 1200, happiness: 25 }
  ];

  const performActivity = (activity: string) => {
    setSim(prev => {
      let newSim = { ...prev };
      
      switch (activity) {
        case 'Watch TV':
          newSim.happiness = Math.min(100, newSim.happiness + 10);
          newSim.energy = Math.max(0, newSim.energy - 5);
          break;
        case 'Read Book':
          newSim.happiness = Math.min(100, newSim.happiness + 15);
          newSim.energy = Math.max(0, newSim.energy - 10);
          break;
        case 'Play Games':
          newSim.happiness = Math.min(100, newSim.happiness + 20);
          newSim.energy = Math.max(0, newSim.energy - 15);
          break;
        case 'Cook Food':
          newSim.hunger = Math.min(100, newSim.hunger + 30);
          newSim.energy = Math.max(0, newSim.energy - 10);
          break;
        case 'Eat Meal':
          newSim.hunger = Math.min(100, newSim.hunger + 40);
          newSim.happiness = Math.min(100, newSim.happiness + 5);
          break;
        case 'Make Coffee':
          newSim.energy = Math.min(100, newSim.energy + 20);
          newSim.hunger = Math.max(0, newSim.hunger - 5);
          break;
        case 'Sleep':
          newSim.energy = Math.min(100, newSim.energy + 50);
          newSim.hunger = Math.max(0, newSim.hunger - 10);
          break;
        case 'Change Clothes':
          newSim.happiness = Math.min(100, newSim.happiness + 5);
          break;
        case 'Exercise':
          newSim.energy = Math.max(0, newSim.energy - 20);
          newSim.happiness = Math.min(100, newSim.happiness + 10);
          break;
        case 'Shower':
          newSim.happiness = Math.min(100, newSim.happiness + 15);
          newSim.energy = Math.min(100, newSim.energy + 10);
          break;
        case 'Brush Teeth':
          newSim.happiness = Math.min(100, newSim.happiness + 5);
          break;
        case 'Relax':
          newSim.happiness = Math.min(100, newSim.happiness + 20);
          newSim.energy = Math.min(100, newSim.energy + 10);
          break;
      }
      
      return newSim;
    });
  };

  const work = () => {
    const career = careers.find(c => c.name === sim.career);
    if (career && career.salary > 0) {
      setSim(prev => ({
        ...prev,
        money: prev.money + career.salary,
        happiness: Math.min(100, prev.happiness + career.happiness),
        energy: Math.max(0, prev.energy - 30)
      }));
    }
  };

  const changeCareer = (careerName: string) => {
    setSim(prev => ({ ...prev, career: careerName }));
  };

  useEffect(() => {
    const totalHappiness = (sim.happiness + sim.energy + sim.hunger + sim.social) / 4;
    setHappiness(totalHappiness);
    onScoreUpdate(Math.round(totalHappiness));
  }, [sim, onScoreUpdate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">The Sims Life</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Sim Profile</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {sim.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-lg">{sim.name}</div>
                    <div className="text-sm text-gray-600">Career: {sim.career}</div>
                    <div className="text-sm text-gray-600">Money: ${sim.money}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Happiness:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${sim.happiness}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${sim.energy}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Hunger:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${sim.hunger}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Social:</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${sim.social}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Rooms</h3>
              <div className="flex gap-2 mb-4">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    className={`p-2 rounded ${
                      currentRoom === room.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentRoom(room.id)}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
              
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-medium mb-2">
                  {rooms.find(r => r.id === currentRoom)?.name} Activities
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {rooms.find(r => r.id === currentRoom)?.activities.map(activity => (
                    <button
                      key={activity}
                      onClick={() => performActivity(activity)}
                      className="p-2 bg-white rounded hover:bg-gray-50 text-sm"
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Career</h3>
              <div className="flex gap-2 mb-4">
                {careers.map(career => (
                  <button
                    key={career.name}
                    className={`p-2 rounded text-sm ${
                      sim.career === career.name ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => changeCareer(career.name)}
                  >
                    {career.name}
                  </button>
                ))}
              </div>
              <button
                onClick={work}
                className="btn btn-primary"
                disabled={sim.career === 'Unemployed'}
              >
                Work
              </button>
            </div>
          </div>

          <div className="w-64">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="space-y-2 text-sm">
                <div>Overall Happiness: {Math.round(happiness)}%</div>
                <div>Career Level: {careers.findIndex(c => c.name === sim.career) + 1}</div>
                <div>Total Money: ${sim.money}</div>
              </div>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Achievements</h3>
              <div className="space-y-1 text-sm">
                {sim.money >= 1000 && <div className="text-green-600">✓ First $1000</div>}
                {sim.happiness >= 80 && <div className="text-green-600">✓ Happy Sim</div>}
                {sim.career !== 'Unemployed' && <div className="text-green-600">✓ Employed</div>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SimsGame;
