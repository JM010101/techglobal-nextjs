export interface MultiAgentSystem {
  id: string;
  name: string;
  type: 'social' | 'economic' | 'political' | 'environmental';
  agents: Agent[];
  relationships: AgentRelationship[];
  interactions: AgentInteraction[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface Agent {
  id: string;
  name: string;
  type: 'npc' | 'player' | 'environmental' | 'system';
  personality: AgentPersonality;
  state: AgentState;
  capabilities: AgentCapability[];
  goals: AgentGoal[];
  memory: AgentMemory[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface AgentPersonality {
  id: string;
  name: string;
  traits: PersonalityTrait[];
  motivations: Motivation[];
  fears: Fear[];
  preferences: Preference[];
  isActive: boolean;
}

export interface PersonalityTrait {
  id: string;
  name: string;
  intensity: number; // 0-100
  effects: TraitEffect[];
  isActive: boolean;
}

export interface TraitEffect {
  type: 'behavior_modifier' | 'capability_boost' | 'relationship_effect';
  target: string;
  value: number;
  description: string;
}

export interface Motivation {
  id: string;
  name: string;
  strength: number; // 0-100
  type: 'survival' | 'dominance' | 'protection' | 'revenge' | 'curiosity';
  isActive: boolean;
}

export interface Fear {
  id: string;
  name: string;
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

export interface Preference {
  id: string;
  name: string;
  type: 'tactical' | 'social' | 'environmental' | 'aesthetic';
  value: number; // -100 to 100
  strength: number; // 0-100
  isActive: boolean;
}

export interface AgentState {
  id: string;
  health: number;
  energy: number;
  morale: number;
  stress: number;
  position: Position;
  orientation: number;
  velocity: Vector3D;
  isAlive: boolean;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface AgentCapability {
  id: string;
  name: string;
  type: 'combat' | 'movement' | 'social' | 'technical' | 'magical';
  level: number; // 0-100
  experience: number;
  cooldown: number;
  isActive: boolean;
  lastUsed: Date;
}

export interface AgentGoal {
  id: string;
  name: string;
  description: string;
  priority: number; // 0-100
  deadline?: Date;
  progress: number; // 0-100
  isActive: boolean;
  subgoals: AgentGoal[];
  requirements: GoalRequirement[];
}

export interface GoalRequirement {
  id: string;
  name: string;
  type: 'resource' | 'capability' | 'relationship' | 'condition';
  target: string;
  value: number;
  isMet: boolean;
}

export interface AgentMemory {
  id: string;
  type: 'experience' | 'knowledge' | 'emotion' | 'fact';
  content: string;
  importance: number; // 0-100
  timestamp: Date;
  source: string;
  isActive: boolean;
  decayRate: number;
  currentStrength: number;
}

export interface AgentRelationship {
  id: string;
  agent1: string;
  agent2: string;
  type: 'friend' | 'enemy' | 'neutral' | 'ally' | 'rival' | 'romantic';
  strength: number; // -100 to 100
  trust: number; // 0-100
  respect: number; // 0-100
  lastInteraction: Date;
  interactionCount: number;
  isActive: boolean;
}

export interface AgentInteraction {
  id: string;
  agent1: string;
  agent2: string;
  type: 'conversation' | 'trade' | 'combat' | 'cooperation' | 'competition';
  content: string;
  timestamp: Date;
  outcome: InteractionOutcome;
  effects: InteractionEffect[];
  isActive: boolean;
}

export interface InteractionOutcome {
  id: string;
  type: 'success' | 'failure' | 'partial' | 'neutral';
  description: string;
  consequences: InteractionConsequence[];
  isActive: boolean;
}

export interface InteractionConsequence {
  id: string;
  type: 'relationship_change' | 'capability_change' | 'resource_change' | 'state_change';
  target: string;
  value: number;
  description: string;
}

export interface InteractionEffect {
  id: string;
  type: 'relationship_modifier' | 'capability_boost' | 'resource_gain' | 'state_change';
  target: string;
  value: number;
  description: string;
}

export interface SocialNetwork {
  id: string;
  name: string;
  type: 'community' | 'guild' | 'faction' | 'family';
  members: NetworkMember[];
  relationships: NetworkRelationship[];
  activities: NetworkActivity[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface NetworkMember {
  id: string;
  agentId: string;
  role: 'leader' | 'officer' | 'member' | 'recruit';
  joinDate: Date;
  contribution: number;
  isActive: boolean;
}

export interface NetworkRelationship {
  id: string;
  member1: string;
  member2: string;
  type: 'friend' | 'enemy' | 'neutral' | 'ally' | 'rival';
  strength: number; // -100 to 100
  isActive: boolean;
}

export interface NetworkActivity {
  id: string;
  name: string;
  type: 'meeting' | 'celebration' | 'conflict' | 'cooperation';
  participants: string[];
  timestamp: Date;
  outcome: string;
  isActive: boolean;
}

export interface EconomicSystem {
  id: string;
  name: string;
  type: 'market' | 'barter' | 'auction' | 'exchange';
  agents: EconomicAgent[];
  transactions: Transaction[];
  resources: EconomicResource[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface EconomicAgent {
  id: string;
  agentId: string;
  role: 'buyer' | 'seller' | 'trader' | 'producer' | 'consumer';
  resources: EconomicResource[];
  preferences: EconomicPreference[];
  isActive: boolean;
}

export interface EconomicResource {
  id: string;
  name: string;
  type: 'currency' | 'material' | 'service' | 'information';
  quantity: number;
  value: number;
  owner: string;
  isActive: boolean;
}

export interface EconomicPreference {
  id: string;
  name: string;
  type: 'resource' | 'price' | 'quality' | 'brand';
  value: number; // -100 to 100
  strength: number; // 0-100
  isActive: boolean;
}

export interface Transaction {
  id: string;
  buyer: string;
  seller: string;
  resource: string;
  quantity: number;
  price: number;
  timestamp: Date;
  outcome: TransactionOutcome;
  isActive: boolean;
}

export interface TransactionOutcome {
  id: string;
  type: 'success' | 'failure' | 'partial' | 'cancelled';
  description: string;
  consequences: TransactionConsequence[];
  isActive: boolean;
}

export interface TransactionConsequence {
  id: string;
  type: 'resource_change' | 'relationship_change' | 'reputation_change';
  target: string;
  value: number;
  description: string;
}

export interface PoliticalSystem {
  id: string;
  name: string;
  type: 'democracy' | 'autocracy' | 'oligarchy' | 'anarchy';
  agents: PoliticalAgent[];
  relationships: PoliticalRelationship[];
  decisions: PoliticalDecision[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface PoliticalAgent {
  id: string;
  agentId: string;
  role: 'leader' | 'official' | 'citizen' | 'opponent';
  power: number; // 0-100
  influence: number; // 0-100
  isActive: boolean;
}

export interface PoliticalRelationship {
  id: string;
  agent1: string;
  agent2: string;
  type: 'ally' | 'enemy' | 'neutral' | 'rival' | 'supporter';
  strength: number; // -100 to 100
  isActive: boolean;
}

export interface PoliticalDecision {
  id: string;
  name: string;
  description: string;
  type: 'policy' | 'law' | 'appointment' | 'resolution';
  proposer: string;
  supporters: string[];
  opponents: string[];
  timestamp: Date;
  outcome: DecisionOutcome;
  isActive: boolean;
}

export interface DecisionOutcome {
  id: string;
  type: 'passed' | 'failed' | 'postponed' | 'amended';
  description: string;
  consequences: DecisionConsequence[];
  isActive: boolean;
}

export interface DecisionConsequence {
  id: string;
  type: 'power_change' | 'relationship_change' | 'resource_change' | 'state_change';
  target: string;
  value: number;
  description: string;
}

export interface EnvironmentalSystem {
  id: string;
  name: string;
  type: 'ecosystem' | 'weather' | 'geological' | 'biological';
  agents: EnvironmentalAgent[];
  processes: EnvironmentalProcess[];
  resources: EnvironmentalResource[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface EnvironmentalAgent {
  id: string;
  name: string;
  type: 'animal' | 'plant' | 'weather' | 'geological';
  state: EnvironmentalState;
  behaviors: EnvironmentalBehavior[];
  isActive: boolean;
}

export interface EnvironmentalState {
  id: string;
  health: number;
  energy: number;
  position: Position;
  isActive: boolean;
  lastUpdate: Date;
}

export interface EnvironmentalBehavior {
  id: string;
  name: string;
  type: 'migration' | 'reproduction' | 'feeding' | 'defense';
  frequency: number;
  isActive: boolean;
}

export interface EnvironmentalProcess {
  id: string;
  name: string;
  type: 'growth' | 'decay' | 'migration' | 'reproduction';
  rate: number;
  isActive: boolean;
}

export interface EnvironmentalResource {
  id: string;
  name: string;
  type: 'food' | 'water' | 'shelter' | 'mate';
  quantity: number;
  position: Position;
  isAvailable: boolean;
  respawnTime?: number;
}

export interface EmergentBehavior {
  id: string;
  name: string;
  description: string;
  type: 'flocking' | 'swarming' | 'herding' | 'hunting' | 'cooperation';
  agents: string[];
  rules: BehaviorRule[];
  isActive: boolean;
  lastObserved: Date;
}

export interface BehaviorRule {
  id: string;
  name: string;
  type: 'attraction' | 'repulsion' | 'alignment' | 'separation';
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface SystemDynamics {
  id: string;
  name: string;
  type: 'feedback' | 'oscillation' | 'chaos' | 'equilibrium';
  variables: SystemVariable[];
  equations: SystemEquation[];
  isActive: boolean;
  lastUpdate: Date;
}

export interface SystemVariable {
  id: string;
  name: string;
  type: 'state' | 'rate' | 'parameter';
  value: number;
  isActive: boolean;
}

export interface SystemEquation {
  id: string;
  name: string;
  type: 'differential' | 'difference' | 'algebraic';
  equation: string;
  isActive: boolean;
}

export interface AgentCommunication {
  id: string;
  sender: string;
  receiver: string;
  type: 'message' | 'signal' | 'gesture' | 'emotion';
  content: string;
  timestamp: Date;
  effectiveness: number; // 0-100
  isActive: boolean;
}

export interface AgentLearning {
  id: string;
  agentId: string;
  type: 'reinforcement' | 'supervised' | 'unsupervised';
  experience: LearningExperience[];
  knowledge: LearningKnowledge[];
  skills: LearningSkill[];
  isActive: boolean;
  lastLearning: Date;
}

export interface LearningExperience {
  id: string;
  type: 'success' | 'failure' | 'neutral';
  context: string;
  outcome: string;
  timestamp: Date;
  importance: number; // 0-100
  isActive: boolean;
}

export interface LearningKnowledge {
  id: string;
  name: string;
  type: 'factual' | 'procedural' | 'conditional' | 'declarative';
  confidence: number; // 0-100
  source: string;
  lastVerified: Date;
  isActive: boolean;
}

export interface LearningSkill {
  id: string;
  name: string;
  type: 'combat' | 'movement' | 'social' | 'technical';
  level: number; // 0-100
  experience: number;
  mastery: number; // 0-100
  isActive: boolean;
}
