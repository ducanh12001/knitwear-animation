export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
  advertisement: boolean;
}

export interface CookieConsentContextType {
  preferences: CookiePreferences;
  hasConsent: boolean;
  isLoading: boolean;
  acceptAll: () => CookiePreferences;
  rejectAll: () => CookiePreferences;
  updatePreference: (category: keyof CookiePreferences, value: boolean) => void;
  saveCurrentPreferences: () => CookiePreferences;
  isAllowed: (category: keyof CookiePreferences) => boolean;
}

export interface CookieInfo {
  name: string;
  duration: string;
  description: string;
}

export interface CookieCategory {
  id: keyof CookiePreferences;
  title: string;
  description: string;
  cookies: CookieInfo[];
  alwaysActive?: boolean;
}

export interface AnimatedToggleProps {
  id: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export interface CookieAccordionProps {
  category: CookieCategory;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: () => void;
  onTogglePreference: () => void;
}

export interface CookieBannerProps {
  onCustomize: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export interface CookieModalProps {
  preferences: CookiePreferences;
  togglePreference: (key: keyof CookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSavePreferences: () => void;
  onClose: () => void;
  className?: string;
}

export interface ConsentScriptProps {
  category: keyof CookiePreferences;
  src: string;
  attributes?: Record<string, any>;
  onLoad?: () => void;
  onError?: (error: any) => void;
  removeOnReject?: boolean;
}
