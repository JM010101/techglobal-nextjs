export interface SocialState {
  friends: Friend[];
  friendRequests: FriendRequest[];
  guilds: Guild[];
  guildInvitations: GuildInvitation[];
  chatRooms: ChatRoom[];
  leaderboards: Leaderboard[];
  achievements: Achievement[];
  socialEvents: SocialEvent[];
  isOnline: boolean;
  lastSeen: Date;
  status: UserStatus;
  privacy: PrivacySettings;
}

export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  isOnline: boolean;
  lastSeen: Date;
  status: UserStatus;
  relationship: FriendRelationship;
  mutualFriends: number;
  sharedGuilds: string[];
  isBlocked: boolean;
  isMuted: boolean;
  notes: string;
  addedDate: Date;
}

export interface FriendRelationship {
  level: number;
  experience: number;
  maxExperience: number;
  gifts: Gift[];
  sharedAchievements: string[];
  playTime: number;
  lastInteraction: Date;
}

export interface Gift {
  id: string;
  type: 'item' | 'currency' | 'experience' | 'special';
  itemId?: string;
  quantity: number;
  message: string;
  isReceived: boolean;
  isOpened: boolean;
  sentDate: Date;
  receivedDate?: Date;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUsername: string;
  fromDisplayName: string;
  fromAvatar: string;
  message: string;
  isAccepted: boolean;
  isDeclined: boolean;
  sentDate: Date;
  respondedDate?: Date;
}

export interface Guild {
  id: string;
  name: string;
  tag: string;
  description: string;
  icon: string;
  banner: string;
  level: number;
  experience: number;
  maxExperience: number;
  members: GuildMember[];
  maxMembers: number;
  requirements: GuildRequirements;
  perks: GuildPerk[];
  activities: GuildActivity[];
  isPublic: boolean;
  isRecruiting: boolean;
  createdDate: Date;
  leaderId: string;
  officers: string[];
}

export interface GuildMember {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  rank: GuildRank;
  joinedDate: Date;
  lastActive: Date;
  contribution: number;
  permissions: GuildPermission[];
  isOnline: boolean;
}

export interface GuildRank {
  id: string;
  name: string;
  level: number;
  permissions: GuildPermission[];
  color: string;
  isDefault: boolean;
  isLeader: boolean;
}

export interface GuildPermission {
  id: string;
  name: string;
  description: string;
  category: 'management' | 'members' | 'activities' | 'communication';
}

export interface GuildRequirements {
  minLevel: number;
  minReputation: number;
  requiredAchievements: string[];
  applicationRequired: boolean;
  autoAccept: boolean;
}

export interface GuildPerk {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  effects: GuildPerkEffect[];
  unlockCost: number;
  isUnlocked: boolean;
}

export interface GuildPerkEffect {
  type: 'stat_boost' | 'experience_bonus' | 'currency_bonus' | 'unlock';
  target: string;
  value: number;
  description: string;
}

export interface GuildActivity {
  id: string;
  name: string;
  description: string;
  type: 'raid' | 'pvp' | 'quest' | 'social' | 'competitive';
  participants: string[];
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  rewards: ActivityReward[];
  isActive: boolean;
  isCompleted: boolean;
  leaderboard: ActivityLeaderboard;
}

export interface ActivityReward {
  type: 'experience' | 'currency' | 'item' | 'title' | 'achievement';
  id: string;
  name: string;
  quantity: number;
  rarity?: string;
  description: string;
}

export interface ActivityLeaderboard {
  participants: LeaderboardEntry[];
  rankings: LeaderboardRanking[];
  rewards: LeaderboardReward[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  score: number;
  rank: number;
  isCurrentUser: boolean;
}

export interface LeaderboardRanking {
  position: number;
  userId: string;
  score: number;
  change: number;
  isNew: boolean;
}

export interface LeaderboardReward {
  position: number;
  rewards: ActivityReward[];
  title?: string;
  badge?: string;
}

export interface GuildInvitation {
  id: string;
  guildId: string;
  guildName: string;
  guildTag: string;
  guildIcon: string;
  fromUserId: string;
  fromUsername: string;
  message: string;
  isAccepted: boolean;
  isDeclined: boolean;
  sentDate: Date;
  respondedDate?: Date;
  expiresDate: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'global' | 'guild' | 'private' | 'group';
  participants: string[];
  maxParticipants: number;
  isPrivate: boolean;
  isMuted: boolean;
  messages: ChatMessage[];
  lastMessage: ChatMessage | null;
  unreadCount: number;
  createdDate: Date;
  lastActivity: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system' | 'emote';
  timestamp: Date;
  isEdited: boolean;
  editedDate?: Date;
  isDeleted: boolean;
  deletedDate?: Date;
  reactions: MessageReaction[];
  mentions: string[];
  attachments: MessageAttachment[];
}

export interface MessageReaction {
  emoji: string;
  users: string[];
  count: number;
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file' | 'link';
  name: string;
  url: string;
  size: number;
  thumbnail?: string;
}

export interface Leaderboard {
  id: string;
  name: string;
  description: string;
  type: 'global' | 'guild' | 'friends' | 'regional';
  category: 'level' | 'experience' | 'achievements' | 'combat' | 'social';
  entries: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
  lastUpdated: Date;
  refreshInterval: number;
  rewards: LeaderboardReward[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'combat' | 'social' | 'exploration' | 'collection' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  points: number;
  isUnlocked: boolean;
  unlockedDate?: Date;
  progress: number;
  maxProgress: number;
  requirements: AchievementRequirement[];
  rewards: AchievementReward[];
  isHidden: boolean;
  isSecret: boolean;
}

export interface AchievementRequirement {
  type: 'kill_enemies' | 'complete_missions' | 'reach_level' | 'collect_items' | 'social_interactions';
  target: string;
  quantity: number;
  current: number;
  description: string;
}

export interface AchievementReward {
  type: 'experience' | 'currency' | 'item' | 'title' | 'badge';
  id: string;
  name: string;
  quantity: number;
  description: string;
}

export interface SocialEvent {
  id: string;
  name: string;
  description: string;
  type: 'guild_war' | 'tournament' | 'festival' | 'celebration' | 'challenge';
  startDate: Date;
  endDate: Date;
  participants: string[];
  maxParticipants: number;
  rewards: SocialEventReward[];
  isActive: boolean;
  isCompleted: boolean;
  leaderboard: Leaderboard;
  requirements: SocialEventRequirement[];
}

export interface SocialEventReward {
  type: 'experience' | 'currency' | 'item' | 'title' | 'badge';
  id: string;
  name: string;
  quantity: number;
  rarity?: string;
  description: string;
}

export interface SocialEventRequirement {
  type: 'level' | 'guild_membership' | 'achievement' | 'reputation';
  target: string;
  value: number;
  description: string;
}

export interface UserStatus {
  type: 'online' | 'away' | 'busy' | 'invisible' | 'offline';
  message: string;
  gameActivity?: string;
  lastSeen: Date;
}

export interface PrivacySettings {
  showOnlineStatus: boolean;
  showGameActivity: boolean;
  allowFriendRequests: boolean;
  allowGuildInvitations: boolean;
  allowPrivateMessages: boolean;
  showLastSeen: boolean;
  showAchievements: boolean;
  showLeaderboard: boolean;
  blockList: string[];
  muteList: string[];
}
