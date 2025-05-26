declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Google Analytics cookie handler
export const setupGoogleAnalytics = (isAnalyticsAllowed: boolean) => {
  if (isAnalyticsAllowed) {
    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID'); // Replace with your GA ID

    // Load the GA script - Check if it already exists to avoid duplicates
    if (!document.getElementById('google-analytics-script')) {
      const script = document.createElement('script');
      script.id = 'google-analytics-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`; // Replace with your GA ID
      document.head.appendChild(script);
    }

    return true;
  } else {
    // Remove Google Analytics if not allowed
    // This doesn't remove previously collected data, but stops new collection
    if (window.dataLayer) {
      window.dataLayer.push(['ga_disable_YOUR_GA_ID', true]); // Replace with your GA ID
    }

    // Remove cookies related to GA
    document.cookie =
      '_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.' +
      window.location.hostname;
    document.cookie =
      '_ga_*=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.' +
      window.location.hostname;
    document.cookie =
      '_gid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.' +
      window.location.hostname;
    document.cookie =
      '_gat=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=.' +
      window.location.hostname;

    // Remove the script if it exists
    const script = document.getElementById('google-analytics-script');
    if (script) {
      script.parentNode?.removeChild(script);
    }

    return false;
  }
};

// Functional cookies handler
export const setupFunctionalCookies = (isFunctionalAllowed: boolean) => {
  if (isFunctionalAllowed) {
    // Here you would implement your functional cookies
    // For example, language preference cookies
    return true;
  } else {
    // Clean up any functional cookies
    document.cookie =
      'wp-wpml_current_language=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    return false;
  }
};

// Performance cookies handler
export const setupPerformanceCookies = (isPerformanceAllowed: boolean) => {
  if (isPerformanceAllowed) {
    // Here you would implement your performance cookies
    return true;
  } else {
    // Clean up any performance cookies
    return false;
  }
};

// Advertisement cookies handler
export const setupAdvertisementCookies = (isAdvertisementAllowed: boolean) => {
  if (isAdvertisementAllowed) {
    // Here you would implement your advertisement cookies
    return true;
  } else {
    // Clean up any advertisement cookies
    return false;
  }
};

// Apply all cookie preferences
export const applyAllCookiePreferences = (preferences: {
  analytics: boolean;
  functional: boolean;
  performance: boolean;
  advertisement: boolean;
}) => {
  // Apply each category's settings
  setupGoogleAnalytics(preferences.analytics);
  setupFunctionalCookies(preferences.functional);
  setupPerformanceCookies(preferences.performance);
  setupAdvertisementCookies(preferences.advertisement);
};

// A utility function to check if a script is allowed to be loaded
export const canLoadScript = (scriptCategory: string, cookieConsent: { isAllowed: (scriptCategory: string) => boolean }) => {
  return cookieConsent.isAllowed(scriptCategory);
};

// For toggling consent dialog
export const openCookiePreferences = () => {
  // This function can be called from anywhere in your app
  // to open the cookie preferences modal
  const event = new CustomEvent('openCookiePreferences');
  window.dispatchEvent(event);
};

export default {
  setupGoogleAnalytics,
  setupFunctionalCookies,
  setupPerformanceCookies,
  setupAdvertisementCookies,
  applyAllCookiePreferences,
  canLoadScript,
  openCookiePreferences,
};
