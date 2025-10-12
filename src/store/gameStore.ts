import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import heroesData from '@/data/heroes.json';
import { Relationship, AffinityEvent, SocialInteraction } from '@/lib/models/Relationship';
import { StoryMission, StoryEvent, StoryBeat } from '@/lib/models/StoryMission';
import { CombatState, CombatAction, CoverPosition, BattlefieldTile } from '@/lib/models/Combat';
import { Equipment, Weapon, Armor, Mod } from '@/lib/models/Equipment';
import { Mission, CampaignChapter, MissionObjective } from '@/lib/models/Mission';
import { UIState, Notification, Modal, Animation } from '@/lib/models/UI';
import { AudioState, AudioTrack, SoundEffect, VoiceLine } from '@/lib/models/Audio';
import { SocialState, Friend, Guild, ChatRoom, Achievement } from '@/lib/models/Social';
import { CloudState, CloudAccount, CloudBackup, CloudSync } from '@/lib/models/Cloud';

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
  
  // Phase 4: Advanced Systems
  combat: CombatState;
  equipment: Equipment[];
  missions: Mission[];
  campaign: CampaignChapter[];
  ui: UIState;
  audio: AudioState;
  social: SocialState;
  cloud: CloudState;
  
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
  
  // Phase 4: Advanced Systems Actions
  // Combat Actions
  startCombat: (enemies: string[], environment: string) => void;
  endCombat: (result: unknown) => void;
  performCombatAction: (action: CombatAction) => void;
  selectCombatTarget: (targetId: string) => void;
  
  // Equipment Actions
  equipItem: (heroId: string, equipmentId: string, slot: string) => void;
  unequipItem: (heroId: string, slot: string) => void;
  upgradeEquipment: (equipmentId: string, materials: Record<string, number>) => void;
  craftEquipment: (recipeId: string, materials: Record<string, number>) => void;
  
  // Mission Actions
  startMission: (missionId: string) => void;
  completeMission: (missionId: string, rating: string) => void;
  updateMissionObjective: (missionId: string, objectiveId: string, progress: number) => void;
  
  // UI Actions
  showNotification: (notification: Notification) => void;
  hideNotification: (notificationId: string) => void;
  showModal: (modal: Modal) => void;
  hideModal: (modalId: string) => void;
  startAnimation: (animation: Animation) => void;
  stopAnimation: (animationId: string) => void;
  
  // Audio Actions
  playMusic: (trackId: string) => void;
  stopMusic: () => void;
  playSoundEffect: (effectId: string) => void;
  playVoiceLine: (lineId: string) => void;
  setAudioVolume: (type: string, volume: number) => void;
  
  // Social Actions
  addFriend: (userId: string) => void;
  removeFriend: (userId: string) => void;
  joinGuild: (guildId: string) => void;
  leaveGuild: (guildId: string) => void;
  sendChatMessage: (roomId: string, message: string) => void;
  
  // Cloud Actions
  syncToCloud: () => void;
  restoreFromCloud: (backupId: string) => void;
  createBackup: (name: string, description: string) => void;
  resolveCloudConflict: (conflictId: string, resolution: string) => void;
  
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
  
  // Phase 4: Advanced Systems Initial State
  combat: {
    isActive: false,
    currentTurn: 'player' as const,
    turnNumber: 1,
    selectedHero: null,
    selectedEnemy: null,
    actionQueue: [],
    coverPositions: [],
    battlefield: [],
    combatLog: []
  },
  equipment: [],
  missions: [],
  campaign: [],
  ui: {
    currentScreen: 'home',
    previousScreen: 'home',
    screenHistory: [],
    isMenuOpen: false,
    isSettingsOpen: false,
    isPaused: false,
    notifications: [],
    tooltips: [],
    modals: [],
    animations: [],
    theme: {
      name: 'default',
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#F59E0B',
        background: '#1F2937',
        surface: '#374151',
        text: '#FFFFFF',
        textSecondary: '#D1D5DB',
        border: '#4B5563',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      typography: {
        fontFamily: 'Inter',
        fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30 },
        fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
        lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 }
      },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
      borders: {
        radius: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
        width: { none: 0, thin: 1, medium: 2, thick: 4 }
      },
      shadows: {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)'
      },
      animations: {
        duration: { fast: 150, normal: 300, slow: 500 },
        easing: {
          linear: 'linear',
          ease: 'ease',
          easeIn: 'ease-in',
          easeOut: 'ease-out',
          easeInOut: 'ease-in-out'
        }
      }
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      screenReader: false,
      colorBlindSupport: false,
      reducedMotion: false,
      keyboardNavigation: true,
      focusIndicators: true,
      audioDescriptions: false
    },
    performance: {
      targetFPS: 60,
      maxParticles: 100,
      shadowQuality: 'medium' as const,
      textureQuality: 'high' as const,
      antiAliasing: true,
      vsync: true,
      frameRateLimit: 60,
      memoryLimit: 1024
    }
  },
  audio: {
    isPlaying: false,
    currentTrack: null,
    volume: { master: 80, music: 70, sfx: 80, voice: 90, ambient: 60 },
    settings: {
      quality: 'high' as const,
      compression: true,
      spatialAudio: false,
      reverb: false,
      equalizer: { enabled: false, presets: [], currentPreset: 'flat', custom: [] },
      crossfade: true,
      fadeTime: 2000,
      loopMusic: true,
      randomPlay: false
    },
    playlists: [],
    soundEffects: [],
    ambientSounds: [],
    voiceLines: [],
    isMuted: false,
    isPaused: false
  },
  social: {
    friends: [],
    friendRequests: [],
    guilds: [],
    guildInvitations: [],
    chatRooms: [],
    leaderboards: [],
    achievements: [],
    socialEvents: [],
    isOnline: true,
    lastSeen: new Date(),
    status: { type: 'online' as const, message: '', lastSeen: new Date() },
    privacy: {
      showOnlineStatus: true,
      showGameActivity: true,
      allowFriendRequests: true,
      allowGuildInvitations: true,
      allowPrivateMessages: true,
      showLastSeen: true,
      showAchievements: true,
      showLeaderboard: true,
      blockList: [],
      muteList: []
    }
  },
  cloud: {
    isConnected: false,
    isSyncing: false,
    lastSync: new Date(),
    syncStatus: {
      isActive: false,
      progress: 0,
      currentOperation: '',
      totalOperations: 0,
      completedOperations: 0,
      failedOperations: 0,
      estimatedTimeRemaining: 0
    },
    conflicts: [],
    backups: [],
    settings: {
      autoSync: true,
      syncInterval: 30,
      syncOnStartup: true,
      syncOnExit: true,
      syncOnNetworkChange: true,
      syncOnBatteryLow: false,
      compression: true,
      encryption: false,
      conflictResolution: {
        default: 'ask_user' as const,
        perDataType: {},
        autoResolve: false,
        askBeforeResolve: true
      },
      backupEnabled: true,
      backupFrequency: { type: 'daily' as const, interval: 1, time: '02:00', days: [], isEnabled: true },
      backupRetention: { maxBackups: 10, maxAge: 30, autoDelete: true, keepForever: false },
      storageProvider: {
        id: 'local',
        name: 'Local Storage',
        type: 'local' as const,
        endpoint: '',
        credentials: { isEncrypted: false },
        isConfigured: true,
        isTested: true
      },
      apiEndpoint: '',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000
    },
    account: {
      id: '',
      username: '',
      email: '',
      displayName: '',
      avatar: '',
      isVerified: false,
      isPremium: false,
      subscription: {
        plan: 'free' as const,
        features: [],
        limits: {
          maxStorage: 1073741824, // 1GB
          maxBackups: 5,
          maxDevices: 3,
          maxSyncFrequency: 60,
          maxFileSize: 104857600, // 100MB
          maxConcurrentSyncs: 1
        },
        billing: {
          amount: 0,
          currency: 'USD',
          interval: 'monthly' as const,
          nextBilling: new Date(),
          paymentMethod: '',
          isAutoPay: false
        },
        isActive: true,
        autoRenew: false
      },
      permissions: [],
      quota: { total: 1073741824, used: 0, available: 1073741824, percentage: 0, isNearLimit: false, isOverLimit: false, lastUpdated: new Date() },
      usage: {
        totalSyncs: 0,
        totalBackups: 0,
        totalDataTransferred: 0,
        averageSyncTime: 0,
        averageBackupSize: 0,
        lastSync: new Date(),
        lastBackup: new Date(),
        errors: []
      },
      createdDate: new Date(),
      lastLogin: new Date(),
      isActive: true
    },
    devices: [],
    storage: {
      total: 1073741824,
      used: 0,
      available: 1073741824,
      breakdown: { saveData: 0, backups: 0, settings: 0, media: 0, logs: 0, other: 0 },
      files: [],
      folders: [],
      isEncrypted: false,
      isCompressed: false,
      lastUpdated: new Date()
    }
  },
  
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

      startMission: (missionId) => {
        // Parse mission ID to extract chapter and section
        const parts = missionId.split('_');
        const chapter = parseInt(parts[1]);
        const section = parseInt(parts[3]);
        
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
          credits: state.credits + (Number((rewards as unknown as Record<string, unknown>).credits) || 0),
          signalKeys: state.signalKeys + (Number((rewards as unknown as Record<string, unknown>).signal_keys) || 0),
          inBattle: false,
        });
        
        // Add XP to squad heroes
        const xp = Number((rewards as unknown as Record<string, unknown>).xp);
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

      // Phase 4: Advanced Systems Action Implementations
      // Combat Actions
      startCombat: (enemies, environment) => {
        set((state) => ({
          combat: {
            ...state.combat,
            isActive: true,
            currentTurn: 'player' as const,
            turnNumber: 1,
            selectedHero: null,
            selectedEnemy: null,
            actionQueue: [],
            coverPositions: [],
            battlefield: [],
            combatLog: []
          }
        }));
      },

      endCombat: (result) => {
        set((state) => ({
          combat: {
            ...state.combat,
            isActive: false,
            currentTurn: 'player' as const,
            turnNumber: 1,
            selectedHero: null,
            selectedEnemy: null,
            actionQueue: [],
            combatLog: []
          }
        }));
      },

      performCombatAction: (action) => {
        set((state) => ({
          combat: {
            ...state.combat,
            actionQueue: [...state.combat.actionQueue, action]
          }
        }));
      },

      selectCombatTarget: (targetId) => {
        set((state) => ({
          combat: {
            ...state.combat,
            selectedEnemy: targetId
          }
        }));
      },

      // Equipment Actions
      equipItem: (heroId, equipmentId, slot) => {
        set((state) => ({
          equipment: state.equipment.map(eq => 
            eq.id === equipmentId 
              ? { ...eq, isEquipped: true, equippedBy: heroId }
              : eq.slot === slot && eq.equippedBy === heroId
              ? { ...eq, isEquipped: false, equippedBy: undefined }
              : eq
          )
        }));
      },

      unequipItem: (heroId, slot) => {
        set((state) => ({
          equipment: state.equipment.map(eq => 
            eq.slot === slot && eq.equippedBy === heroId
              ? { ...eq, isEquipped: false, equippedBy: undefined }
              : eq
          )
        }));
      },

      upgradeEquipment: (equipmentId, materials) => {
        set((state) => ({
          equipment: state.equipment.map(eq => 
            eq.id === equipmentId 
              ? { ...eq, level: eq.level + 1 }
              : eq
          )
        }));
      },

      craftEquipment: (recipeId, materials) => {
        console.log('Crafting equipment:', recipeId, materials);
      },

      // Mission Actions
      updateMissionObjective: (missionId, objectiveId, progress) => {
        set((state) => ({
          missions: state.missions.map(m => 
            m.id === missionId 
              ? { 
                  ...m, 
                  objectives: m.objectives.map(obj => 
                    obj.id === objectiveId 
                      ? { ...obj, progress }
                      : obj
                  )
                }
              : m
          )
        }));
      },

      // UI Actions
      showNotification: (notification) => {
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: [...state.ui.notifications, notification]
          }
        }));
      },

      hideNotification: (notificationId) => {
        set((state) => ({
          ui: {
            ...state.ui,
            notifications: state.ui.notifications.filter(n => n.id !== notificationId)
          }
        }));
      },

      showModal: (modal) => {
        set((state) => ({
          ui: {
            ...state.ui,
            modals: [...state.ui.modals, modal]
          }
        }));
      },

      hideModal: (modalId) => {
        set((state) => ({
          ui: {
            ...state.ui,
            modals: state.ui.modals.filter(m => m.id !== modalId)
          }
        }));
      },

      startAnimation: (animation) => {
        set((state) => ({
          ui: {
            ...state.ui,
            animations: [...state.ui.animations, animation]
          }
        }));
      },

      stopAnimation: (animationId) => {
        set((state) => ({
          ui: {
            ...state.ui,
            animations: state.ui.animations.filter(a => a.id !== animationId)
          }
        }));
      },

      // Audio Actions
      playMusic: (trackId) => {
        set((state) => ({
          audio: {
            ...state.audio,
            currentTrack: trackId,
            isPlaying: true
          }
        }));
      },

      stopMusic: () => {
        set((state) => ({
          audio: {
            ...state.audio,
            currentTrack: null,
            isPlaying: false
          }
        }));
      },

      playSoundEffect: (effectId) => {
        console.log('Playing sound effect:', effectId);
      },

      playVoiceLine: (lineId) => {
        console.log('Playing voice line:', lineId);
      },

      setAudioVolume: (type, volume) => {
        set((state) => ({
          audio: {
            ...state.audio,
            volume: {
              ...state.audio.volume,
              [type]: volume
            }
          }
        }));
      },

      // Social Actions
      addFriend: (userId) => {
        set((state) => ({
          social: {
            ...state.social,
            friends: [...state.social.friends, {
              id: userId,
              username: `user_${userId}`,
              displayName: `User ${userId}`,
              avatar: '',
              level: 1,
              isOnline: false,
              lastSeen: new Date(),
              status: { type: 'offline', message: '', lastSeen: new Date() },
              relationship: {
                level: 1,
                experience: 0,
                maxExperience: 100,
                gifts: [],
                sharedAchievements: [],
                playTime: 0,
                lastInteraction: new Date()
              },
              mutualFriends: 0,
              sharedGuilds: [],
              isBlocked: false,
              isMuted: false,
              notes: '',
              addedDate: new Date()
            }]
          }
        }));
      },

      removeFriend: (userId) => {
        set((state) => ({
          social: {
            ...state.social,
            friends: state.social.friends.filter(f => f.id !== userId)
          }
        }));
      },

      joinGuild: (guildId) => {
        set((state) => ({
          social: {
            ...state.social,
            guilds: [...state.social.guilds, {
              id: guildId,
              name: `Guild ${guildId}`,
              tag: `G${guildId}`,
              description: '',
              icon: '',
              banner: '',
              level: 1,
              experience: 0,
              maxExperience: 100,
              members: [],
              maxMembers: 50,
              requirements: {
                minLevel: 1,
                minReputation: 0,
                requiredAchievements: [],
                applicationRequired: false,
                autoAccept: true
              },
              perks: [],
              activities: [],
              isPublic: true,
              isRecruiting: true,
              createdDate: new Date(),
              leaderId: '',
              officers: []
            }]
          }
        }));
      },

      leaveGuild: (guildId) => {
        set((state) => ({
          social: {
            ...state.social,
            guilds: state.social.guilds.filter(g => g.id !== guildId)
          }
        }));
      },

      sendChatMessage: (roomId, message) => {
        set((state) => ({
          social: {
            ...state.social,
            chatRooms: state.social.chatRooms.map(room => 
              room.id === roomId 
                ? {
                    ...room,
                    messages: [...room.messages, {
                      id: `msg_${Date.now()}`,
                      userId: 'current_user',
                      username: 'You',
                      displayName: 'You',
                      avatar: '',
                      content: message,
                      type: 'text',
                      timestamp: new Date(),
                      isEdited: false,
                      isDeleted: false,
                      reactions: [],
                      mentions: [],
                      attachments: []
                    }]
                  }
                : room
            )
          }
        }));
      },

      // Cloud Actions
      syncToCloud: () => {
        set((state) => ({
          cloud: {
            ...state.cloud,
            isSyncing: true,
            syncStatus: {
              ...state.cloud.syncStatus,
              isActive: true,
              progress: 0,
              currentOperation: 'Syncing to cloud...',
              totalOperations: 10,
              completedOperations: 0,
              failedOperations: 0,
              estimatedTimeRemaining: 30
            }
          }
        }));
      },

      restoreFromCloud: (backupId) => {
        set((state) => ({
          cloud: {
            ...state.cloud,
            isSyncing: true,
            syncStatus: {
              ...state.cloud.syncStatus,
              isActive: true,
              progress: 0,
              currentOperation: 'Restoring from cloud...',
              totalOperations: 5,
              completedOperations: 0,
              failedOperations: 0,
              estimatedTimeRemaining: 15
            }
          }
        }));
      },

      createBackup: (name, description) => {
        set((state) => ({
          cloud: {
            ...state.cloud,
            backups: [...state.cloud.backups, {
              id: `backup_${Date.now()}`,
              name,
              description,
              timestamp: new Date(),
              size: 1024 * 1024,
              type: 'manual',
              retention: {
                maxBackups: 10,
                maxAge: 30,
                autoDelete: true,
                keepForever: false
              },
              isEncrypted: false,
              isCompressed: true,
              checksum: 'abc123',
              deviceId: 'local',
              deviceName: 'Local Device',
              isRestorable: true
            }]
          }
        }));
      },

      resolveCloudConflict: (conflictId, resolution) => {
        set((state) => ({
          cloud: {
            ...state.cloud,
            conflicts: state.cloud.conflicts.filter(c => c.id !== conflictId)
          }
        }));
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

