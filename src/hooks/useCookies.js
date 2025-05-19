import { useState, useEffect, useCallback, useRef } from "react";

const useCookies = () => {
  const [cookies, setCookies] = useState({});
  const [isClient, setIsClient] = useState(false);
  const cookiesLoaded = useRef(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  const parseCookies = useCallback(() => {
    if (typeof document === "undefined") return {};

    try {
      return document.cookie.split(";").reduce((acc, cookie) => {
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
    } catch (error) {
      console.error("Error parsing cookies:", error);
      return {};
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadCookies = () => {
      try {
        const parsedCookies = parseCookies();
        setCookies(parsedCookies);
        cookiesLoaded.current = true;
        console.log("Cookies loaded:", parsedCookies);
      } catch (error) {
        console.error("Error loading cookies:", error);
      }
    };

    loadCookies();

    // Phát hiện thay đổi cookie (không hoạt động với tất cả các trình duyệt)
    const handleStorageChange = (e) => {
      if (e.key === null || e.key === "cookie") {
        loadCookies();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isClient, parseCookies]);

  // Get a cookie by name - đảm bảo đọc trực tiếp từ document.cookie
  const getCookie = useCallback(
    (name) => {
      if (!isClient) return null;

      try {
        // Đọc trực tiếp từ document.cookie để đảm bảo giá trị luôn mới nhất
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));

        if (!cookieValue) return null;

        const value = cookieValue.split("=")[1];
        try {
          // Try to parse as JSON
          return JSON.parse(decodeURIComponent(value));
        } catch (e) {
          // If not JSON, return as string
          return decodeURIComponent(value);
        }
      } catch (error) {
        console.error(`Error getting cookie ${name}:`, error);
        return null;
      }
    },
    [isClient],
  );

  // Set a cookie with options
  const setCookie = useCallback(
    (name, value, options = {}) => {
      if (!isClient) return false;

      try {
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
        setCookies((prevCookies) => {
          const newCookies = { ...prevCookies };
          newCookies[name] = typeof value === "object" ? { ...value } : value;
          return newCookies;
        });

        // Trigger a storage event for other tabs
        try {
          window.localStorage.setItem("cookie", Date.now().toString());
          window.localStorage.removeItem("cookie");
        } catch (e) {
          // Ignore localStorage errors (e.g. in incognito mode)
        }

        return true;
      } catch (error) {
        console.error(`Error setting cookie ${name}:`, error);
        return false;
      }
    },
    [isClient],
  );

  // Remove a cookie
  const removeCookie = useCallback(
    (name, options = {}) => {
      if (!isClient) return false;

      try {
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
      } catch (error) {
        console.error(`Error removing cookie ${name}:`, error);
        return false;
      }
    },
    [isClient],
  );

  // Check if a cookie exists - đảm bảo check trực tiếp từ document.cookie
  const hasCookie = useCallback(
    (name) => {
      if (!isClient) return false;

      try {
        const match = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)"),
        );
        return !!match;
      } catch (error) {
        console.error(`Error checking if cookie ${name} exists:`, error);
        return false;
      }
    },
    [isClient],
  );

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    hasCookie,
    isReady: isClient && cookiesLoaded.current,
  };
};

export default useCookies;
