export interface CombatState {
  isActive: boolean;
  currentTurn: 'player' | 'enemy';
  turnNumber: number;
  selectedHero: string | null;
  selectedEnemy: string | null;
  actionQueue: CombatAction[];
  coverPositions: CoverPosition[];
  battlefield: BattlefieldTile[][];
  combatLog: CombatLogEntry[];
}

export interface CombatAction {
  id: string;
  type: 'move' | 'attack' | 'skill' | 'ultimate' | 'item';
  actorId: string;
  targetId?: string;
  position?: { x: number; y: number };
  skillId?: string;
  damage?: number;
  effects?: CombatEffect[];
  timestamp: Date;
}

export interface CoverPosition {
  id: string;
  x: number;
  y: number;
  type: 'full' | 'partial' | 'destructible';
  health: number;
  maxHealth: number;
  isDestroyed: boolean;
  coverBonus: number; // 0-100%
}

export interface BattlefieldTile {
  x: number;
  y: number;
  type: 'normal' | 'cover' | 'hazard' | 'elevated';
  coverValue: number;
  movementCost: number;
  isOccupied: boolean;
  occupantId?: string;
  effects: BattlefieldEffect[];
}

export interface BattlefieldEffect {
  id: string;
  type: 'fire' | 'ice' | 'electric' | 'poison' | 'heal';
  duration: number;
  damage?: number;
  healing?: number;
  description: string;
}

export interface CombatEffect {
  id: string;
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'status';
  value: number;
  duration: number;
  target: string;
  description: string;
}

export interface CombatLogEntry {
  id: string;
  timestamp: Date;
  message: string;
  type: 'action' | 'damage' | 'heal' | 'status' | 'system';
  actorId?: string;
  targetId?: string;
  value?: number;
}

export interface SkillCooldown {
  skillId: string;
  remainingTurns: number;
  maxCooldown: number;
}

export interface UltimateCharge {
  heroId: string;
  currentCharge: number;
  maxCharge: number;
  isReady: boolean;
}

export interface CombatResult {
  victory: boolean;
  experience: number;
  credits: number;
  items: CombatReward[];
  rating: 'S' | 'A' | 'B' | 'C' | 'D';
  timeBonus: number;
  damageBonus: number;
  survivalBonus: number;
}

export interface CombatReward {
  type: 'weapon' | 'armor' | 'mod' | 'material' | 'currency';
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  description: string;
}
