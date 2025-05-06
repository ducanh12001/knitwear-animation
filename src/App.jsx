import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import HomePage from "./pages/HomePage";
import CustomScrollbar from "./components/others/CustomScrollbar";
import { Header } from "./components/organisms/header/Header";
import Footer from "./components/organisms/footer/Footer";
import ScrollCircle from "./components/others/ScrollCircle";
import Lenis from "lenis";
import gsap from "gsap";
import ProductCollection from "./pages/ProductCollection";
import AkkeLimited from "./pages/AkkeLimited";
import LoginModal from "./components/organisms/modal/LoginModal";
import "./App.css";
import "./styles/index";

function App() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [openLogin, setOpenLogin] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Cấu hình Lenis để hỗ trợ position: sticky
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 1,
      syncTouch: true,
      wheelMultiplier: 1,
      lerp: 0.1, // Linear interpolation - giúp mượt hơn
      smoothWheel: true,
      syncTouchLerp: 0.1,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sự kiện đặc biệt cho position: sticky
    const updateStickyElements = () => {
      document.querySelectorAll("[class*='sticky']").forEach((el) => {
        const currentTop = el.style.top;
        el.style.top = "auto";
        void el.offsetHeight;
        el.style.top = currentTop;
      });
    };

    // Liên kết với sự kiện cuộn của Lenis
    lenis.on("scroll", updateStickyElements);

    return () => {
      lenis.destroy();
    };
  }, []);

  const startAnimation = useCallback(
    (action) => {
      setIsTransitioning(true);
      const pageTransition = document.querySelector("#pageTransition");
      const color1 = pageTransition.querySelector(".color-1");
      const color2 = pageTransition.querySelector(".color-2");
      const title = pageTransition.querySelector(".title h2");

      title.textContent = location.pathname.includes("/menswear")
        ? "Menswear"
        : location.pathname.includes("/womenswear")
          ? "Womenswear"
          : location.pathname.includes("/everest-akke-limite")
            ? "Everest Akke Limited"
            : "Akke Knitwear";

      gsap.set(pageTransition, { opacity: 1, visibility: "inherit" });
      gsap.fromTo(
        color1,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power2.out",
        },
      );
      gsap.fromTo(
        color2,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        title,
        { y: 10, opacity: 0, visibility: "hidden" },
        {
          y: 0,
          opacity: 1,
          visibility: "inherit",
          duration: 0.6,
          ease: "power2.out",
          delay: 1,
        },
      );

      setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
        gsap.to(color2, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "power2.in",
        });
        gsap.to(color1, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "power2.in",
          delay: 0.2,
        });
        gsap.set(pageTransition, {
          opacity: 0,
          visibility: "hidden",
          delay: 1,
        });
        gsap.set(title, { y: -10, opacity: 0, visibility: "hidden", delay: 1.1 });
        action();
      }, 1700);
    },
    [location],
  );

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      startAnimation(() => {});
    }
  }, [location, displayLocation, startAnimation]);

  return (
    <div className="overflow-hidden">
      <LoginModal isOpen={openLogin} onClose={() => setOpenLogin(false)} lenis={lenisRef.current} />
      <div
        id="pageTransition"
        className="invisible fixed top-0 left-0 z-200 h-full w-full opacity-0"
      >
        <div
          className="color-1 relative h-full w-full bg-[#302F35]"
          style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)" }}
        />
        <div
          className="color-2 absolute top-0 left-0 h-full w-full bg-[#e1e1e1]"
          style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)" }}
        >
          <div className="title absolute top-1/2 left-1/2 -translate-1/2">
            <h2 className="font-humane leading-full text-[12vw] font-normal text-[#302F35] uppercase">
              Akke Knitwear
            </h2>
          </div>
        </div>
      </div>
      {isTransitioning ? null : (
        <div className="relative h-auto w-full">
          <Header setOpenLogin={setOpenLogin} />
          <main
            className={`block ${location.pathname === "/" ? "bg-black" : "bg-[#e1e1e1]"}`}
            data-lenis-scroll-container
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/categoria-prodotto/menswear/"
                element={<ProductCollection isMen={true} />}
              />
              <Route
                path="/categoria-prodotto/womenswear/"
                element={<ProductCollection isMen={false} />}
              />
              <Route path="/everest-akke-limited" element={<AkkeLimited />} />
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
