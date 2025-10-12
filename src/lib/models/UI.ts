export interface UIState {
  currentScreen: string;
  previousScreen: string;
  screenHistory: string[];
  isMenuOpen: boolean;
  isSettingsOpen: boolean;
  isPaused: boolean;
  notifications: Notification[];
  tooltips: Tooltip[];
  modals: Modal[];
  animations: Animation[];
  theme: UITheme;
  accessibility: AccessibilitySettings;
  performance: PerformanceSettings;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  title: string;
  message: string;
  icon?: string;
  duration: number;
  isRead: boolean;
  timestamp: Date;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  id: string;
  text: string;
  action: () => void;
  style: 'primary' | 'secondary' | 'danger';
}

export interface Tooltip {
  id: string;
  target: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  delay: number;
  isVisible: boolean;
  style: TooltipStyle;
}

export interface TooltipStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  fontSize: number;
  maxWidth: number;
  padding: number;
}

export interface Modal {
  id: string;
  type: 'dialog' | 'confirmation' | 'input' | 'selection' | 'custom';
  title: string;
  content: string;
  actions: ModalAction[];
  isVisible: boolean;
  isClosable: boolean;
  backdrop: boolean;
  size: 'small' | 'medium' | 'large' | 'fullscreen';
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export interface ModalAction {
  id: string;
  text: string;
  style: 'primary' | 'secondary' | 'danger' | 'success';
  action: () => void;
  isDisabled: boolean;
}

export interface Animation {
  id: string;
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'shake' | 'pulse';
  target: string;
  duration: number;
  delay: number;
  easing: string;
  isPlaying: boolean;
  loop: boolean;
  direction: 'normal' | 'reverse' | 'alternate';
}

export interface UITheme {
  name: string;
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borders: Borders;
  shadows: Shadows;
  animations: AnimationSettings;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface Borders {
  radius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  width: {
    none: number;
    thin: number;
    medium: number;
    thick: number;
  };
}

export interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface AnimationSettings {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  colorBlindSupport: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  audioDescriptions: boolean;
}

export interface PerformanceSettings {
  targetFPS: number;
  maxParticles: number;
  shadowQuality: 'low' | 'medium' | 'high' | 'ultra';
  textureQuality: 'low' | 'medium' | 'high' | 'ultra';
  antiAliasing: boolean;
  vsync: boolean;
  frameRateLimit: number;
  memoryLimit: number;
}

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface TouchSettings {
  tapDelay: number;
  doubleTapDelay: number;
  longPressDelay: number;
  swipeThreshold: number;
  pinchThreshold: number;
  hapticFeedback: boolean;
  vibrationIntensity: number;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  ambientVolume: number;
  muteAll: boolean;
  muteMusic: boolean;
  muteSFX: boolean;
  muteVoice: boolean;
  muteAmbient: boolean;
}
