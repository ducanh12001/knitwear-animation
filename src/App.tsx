import { Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import type { LenisOptions } from 'lenis';
import ReactLenis from 'lenis/react';

import { useLenisScrollTrigger } from '@/hooks/others/useLenisScrollTrigger';
import { ROUTES, whiteRoutes } from '@/constant/routes';
import { usePageTransition } from '@/hooks/others/usePageTransition';
import { PageTransitionContext } from '@/contexts/PageTransitionContext';

import Header from '@/components/organisms/header/Header';
import LoginModal from '@/components/organisms/modal/LoginModal';
import PageTransition from '@/components/animations/PageTransition';
import CartModal from '@/components/organisms/modal/CartModal';
import CustomScrollbar from '@/components/others/CustomScrollbar';
import PageErrorFallback from '@/components/others/PageErrorFallback';
import SideMenu from '@/components/organisms/modal/SideMenu';
import CustomCursor from '@/components/others/CustomCursor';
import Footer from '@/components/organisms/footer/Footer';
import ScrollCircle from '@/components/others/ScrollCircle';
import CookieConsent from '@/components/others/CookieConsent';
import AutoSEO from '@/components/others/AutoSEO';
import { PageLoadingFallback } from '@/components/others/PageLoadingFallback';

import './App.css';

const LENIS_OPTIONS: LenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 1,
  syncTouch: true,
  wheelMultiplier: 1,
  lerp: 0.1,
  smoothWheel: true,
  syncTouchLerp: 0.1,
};

const App = () => {
  const {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    cleanup,
    transitionTitle,
  } = usePageTransition();
  useLenisScrollTrigger();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const updateDarkMode = useCallback((pathname: string) => {
    const isWhiteRoute = whiteRoutes.some((route) => pathname === route);
    setIsDarkMode(!isWhiteRoute);
  }, []);

  useLayoutEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      startAnimation();
    }
  }, [location.pathname, displayLocation.pathname, startAnimation]);

  useEffect(() => {
    updateDarkMode(displayLocation.pathname);
  }, [displayLocation.pathname, updateDarkMode]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <PageTransitionContext.Provider
        value={{
          displayPathname: displayLocation.pathname,
          isTransitioning,
        }}
      >
      <div className="overflow-hidden">
        <AutoSEO />
        <CookieConsent />
        <LoginModal />
        <CartModal />
        <SideMenu />

        <PageTransition title={transitionTitle} />

        <div
          className={`relative h-auto w-full ${isDarkMode ? 'dark-mode' : ''} ${isTransitioning ? 'pointer-events-none' : ''}`}
        >
          <CustomCursor />
          <Header />
          <main
            className={`block ${displayLocation.pathname === '/' ? 'bg-black' : 'bg-surface'}`}
            data-lenis-scroll-container
          >
            <Routes location={displayLocation}>
              {ROUTES.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ErrorBoundary
                      fallback={<PageErrorFallback />}
                      onError={(error) => {
                        console.error(`Page error on ${route.path}:`, error);
                      }}
                    >
                      <Suspense fallback={<PageLoadingFallback />}>
                        {route.element}
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
            <ScrollCircle />
          </main>
          <CustomScrollbar />
        </div>
      </div>
      </PageTransitionContext.Provider>
    </ReactLenis>
  );
};

export default App;
