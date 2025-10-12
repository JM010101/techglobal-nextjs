export interface ContentGenerationSystem {
  id: string;
  name: string;
  type: 'procedural' | 'template_based' | 'ai_generated' | 'hybrid';
  generators: ContentGenerator[];
  templates: ContentTemplate[];
  constraints: ContentConstraint[];
  isActive: boolean;
  lastGenerated: Date;
}

export interface ContentGenerator {
  id: string;
  name: string;
  type: 'mission' | 'story' | 'encounter' | 'dialogue' | 'environment' | 'character';
  algorithm: string;
  parameters: GeneratorParameters;
  isActive: boolean;
  lastUsed: Date;
  successRate: number;
}

export interface GeneratorParameters {
  id: string;
  complexity: number; // 0-100
  duration: number; // in minutes
  difficulty: number; // 0-100
  theme: string;
  playerLevel: number;
  isActive: boolean;
}

export interface ContentTemplate {
  id: string;
  name: string;
  type: 'mission' | 'story' | 'encounter' | 'dialogue' | 'environment' | 'character';
  structure: TemplateStructure;
  variables: TemplateVariable[];
  isActive: boolean;
  usageCount: number;
  successRate: number;
}

export interface TemplateStructure {
  id: string;
  name: string;
  sections: TemplateSection[];
  connections: TemplateConnection[];
  isActive: boolean;
}

export interface TemplateSection {
  id: string;
  name: string;
  type: 'intro' | 'main' | 'outro' | 'choice' | 'action';
  content: string;
  variables: string[];
  isActive: boolean;
}

export interface TemplateConnection {
  id: string;
  from: string;
  to: string;
  type: 'linear' | 'branch' | 'loop' | 'condition';
  condition?: string;
  isActive: boolean;
}

export interface TemplateVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'list' | 'object';
  defaultValue: unknown;
  constraints: VariableConstraint[];
  isActive: boolean;
}

export interface VariableConstraint {
  id: string;
  name: string;
  type: 'min' | 'max' | 'pattern' | 'enum' | 'custom';
  value: unknown;
  isActive: boolean;
}

export interface ContentConstraint {
  id: string;
  name: string;
  type: 'difficulty' | 'duration' | 'theme' | 'player_level' | 'content_rating';
  value: unknown;
  isActive: boolean;
  enforcement: 'strict' | 'suggestive' | 'optional';
}

export interface ProceduralMission {
  id: string;
  name: string;
  description: string;
  type: 'eliminate' | 'protect' | 'collect' | 'reach' | 'survive' | 'stealth';
  objectives: MissionObjective[];
  environment: ProceduralEnvironment;
  enemies: ProceduralEnemy[];
  rewards: MissionReward[];
  difficulty: number; // 0-100
  estimatedDuration: number; // in minutes
  isActive: boolean;
  generatedAt: Date;
}

export interface MissionObjective {
  id: string;
  name: string;
  description: string;
  type: 'primary' | 'secondary' | 'bonus';
  progress: number; // 0-100
  isCompleted: boolean;
  requirements: ObjectiveRequirement[];
}

export interface ObjectiveRequirement {
  id: string;
  name: string;
  type: 'kill' | 'collect' | 'reach' | 'survive' | 'stealth';
  target: string;
  quantity: number;
  isMet: boolean;
}

export interface ProceduralEnvironment {
  id: string;
  name: string;
  type: 'urban' | 'rural' | 'industrial' | 'natural' | 'underground' | 'space';
  layout: EnvironmentLayout;
  hazards: EnvironmentHazard[];
  cover: EnvironmentCover[];
  resources: EnvironmentResource[];
  lighting: EnvironmentLighting;
  weather: EnvironmentWeather;
  isActive: boolean;
}

export interface EnvironmentLayout {
  id: string;
  name: string;
  type: 'linear' | 'open' | 'maze' | 'multi_level';
  rooms: EnvironmentRoom[];
  connections: EnvironmentConnection[];
  isActive: boolean;
}

export interface EnvironmentRoom {
  id: string;
  name: string;
  type: 'combat' | 'stealth' | 'social' | 'exploration';
  size: number;
  position: Position;
  isActive: boolean;
}

export interface EnvironmentConnection {
  id: string;
  from: string;
  to: string;
  type: 'door' | 'corridor' | 'stair' | 'elevator';
  isActive: boolean;
}

export interface EnvironmentHazard {
  id: string;
  name: string;
  type: 'fire' | 'electric' | 'toxic' | 'explosive' | 'falling';
  position: Position;
  radius: number;
  damage: number;
  duration: number;
  isActive: boolean;
}

export interface EnvironmentCover {
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

export interface EnvironmentResource {
  id: string;
  name: string;
  type: 'ammo' | 'health' | 'energy' | 'information' | 'material';
  quantity: number;
  position: Position;
  isAvailable: boolean;
  respawnTime?: number;
}

export interface EnvironmentLighting {
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

export interface EnvironmentWeather {
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

export interface ProceduralEnemy {
  id: string;
  name: string;
  type: 'grunt' | 'elite' | 'boss' | 'specialist';
  level: number;
  health: number;
  maxHealth: number;
  position: Position;
  behavior: EnemyBehavior;
  equipment: EnemyEquipment[];
  abilities: EnemyAbility[];
  isActive: boolean;
}

export interface EnemyBehavior {
  id: string;
  name: string;
  type: 'aggressive' | 'defensive' | 'tactical' | 'stealth' | 'support';
  aggression: number; // 0-100
  caution: number; // 0-100
  intelligence: number; // 0-100
  isActive: boolean;
}

export interface EnemyEquipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  level: number;
  isActive: boolean;
}

export interface EnemyAbility {
  id: string;
  name: string;
  type: 'combat' | 'movement' | 'special';
  level: number;
  cooldown: number;
  isActive: boolean;
}

export interface MissionReward {
  id: string;
  name: string;
  type: 'experience' | 'currency' | 'item' | 'unlock';
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isActive: boolean;
}

export interface ProceduralStory {
  id: string;
  name: string;
  description: string;
  type: 'main' | 'side' | 'character' | 'world';
  beats: StoryBeat[];
  characters: StoryCharacter[];
  locations: StoryLocation[];
  themes: StoryTheme[];
  isActive: boolean;
  generatedAt: Date;
}

export interface StoryBeat {
  id: string;
  name: string;
  description: string;
  type: 'dialogue' | 'action' | 'choice' | 'cutscene';
  content: string;
  choices: StoryChoice[];
  consequences: StoryConsequence[];
  isActive: boolean;
}

export interface StoryChoice {
  id: string;
  text: string;
  consequences: StoryConsequence[];
  isActive: boolean;
}

export interface StoryConsequence {
  id: string;
  type: 'relationship' | 'story' | 'gameplay' | 'unlock';
  target: string;
  value: number;
  description: string;
}

export interface StoryCharacter {
  id: string;
  name: string;
  description: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'neutral';
  personality: CharacterPersonality;
  relationships: CharacterRelationship[];
  isActive: boolean;
}

export interface CharacterPersonality {
  id: string;
  traits: PersonalityTrait[];
  motivations: CharacterMotivation[];
  fears: CharacterFear[];
  isActive: boolean;
}

export interface PersonalityTrait {
  id: string;
  name: string;
  intensity: number; // 0-100
  isActive: boolean;
}

export interface CharacterMotivation {
  id: string;
  name: string;
  strength: number; // 0-100
  isActive: boolean;
}

export interface CharacterFear {
  id: string;
  name: string;
  intensity: number; // 0-100
  isActive: boolean;
}

export interface CharacterRelationship {
  id: string;
  target: string;
  type: 'friend' | 'enemy' | 'neutral' | 'romantic';
  strength: number; // -100 to 100
  isActive: boolean;
}

export interface StoryLocation {
  id: string;
  name: string;
  description: string;
  type: 'urban' | 'rural' | 'industrial' | 'natural' | 'underground' | 'space';
  atmosphere: LocationAtmosphere;
  isActive: boolean;
}

export interface LocationAtmosphere {
  id: string;
  mood: string;
  lighting: string;
  weather: string;
  isActive: boolean;
}

export interface StoryTheme {
  id: string;
  name: string;
  description: string;
  intensity: number; // 0-100
  isActive: boolean;
}

export interface ProceduralDialogue {
  id: string;
  name: string;
  description: string;
  type: 'conversation' | 'monologue' | 'narration' | 'choice';
  lines: DialogueLine[];
  characters: DialogueCharacter[];
  isActive: boolean;
  generatedAt: Date;
}

export interface DialogueLine {
  id: string;
  character: string;
  text: string;
  emotion: string;
  tone: string;
  isActive: boolean;
}

export interface DialogueCharacter {
  id: string;
  name: string;
  personality: string;
  speakingStyle: string;
  isActive: boolean;
}

export interface ContentQuality {
  id: string;
  name: string;
  type: 'coherence' | 'engagement' | 'difficulty' | 'originality';
  score: number; // 0-100
  feedback: QualityFeedback[];
  isActive: boolean;
  lastEvaluated: Date;
}

export interface QualityFeedback {
  id: string;
  type: 'positive' | 'negative' | 'suggestion';
  message: string;
  isActive: boolean;
}

export interface ContentValidation {
  id: string;
  name: string;
  type: 'safety' | 'appropriateness' | 'coherence' | 'completeness';
  rules: ValidationRule[];
  isActive: boolean;
  lastValidated: Date;
}

export interface ValidationRule {
  id: string;
  name: string;
  type: 'content_rating' | 'language' | 'violence' | 'themes';
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ContentPersonalization {
  id: string;
  name: string;
  type: 'difficulty' | 'theme' | 'length' | 'complexity';
  playerProfile: PlayerProfile;
  preferences: PlayerPreference[];
  isActive: boolean;
  lastPersonalized: Date;
}

export interface PlayerProfile {
  id: string;
  name: string;
  skillLevel: number; // 0-100
  preferences: PlayerPreference[];
  playstyle: string;
  isActive: boolean;
  lastUpdated: Date;
}

export interface PlayerPreference {
  id: string;
  name: string;
  type: 'difficulty' | 'theme' | 'length' | 'complexity';
  value: number; // -100 to 100
  isActive: boolean;
}
