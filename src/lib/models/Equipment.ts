export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'mod' | 'accessory';
  slot: 'primary' | 'secondary' | 'head' | 'torso' | 'arms' | 'legs' | 'core' | 'mod1' | 'mod2' | 'mod3';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  level: number;
  maxLevel: number;
  stats: EquipmentStats;
  effects: EquipmentEffect[];
  requirements: EquipmentRequirements;
  description: string;
  flavorText: string;
  icon: string;
  isEquipped: boolean;
  equippedBy?: string; // heroId
}

export interface EquipmentStats {
  attack?: number;
  defense?: number;
  health?: number;
  speed?: number;
  criticalChance?: number;
  criticalDamage?: number;
  accuracy?: number;
  evasion?: number;
  skillHaste?: number;
  cooldownReduction?: number;
  statusResistance?: number;
  elementalResistance?: number;
}

export interface EquipmentEffect {
  id: string;
  type: 'passive' | 'active' | 'trigger';
  trigger?: 'on_hit' | 'on_crit' | 'on_kill' | 'on_take_damage' | 'on_skill_use';
  effect: string;
  value: number;
  duration?: number;
  cooldown?: number;
  description: string;
}

export interface EquipmentRequirements {
  heroLevel: number;
  heroClass?: string[];
  completedMissions?: string[];
  reputation?: Record<string, number>;
  materials?: Record<string, number>;
}

export interface Weapon extends Equipment {
  type: 'weapon';
  weaponType: 'assault_rifle' | 'smg' | 'shotgun' | 'sniper' | 'pistol' | 'melee';
  damage: number;
  fireRate: number;
  range: number;
  accuracy: number;
  recoil: number;
  magazineSize: number;
  reloadTime: number;
  elementalType?: 'kinetic' | 'thermal' | 'shock' | 'shock';
  specialAbilities: WeaponAbility[];
}

export interface WeaponAbility {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  effects: string[];
  requirements: string[];
}

export interface Armor extends Equipment {
  type: 'armor';
  armorType: 'light' | 'medium' | 'heavy';
  defense: number;
  mobility: number;
  protection: ArmorProtection;
  specialResistances: Record<string, number>;
}

export interface ArmorProtection {
  kinetic: number;
  thermal: number;
  shock: number;
  status: number;
}

export interface Mod extends Equipment {
  type: 'mod';
  modType: 'offensive' | 'defensive' | 'utility' | 'special';
  modSlot: 'weapon' | 'armor' | 'core';
  effects: ModEffect[];
  stackable: boolean;
  maxStacks?: number;
}

export interface ModEffect {
  id: string;
  type: 'passive' | 'active' | 'trigger';
  stat: string;
  value: number;
  isPercentage: boolean;
  condition?: string;
  effect: string;
  description: string;
}

export interface EquipmentUpgrade {
  equipmentId: string;
  currentLevel: number;
  targetLevel: number;
  materials: Record<string, number>;
  credits: number;
  successRate: number;
  failurePenalty: 'none' | 'materials_lost' | 'level_reduction' | 'equipment_destroyed';
}

export interface EquipmentCrafting {
  recipeId: string;
  name: string;
  type: 'weapon' | 'armor' | 'mod';
  materials: Record<string, number>;
  credits: number;
  time: number; // in minutes
  successRate: number;
  unlockRequirements: string[];
  description: string;
}
