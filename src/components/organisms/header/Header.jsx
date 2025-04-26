import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
import { Link } from "react-router";
import ScrollVelocity from "../../animations/ScrollVelocity";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="has-banner">
      <ScrollVelocity
        texts={[
          "Akke Promo Launch 50% off – Free shipping for orders over 350€",
        ]}
      />
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
                <Link to="/categoria-prodotto/menswear/">Menswear</Link>
              </li>
              <li>
                <Link to="/categoria-prodotto/womenswear/">Womenswear</Link>
              </li>
              <li>
                <Link to="/everest-akke-limited">Limited</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right relative flex w-auto items-start justify-end gap-[3rem]">
          <div className="nav relative flex items-start justify-end gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="menu leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase md:flex"
            >
              <li>
                <Link
                  to="https://akkeknitwear.com/akkeworld/"
                  className="text-[#FD7453]"
                >
                  Akkeworld
                </Link>
              </li>
            </ul>
            <ul className="relative flex items-center justify-start gap-[1rem]">
              <li>
                <div className="open--navbar-login leading-full text-[14px] text-white uppercase md:text-[1.6rem]">
                  Login
                </div>
              </li>
              <li>
                <div className="header--bag leading-full flex cursor-pointer items-center justify-center text-[14px] uppercase md:text-[1.6rem]">
                  <span className="text-white">Cart</span>
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
                className={`absolute top-0 left-0 h-[1px] w-full transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-[8px] scale-80 rotate-18" : "translate-y-0 scale-100 rotate-0"}`}
                // ref={topRef}
              >
                <span className="absolute top-0 left-0 h-full w-full bg-white" />
              </div>
              <div
                className={`absolute top-2 left-0 h-[1px] w-full transition-opacity duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
                // ref={centerRef}
              >
                <span className="absolute top-0 left-0 h-full w-full bg-white" />
              </div>
              <div
                className={`absolute bottom-0 left-0 h-[1px] w-full transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? "-translate-y-[8px] scale-80 -rotate-18"
                    : "translate-y-0 scale-100 rotate-0"
                }`}
                // ref={bottomRef}
              >
                <span className="absolute top-0 left-0 h-full w-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
