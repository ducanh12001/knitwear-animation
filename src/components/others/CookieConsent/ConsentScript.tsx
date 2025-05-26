import { useEffect, type FC } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import type { KeyofCookiePreferences } from '@/types';

/**
 * A component that conditionally loads a script based on cookie consent
 *
 * @param {Object} props
 * @param {string} props.category - The cookie category this script belongs to
 * @param {string} props.src - The script source URL
 * @param {Object} props.attributes - Additional script attributes
 * @param {Function} props.onLoad - Callback function when script loads
 * @param {Function} props.onError - Callback function when script fails to load
 * @param {boolean} props.removeOnReject - Whether to remove the script if consent is revoked
 */
interface ConsentScriptProps {
  category: KeyofCookiePreferences;
  src: string;
  attributes?: Record<string, any>;
  onLoad?: () => void;
  onError?: (err?: string | Event) => void;
  removeOnReject?: boolean;
}

const ConsentScript: FC<ConsentScriptProps> = ({
  category,
  src,
  attributes = {},
  onLoad,
  onError,
  removeOnReject = true,
}) => {
  const { isAllowed } = useCookieConsent();

  useEffect(() => {
    // Check if this script category is allowed
    const allowed = isAllowed(category);

    // Generate a unique ID for the script
    const scriptId = `consent-script-${src.replace(/[^a-z0-9]/gi, '')}`;

    // Check if script already exists
    let scriptElement = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    if (allowed) {
      // Load the script if allowed and not already loaded
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.src = src;

        // Add additional attributes
        Object.entries(attributes).forEach(([key, value]) => {
          scriptElement!.setAttribute(key, value);
        });

        // Add event handlers
        scriptElement.onload = () => {
          if (onLoad) onLoad();
        };

        scriptElement.onerror = (err) => {
          if (onError) onError(err);
        };

        // Append to document
        document.body.appendChild(scriptElement);
      }
    } else if (removeOnReject && scriptElement) {
      // Remove the script if consent is denied and removeOnReject is true
      scriptElement.parentNode?.removeChild(scriptElement);
    }

    // Cleanup function
    return () => {
      if (removeOnReject && scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [category, src, attributes, onLoad, onError, removeOnReject, isAllowed]);

  return null; // This component doesn't render anything visible
};

export default ConsentScript;
