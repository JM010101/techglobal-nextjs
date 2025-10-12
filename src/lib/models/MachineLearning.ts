export interface MLSystem {
  id: string;
  name: string;
  type: 'supervised' | 'unsupervised' | 'reinforcement' | 'deep_learning';
  algorithm: MLAlgorithm;
  model: MLModel;
  trainingData: TrainingData[];
  performance: MLPerformance;
  isActive: boolean;
  lastTrained: Date;
  learningRate: number;
  adaptationRate: number;
}

export interface MLAlgorithm {
  id: string;
  name: string;
  type: 'neural_network' | 'decision_tree' | 'svm' | 'random_forest' | 'q_learning' | 'genetic_algorithm';
  parameters: AlgorithmParameters;
  isActive: boolean;
  version: string;
  lastUpdated: Date;
}

export interface AlgorithmParameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  hiddenLayers: number[];
  activationFunction: string;
  optimizer: string;
  regularization: number;
  dropout: number;
  momentum: number;
  decay: number;
}

export interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'reinforcement';
  architecture: ModelArchitecture;
  weights: ModelWeights;
  biases: ModelBiases;
  isActive: boolean;
  version: string;
  lastTrained: Date;
  accuracy: number;
  loss: number;
}

export interface ModelArchitecture {
  inputLayer: Layer;
  hiddenLayers: Layer[];
  outputLayer: Layer;
  connections: Connection[];
  activationFunctions: ActivationFunction[];
}

export interface Layer {
  id: string;
  name: string;
  type: 'input' | 'hidden' | 'output';
  size: number;
  activation: string;
  isActive: boolean;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
}

export interface ActivationFunction {
  id: string;
  name: string;
  type: 'relu' | 'sigmoid' | 'tanh' | 'softmax' | 'linear';
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ModelWeights {
  id: string;
  weights: number[][];
  lastUpdated: Date;
  version: string;
}

export interface ModelBiases {
  id: string;
  biases: number[];
  lastUpdated: Date;
  version: string;
}

export interface TrainingData {
  id: string;
  input: DataPoint;
  output: DataPoint;
  label?: string;
  timestamp: Date;
  source: 'player_action' | 'enemy_behavior' | 'environment' | 'manual';
  quality: number; // 0-100
  isActive: boolean;
}

export interface DataPoint {
  id: string;
  features: Feature[];
  timestamp: Date;
  source: string;
  quality: number;
}

export interface Feature {
  id: string;
  name: string;
  type: 'numerical' | 'categorical' | 'text' | 'image' | 'audio';
  value: unknown;
  importance: number; // 0-100
  isActive: boolean;
}

export interface MLPerformance {
  id: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  loss: number;
  trainingTime: number;
  predictionTime: number;
  lastEvaluation: Date;
  metrics: PerformanceMetric[];
}

export interface PerformanceMetric {
  id: string;
  name: string;
  type: 'accuracy' | 'precision' | 'recall' | 'f1_score' | 'loss' | 'custom';
  value: number;
  timestamp: Date;
  isActive: boolean;
}

export interface PlayerBehaviorAnalysis {
  id: string;
  playerId: string;
  behaviorPatterns: BehaviorPattern[];
  preferences: PlayerPreference[];
  playstyle: Playstyle;
  skillLevel: SkillLevel;
  engagement: Engagement;
  isActive: boolean;
  lastAnalysis: Date;
}

export interface BehaviorPattern {
  id: string;
  name: string;
  description: string;
  type: 'combat' | 'exploration' | 'social' | 'resource_management';
  frequency: number;
  confidence: number; // 0-100
  isActive: boolean;
  lastObserved: Date;
}

export interface PlayerPreference {
  id: string;
  name: string;
  type: 'difficulty' | 'content' | 'social' | 'aesthetic';
  value: number; // -100 to 100
  strength: number; // 0-100
  isActive: boolean;
  lastUpdated: Date;
}

export interface Playstyle {
  id: string;
  name: string;
  type: 'aggressive' | 'defensive' | 'tactical' | 'explorative' | 'social';
  characteristics: PlaystyleCharacteristic[];
  isActive: boolean;
  confidence: number; // 0-100
}

export interface PlaystyleCharacteristic {
  id: string;
  name: string;
  description: string;
  value: number; // 0-100
  isActive: boolean;
}

export interface SkillLevel {
  id: string;
  overall: number; // 0-100
  combat: number; // 0-100
  strategy: number; // 0-100
  social: number; // 0-100
  technical: number; // 0-100
  isActive: boolean;
  lastAssessed: Date;
}

export interface Engagement {
  id: string;
  level: number; // 0-100
  factors: EngagementFactor[];
  isActive: boolean;
  lastMeasured: Date;
}

export interface EngagementFactor {
  id: string;
  name: string;
  type: 'content' | 'social' | 'challenge' | 'reward';
  impact: number; // -100 to 100
  isActive: boolean;
}

export interface AdaptiveContentGeneration {
  id: string;
  name: string;
  type: 'mission' | 'story' | 'encounter' | 'dialogue';
  generator: ContentGenerator;
  constraints: ContentConstraint[];
  isActive: boolean;
  lastGenerated: Date;
}

export interface ContentGenerator {
  id: string;
  name: string;
  type: 'procedural' | 'template_based' | 'ai_generated' | 'hybrid';
  algorithm: string;
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface ContentConstraint {
  id: string;
  name: string;
  type: 'difficulty' | 'duration' | 'theme' | 'player_level';
  value: unknown;
  isActive: boolean;
}

export interface PredictiveAnalytics {
  id: string;
  name: string;
  type: 'engagement' | 'churn' | 'spending' | 'content_preference';
  model: MLModel;
  predictions: Prediction[];
  accuracy: number;
  isActive: boolean;
  lastPrediction: Date;
}

export interface Prediction {
  id: string;
  type: string;
  value: number;
  confidence: number; // 0-100
  timestamp: Date;
  isActive: boolean;
}

export interface AITraining {
  id: string;
  name: string;
  type: 'supervised' | 'unsupervised' | 'reinforcement';
  dataset: TrainingDataset;
  algorithm: MLAlgorithm;
  parameters: TrainingParameters;
  isActive: boolean;
  lastTrained: Date;
  status: 'pending' | 'training' | 'completed' | 'failed';
}

export interface TrainingDataset {
  id: string;
  name: string;
  type: 'player_behavior' | 'enemy_behavior' | 'environmental' | 'social';
  data: TrainingData[];
  size: number;
  quality: number; // 0-100
  isActive: boolean;
  lastUpdated: Date;
}

export interface TrainingParameters {
  id: string;
  learningRate: number;
  batchSize: number;
  epochs: number;
  validationSplit: number;
  earlyStopping: boolean;
  regularization: number;
  isActive: boolean;
}

export interface AIOptimization {
  id: string;
  name: string;
  type: 'performance' | 'accuracy' | 'efficiency' | 'adaptability';
  target: OptimizationTarget;
  constraints: OptimizationConstraint[];
  isActive: boolean;
  lastOptimized: Date;
}

export interface OptimizationTarget {
  id: string;
  name: string;
  type: 'minimize' | 'maximize';
  metric: string;
  value: number;
  isActive: boolean;
}

export interface OptimizationConstraint {
  id: string;
  name: string;
  type: 'resource' | 'performance' | 'quality' | 'time';
  value: number;
  isActive: boolean;
}

export interface LearningProgress {
  id: string;
  systemId: string;
  type: 'accuracy' | 'performance' | 'adaptation';
  progress: number; // 0-100
  milestones: Milestone[];
  isActive: boolean;
  lastUpdated: Date;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  target: number;
  achieved: boolean;
  timestamp?: Date;
  isActive: boolean;
}

export interface AIInsights {
  id: string;
  name: string;
  type: 'behavior' | 'performance' | 'engagement' | 'content';
  insight: string;
  confidence: number; // 0-100
  impact: number; // -100 to 100
  recommendations: Recommendation[];
  isActive: boolean;
  lastGenerated: Date;
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  type: 'content' | 'difficulty' | 'social' | 'technical';
  priority: number; // 0-100
  isActive: boolean;
  isImplemented: boolean;
}

export interface AdaptiveDifficulty {
  id: string;
  name: string;
  type: 'combat' | 'puzzle' | 'social' | 'exploration';
  algorithm: string;
  parameters: DifficultyParameters;
  isActive: boolean;
  lastAdjusted: Date;
}

export interface DifficultyParameters {
  id: string;
  baseDifficulty: number; // 0-100
  adjustmentRate: number;
  playerSkillWeight: number;
  contentComplexityWeight: number;
  isActive: boolean;
}

export interface AIEthics {
  id: string;
  name: string;
  type: 'fairness' | 'transparency' | 'privacy' | 'bias';
  guidelines: EthicsGuideline[];
  isActive: boolean;
  lastReviewed: Date;
}

export interface EthicsGuideline {
  id: string;
  name: string;
  description: string;
  type: 'rule' | 'principle' | 'constraint';
  isActive: boolean;
  enforcement: string;
}
