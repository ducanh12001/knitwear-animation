import { useState, useEffect } from 'react';

import useCookies from '@/hooks/others/useCookies';
import { CookieConsentContext } from '@/contexts/cookie/CookieContext';
import type {
  CookieOptions,
  CookiePreferences,
  KeyofCookiePreferences,
  ProviderProps,
} from '@/types';

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true, // Always active
  functional: false,
  analytics: false,
  performance: false,
  advertisement: false,
};

const COOKIE_CONSENT_NAME = 'cookieyes-consent';

const CookieConsentProvider = ({ children }: ProviderProps) => {
  const { getCookie, setCookie, hasCookie, isReady } = useCookies();
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved preferences on mount - only after useCookies is ready
  useEffect(() => {
    if (!isReady) return;

    const checkCookieConsent = (): void => {
      try {
        const consentExists = hasCookie(COOKIE_CONSENT_NAME);

        if (consentExists) {
          // Use generic type for type safety
          const savedPreferences =
            getCookie<CookiePreferences>(COOKIE_CONSENT_NAME);
          if (savedPreferences) {
            setPreferences((prev) => ({ ...prev, ...savedPreferences }));
            setHasConsent(true);
          }
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCookieConsent();
  }, [hasCookie, getCookie, isReady]);

  // Save preferences with proper cookie options
  const savePreferences = (
    newPreferences: CookiePreferences,
    days: number = 365,
  ): void => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    try {
      // Use the enhanced setCookie with proper options
      const cookieOptions: CookieOptions = {
        expires: expiryDate,
        sameSite: 'Lax',
        path: '/',
        secure: window.location.protocol === 'https:', // Auto-detect secure context
      };
      const success = setCookie(
        COOKIE_CONSENT_NAME,
        newPreferences,
        cookieOptions,
      );

      if (success) {
        setPreferences(newPreferences);
        setHasConsent(true);
      } else {
        console.error('Failed to save cookie preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const acceptAll = (): CookiePreferences => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      advertisement: true,
    };

    savePreferences(allAccepted);
    return allAccepted;
  };

  const rejectAll = (): CookiePreferences => {
    const allRejected: CookiePreferences = {
      necessary: true, // Necessary is always true
      functional: false,
      analytics: false,
      performance: false,
      advertisement: false,
    };

    savePreferences(allRejected);
    return allRejected;
  };

  // Check if a specific category is allowed
  const isAllowed = (category: KeyofCookiePreferences): boolean => {
    if (category === 'necessary') return true; // Necessary is always allowed
    return hasConsent && preferences[category] === true;
  };

  // Update a single preference
  const updatePreference = (
    category: KeyofCookiePreferences,
    value: boolean,
  ): void => {
    if (category === 'necessary') return; // Cannot change necessary

    const newPreferences: CookiePreferences = {
      ...preferences,
      [category]: value,
    };

    setPreferences(newPreferences);
  };

  const saveCurrentPreferences = (): CookiePreferences => {
    savePreferences(preferences);
    return preferences;
  };

  const contextValue = {
    preferences,
    hasConsent,
    isLoading,
    acceptAll,
    rejectAll,
    updatePreference,
    saveCurrentPreferences,
    isAllowed,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentProvider;
