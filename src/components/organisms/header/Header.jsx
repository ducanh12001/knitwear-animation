import { useEffect } from "react";
import ScrollVelocity from "../../animations/ScrollVelocity";

export function Header() {
  useEffect(() => {}, []);

  return (
    <header className="has-banner">
      <ScrollVelocity
        texts={[
          "Akke Promo Launch 50% off – Free shipping for orders over 350€",
        ]}
      />
      <div className="header-wrapper text-[1.2rem]">
        <div className="left relative flex w-auto items-start justify-start gap-[6rem]">
          <div className="logo">
            <a href="" className="js-header-background text-white">
              ABC
            </a>
          </div>
          <div className="nav relative flex h-auto w-auto flex-col items-start justify-start gap-[1rem]">
            <ul
              id="menu-left-menu"
              className="menu relative flex items-center justify-start gap-[1rem]"
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
        <div className="right relative flex w-auto items-start justify-end gap-[3rem]">
          <div className="nav relative flex items-start justify-end gap-[10rem]">
            <ul
              id="menu-right-menu"
              className="menu relative flex items-center justify-start gap-[1rem]"
            >
              <li>
                <a
                  href="https://akkeknitwear.com/akkeworld/"
                  className="text-[#FD7453]"
                >
                  Akkeworld
                </a>
              </li>
            </ul>
            <ul className="relative flex items-center justify-start gap-[1rem]">
              <li>
                <span className="open--navbar-login text-white">Login</span>
              </li>
              <li>
                <div className="header--bag flex cursor-pointer items-center justify-center">
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
