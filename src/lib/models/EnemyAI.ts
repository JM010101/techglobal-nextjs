export interface EnemyAI {
  id: string;
  name: string;
  type: 'grunt' | 'elite' | 'boss' | 'specialist';
  personality: EnemyPersonality;
  behaviorTree: BehaviorTree;
  learningState: LearningState;
  socialConnections: SocialConnection[];
  environmentalAwareness: EnvironmentalAwareness;
  combatStyle: CombatStyle;
  tactics: Tactic[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface EnemyPersonality {
  id: string;
  name: string;
  aggression: number; // 0-100
  caution: number; // 0-100
  intelligence: number; // 0-100
  adaptability: number; // 0-100
  socialTendency: number; // 0-100
  learningRate: number; // 0-100
  creativity: number; // 0-100
  riskTolerance: number; // 0-100
  leadership: number; // 0-100
  empathy: number; // 0-100
  traits: EnemyTrait[];
  fears: EnemyFear[];
  motivations: Motivation[];
}

export interface EnemyTrait {
  id: string;
  name: string;
  description: string;
  intensity: number; // 0-100
  effects: TraitEffect[];
  isActive: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface TraitEffect {
  type: 'behavior_modifier' | 'capability_boost' | 'relationship_effect' | 'decision_influence';
  target: string;
  value: number;
  description: string;
}

export interface EnemyFear {
  id: string;
  name: string;
  description: string;
  intensity: number; // 0-100
  triggers: string[];
  effects: FearEffect[];
  isActive: boolean;
}

export interface FearEffect {
  type: 'behavior_modifier' | 'capability_reduction' | 'decision_influence';
  target: string;
  value: number;
  description: string;
}

export interface Motivation {
  id: string;
  name: string;
  description: string;
  strength: number; // 0-100
  type: 'survival' | 'dominance' | 'protection' | 'revenge' | 'curiosity';
  isActive: boolean;
  goals: Goal[];
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  priority: number; // 0-100
  deadline?: Date;
  progress: number; // 0-100
  isActive: boolean;
  subgoals: Goal[];
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  name: string;
  type: 'resource' | 'capability' | 'relationship' | 'condition';
  target: string;
  value: number;
  isMet: boolean;
}

export interface BehaviorTree {
  id: string;
  name: string;
  root: BehaviorNode;
  conditions: Condition[];
  actions: Action[];
  learning: LearningComponent;
  priority: number;
  isActive: boolean;
  successRate: number;
  lastUsed: Date;
}

export interface BehaviorNode {
  id: string;
  type: 'selector' | 'sequence' | 'parallel' | 'decorator' | 'action' | 'condition';
  children: BehaviorNode[];
  condition?: Condition;
  action?: Action;
  decorator?: Decorator;
  successThreshold: number;
  failureThreshold: number;
  timeout: number;
  isRunning: boolean;
  lastResult: 'success' | 'failure' | 'running';
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  type: 'health' | 'distance' | 'ammo' | 'cover' | 'enemy' | 'ally' | 'environment' | 'custom';
  parameters: Record<string, unknown>;
  evaluator: (context: EnemyContext) => boolean;
  weight: number;
  isActive: boolean;
}

export interface Action {
  id: string;
  name: string;
  description: string;
  type: 'move' | 'attack' | 'defend' | 'heal' | 'communicate' | 'custom';
  parameters: Record<string, unknown>;
  executor: (context: EnemyContext) => Promise<ActionResult>;
  duration: number;
  cooldown: number;
  lastExecuted: Date;
  successRate: number;
}

export interface Decorator {
  id: string;
  type: 'repeat' | 'invert' | 'timeout' | 'cooldown' | 'probability';
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface LearningState {
  id: string;
  type: 'reinforcement' | 'supervised' | 'unsupervised';
  learningRate: number;
  experience: Experience[];
  knowledge: Knowledge[];
  skills: Skill[];
  isActive: boolean;
  lastLearning: Date;
  learningProgress: number;
}

export interface Experience {
  id: string;
  type: 'success' | 'failure' | 'neutral';
  context: EnemyContext;
  outcome: ActionResult;
  timestamp: Date;
  importance: number; // 0-100
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  name: string;
  description: string;
  type: 'tactical' | 'social' | 'environmental' | 'strategic';
  confidence: number; // 0-100
  isApplied: boolean;
}

export interface Knowledge {
  id: string;
  name: string;
  description: string;
  type: 'factual' | 'procedural' | 'conditional' | 'declarative';
  confidence: number; // 0-100
  source: string;
  lastVerified: Date;
  isActive: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'combat' | 'movement' | 'social' | 'technical';
  level: number; // 0-100
  experience: number;
  mastery: number; // 0-100
  isActive: boolean;
}

export interface SocialConnection {
  id: string;
  targetEnemy: string;
  type: 'ally' | 'rival' | 'leader' | 'follower' | 'neutral';
  strength: number; // -100 to 100
  trust: number; // 0-100
  respect: number; // 0-100
  lastInteraction: Date;
  interactionCount: number;
  communication: Communication[];
}

export interface Communication {
  id: string;
  type: 'warning' | 'coordination' | 'threat' | 'support' | 'command';
  message: string;
  timestamp: Date;
  target: string;
  effectiveness: number; // 0-100
  response?: string;
}

export interface EnvironmentalAwareness {
  id: string;
  name: string;
  type: 'combat' | 'social' | 'exploration' | 'stealth';
  conditions: EnvironmentalCondition[];
  hazards: Hazard[];
  resources: Resource[];
  cover: Cover[];
  lighting: Lighting;
  weather: Weather;
  timeOfDay: string;
  isActive: boolean;
  lastUpdate: Date;
}

export interface EnvironmentalCondition {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'pressure' | 'radiation' | 'gravity';
  value: number;
  unit: string;
  effects: EnvironmentalEffect[];
  isActive: boolean;
}

export interface EnvironmentalEffect {
  type: 'capability_modifier' | 'health_effect' | 'behavior_influence';
  target: string;
  value: number;
  description: string;
}

export interface Hazard {
  id: string;
  name: string;
  type: 'fire' | 'electric' | 'toxic' | 'explosive' | 'falling';
  position: Position;
  radius: number;
  damage: number;
  duration: number;
  isActive: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'ammo' | 'health' | 'energy' | 'information' | 'material';
  quantity: number;
  position: Position;
  isAvailable: boolean;
  respawnTime?: number;
}

export interface Cover {
  id: string;
  name: string;
  type: 'wall' | 'barrier' | 'vehicle' | 'debris';
  position: Position;
  health: number;
  maxHealth: number;
  coverValue: number; // 0-100
  isDestructible: boolean;
  isActive: boolean;
}

export interface Lighting {
  type: 'bright' | 'normal' | 'dim' | 'dark';
  intensity: number; // 0-100
  color: string;
  shadows: boolean;
  effects: LightingEffect[];
}

export interface LightingEffect {
  type: 'visibility_modifier' | 'stealth_boost' | 'mood_influence';
  target: string;
  value: number;
  description: string;
}

export interface Weather {
  type: 'clear' | 'rain' | 'storm' | 'fog' | 'sandstorm';
  intensity: number; // 0-100
  effects: WeatherEffect[];
  duration: number;
  isActive: boolean;
}

export interface WeatherEffect {
  type: 'visibility_reduction' | 'movement_penalty' | 'accuracy_modifier';
  target: string;
  value: number;
  description: string;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface CombatStyle {
  id: string;
  name: string;
  description: string;
  type: 'aggressive' | 'defensive' | 'tactical' | 'stealth' | 'support';
  characteristics: CombatCharacteristic[];
  preferredWeapons: string[];
  preferredTactics: string[];
  isActive: boolean;
}

export interface CombatCharacteristic {
  id: string;
  name: string;
  description: string;
  type: 'accuracy' | 'damage' | 'speed' | 'endurance' | 'stealth';
  value: number; // 0-100
  isActive: boolean;
}

export interface Tactic {
  id: string;
  name: string;
  description: string;
  type: 'flanking' | 'ambush' | 'retreat' | 'coordination' | 'distraction';
  requirements: TacticRequirement[];
  effects: TacticEffect[];
  successRate: number;
  isActive: boolean;
  lastUsed: Date;
  usageCount: number;
}

export interface TacticRequirement {
  id: string;
  name: string;
  type: 'position' | 'ally' | 'resource' | 'condition';
  target: string;
  value: number;
  isMet: boolean;
}

export interface TacticEffect {
  type: 'damage_boost' | 'accuracy_boost' | 'speed_boost' | 'stealth_boost';
  target: string;
  value: number;
  description: string;
}

export interface EnemyContext {
  id: string;
  timestamp: Date;
  enemy: EnemyAI;
  environment: EnvironmentalAwareness;
  otherEnemies: EnemyAI[];
  players: Player[];
  objectives: Objective[];
  constraints: Constraint[];
  resources: Resource[];
  threats: Threat[];
  opportunities: Opportunity[];
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  health: number;
  capabilities: Capability[];
  isVisible: boolean;
  lastSeen: Date;
  threatLevel: number; // 0-100
}

export interface Capability {
  id: string;
  name: string;
  type: 'combat' | 'movement' | 'social' | 'technical' | 'magical';
  level: number;
  experience: number;
  cooldown: number;
  isActive: boolean;
  lastUsed: Date;
}

export interface Objective {
  id: string;
  name: string;
  description: string;
  type: 'eliminate' | 'protect' | 'collect' | 'reach' | 'survive';
  priority: number; // 0-100
  progress: number; // 0-100
  isCompleted: boolean;
  deadline?: Date;
  requirements: Requirement[];
}

export interface Constraint {
  id: string;
  name: string;
  type: 'time' | 'resource' | 'capability' | 'moral' | 'legal';
  description: string;
  value: number;
  isActive: boolean;
  violationPenalty: number;
}

export interface Threat {
  id: string;
  name: string;
  type: 'player' | 'hazard' | 'environmental' | 'social';
  severity: number; // 0-100
  probability: number; // 0-100
  position: Position;
  isActive: boolean;
  countermeasures: Countermeasure[];
}

export interface Countermeasure {
  id: string;
  name: string;
  type: 'avoid' | 'confront' | 'mitigate' | 'exploit';
  effectiveness: number; // 0-100
  cost: number;
  isAvailable: boolean;
}

export interface Opportunity {
  id: string;
  name: string;
  type: 'tactical' | 'social' | 'resource' | 'information';
  value: number; // 0-100
  probability: number; // 0-100
  position: Position;
  isActive: boolean;
  requirements: Requirement[];
}

export interface ActionResult {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  duration: number;
  cost: number;
  effects: ActionEffect[];
}

export interface ActionEffect {
  type: 'health_change' | 'position_change' | 'capability_change' | 'relationship_change';
  target: string;
  value: number;
  description: string;
}

export interface LearningComponent {
  id: string;
  type: 'reinforcement' | 'supervised' | 'unsupervised';
  learningRate: number;
  experience: Experience[];
  knowledge: Knowledge[];
  skills: Skill[];
  isActive: boolean;
}
