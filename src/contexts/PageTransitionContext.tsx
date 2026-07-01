import { createContext, useContext } from 'react';

interface PageTransitionContextValue {
  displayPathname: string;
  isTransitioning: boolean;
}

export const PageTransitionContext =
  createContext<PageTransitionContextValue>({
    displayPathname: '/',
    isTransitioning: false,
  });

export const usePageTransitionContext = () =>
  useContext(PageTransitionContext);
