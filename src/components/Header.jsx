import { useEffect } from "react";
import gsap from "gsap";

export function Header() {
  useEffect(() => {
    gsap.to(".fixed-rolling-text-bar .wrapper .item", {
      x: "-200%",
      repeat: -1,
      duration: 10,
      ease: "linear",
    });
  }, []);

  return (
    <header className="has-banner">
      <div className="fixed-rolling-text-bar active--rotation">
        <div className="wrapper">
          {[...Array(4)].map((_, index) => (
            <div className="item" key={index}>
              <p className="text-white uppercase whitespace-nowrap">
                Akke Promo Launch 50% off – Spedizione gratuita per ordini
                superiori a 350€
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="header-wrapper text-[1.2rem]">
        <div className="left relative w-auto flex justify-start items-start gap-[6rem]">
          <div className="logo">
            <a href="" className="js-header-background">
              ABC
            </a>
          </div>
          <div className="nav relative w-auto h-auto flex flex-col justify-start items-start gap-[1rem]">
            <ul
              id="menu-left-menu"
              className="menu relative flex justify-start items-center gap-[1rem]"
            >
              <li>
                <a href="">Menswear</a>
              </li>
              <li>
                <a href="">Womenswear</a>
              </li>
              <li>
                <a href="">Limited</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="right relative w-auto flex justify-end items-start gap-[3rem]">
          <div className="nav relative flex justify-end items-start gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="menu relative flex justify-start items-center gap-[1rem]"
            >
              <li>
                <a
                  href="https://akkeknitwear.com/akkeworld/"
                  className="text-[#FD7453] "
                >
                  Akkeworld
                </a>
              </li>
            </ul>
            <ul className="relative flex justify-start items-center gap-[1rem]">
              <li>
                <span className="open--navbar-login text-white">Login</span>
              </li>
              <li>
                <div className="header--bag flex justify-center items-center cursor-pointer">
                  <span className="text-white">Cart</span>
                  <div className="total--bag text-[#FD7453]">(0)</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
