import React, { useRef, useMemo, type FC } from 'react';
import { Link, useLocation } from 'react-router';

import { whiteRoutes } from '@/constant/routes';
import { useHeaderAnimation } from '@/hooks/others/useHeaderAnimation';
import { useModal } from '@/hooks/others/useModal';
import useCart from '@/hooks/others/useCart';
import ScrollVelocity from '@/components/animations/ScrollVelocity';
import { Breadcrumb } from '@/components/others/Breadcrumb';
import type { MenuLink } from '@/types';
import { useModalAwareNavigation } from '@/hooks/others/useModalAwareNavigation';

const MENU_LINKS: MenuLink[] = [
  {
    id: 'menswear',
    label: 'Menswear',
    path: '/product-category/menswear-collection',
  },
  {
    id: 'womenswear',
    label: 'Womenswear',
    path: '/product-category/womenswear-collection',
  },
  {
    id: 'limited',
    label: 'Limited',
    path: '/everest-okke-limited',
  },
];

const Header: FC = () => {
  const location = useLocation();
  const { navigate } = useModalAwareNavigation();
  const { modalState, toggleCartModal, toggleLoginModal, toggleMenu } =
    useModal();
  const { cartItems } = useCart();

  const headerRef = useRef<HTMLElement>(null);

  const textColor: string = useMemo(() => {
    return whiteRoutes.some((route) => location.pathname === route)
      ? '#fff'
      : '#1d1d1d';
  }, [location.pathname]);

  useHeaderAnimation(modalState, textColor, headerRef);

  const handleToggle = () => {
    toggleMenu(!modalState.menuOpen);
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
  };

  return (
    <header
      className="has-banner fixed top-0 left-0 z-145 box-border flex h-auto w-full translate-y-0 flex-col gap-[calc((5vh-1rem)/2)] pt-[calc((5vh-1rem)/2)] transition-transform duration-500 ease-in-out"
      ref={headerRef}
    >
      <ScrollVelocity
        texts={[
          'Okke Promo Launch 50% off – Free shipping for orders over 350€',
        ]}
      />

      <div className="header-wrapper relative box-border flex h-auto w-full items-start justify-between gap-4 px-[5vw] text-[1.2rem]">
        <div className="left relative flex w-auto items-start justify-start gap-[1.5rem] xl:gap-[6rem]">
          <div className="logo relative h-[4rem] w-[4.3rem] md:max-xl:w-[8rem] xl:h-[6rem] xl:w-[13rem]">
            <div
              className="js-header-color block h-full w-full cursor-pointer"
              style={textStyle}
              aria-label="Okke Home"
              onClick={() => navigate('/')}
            >
              <svg
                width="967"
                height="446"
                viewBox="0 0 967 446"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-auto w-full"
                style={{ color: textColor }}
              >
                <g clipPath="url(#clip0_25_2)">
                  <path
                    d="M221.22 228.4L0 183.52V130L221.22 177.54H222.68L443.9 130V183.52L222.89 228.4H221.22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M222.89 215.5L443.9 260.38V313.89L222.68 266.36H221.22L0 313.89V260.38L221.22 215.5H222.89Z"
                    fill="currentColor"
                  />
                  <path
                    d="M228.4 222.68L183.52 443.9H130L177.54 222.68V221.22L130 0H183.52L228.4 221.01V222.68Z"
                    fill="currentColor"
                  />
                  <path
                    d="M215.5 221.01L260.37 0H313.89L266.36 221.22V222.68L313.89 443.9H260.37L215.5 222.68V221.01Z"
                    fill="currentColor"
                  />
                  <path
                    d="M693.54 203.71V204.99L726.64 445.62H680.17L652.8 234.27H651.52V445.62H605.05V0H651.52V186.53H652.8L679.53 0H726.64L693.54 203.71Z"
                    fill="currentColor"
                  />
                  <path
                    d="M836.77 203.71V204.99L869.87 445.62H823.4L796.02 234.27H794.75V445.62H748.28V0H794.75V186.53H796.02L822.76 0H869.87L836.77 203.71Z"
                    fill="currentColor"
                  />
                  <path
                    d="M963.44 43.29H937.98V196.07H960.26V238.73H937.98V402.97H966.62V445.62H891.51V0.640015H963.44V43.29Z"
                    fill="currentColor"
                  />
                  <path
                    d="M520.39 23.9199C521.533 24.7127 523.732 26.6466 526.832 31.1904C532.63 39.6876 538.745 53.4586 544.239 72.498C555.141 110.274 562.19 163.778 562.19 223.81C562.19 283.841 555.141 337.346 544.239 375.122C538.745 394.161 532.63 407.933 526.832 416.43C523.732 420.973 521.534 422.906 520.39 423.699C519.246 422.906 517.047 420.973 513.947 416.43C508.15 407.933 502.036 394.161 496.541 375.122C485.639 337.346 478.59 283.841 478.59 223.81C478.59 163.778 485.639 110.274 496.541 72.498C502.036 53.4587 508.15 39.6875 513.947 31.1904C517.048 26.6468 519.246 24.7128 520.39 23.9199Z"
                    stroke="currentColor"
                    strokeWidth="45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_25_2">
                    <rect width="966.62" height="445.62" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="nav relative flex h-auto w-auto flex-col items-start justify-start gap-[1rem]">
            <ul
              id="menu-left-menu"
              className="leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase xl:flex"
            >
              {MENU_LINKS.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} style={textStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Breadcrumb
              textStyle={textStyle}
              isHomePage={location.pathname === '/'}
            />
          </div>
        </div>
        <div className="right relative flex w-auto items-start justify-end gap-[3rem]">
          <div className="relative flex items-start justify-end gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="leading-full relative hidden items-center justify-start gap-[1rem] text-[1.6rem] uppercase xl:flex"
            >
              <li>
                <Link to="/okkeworld" className="text-secondary">
                  Okkeworld
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
                  <div className="text-secondary">({cartItems.length})</div>
                </div>
              </li>
            </ul>
          </div>

          <button
            className="hamburger relative block h-[17px] w-10 cursor-pointer xl:hidden"
            onClick={handleToggle}
            aria-label="Toggle menu"
          >
            <div className="relative h-full">
              <div className="top absolute top-0 left-0 h-[1px] w-full">
                <span
                  className="js-header-background absolute top-0 left-0 h-full w-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
              <div className="center absolute top-2 left-0 h-[1px] w-full">
                <span
                  className="js-header-background absolute top-0 left-0 h-full w-full"
                  style={{ backgroundColor: textColor }}
                />
              </div>
              <div className="bottom absolute bottom-0 left-0 h-[1px] w-full">
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
};

export default Header;
