import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";

const menuLinks = [
  {
    label: "Menswear",
    url: "/categoria-prodotto/menswear/",
  },
  {
    label: "Womenswear",
    url: "/categoria-prodotto/womenswear/",
  },
  {
    label: "Everest Akke Limited",
    url: "/everest-akke-limited",
  },
  {
    label: "Akkeworld",
    url: "/akkeworld",
  },
  {
    label: "Contacts",
    url: "https://akkeknitwear.com/en/contacts/",
  },
];

export default function SideMenu({ isOpen, lenis }) {
  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      gsap.set("#menu-mobile", {
        autoAlpha: 1,
      });
      gsap.to(".menu-mobile-bg", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".menu-mobile-panel", {
        x: 0,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      if (lenis) lenis.start();
      gsap.to(".menu-mobile-bg", {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(".menu-mobile-panel", {
        x: "100%",
        scaleX: 0.95,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.set("#menu-mobile", {
        autoAlpha: 0,
        delay: 0.3,
      });
    }
  }, [isOpen, lenis]);

  return (
    <div
      id="menu-mobile"
      className="mobile invisible fixed top-0 left-0 z-145 h-full w-full overflow-hidden opacity-0"
    >
      <div className="menu-mobile-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0" />
      <div className="menu-mobile-panel absolute top-0 right-0 z-20 h-full w-[97.5vw] origin-top-right translate-x-full scale-x-95 overflow-hidden bg-[#e1e1e1] pt-[100px] uppercase">
        <ul id="menu-menu-mobile-inglese">
          {menuLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.url}
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
              <a data-lang="it" href="https://akkeknitwear.com/" className="px-[5vw] py-1">
                Italiano
              </a>
            </li>
            <li>
              <a
                data-lang="en"
                href="https://akkeknitwear.com/en/"
                className="px-[5vw] py-1 text-[#FD7453]"
              >
                English
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
