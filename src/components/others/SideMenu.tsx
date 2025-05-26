import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router';
import Lenis from 'lenis';
import { useModal } from '@/hooks/useModal';

const menuLinks = [
  {
    label: 'Menswear',
    path: '/product-category/menswear-collection',
  },
  {
    label: 'Womenswear',
    path: '/product-category/womenswear-collection',
  },
  {
    label: 'Everest Akke Limited',
    path: '/everest-akke-limited',
  },
  {
    label: 'Akkeworld',
    path: '/akkeworld',
  },
  {
    label: 'Contacts',
    path: '/contacts',
  },
];

interface SideMenuProps {
  lenis: Lenis | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ lenis }) => {
  const { modalState } = useModal();

  useEffect(() => {
    if (modalState.menuOpen) {
      if (lenis) lenis.stop();
      gsap.set('#menu-mobile', {
        autoAlpha: 1,
      });
      gsap.to('.menu-mobile-bg', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to('.menu-mobile-panel', {
        x: 0,
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    } else {
      if (lenis) lenis.start();
      gsap.to('.menu-mobile-bg', {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to('.menu-mobile-panel', {
        x: '100%',
        scaleX: 0.95,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.set('#menu-mobile', {
        autoAlpha: 0,
        delay: 0.3,
      });
    }
  }, [modalState.menuOpen, lenis]);

  return (
    <div
      id="menu-mobile"
      className="invisible fixed top-0 left-0 z-145 block h-full w-full overflow-hidden opacity-0 xl:hidden"
    >
      <div className="menu-mobile-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0" />
      <div className="menu-mobile-panel absolute top-0 right-0 z-20 h-full w-[97.5vw] origin-top-right translate-x-full scale-x-95 overflow-hidden bg-[#e1e1e1] pt-[100px] uppercase">
        <ul id="menu-menu-mobile-inglese">
          {menuLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="font-humane block border-t border-t-[#868686]/10 px-[5vw] py-1 text-[4.4rem] text-[#1d1d1d]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className="font-humane flex border-t border-b border-[#868686]/10 text-[3rem] text-[#1d1d1d] uppercase">
            <li>
              <Link data-lang="it" to="/" className="px-[5vw] py-1">
                Italiano
              </Link>
            </li>
            <li>
              <Link
                data-lang="en"
                to="/"
                className="px-[5vw] py-1 text-[#FD7453]"
              >
                English
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
