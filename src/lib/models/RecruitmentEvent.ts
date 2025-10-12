export interface RecruitmentEvent {
  id: string;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  requirements: {
    baseLevel: number;
    completedMissions: number;
  };
  candidate: {
    name: string;
    codename: string;
    role: string;
    rarity: string;
    personality: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    };
    background: string;
    motivation: string;
  };
  interviewQuestions: InterviewQuestion[];
  personalityTest: {
    questions: PersonalityQuestion[];
  };
  rewards: {
    success: {
      hero: string;
      credits: number;
      materials: number;
    };
    failure: {
      credits: number;
      materials: number;
    };
  };
}

export interface InterviewQuestion {
  id: string;
  question: string;
  options: InterviewOption[];
}

export interface InterviewOption {
  text: string;
  personalityImpact: Record<string, number>;
  response: string;
}

export interface PersonalityQuestion {
  id: string;
  question: string;
  options: PersonalityOption[];
}

export interface PersonalityOption {
  text: string;
  traits: string[];
}
