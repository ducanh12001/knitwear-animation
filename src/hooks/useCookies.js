// src/hooks/useCookies.js
import { useState, useEffect, useCallback } from "react";

const useCookies = () => {
  const [cookies, setCookies] = useState({});

  // Initialize cookies on mount
  useEffect(() => {
    const allCookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        try {
          // Try to parse JSON values
          acc[key] = JSON.parse(decodeURIComponent(value));
        } catch (e) {
          // If not JSON, store as string
          acc[key] = decodeURIComponent(value);
        }
      }
      return acc;
    }, {});

    setCookies(allCookies);
  }, []);

  // Get a cookie by name
  const getCookie = useCallback(
    (name) => {
      return cookies[name];
    },
    [cookies],
  );

  // Set a cookie with options
  const setCookie = useCallback((name, value, options = {}) => {
    const {
      path = "/",
      expires,
      maxAge,
      domain,
      secure,
      sameSite = "Lax",
    } = options;

    let cookieValue;

    // Handle objects and other non-string values
    if (typeof value === "object") {
      cookieValue = encodeURIComponent(JSON.stringify(value));
    } else {
      cookieValue = encodeURIComponent(value);
    }

    let cookieString = `${name}=${cookieValue}`;

    if (path) cookieString += `; path=${path}`;
    if (expires) cookieString += `; expires=${expires.toUTCString()}`;
    if (maxAge) cookieString += `; max-age=${maxAge}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += "; secure";
    if (sameSite) cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;

    // Update local state
    setCookies((prevCookies) => ({
      ...prevCookies,
      [name]: typeof value === "object" ? value : value,
    }));

    return true;
  }, []);

  // Remove a cookie
  const removeCookie = useCallback((name, options = {}) => {
    const { path = "/", domain } = options;

    // Set expiration to the past to delete
    document.cookie = `${name}=; path=${path}${domain ? `; domain=${domain}` : ""}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    // Update local state
    setCookies((prevCookies) => {
      const newCookies = { ...prevCookies };
      delete newCookies[name];
      return newCookies;
    });

    return true;
  }, []);

  // Check if a cookie exists
  const hasCookie = useCallback(
    (name) => {
      return Object.prototype.hasOwnProperty.call(cookies, name);
    },
    [cookies],
  );

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    hasCookie,
  };
};

export default useCookies;
