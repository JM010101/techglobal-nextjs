export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'main_story' | 'side_mission' | 'daily' | 'weekly' | 'event' | 'challenge';
  chapter: number;
  section: number;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme' | 'nightmare';
  level: number;
  requirements: MissionRequirements;
  objectives: MissionObjective[];
  rewards: MissionReward[];
  environment: MissionEnvironment;
  enemies: MissionEnemy[];
  allies?: MissionAlly[];
  timeLimit?: number; // in minutes
  attempts: number;
  maxAttempts: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  unlockConditions: string[];
  completionRating: 'S' | 'A' | 'B' | 'C' | 'D' | null;
  bestTime?: number;
  bestScore?: number;
}

export interface MissionRequirements {
  heroLevel: number;
  squadSize: number;
  completedMissions?: string[];
  heroUnlocks?: string[];
  equipmentLevel?: number;
  reputation?: Record<string, number>;
  storyProgress?: number;
}

export interface MissionObjective {
  id: string;
  type: 'eliminate' | 'survive' | 'escort' | 'defend' | 'collect' | 'reach' | 'hack' | 'destroy';
  description: string;
  target?: string;
  quantity?: number;
  timeLimit?: number;
  isOptional: boolean;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
}

export interface MissionReward {
  type: 'experience' | 'credits' | 'materials' | 'equipment' | 'hero' | 'currency';
  id?: string;
  name?: string;
  quantity: number;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  guaranteed: boolean;
  dropRate?: number;
}

export interface MissionEnvironment {
  id: string;
  name: string;
  description: string;
  background: string;
  music: string;
  weather?: 'clear' | 'rain' | 'storm' | 'fog' | 'sandstorm';
  lighting: 'bright' | 'normal' | 'dim' | 'dark';
  hazards: EnvironmentHazard[];
  cover: EnvironmentCover[];
  interactive: EnvironmentInteractive[];
}

export interface EnvironmentHazard {
  id: string;
  type: 'fire' | 'electric' | 'toxic' | 'explosive' | 'falling';
  position: { x: number; y: number };
  radius: number;
  damage: number;
  duration: number;
  description: string;
}

export interface EnvironmentCover {
  id: string;
  type: 'wall' | 'barrier' | 'vehicle' | 'debris';
  position: { x: number; y: number };
  health: number;
  maxHealth: number;
  coverValue: number;
  isDestructible: boolean;
  description: string;
}

export interface EnvironmentInteractive {
  id: string;
  type: 'terminal' | 'door' | 'switch' | 'lever' | 'console';
  position: { x: number; y: number };
  isActive: boolean;
  action: string;
  description: string;
  requirements?: string[];
}

export interface MissionEnemy {
  id: string;
  enemyId: string;
  position: { x: number; y: number };
  level: number;
  isElite: boolean;
  isBoss: boolean;
  spawnWave: number;
  spawnDelay: number;
  behavior: EnemyBehavior;
  lootTable: string;
}

export interface EnemyBehavior {
  type: 'aggressive' | 'defensive' | 'patrol' | 'guard' | 'ambush';
  aggression: number; // 0-100
  intelligence: number; // 0-100
  tactics: string[];
  specialAbilities: string[];
}

export interface MissionAlly {
  id: string;
  allyId: string;
  position: { x: number; y: number };
  level: number;
  isControllable: boolean;
  behavior: AllyBehavior;
  specialAbilities: string[];
}

export interface AllyBehavior {
  type: 'follow' | 'guard' | 'support' | 'independent';
  aggression: number; // 0-100
  support: number; // 0-100
  tactics: string[];
}

export interface CampaignChapter {
  id: string;
  number: number;
  title: string;
  description: string;
  story: ChapterStory;
  missions: string[];
  unlockConditions: string[];
  rewards: ChapterReward[];
  isCompleted: boolean;
  completionPercentage: number;
}

export interface ChapterStory {
  intro: StoryBeat[];
  missions: StoryBeat[];
  outro: StoryBeat[];
  characterDevelopment: CharacterStoryArc[];
  relationshipEvents: RelationshipEvent[];
}

export interface StoryBeat {
  id: string;
  type: 'cutscene' | 'dialogue' | 'action' | 'choice';
  character?: string;
  text: string;
  emotion?: string;
  background?: string;
  music?: string;
  duration?: number;
  choices?: StoryChoice[];
  consequences?: StoryConsequence[];
}

export interface StoryChoice {
  id: string;
  text: string;
  requirements?: string[];
  consequences: StoryConsequence[];
}

export interface StoryConsequence {
  type: 'relationship' | 'reputation' | 'unlock' | 'item';
  target: string;
  value: number;
  description: string;
}

export interface CharacterStoryArc {
  characterId: string;
  arcType: 'development' | 'relationship' | 'conflict' | 'resolution';
  beats: StoryBeat[];
  unlockConditions: string[];
  rewards: CharacterReward[];
}

export interface RelationshipEvent {
  id: string;
  participants: string[];
  type: 'bonding' | 'conflict' | 'romance' | 'rivalry';
  story: StoryBeat[];
  consequences: RelationshipConsequence[];
}

export interface RelationshipConsequence {
  character1: string;
  character2: string;
  relationshipChange: number;
  trustChange: number;
  respectChange: number;
  attractionChange: number;
}

export interface ChapterReward {
  type: 'hero' | 'equipment' | 'currency' | 'unlock';
  id: string;
  name: string;
  quantity: number;
  rarity?: string;
  description: string;
}

export interface CharacterReward {
  type: 'skill' | 'ability' | 'stat_boost' | 'unlock';
  id: string;
  name: string;
  description: string;
  value?: number;
}
