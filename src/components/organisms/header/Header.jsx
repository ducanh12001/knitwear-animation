import { useRef, useMemo } from "react";
import { Link, useLocation } from "react-router";
import useCart from "@/hooks/useCart";
import { useModal } from "@/hooks/useModal";
import { getPageTitle } from "@/common/functions";
import ScrollVelocity from "@/components/animations/ScrollVelocity";
import { useHeaderAnimation } from "@/hooks/useHeaderAnimation";

export function Header() {
  const location = useLocation();
  const headerRef = useRef(null);

  const { modalState, toggleCartModal, toggleLoginModal, toggleMenu } =
    useModal();
  const { cartItems } = useCart();

  const textColor = useMemo(() => {
    const whiteTextRoutes = ["/", "/everest-akke-limited", "/akkeworld"];

    return whiteTextRoutes.some((route) => location.pathname === route)
      ? "#fff"
      : "#1d1d1d";
  }, [location.pathname]);

  useHeaderAnimation(modalState, textColor, headerRef);

  const handleToggle = () => {
    toggleMenu(!modalState.menuOpen);
  };

  const COLORS = {
    primary: "#FD7453",
    white: "#fff",
    black: "#1d1d1d",
  };

  const textStyle = {
    color: textColor,
  };

  return (
    <header
      className="has-banner fixed top-0 left-0 z-145 box-border flex h-auto w-full translate-y-0 flex-col gap-[calc((5vh-1rem)/2)] pt-[calc((5vh-1rem)/2)] transition-transform duration-500 ease-in-out"
      ref={headerRef}
    >
      <ScrollVelocity
        texts={[
          "Akke Promo Launch 50% off – Free shipping for orders over 350€",
        ]}
      />

      <div className="header-wrapper relative box-border flex h-auto w-full items-start justify-between px-[5vw] text-[1.2rem]">
        <div className="left relative flex w-auto items-start justify-start gap-[1.5rem] xl:gap-[6rem]">
          <div className="logo relative h-[4rem] w-[4.3rem] md:max-xl:w-[8rem] xl:h-[6rem] xl:w-[13rem]">
            <Link
              to="/"
              className="js-header-background block h-full w-full mask-[url(/src/assets/logo.svg)] mask-no-repeat"
              style={{ backgroundColor: textColor }}
              aria-label="Akke Home"
            />
          </div>
          <div className="nav relative flex h-auto w-auto flex-col items-start justify-start gap-[1rem]">
            <ul
              id="menu-left-menu"
              className="menu leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase xl:flex"
            >
              <li>
                <Link
                  to="/product-category/menswear-collection"
                  style={textStyle}
                >
                  Menswear
                </Link>
              </li>
              <li>
                <Link
                  to="/product-category/womenswear-collection"
                  style={textStyle}
                >
                  Womenswear
                </Link>
              </li>
              <li>
                <Link to="/everest-akke-limited" style={textStyle}>
                  Limited
                </Link>
              </li>
            </ul>
            <div
              className={`breadcrumb relative hidden h-auto w-auto xl:block ${location.pathname === "/" ? "invisible opacity-0" : ""}`}
            >
              <ul className="relative flex items-center justify-start gap-2">
                <li>
                  <Link to="/" style={textStyle}>
                    Homepage
                  </Link>
                </li>
                <li className="separator" style={textStyle}>
                  /
                </li>
                <li>
                  <span style={textStyle}>
                    {getPageTitle(location.pathname)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right relative flex w-auto items-start justify-end gap-[3rem]">
          <div className="nav relative flex items-start justify-end gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="menu leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase xl:flex"
            >
              <li>
                <Link to="/akkeworld" style={{ color: COLORS.primary }}>
                  Akkeworld
                </Link>
              </li>
            </ul>
            <ul className="relative flex items-center justify-start gap-[1rem]">
              <li>
                <div
                  className="js-header-color leading-full cursor-pointer text-[14px] uppercase xl:text-[1.6rem]"
                  style={textStyle}
                  onClick={() => toggleLoginModal(true)}
                >
                  Login
                </div>
              </li>
              <li>
                <div
                  className="header--bag leading-full flex cursor-pointer items-center justify-center text-[14px] uppercase xl:text-[1.6rem]"
                  onClick={() => toggleCartModal(true)}
                >
                  <span className="js-header-color" style={textStyle}>
                    Cart
                  </span>
                  <div style={{ color: COLORS.primary }}>
                    ({cartItems.length})
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <button
            className="hamburger relative block h-[17px] w-10 cursor-pointer xl:hidden"
            onClick={handleToggle}
            aria-label="Toggle menu"
          >
            <div className="hamburger-wrapper relative h-full">
              <div className="span__wrapper top absolute top-0 left-0 h-[1px] w-full">
                <span
                  className="js-header-background absolute top-0 left-0 h-full w-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
              <div className="span__wrapper center absolute top-2 left-0 h-[1px] w-full">
                <span
                  className="js-header-background absolute top-0 left-0 h-full w-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
              <div className="span__wrapper bottom absolute bottom-0 left-0 h-[1px] w-full">
                <span
                  className="js-header-background absolute top-0 left-0 h-full w-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
