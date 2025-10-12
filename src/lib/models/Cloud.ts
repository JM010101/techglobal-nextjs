export interface CloudState {
  isConnected: boolean;
  isSyncing: boolean;
  lastSync: Date;
  syncStatus: SyncStatus;
  conflicts: CloudConflict[];
  backups: CloudBackup[];
  settings: CloudSettings;
  account: CloudAccount;
  devices: CloudDevice[];
  storage: CloudStorage;
}

export interface SyncStatus {
  isActive: boolean;
  progress: number;
  currentOperation: string;
  totalOperations: number;
  completedOperations: number;
  failedOperations: number;
  lastError?: string;
  estimatedTimeRemaining: number;
}

export interface CloudConflict {
  id: string;
  type: 'save_data' | 'settings' | 'progress' | 'inventory';
  localVersion: CloudVersion;
  cloudVersion: CloudVersion;
  resolution: ConflictResolution;
  isResolved: boolean;
  resolvedDate?: Date;
  description: string;
}

export interface CloudVersion {
  id: string;
  timestamp: Date;
  size: number;
  checksum: string;
  deviceId: string;
  deviceName: string;
  version: string;
}

export interface ConflictResolution {
  type: 'use_local' | 'use_cloud' | 'merge' | 'manual';
  description: string;
  mergedData?: unknown;
  isAutomatic: boolean;
}

export interface CloudBackup {
  id: string;
  name: string;
  description: string;
  timestamp: Date;
  size: number;
  type: 'manual' | 'automatic' | 'scheduled';
  frequency?: BackupFrequency;
  retention: BackupRetention;
  isEncrypted: boolean;
  isCompressed: boolean;
  checksum: string;
  deviceId: string;
  deviceName: string;
  isRestorable: boolean;
}

export interface BackupFrequency {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  interval: number;
  time: string;
  days: number[];
  isEnabled: boolean;
}

export interface BackupRetention {
  maxBackups: number;
  maxAge: number; // in days
  autoDelete: boolean;
  keepForever: boolean;
}

export interface CloudSettings {
  autoSync: boolean;
  syncInterval: number; // in minutes
  syncOnStartup: boolean;
  syncOnExit: boolean;
  syncOnNetworkChange: boolean;
  syncOnBatteryLow: boolean;
  compression: boolean;
  encryption: boolean;
  encryptionKey?: string;
  conflictResolution: ConflictResolutionStrategy;
  backupEnabled: boolean;
  backupFrequency: BackupFrequency;
  backupRetention: BackupRetention;
  storageProvider: StorageProvider;
  apiEndpoint: string;
  apiKey?: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface ConflictResolutionStrategy {
  default: 'use_local' | 'use_cloud' | 'ask_user' | 'merge';
  perDataType: Record<string, string>;
  autoResolve: boolean;
  askBeforeResolve: boolean;
}

export interface StorageProvider {
  id: string;
  name: string;
  type: 'aws_s3' | 'google_drive' | 'dropbox' | 'onedrive' | 'local';
  endpoint: string;
  region?: string;
  bucket?: string;
  credentials: StorageCredentials;
  isConfigured: boolean;
  isTested: boolean;
  lastTested?: Date;
}

export interface StorageCredentials {
  accessKey?: string;
  secretKey?: string;
  token?: string;
  refreshToken?: string;
  expiresAt?: Date;
  isEncrypted: boolean;
}

export interface CloudAccount {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
  isPremium: boolean;
  subscription: CloudSubscription;
  permissions: CloudPermission[];
  quota: CloudQuota;
  usage: CloudUsage;
  createdDate: Date;
  lastLogin: Date;
  isActive: boolean;
}

export interface CloudSubscription {
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  features: string[];
  limits: CloudLimits;
  billing: CloudBilling;
  isActive: boolean;
  expiresAt?: Date;
  autoRenew: boolean;
}

export interface CloudLimits {
  maxStorage: number; // in bytes
  maxBackups: number;
  maxDevices: number;
  maxSyncFrequency: number; // in minutes
  maxFileSize: number; // in bytes
  maxConcurrentSyncs: number;
}

export interface CloudBilling {
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'lifetime';
  nextBilling: Date;
  paymentMethod: string;
  isAutoPay: boolean;
}

export interface CloudPermission {
  id: string;
  name: string;
  description: string;
  category: 'sync' | 'backup' | 'sharing' | 'administration';
  isGranted: boolean;
  grantedDate?: Date;
  grantedBy?: string;
}

export interface CloudQuota {
  total: number;
  used: number;
  available: number;
  percentage: number;
  isNearLimit: boolean;
  isOverLimit: boolean;
  lastUpdated: Date;
}

export interface CloudUsage {
  totalSyncs: number;
  totalBackups: number;
  totalDataTransferred: number;
  averageSyncTime: number;
  averageBackupSize: number;
  lastSync: Date;
  lastBackup: Date;
  errors: CloudError[];
}

export interface CloudError {
  id: string;
  type: 'sync' | 'backup' | 'restore' | 'authentication' | 'network';
  message: string;
  code: string;
  timestamp: Date;
  isResolved: boolean;
  resolution?: string;
  retryCount: number;
  maxRetries: number;
}

export interface CloudDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet' | 'console';
  platform: string;
  version: string;
  lastSeen: Date;
  isOnline: boolean;
  isTrusted: boolean;
  permissions: DevicePermission[];
  syncStatus: DeviceSyncStatus;
}

export interface DevicePermission {
  id: string;
  name: string;
  description: string;
  isGranted: boolean;
  grantedDate?: Date;
  expiresAt?: Date;
}

export interface DeviceSyncStatus {
  lastSync: Date;
  syncCount: number;
  lastError?: string;
  isSyncing: boolean;
  pendingChanges: number;
  conflicts: number;
}

export interface CloudStorage {
  total: number;
  used: number;
  available: number;
  breakdown: StorageBreakdown;
  files: CloudFile[];
  folders: CloudFolder[];
  isEncrypted: boolean;
  isCompressed: boolean;
  lastUpdated: Date;
}

export interface StorageBreakdown {
  saveData: number;
  backups: number;
  settings: number;
  media: number;
  logs: number;
  other: number;
}

export interface CloudFile {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  checksum: string;
  isEncrypted: boolean;
  isCompressed: boolean;
  createdDate: Date;
  modifiedDate: Date;
  accessedDate: Date;
  version: number;
  isShared: boolean;
  sharedWith: string[];
  permissions: FilePermission[];
}

export interface FilePermission {
  userId: string;
  type: 'read' | 'write' | 'admin';
  grantedDate: Date;
  expiresAt?: Date;
}

export interface CloudFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  createdDate: Date;
  modifiedDate: Date;
  isShared: boolean;
  sharedWith: string[];
  permissions: FilePermission[];
  children: string[];
}

export interface CloudSync {
  id: string;
  type: 'upload' | 'download' | 'sync';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  totalSize: number;
  transferredSize: number;
  speed: number;
  estimatedTimeRemaining: number;
  startTime: Date;
  endTime?: Date;
  error?: string;
  retryCount: number;
  maxRetries: number;
}

export interface CloudAnalytics {
  totalSyncs: number;
  totalBackups: number;
  totalDataTransferred: number;
  averageSyncTime: number;
  averageBackupSize: number;
  errorRate: number;
  successRate: number;
  mostActiveDevice: string;
  mostActiveTime: string;
  storageGrowth: StorageGrowth[];
  syncPatterns: SyncPattern[];
}

export interface StorageGrowth {
  date: Date;
  size: number;
  growth: number;
  percentage: number;
}

export interface SyncPattern {
  timeOfDay: string;
  frequency: number;
  averageDuration: number;
  successRate: number;
  errorRate: number;
}
