export interface Relationship {
  id: string;
  hero1Id: string;
  hero2Id: string;
  affinity: number; // -100 to 100
  relationshipType: 'friendship' | 'rivalry' | 'romance' | 'mentor' | 'student' | 'neutral';
  trust: number; // 0 to 100
  respect: number; // 0 to 100
  attraction: number; // 0 to 100 (for romance)
  sharedExperiences: string[];
  lastInteraction: Date;
  relationshipLevel: 'stranger' | 'acquaintance' | 'friend' | 'close_friend' | 'best_friend' | 'rival' | 'enemy' | 'lover';
}

export interface AffinityEvent {
  id: string;
  hero1Id: string;
  hero2Id: string;
  eventType: 'mission_together' | 'training_session' | 'personal_talk' | 'conflict' | 'support' | 'celebration';
  affinityChange: number;
  trustChange: number;
  respectChange: number;
  attractionChange: number;
  description: string;
  timestamp: Date;
}

export interface CharacterPersonality {
  heroId: string;
  traits: {
    openness: number; // 0-100
    conscientiousness: number; // 0-100
    extraversion: number; // 0-100
    agreeableness: number; // 0-100
    neuroticism: number; // 0-100
  };
  interests: string[];
  fears: string[];
  goals: string[];
  values: string[];
  communicationStyle: 'direct' | 'diplomatic' | 'humorous' | 'analytical' | 'empathetic';
}

export interface SocialInteraction {
  id: string;
  hero1Id: string;
  hero2Id: string;
  interactionType: 'conversation' | 'activity' | 'conflict' | 'support' | 'celebration';
  topic: string;
  choices: {
    option1: string;
    option2: string;
    option3: string;
  };
  consequences: {
    affinityChange: number[];
    trustChange: number[];
    respectChange: number[];
    attractionChange: number[];
  };
  timestamp: Date;
}
