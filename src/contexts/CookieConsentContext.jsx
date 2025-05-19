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
  const { getCookie, setCookie, hasCookie, isReady } = useCookies();
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved preferences on mount - chỉ sau khi useCookies đã sẵn sàng
  useEffect(() => {
    if (!isReady) return;

    const checkCookieConsent = () => {
      try {
        const consentExists = hasCookie(COOKIE_CONSENT_NAME);

        if (consentExists) {
          const savedPreferences = getCookie(COOKIE_CONSENT_NAME);
          if (savedPreferences) {
            setPreferences((prev) => ({ ...prev, ...savedPreferences }));
            setHasConsent(true);
          }
        }
      } catch (error) {
        console.error("Error checking cookie consent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCookieConsent();
  }, [hasCookie, getCookie, isReady]);

  // Save preferences
  const savePreferences = (newPreferences, days = 365) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    try {
      setCookie(COOKIE_CONSENT_NAME, newPreferences, {
        expires: expiryDate,
        sameSite: "Lax",
        path: "/",
      });

      setPreferences(newPreferences);
      setHasConsent(true);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      advertisement: true,
    };

    savePreferences(allAccepted);
    return allAccepted;
  };

  const rejectAll = () => {
    const allRejected = {
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
    return preferences;
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsent,
        isLoading,
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
