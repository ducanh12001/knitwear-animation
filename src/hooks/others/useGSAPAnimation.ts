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

    const hasRelevantMutation = (mutations: MutationRecord[]) =>
      mutations.some((mutation) =>
        [...mutation.addedNodes].some((node) => {
          if (!(node instanceof Element)) return false;
          return (
            node.matches('.elAnimation, .home-rel-product') ||
            node.querySelector('.elAnimation, .home-rel-product') !== null
          );
        }),
      );

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver((mutations) => {
      if (!hasRelevantMutation(mutations)) return;
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
