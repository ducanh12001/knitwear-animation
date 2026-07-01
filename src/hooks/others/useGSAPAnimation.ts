import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  clearScrollAnimationMarks,
  initScrollAnimations,
  refreshScrollAnimations,
} from '@/lib/scrollAnimations';

export const useGSAPAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    clearScrollAnimationMarks(main);

    const cleanup = initScrollAnimations(main);

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => refreshScrollAnimations(), 150);
    });

    observer.observe(main, { childList: true, subtree: true });

    const refreshTimer = setTimeout(() => refreshScrollAnimations(), 400);

    return () => {
      cleanup();
      observer.disconnect();
      clearTimeout(debounceTimer);
      clearTimeout(refreshTimer);
    };
  }, [location.pathname]);
};
