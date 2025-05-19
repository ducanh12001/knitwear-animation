import { createContext, useContext, useState, useEffect } from "react";
import useCookies from "@/hooks/useCookies";

// Default cookie categories
const DEFAULT_PREFERENCES = {
  necessary: true, // Always active
  functional: false,
  analytics: false,
  performance: false,
  advertisement: false,
};

const COOKIE_CONSENT_NAME = "cookieyes-consent";

const CookieConsentContext = createContext(null);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
};

export const CookieConsentProvider = ({ children }) => {
  const { getCookie, setCookie, hasCookie } = useCookies();
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    if (hasCookie(COOKIE_CONSENT_NAME)) {
      const savedPreferences = getCookie(COOKIE_CONSENT_NAME);
      if (savedPreferences) {
        setPreferences((prev) => ({ ...prev, ...savedPreferences }));
        setHasConsent(true);
      }
    }
  }, [hasCookie, getCookie]);

  // Save preferences
  const savePreferences = (newPreferences, days = 365) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    setCookie(COOKIE_CONSENT_NAME, newPreferences, {
      expires: expiryDate,
      sameSite: "Lax",
    });

    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      advertisement: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true, // Necessary is always true
      functional: false,
      analytics: false,
      performance: false,
      advertisement: false,
    });
  };

  // Check if a specific category is allowed
  const isAllowed = (category) => {
    if (category === "necessary") return true; // Necessary is always allowed
    return hasConsent && preferences[category] === true;
  };

  // Update a single preference
  const updatePreference = (category, value) => {
    if (category === "necessary") return; // Cannot change necessary

    const newPreferences = {
      ...preferences,
      [category]: value,
    };

    setPreferences(newPreferences);
  };

  const saveCurrentPreferences = () => {
    savePreferences(preferences);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsent,
        acceptAll,
        rejectAll,
        updatePreference,
        saveCurrentPreferences,
        isAllowed,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentContext;
