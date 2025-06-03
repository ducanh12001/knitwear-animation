import { useState, useEffect, useCallback, useRef } from 'react';
import type { CookieOptions } from '@/types';

export interface RemoveCookieOptions {
  path?: string;
  domain?: string;
}

export type CookieValue = string | number | boolean | object | null;

export interface CookieStorage {
  [key: string]: CookieValue;
}

// Return type for the useCookies hook
export interface UseCookiesReturn {
  cookies: CookieStorage;
  getCookie: <T = CookieValue>(name: string) => T | null;
  setCookie: (
    name: string,
    value: CookieValue,
    options?: CookieOptions,
  ) => boolean;
  removeCookie: (name: string, options?: RemoveCookieOptions) => boolean;
  hasCookie: (name: string) => boolean;
  isReady: boolean;
  clearAllCookies: () => boolean;
}

/**
 * Custom hook for managing browser cookies with TypeScript support
 * Provides methods to get, set, remove, and check cookies
 *
 * @returns {UseCookiesReturn} Object containing cookie methods and state
 */
const useCookies = (): UseCookiesReturn => {
  const [cookies, setCookies] = useState<CookieStorage>({});
  const [isClient, setIsClient] = useState<boolean>(false);
  const cookiesLoaded = useRef<boolean>(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  /**
   * Parse all cookies from document.cookie into an object
   */
  const parseCookies = useCallback((): CookieStorage => {
    if (typeof document === 'undefined') return {};

    try {
      return document.cookie
        .split(';')
        .reduce((acc: CookieStorage, cookie: string) => {
          const [key, value] = cookie.trim().split('=');
          if (key && value) {
            try {
              // Try to parse JSON values
              acc[key] = JSON.parse(decodeURIComponent(value));
            } catch {
              // If not JSON, store as string
              acc[key] = decodeURIComponent(value);
            }
          }
          return acc;
        }, {});
    } catch (error) {
      console.error('Error parsing cookies:', error);
      return {};
    }
  }, []);

  // Load cookies on client mount and set up change detection
  useEffect(() => {
    if (!isClient) return;

    const loadCookies = (): void => {
      try {
        const parsedCookies = parseCookies();
        setCookies(parsedCookies);
        cookiesLoaded.current = true;
        console.log('Cookies loaded:', parsedCookies);
      } catch (error) {
        console.error('Error loading cookies:', error);
      }
    };

    loadCookies();

    // Detect cookie changes (works in some browsers when localStorage changes)
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === null || e.key === 'cookie') {
        loadCookies();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isClient, parseCookies]);

  /**
   * Get a cookie by name - reads directly from document.cookie to ensure latest value
   * @param name - Cookie name
   * @returns Cookie value or null if not found
   */
  const getCookie = useCallback(
    <T = CookieValue>(name: string): T | null => {
      if (!isClient) return null;

      try {
        // Read directly from document.cookie to ensure latest value
        const cookieValue = document.cookie
          .split('; ')
          .find((row: string) => row.startsWith(`${name}=`));

        if (!cookieValue) return null;

        const value = cookieValue.split('=')[1];
        if (!value) return null;

        try {
          // Try to parse as JSON
          return JSON.parse(decodeURIComponent(value)) as T;
        } catch {
          // If not JSON, return as string
          return decodeURIComponent(value) as T;
        }
      } catch (error) {
        console.error(`Error getting cookie ${name}:`, error);
        return null;
      }
    },
    [isClient],
  );

  /**
   * Set a cookie with options
   * @param name - Cookie name
   * @param value - Cookie value (will be JSON.stringify if object)
   * @param options - Cookie options (path, expires, etc.)
   * @returns Success boolean
   */
  const setCookie = useCallback(
    (
      name: string,
      value: CookieValue,
      options: CookieOptions = {},
    ): boolean => {
      if (!isClient) return false;
      if (!name) {
        console.warn('Cookie name cannot be empty');
        return false;
      }

      try {
        const {
          path = '/',
          expires,
          maxAge,
          domain,
          secure,
          sameSite = 'Lax',
        } = options;

        let cookieValue: string;

        // Handle different value types
        if (value === null || value === undefined) {
          cookieValue = '';
        } else if (typeof value === 'object') {
          cookieValue = encodeURIComponent(JSON.stringify(value));
        } else {
          cookieValue = encodeURIComponent(String(value));
        }

        let cookieString = `${name}=${cookieValue}`;

        if (path) cookieString += `; path=${path}`;
        if (expires) cookieString += `; expires=${expires.toUTCString()}`;
        if (maxAge !== undefined) cookieString += `; max-age=${maxAge}`;
        if (domain) cookieString += `; domain=${domain}`;
        if (secure) cookieString += '; secure';
        if (sameSite) cookieString += `; samesite=${sameSite}`;

        document.cookie = cookieString;

        // Update local state
        setCookies((prevCookies: CookieStorage) => {
          const newCookies = { ...prevCookies };
          newCookies[name] =
            typeof value === 'object' && value !== null ? { ...value } : value;
          return newCookies;
        });

        // Trigger a storage event for other tabs/windows
        try {
          window.localStorage.setItem('cookie', Date.now().toString());
          window.localStorage.removeItem('cookie');
        } catch {
          // Ignore localStorage errors (e.g., in incognito mode)
        }

        return true;
      } catch (error) {
        console.error(`Error setting cookie ${name}:`, error);
        return false;
      }
    },
    [isClient],
  );

  /**
   * Remove a cookie by setting its expiration to the past
   * @param name - Cookie name to remove
   * @param options - Remove options (path, domain)
   * @returns Success boolean
   */
  const removeCookie = useCallback(
    (name: string, options: RemoveCookieOptions = {}): boolean => {
      if (!isClient) return false;
      if (!name) {
        console.warn('Cookie name cannot be empty');
        return false;
      }

      try {
        const { path = '/', domain } = options;

        // Set expiration to the past to delete
        let cookieString = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (domain) cookieString += `; domain=${domain}`;

        document.cookie = cookieString;

        // Update local state
        setCookies((prevCookies: CookieStorage) => {
          const newCookies = { ...prevCookies };
          delete newCookies[name];
          return newCookies;
        });

        return true;
      } catch (error) {
        console.error(`Error removing cookie ${name}:`, error);
        return false;
      }
    },
    [isClient],
  );

  /**
   * Check if a cookie exists - reads directly from document.cookie
   * @param name - Cookie name to check
   * @returns Boolean indicating if cookie exists
   */
  const hasCookie = useCallback(
    (name: string): boolean => {
      if (!isClient) return false;
      if (!name) return false;

      try {
        const match = document.cookie.match(
          new RegExp('(^| )' + name + '=([^;]+)'),
        );
        return !!match;
      } catch (error) {
        console.error(`Error checking if cookie ${name} exists:`, error);
        return false;
      }
    },
    [isClient],
  );

  /**
   * Clear all cookies (Note: This only clears cookies accessible to current domain/path)
   * @returns Success boolean
   */
  const clearAllCookies = useCallback((): boolean => {
    if (!isClient) return false;

    try {
      const cookieNames = Object.keys(cookies);
      let allSuccessful = true;

      cookieNames.forEach((name) => {
        const success = removeCookie(name);
        if (!success) allSuccessful = false;
      });

      return allSuccessful;
    } catch (error) {
      console.error('Error clearing all cookies:', error);
      return false;
    }
  }, [isClient, cookies, removeCookie]);

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    hasCookie,
    clearAllCookies,
    isReady: isClient && cookiesLoaded.current,
  };
};

export default useCookies;
