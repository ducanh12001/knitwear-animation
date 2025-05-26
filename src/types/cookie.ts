export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
  advertisement: boolean;
}

export type KeyofCookiePreferences = keyof CookiePreferences;

export interface CookieConsentContextValue {
  preferences: CookiePreferences;
  hasConsent: boolean;
  isLoading: boolean;
  acceptAll: () => CookiePreferences;
  rejectAll: () => CookiePreferences;
  updatePreference: (category: KeyofCookiePreferences, value: boolean) => void;
  saveCurrentPreferences: () => CookiePreferences;
  isAllowed: (category: KeyofCookiePreferences) => boolean;
}

export interface CookieInfo {
  name: string;
  duration: string;
  description: string;
}

export interface CookieCategory {
  id: KeyofCookiePreferences;
  title: string;
  description: string;
  cookies: CookieInfo[];
  alwaysActive?: boolean;
}

export interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
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
  togglePreference: (key: KeyofCookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSavePreferences: () => void;
  onClose: () => void;
  className?: string;
}

export interface ConsentScriptProps {
  category: KeyofCookiePreferences;
  src: string;
  attributes?: Record<string, any>;
  onLoad?: () => void;
  onError?: (error: any) => void;
  removeOnReject?: boolean;
}
