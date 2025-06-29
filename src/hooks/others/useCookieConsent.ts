import { useContext } from 'react';
import { CookieConsentContext } from '@/contexts/cookie/CookieContext';
import type { CookieConsentContextValue } from '@/types';

export const useCookieConsent = (): CookieConsentContextValue => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider',
    );
  }
  return context;
}; 