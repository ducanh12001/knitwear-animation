import { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import { ROUTES, whiteRoutes } from '@/common/const/routes';
import { usePageTransition } from '@/hooks/usePageTransition';
import { useModal } from '@/hooks/useModal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

import Header from '@/components/organisms/header/Header';
import LoginModal from '@/components/organisms/modal/LoginModal';
import PageTransition from '@/components/animations/PageTransition';
import CartModal from '@/components/organisms/modal/CartModal';
import CustomScrollbar from '@/components/others/CustomScrollbar';
import PageErrorFallback from '@/components/others/PageErrorFallback';
import SideMenu from '@/components/others/SideMenu';
import CustomCursor from '@/components/others/CustomCursor';
import Footer from '@/components/organisms/footer/Footer';
import ScrollCircle from '@/components/others/ScrollCircle';
import CookieConsent from '@/components/others/CookieConsent';

import './App.css';
import '@/styles/index.css';

function App() {
  const {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    pageTitle,
  } = usePageTransition();
  const { modalState, toggleMenu, toggleCartModal, toggleLoginModal } =
    useModal();
  const lenisRef = useSmoothScroll();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (modalState.menuOpen) {
      toggleMenu(false);
    }
    if (modalState.cartModalOpen) {
      toggleCartModal(false);
    }
    if (modalState.loginModalOpen) {
      toggleLoginModal(false);
    }
    if (location.pathname !== displayLocation.pathname) {
      startAnimation();
    }

    if (whiteRoutes.some((route) => location.pathname === route)) {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, [location, displayLocation]);

  return (
    <div className="overflow-hidden">
      <CookieConsent />
      <LoginModal lenis={lenisRef.current} />
      <CartModal lenis={lenisRef.current} />
      <SideMenu lenis={lenisRef.current} />

      <PageTransition title={pageTitle} />

      {isTransitioning ? null : (
        <div
          className={`relative h-auto w-full ${isDarkMode ? 'dark-mode' : ''}`}
        >
          <CustomCursor />
          <Header />
          <main
            className={`block ${location.pathname === '/' ? 'bg-black' : 'bg-[#e1e1e1]'}`}
            data-lenis-scroll-container
          >
            <Routes>
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
                      <Suspense fallback={null}>{route.element}</Suspense>
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
      )}
    </div>
  );
}

export default App;
