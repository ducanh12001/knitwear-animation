import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router";
import ScrollVelocity from "../../animations/ScrollVelocity";
import { getPageTitle } from "../../../common/functions";

export function Header({ setOpenLogin, openMenu, setOpenMenu }) {
  const location = useLocation();
  // const topRef = useRef(null);
  // const centerRef = useRef(null);
  // const bottomRef = useRef(null);

  // useEffect(() => {
  //   // Open with gsap
  //   if (isOpen) {
  //     gsap.to(topRef.current, {
  //       rotation: 18,
  //       y: 8,
  //       scale: 0.8,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(bottomRef.current, {
  //       rotation: -18,
  //       y: -8,
  //       scale: 0.8,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(centerRef.current, {
  //       opacity: 0,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   } else {
  //     gsap.to(topRef.current, {
  //       rotation: 0,
  //       y: 0,
  //       scale: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(bottomRef.current, {
  //       rotation: 0,
  //       y: 0,
  //       scale: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //     gsap.to(centerRef.current, {
  //       opacity: 1,
  //       duration: 0.3,
  //       ease: "power2.out",
  //     });
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (openMenu) {
      gsap.to(".js-header-background", { backgroundColor: "black", duration: 0.6 });
      gsap.to(".js-header-color", { color: "#1d1d1d", duration: 0.6 });
    } else {
      gsap.to(".js-header-background", { backgroundColor: "white", duration: 0.25 });
      gsap.to(".js-header-color", { color: "#fff", duration: 0.25 });
    }
  }, [openMenu]);

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="has-banner">
      <ScrollVelocity texts={["Akke Promo Launch 50% off – Free shipping for orders over 350€"]} />
      <div className="header-wrapper text-[1.2rem]">
        <div className="left relative flex w-auto items-start justify-start gap-[1.5rem] md:gap-[6rem]">
          <div className="logo relative h-[4rem] w-[4.3rem] md:h-[6rem] md:w-[13rem]">
            <Link
              to="/"
              className="js-header-background block h-full w-full bg-white mask-[url(/src/assets/logo.svg)] mask-no-repeat"
            />
          </div>
          <div className="nav relative flex h-auto w-auto flex-col items-start justify-start gap-[1rem]">
            <ul
              id="menu-left-menu"
              className="menu leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] text-white uppercase md:flex"
            >
              <li>
                <Link to="/product-category/menswear-collection">Menswear</Link>
              </li>
              <li>
                <Link to="/product-category/womenswear-collection">Womenswear</Link>
              </li>
              <li>
                <Link to="/everest-akke-limited">Limited</Link>
              </li>
            </ul>
            <div
              className={`breadcrumb desktop relative h-auto w-auto ${location.pathname === "/" && "invisible opacity-0"}`}
            >
              <ul className="relative flex items-center justify-start gap-2">
                <li>
                  <Link to="/" className="leading-full text-white">
                    Homepage
                  </Link>
                </li>
                <li className="separator leading-full text-white">/</li>
                <li>
                  <span className="leading-full text-white">{getPageTitle(location.pathname)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right relative flex w-auto items-start justify-end gap-[3rem]">
          <div className="nav relative flex items-start justify-end gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="menu leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase md:flex"
            >
              <li>
                <Link to="/akkeworld" className="text-[#FD7453]">
                  Akkeworld
                </Link>
              </li>
            </ul>
            <ul className="relative flex items-center justify-start gap-[1rem]">
              <li>
                <div
                  className="js-header-color leading-full text-[14px] text-white uppercase md:text-[1.6rem]"
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </div>
              </li>
              <li>
                <div className="header--bag leading-full flex cursor-pointer items-center justify-center text-[14px] uppercase md:text-[1.6rem]">
                  <span className="js-header-color text-white">Cart</span>
                  <div className="total--bag text-[#FD7453]">(0)</div>
                </div>
              </li>
            </ul>
          </div>
          <div
            className="hamburger relative block h-[17px] w-10 cursor-pointer md:hidden"
            onClick={handleToggle}
          >
            <div className="hamburger-wrapper relative h-full">
              <div
                className={`span__wrapper top absolute left-0 h-[1px] w-full transition-transform duration-600 ease-in-out ${openMenu ? "top-[8px] scale-80 rotate-18" : "top-0 scale-100 rotate-0"}`}
                // ref={topRef}
              >
                <span className="js-header-background absolute top-0 left-0 h-full w-full bg-white" />
              </div>
              <div
                className={`span__wrapper center absolute top-2 left-0 h-[1px] w-full transition-opacity duration-600 ease-in-out ${
                  openMenu ? "invisible opacity-0" : "visible opacity-100"
                }`}
                // ref={centerRef}
              >
                <span className="js-header-background absolute top-0 left-0 h-full w-full bg-white" />
              </div>
              <div
                className={`span__wrapper bottom absolute left-0 h-[1px] w-full transition-transform duration-600 ease-in-out ${
                  openMenu ? "bottom-[8px] scale-80 -rotate-18" : "bottom-0 scale-100 rotate-0"
                }`}
                // ref={bottomRef}
              >
                <span className="js-header-background absolute top-0 left-0 h-full w-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
