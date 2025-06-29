import { createContext } from 'react';
import type { CookieConsentContextValue } from '@/types';

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
); 