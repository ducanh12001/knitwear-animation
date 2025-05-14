import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import CustomScrollbar from "./components/others/CustomScrollbar";
import { Header } from "./components/organisms/header/Header";
import Footer from "./components/organisms/footer/Footer";
import ScrollCircle from "./components/others/ScrollCircle";
import LoginModal from "./components/organisms/modal/LoginModal";
import CustomCursor from "./components/others/CustomCursor";
import SideMenu from "./components/others/SideMenu";
import { usePageTransition } from "./hooks/usePageTransition";
import PageTransition from "./components/animations/PageTransition";
import { ROUTES } from "./common/const/routes";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import CartModal from "./components/organisms/modal/CartModal";

import "./App.css";
import "./styles/index";

function App() {
  const {
    location,
    displayLocation,
    isTransitioning,
    startAnimation,
    pageTitle,
  } = usePageTransition();
  const [openLogin, setOpenLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const lenisRef = useSmoothScroll();

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setOpenMenu(false);
      setOpenCart(false);
      startAnimation();
    }
  }, [location, displayLocation, startAnimation]);

  return (
    <div className="overflow-hidden">
      <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        lenis={lenisRef.current}
      />
      <CartModal
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        lenis={lenisRef.current}
      />
      <SideMenu isOpen={openMenu} lenis={lenisRef.current} />

      <PageTransition title={pageTitle} />

      {isTransitioning ? null : (
        <div className="relative h-auto w-full">
          <CustomCursor />
          <Header
            setOpenLogin={setOpenLogin}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            setOpenCart={setOpenCart}
          />
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
