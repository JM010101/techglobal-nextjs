import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import heroesData from '@/data/heroes.json';
import { Relationship, AffinityEvent, SocialInteraction } from '@/lib/models/Relationship';
import { StoryMission, StoryEvent, StoryBeat } from '@/lib/models/StoryMission';

export interface Hero {
  id: string;
  codename: string;
  role: string;
  weapon: string;
  rarity: string;
  description: string;
  level: number;
  xp: number;
  currentHp: number;
  base_stats: {
    hp: number;
    atk: number;
    def: number;
    crit: number;
    speed: number;
  };
  skills: Array<{
    id: string;
    name: string;
    type: string;
    cooldown: number;
    description: string;
    currentCooldown?: number;
    [key: string]: unknown;
  }>;
  ultimate: {
    id: string;
    name: string;
    description: string;
    charge_required: number;
    currentCharge?: number;
    [key: string]: unknown;
  };
  synergy_tags: string[];
}

export interface Enemy {
  id: string;
  name: string;
  archetype: string;
  hp: number;
  currentHp: number;
  atk: number;
  def: number;
  speed: number;
  position?: { row: number; col: number };
  [key: string]: unknown;
}

export interface GameState {
  // Player Resources
  credits: number;
  signalKeys: number;
  modCores: number;
  
  // Heroes
  ownedHeroes: Hero[];
  currentSquad: string[]; // Array of hero IDs (max 3)
  
  // Progress
  currentChapter: number;
  currentSection: number;
  completedMissions: string[]; // Array of "chapter_section" strings
  
  // Battle State
  inBattle: boolean;
  currentMission: unknown;
  battleHeroes: Hero[];
  battleEnemies: Enemy[];
  currentTurn: number;
  selectedUnit: { type: 'hero' | 'enemy'; index: number } | null;
  
  // Gacha
  gachaPityCounter: number;
  gachaHistory: Array<{ heroId: string; timestamp: number; rarity: string }>;
  
  // Relationships & Social
  relationships: Relationship[];
  affinityEvents: AffinityEvent[];
  socialInteractions: SocialInteraction[];
  currentSocialInteraction: SocialInteraction | null;
  
  // Character Development
  characterBackstories: Record<string, unknown>;
  personalQuests: Record<string, unknown>;
  characterDevelopmentArcs: Record<string, unknown>;
  unlockedBackstories: string[];
  completedPersonalQuests: string[];
  characterDevelopmentStage: Record<string, number>;
  
  // Base Management & Daily Life
  baseFacilities: Record<string, number>; // facilityId -> level
  heroNeeds: Record<string, {
    morale: { current: number; max: number };
    health: { current: number; max: number };
    stress: { current: number; max: number };
    social: { current: number; max: number };
  }>;
  dailyRoutines: Record<string, string[]>; // heroId -> routine activities
  currentDay: number;
  currentTime: number; // 0-24 hours
  baseMaterials: number;
  
  // Story & Narrative State
  currentStoryMission: StoryMission | null;
  activeStoryBeats: StoryBeat[];
  storyProgress: number;
  storyChoices: Record<string, string>;
  storyBranches: string[];
  triggeredEvents: string[];
  storyUnlocks: string[];
  
  // UI State
  currentScreen: 'home' | 'squad' | 'battle' | 'recruitment' | 'hero-detail' | 'shop' | 'dialogue' | 'social' | 'character-development' | 'base-management' | 'recruitment-event' | 'story';
  selectedHeroForDetail: string | null;
  
  // Actions
  addCredits: (amount: number) => void;
  addSignalKeys: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
  spendSignalKeys: (amount: number) => boolean;
  
  addHero: (heroId: string) => void;
  setSquad: (heroIds: string[]) => void;
  levelUpHero: (heroId: string) => void;
  addHeroXP: (heroId: string, xp: number) => void;
  
  setCurrentScreen: (screen: GameState['currentScreen']) => void;
  setSelectedHeroForDetail: (heroId: string | null) => void;
  
  startMission: (chapter: number, section: number) => void;
  completeMission: (rewards: Record<string, unknown>) => void;
  
  performGacha: () => Hero | null;
  
  // Relationship Actions
  updateRelationship: (hero1Id: string, hero2Id: string, changes: Partial<Relationship>) => void;
  addAffinityEvent: (event: AffinityEvent) => void;
  startSocialInteraction: (interaction: SocialInteraction) => void;
  completeSocialInteraction: (choice: number) => void;
  getRelationship: (hero1Id: string, hero2Id: string) => Relationship | null;
  getHeroRelationships: (heroId: string) => Relationship[];
  
  // Character Development Actions
  unlockBackstory: (heroId: string, chapter: number) => void;
  completePersonalQuest: (heroId: string, questId: string) => void;
  advanceCharacterDevelopment: (heroId: string, stage: number) => void;
  getCharacterBackstory: (heroId: string) => unknown;
  getPersonalQuests: (heroId: string) => unknown[];
  getCharacterDevelopmentArc: (heroId: string) => unknown;
  
  // Base Management Actions
  upgradeFacility: (facilityId: string) => boolean;
  assignHeroToActivity: (heroId: string, activityId: string) => void;
  updateHeroNeeds: (heroId: string, needs: Partial<{
    morale: { current: number; max: number };
    health: { current: number; max: number };
    stress: { current: number; max: number };
    social: { current: number; max: number };
  }>) => void;
  advanceTime: (hours: number) => void;
  getFacilityLevel: (facilityId: string) => number;
  getHeroNeeds: (heroId: string) => unknown;
  
  // Story & Narrative Actions
  startStoryMission: (missionId: string) => void;
  completeStoryMission: (missionId: string) => void;
  setCurrentStoryMission: (mission: StoryMission | null) => void;
  triggerStoryEvent: (eventId: string) => void;
  makeStoryChoice: (choiceId: string, consequence: unknown) => void;
  unlockStoryBranch: (branchId: string) => void;
  getAvailableMissions: () => StoryMission[];
  getAvailableEvents: () => StoryEvent[];
  
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

const initialState = {
  credits: 10000,
  signalKeys: 10,
  modCores: 0,
  ownedHeroes: [
    { ...heroesData[0], level: 1, xp: 0, currentHp: heroesData[0].base_stats.hp }
  ] as Hero[],
  currentSquad: [heroesData[0].id],
  currentChapter: 1,
  currentSection: 1,
  completedMissions: [],
  inBattle: false,
  currentMission: null,
  battleHeroes: [],
  battleEnemies: [],
  currentTurn: 0,
  selectedUnit: null,
  gachaPityCounter: 0,
  gachaHistory: [],
  relationships: [],
  affinityEvents: [],
  socialInteractions: [],
  currentSocialInteraction: null,
  characterBackstories: {},
  personalQuests: {},
  characterDevelopmentArcs: {},
  unlockedBackstories: [],
  completedPersonalQuests: [],
  characterDevelopmentStage: {},
  baseFacilities: {
    barracks: 1,
    mess_hall: 1,
    training_room: 1,
    recreation: 1,
    medical_bay: 1
  },
  heroNeeds: {},
  dailyRoutines: {},
  currentDay: 1,
  currentTime: 6,
  baseMaterials: 1000,
  
  // Story & Narrative State
  currentStoryMission: null,
  activeStoryBeats: [],
  storyProgress: 0,
  storyChoices: {},
  storyBranches: [],
  triggeredEvents: [],
  storyUnlocks: [],
  
  currentScreen: 'home' as const,
  selectedHeroForDetail: null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
      addSignalKeys: (amount) => set((state) => ({ signalKeys: state.signalKeys + amount })),
      
      spendCredits: (amount) => {
        const state = get();
        if (state.credits >= amount) {
          set({ credits: state.credits - amount });
          return true;
        }
        return false;
      },
      
      spendSignalKeys: (amount) => {
        const state = get();
        if (state.signalKeys >= amount) {
          set({ signalKeys: state.signalKeys - amount });
          return true;
        }
        return false;
      },

      addHero: (heroId) => {
        const heroData = heroesData.find(h => h.id === heroId);
        if (!heroData) return;
        
        const state = get();
        const alreadyOwned = state.ownedHeroes.find(h => h.id === heroId);
        
        if (alreadyOwned) {
          // Convert duplicate to resources
          set({ modCores: state.modCores + (heroData.rarity === 'SSR' ? 50 : heroData.rarity === 'SR' ? 15 : 5) });
        } else {
          const newHero: Hero = {
            ...heroData,
            level: 1,
            xp: 0,
            currentHp: heroData.base_stats.hp,
            skills: heroData.skills.map(s => ({ ...s, currentCooldown: 0 })),
            ultimate: { ...heroData.ultimate, currentCharge: 0 }
          } as Hero;
          
          set({ ownedHeroes: [...state.ownedHeroes, newHero] });
        }
      },

      setSquad: (heroIds) => {
        if (heroIds.length <= 3) {
          set({ currentSquad: heroIds });
        }
      },

      levelUpHero: (heroId) => {
        set((state) => ({
          ownedHeroes: state.ownedHeroes.map(hero => 
            hero.id === heroId 
              ? { 
                  ...hero, 
                  level: hero.level + 1,
                  xp: 0,
                  base_stats: {
                    ...hero.base_stats,
                    hp: Math.floor(hero.base_stats.hp * 1.1),
                    atk: Math.floor(hero.base_stats.atk * 1.1),
                    def: Math.floor(hero.base_stats.def * 1.1),
                  }
                }
              : hero
          )
        }));
      },

      addHeroXP: (heroId, xp) => {
        set((state) => {
          const updatedHeroes = state.ownedHeroes.map(hero => {
            if (hero.id === heroId) {
              const newXp = hero.xp + xp;
              const xpForNextLevel = hero.level * 100;
              
              if (newXp >= xpForNextLevel) {
                return {
                  ...hero,
                  level: hero.level + 1,
                  xp: newXp - xpForNextLevel,
                  base_stats: {
                    ...hero.base_stats,
                    hp: Math.floor(hero.base_stats.hp * 1.1),
                    atk: Math.floor(hero.base_stats.atk * 1.1),
                    def: Math.floor(hero.base_stats.def * 1.1),
                  }
                };
              }
              return { ...hero, xp: newXp };
            }
            return hero;
          });
          
          return { ownedHeroes: updatedHeroes };
        });
      },

      setCurrentScreen: (screen) => set({ currentScreen: screen }),
      setSelectedHeroForDetail: (heroId) => set({ selectedHeroForDetail: heroId }),

      startMission: (chapter, section) => {
        set({ 
          currentChapter: chapter,
          currentSection: section,
          inBattle: true,
          currentTurn: 0,
          currentScreen: 'dialogue'
        });
      },

      completeMission: (rewards) => {
        const state = get();
        const missionId = `${state.currentChapter}_${state.currentSection}`;
        
        set({
          completedMissions: [...state.completedMissions, missionId],
          credits: state.credits + (Number(rewards.credits) || 0),
          signalKeys: state.signalKeys + (Number(rewards.signal_keys) || 0),
          inBattle: false,
        });
        
        // Add XP to squad heroes
        const xp = Number(rewards.xp);
        if (xp) {
          state.currentSquad.forEach(heroId => {
            get().addHeroXP(heroId, xp);
          });
        }
      },

      performGacha: () => {
        const state = get();
        if (!get().spendSignalKeys(1)) return null;
        
        const pity = state.gachaPityCounter + 1;
        let rarity: string;
        
        // Pity system
        if (pity >= 90) {
          rarity = 'SSR';
          set({ gachaPityCounter: 0 });
        } else if (pity >= 50) {
          // Soft pity: increased SSR rate
          const rand = Math.random();
          if (rand < 0.10) {
            rarity = 'SSR';
            set({ gachaPityCounter: 0 });
          } else if (rand < 0.30) {
            rarity = 'SR';
            set({ gachaPityCounter: pity });
          } else {
            rarity = 'R';
            set({ gachaPityCounter: pity });
          }
        } else {
          // Normal rates
          const rand = Math.random();
          if (rand < 0.03) {
            rarity = 'SSR';
            set({ gachaPityCounter: 0 });
          } else if (rand < 0.18) {
            rarity = 'SR';
            set({ gachaPityCounter: pity });
          } else {
            rarity = 'R';
            set({ gachaPityCounter: pity });
          }
        }
        
        // Get random hero of rarity
        const heroesOfRarity = heroesData.filter(h => h.rarity === rarity);
        const randomHeroData = heroesOfRarity[Math.floor(Math.random() * heroesOfRarity.length)];
        
        if (randomHeroData) {
          get().addHero(randomHeroData.id);
          set({
            gachaHistory: [
              { heroId: randomHeroData.id, timestamp: Date.now(), rarity },
              ...state.gachaHistory
            ].slice(0, 100) // Keep last 100
          });
          
          // Return hero with runtime properties
          const fullHero: Hero = {
            ...randomHeroData,
            level: 1,
            xp: 0,
            currentHp: randomHeroData.base_stats.hp,
            skills: randomHeroData.skills.map(s => ({ ...s, currentCooldown: 0 })),
            ultimate: { ...randomHeroData.ultimate, currentCharge: 0 }
          } as Hero;
          
          return fullHero;
        }
        
        return null;
      },

      // Relationship Management
      updateRelationship: (hero1Id, hero2Id, changes) => {
        set((state) => {
          const existingIndex = state.relationships.findIndex(
            r => (r.hero1Id === hero1Id && r.hero2Id === hero2Id) || 
                 (r.hero1Id === hero2Id && r.hero2Id === hero1Id)
          );
          
          if (existingIndex >= 0) {
            const updatedRelationships = [...state.relationships];
            updatedRelationships[existingIndex] = {
              ...updatedRelationships[existingIndex],
              ...changes,
              lastInteraction: new Date()
            };
            return { relationships: updatedRelationships };
          } else {
            const newRelationship: Relationship = {
              id: `${hero1Id}_${hero2Id}`,
              hero1Id,
              hero2Id,
              affinity: 0,
              relationshipType: 'neutral',
              trust: 50,
              respect: 50,
              attraction: 0,
              sharedExperiences: [],
              lastInteraction: new Date(),
              relationshipLevel: 'stranger',
              ...changes
            };
            return { relationships: [...state.relationships, newRelationship] };
          }
        });
      },

      addAffinityEvent: (event) => {
        set((state) => ({
          affinityEvents: [event, ...state.affinityEvents].slice(0, 1000)
        }));
      },

      startSocialInteraction: (interaction) => {
        set({ currentSocialInteraction: interaction });
      },

      completeSocialInteraction: (choice) => {
        const state = get();
        if (!state.currentSocialInteraction) return;
        
        const interaction = state.currentSocialInteraction;
        const consequences = interaction.consequences;
        
        // Apply relationship changes
        get().updateRelationship(
          interaction.hero1Id,
          interaction.hero2Id,
          {
            affinity: Math.max(-100, Math.min(100, 
              (get().getRelationship(interaction.hero1Id, interaction.hero2Id)?.affinity || 0) + 
              consequences.affinityChange[choice - 1]
            )),
            trust: Math.max(0, Math.min(100,
              (get().getRelationship(interaction.hero1Id, interaction.hero2Id)?.trust || 50) + 
              consequences.trustChange[choice - 1]
            )),
            respect: Math.max(0, Math.min(100,
              (get().getRelationship(interaction.hero1Id, interaction.hero2Id)?.respect || 50) + 
              consequences.respectChange[choice - 1]
            )),
            attraction: Math.max(0, Math.min(100,
              (get().getRelationship(interaction.hero1Id, interaction.hero2Id)?.attraction || 0) + 
              consequences.attractionChange[choice - 1]
            ))
          }
        );
        
        // Record the event
        get().addAffinityEvent({
          id: `event_${Date.now()}`,
          hero1Id: interaction.hero1Id,
          hero2Id: interaction.hero2Id,
          eventType: interaction.interactionType as 'mission_together' | 'training_session' | 'personal_talk' | 'conflict' | 'support' | 'celebration',
          affinityChange: consequences.affinityChange[choice - 1],
          trustChange: consequences.trustChange[choice - 1],
          respectChange: consequences.respectChange[choice - 1],
          attractionChange: consequences.attractionChange[choice - 1],
          description: `Social interaction: ${interaction.topic}`,
          timestamp: new Date()
        });
        
        set({ currentSocialInteraction: null });
      },

      getRelationship: (hero1Id, hero2Id) => {
        const state = get();
        return state.relationships.find(
          r => (r.hero1Id === hero1Id && r.hero2Id === hero2Id) || 
               (r.hero1Id === hero2Id && r.hero2Id === hero1Id)
        ) || null;
      },

      getHeroRelationships: (heroId) => {
        const state = get();
        return state.relationships.filter(
          r => r.hero1Id === heroId || r.hero2Id === heroId
        );
      },

      // Character Development Actions
      unlockBackstory: (heroId, chapter) => {
        const backstoryKey = `${heroId}_backstory_chapter_${chapter}`;
        set((state) => ({
          unlockedBackstories: [...state.unlockedBackstories, backstoryKey]
        }));
      },

      completePersonalQuest: (heroId, questId) => {
        set((state) => ({
          completedPersonalQuests: [...state.completedPersonalQuests, questId]
        }));
      },

      advanceCharacterDevelopment: (heroId, stage) => {
        set((state) => ({
          characterDevelopmentStage: {
            ...state.characterDevelopmentStage,
            [heroId]: stage
          }
        }));
      },

      getCharacterBackstory: () => {
        // This would typically load from the backstories data
        return null; // Placeholder
      },

      getPersonalQuests: () => {
        // This would typically load from the personal quests data
        return []; // Placeholder
      },

      getCharacterDevelopmentArc: () => {
        // This would typically load from the development arcs data
        return null; // Placeholder
      },

      // Base Management Actions
      upgradeFacility: (facilityId) => {
        const state = get();
        const currentLevel = state.baseFacilities[facilityId] || 1;
        const maxLevel = 5;
        
        if (currentLevel >= maxLevel) return false;
        
        // Check if player has enough resources (simplified)
        const upgradeCost = 1000 * currentLevel; // Simplified cost calculation
        if (state.credits < upgradeCost || state.baseMaterials < upgradeCost) {
          return false;
        }
        
        set((state) => ({
          baseFacilities: {
            ...state.baseFacilities,
            [facilityId]: currentLevel + 1
          },
          credits: state.credits - upgradeCost,
          baseMaterials: state.baseMaterials - upgradeCost
        }));
        
        return true;
      },

      assignHeroToActivity: (heroId, activityId) => {
        set((state) => ({
          dailyRoutines: {
            ...state.dailyRoutines,
            [heroId]: [...(state.dailyRoutines[heroId] || []), activityId]
          }
        }));
      },

      updateHeroNeeds: (heroId, needs) => {
        set((state) => ({
          heroNeeds: {
            ...state.heroNeeds,
            [heroId]: {
              ...state.heroNeeds[heroId],
              ...needs
            }
          }
        }));
      },

      advanceTime: (hours) => {
        set((state) => {
          const newTime = state.currentTime + hours;
          const newDay = state.currentDay + Math.floor(newTime / 24);
          const finalTime = newTime % 24;
          
          return {
            currentTime: finalTime,
            currentDay: newDay
          };
        });
      },

      getFacilityLevel: (facilityId) => {
        const state = get();
        return state.baseFacilities[facilityId] || 1;
      },

      getHeroNeeds: () => {
        // This would typically load from the hero needs data
        return null; // Placeholder
      },

      // Story & Narrative Actions
      startStoryMission: (missionId) => {
        // Implementation for starting a story mission
        console.log('Starting story mission:', missionId);
      },

      completeStoryMission: (missionId) => {
        set((state) => ({
          completedMissions: [...state.completedMissions, missionId],
          credits: state.credits + 1000, // Example reward
        }));
      },

      setCurrentStoryMission: (mission) => {
        set({ currentStoryMission: mission });
      },

      triggerStoryEvent: (eventId) => {
        set((state) => ({
          triggeredEvents: [...state.triggeredEvents, eventId],
        }));
      },

      makeStoryChoice: (choiceId) => {
        set((state) => ({
          storyChoices: { ...state.storyChoices, [choiceId]: choiceId },
        }));
      },

      unlockStoryBranch: (branchId) => {
        set((state) => ({
          storyBranches: [...state.storyBranches, branchId],
        }));
      },

      getAvailableMissions: () => {
        // This would filter missions based on requirements
        return [];
      },

      getAvailableEvents: () => {
        // This would filter events based on conditions
        return [];
      },

      saveGame: () => {
        // Zustand persist middleware handles this automatically
        console.log('Game saved!');
      },

      loadGame: () => {
        // Zustand persist middleware handles this automatically
        console.log('Game loaded!');
      },

      resetGame: () => {
        set(initialState);
      },
    }),
    {
      name: 'aegis-protocol-save',
    }
  )
);

