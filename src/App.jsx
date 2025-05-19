import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import CustomScrollbar from "@/components/others/CustomScrollbar";
import { Header } from "@/components/organisms/header/Header";
import Footer from "@/components/organisms/footer/Footer";
import ScrollCircle from "@/components/others/ScrollCircle";
import LoginModal from "@/components/organisms/modal/LoginModal";
import CustomCursor from "@/components/others/CustomCursor";
import SideMenu from "@/components/others/SideMenu";
import { usePageTransition } from "@/hooks/usePageTransition";
import PageTransition from "@/components/animations/PageTransition";
import { ROUTES } from "@/common/const/routes";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import CartModal from "@/components/organisms/modal/CartModal";
import { useModal } from "@/hooks/useModal";
import CookieConsent from "@/components/others/CookieConsent";

import "./App.css";
import "@/styles/index";

function App() {
  const {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    pageTitle,
  } = usePageTransition();
  const { modalState, toggleMenu, toggleCartModal } = useModal();
  const lenisRef = useSmoothScroll();

  useEffect(() => {
    if (
      location.pathname !== displayLocation.pathname &&
      !location.pathname.startsWith("/checkout")
    ) {
      if (modalState.menuOpen) {
        toggleMenu(false);
      }
      if (modalState.cartModalOpen) {
        toggleCartModal(false);
      }
      startAnimation();
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
        <div className="relative h-auto w-full">
          <CustomCursor />
          <Header />
          <main
            className={`block ${location.pathname === "/" ? "bg-black" : "bg-[#e1e1e1]"}`}
            data-lenis-scroll-container
          >
            <Routes>
              {ROUTES.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
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
