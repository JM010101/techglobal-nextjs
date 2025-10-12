export interface StoryMission {
  id: string;
  title: string;
  description: string;
  type: 'main_story' | 'character_story' | 'relationship_story' | 'base_story' | 'recruitment_story';
  chapter: number;
  section: number;
  requirements: {
    heroLevel?: number;
    relationshipLevel?: number;
    baseFacilityLevel?: number;
    completedMissions?: string[];
    characterDevelopment?: number;
  };
  rewards: {
    experience: number;
    credits: number;
    materials: number;
    relationshipPoints?: number;
    characterDevelopment?: number;
    unlockHero?: string;
    unlockFacility?: string;
  };
  storyBeats: StoryBeat[];
  choices: StoryChoice[];
  consequences: StoryConsequence[];
  unlockConditions: string[];
  isRepeatable: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  estimatedDuration: number; // in minutes
}

export interface StoryBeat {
  id: string;
  type: 'dialogue' | 'action' | 'cutscene' | 'choice' | 'narration';
  character?: string;
  text: string;
  emotion?: 'happy' | 'sad' | 'angry' | 'confused' | 'excited' | 'worried' | 'determined';
  background?: string;
  music?: string;
  animation?: string;
  duration?: number;
  nextBeatId?: string;
  conditions?: string[];
  choices?: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  text: string;
  requirements?: {
    relationshipLevel?: number;
    characterTrait?: string;
    previousChoice?: string;
  };
  consequences: {
    relationshipChange?: number;
    characterDevelopment?: number;
    storyBranch?: string;
    unlockMission?: string;
  };
  nextBeatId?: string;
}

export interface StoryConsequence {
  id: string;
  type: 'relationship' | 'character_development' | 'story_unlock' | 'resource' | 'facility';
  target: string;
  value: number;
  description: string;
  isPermanent: boolean;
}

export interface StoryBranch {
  id: string;
  name: string;
  description: string;
  unlockConditions: string[];
  missions: string[];
  isMainBranch: boolean;
  affectsEnding: boolean;
}

export interface StoryEvent {
  id: string;
  name: string;
  description: string;
  type: 'celebration' | 'conflict' | 'discovery' | 'loss' | 'victory' | 'mystery';
  participants: string[];
  location: string;
  storyBeats: StoryBeat[];
  consequences: StoryConsequence[];
  unlockConditions: string[];
  isRepeatable: boolean;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'random';
}
