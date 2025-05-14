import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export default function CartModal({ isOpen, onClose, lenis }) {
  const modalRef = useRef(null);
  const bgRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const animations = [];

    if (isOpen) {
      if (lenis) lenis.stop();

      gsap.set(modalRef.current, {
        opacity: 1,
        visibility: "visible",
      });

      animations.push(
        gsap.to(bgRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        }),
        gsap.to(panelRef.current, {
          x: 0,
          scaleX: 1,
          duration: 0.3,
          delay: 0.4,
          ease: "power2.out",
        }),
        gsap.to(closeRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          delay: 0.4,
          ease: "power2.out",
        }),
      );
    } else {
      if (lenis) lenis.start();

      animations.push(
        gsap.to(closeRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
        }),
        gsap.to(panelRef.current, {
          x: "100%",
          scaleX: 0.95,
          duration: 0.5,
          ease: "power2.out",
        }),
        gsap.to(bgRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(modalRef.current, {
              opacity: 0,
              visibility: "hidden",
            });
          },
        }),
      );
    }

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [isOpen, lenis]);

  return (
    <div
      id="minicart"
      className="invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0"
      ref={modalRef}
    >
      <div
        ref={bgRef}
        className="minicart-bg absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0"
        onClick={onClose}
      />
      <div
        className="minicart-panel absolute top-0 right-0 z-20 h-full w-[95vw] origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:w-[35vw]"
        ref={panelRef}
      >
        <div className="relative z-20 box-border flex h-full w-full flex-col items-start justify-start gap-0 px-[12px] py-[1rem] md:gap-[2rem] md:p-[1.25rem]">
          <div className="minicart-header relative box-border flex h-auto w-full items-stretch justify-between px-[5vw] pt-[2.5rem] pb-[12px] md:py-[2.5vw]">
            <div className="minicart-title relative flex w-full items-end justify-between">
              <span className="font-humane relative w-auto text-[3em] leading-[75%] text-[#302F35] md:text-[6vw]">
                Items added to cart
              </span>
              <span className="leading-full relative w-auto text-[20px] text-[#1d1d1d] md:text-[1.5rem] md:leading-[75%]">
                (4)
              </span>
            </div>
            <div
              ref={closeRef}
              className="minicart-close absolute top-0 right-0 -m-4 p-4"
            >
              <div
                className="relative h-[20px] w-[20px] cursor-pointer md:h-[3rem] md:w-[3rem]"
                onClick={onClose}
              >
                <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 rotate-45 bg-[#1d1d1d]" />
                <div className="icon absolute top-1/2 left-1/2 h-[3px] w-full -translate-1/2 -rotate-45 bg-[#1d1d1d]" />
              </div>
            </div>
          </div>
          <div className="minicart-container relative box-border h-1/10 w-full grow px-[5vw]">
            <div
              className="scrollable-list relative h-full w-full overflow-y-scroll overscroll-contain"
              data-lenis-prevent
              style={{ scrollbarWidth: "none" }}
            >
              <div className="list relative flex h-auto w-full flex-col items-start justify-start">
                {
                  // border-b at last index
                }
                <div className="minicart-item relative box-border flex h-auto w-full items-stretch justify-start overflow-hidden border-t border-[#1d1d1d] py-[1.25rem]">
                  <div className="contain relative grid h-auto w-full grid-cols-[40%_auto]">
                    <div className="item-image relative h-auto w-full">
                      <img
                        alt=""
                        src="https://akkeknitwear.com/website/wp-content/uploads/2025/03/MS2415PL6-BLU-1.jpg"
                        className="block h-full w-full object-cover object-[center_bottom]"
                      />
                    </div>
                    <div className="item-info relative flex w-auto flex-col items-start justify-between gap-[1.25rem]">
                      <div className="top relative flex h-auto w-full flex-col gap-[0.75rem]">
                        <h3 className="mb-[1.25rem] text-[1.5rem] leading-[75%] text-[#302F35]">
                          Tephra
                        </h3>
                        <div className="row relative flex h-auto w-full items-center justify-between">
                          <span className="leading-full text-base text-[#1d1d1d]">
                            Amount
                          </span>
                          <span className="leading-full text-base text-[#1d1d1d]">
                            1
                          </span>
                        </div>
                        <div className="row relative flex h-auto w-full items-center justify-between">
                          <span className="leading-full text-base text-[#1d1d1d]">
                            Size
                          </span>
                          <span className="leading-full text-base text-[#1d1d1d]">
                            S
                          </span>
                        </div>
                        <div className="row relative flex h-auto w-full items-center justify-between">
                          <span className="leading-full text-base text-[#1d1d1d]">
                            Price
                          </span>
                          <span className="regular leading-full text-base text-[#1d1d1d]">
                            € 69.00
                          </span>
                        </div>
                        <div className="row last relative mt-4 mb-6 flex h-auto w-full items-center justify-between md:mt-8 md:mb-0">
                          <span className="leading-full text-base text-[#1d1d1d]">
                            Subtotal
                          </span>
                          <span className="sub leading-full text-base text-[#1d1d1d]">
                            € 69.00
                          </span>
                        </div>
                      </div>
                      <div className="bottom relative h-auto w-full">
                        <div className="remove leading-full relative flex cursor-pointer items-center justify-start gap-1 text-base text-[#1d1d1d] md:gap-[0.5rem]">
                          <div className="btn relative h-[14px] w-[14px] cursor-pointer md:h-4 md:w-4">
                            <div className="icon absolute top-1/2 left-1/2 h-[1px] w-full -translate-1/2 rotate-45 bg-[#1d1d1d]" />
                            <div className="icon absolute top-1/2 left-1/2 h-[1px] w-full -translate-1/2 -rotate-45 bg-[#1d1d1d]" />
                          </div>
                          <span className="leading-full relative cursor-pointer text-[14px] text-[#1d1d1d] underline md:text-base">
                            Remove
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="minicart-total relative box-border flex h-auto w-full flex-col items-center justify-between gap-[0.75rem] px-[5vw] pt-4 md:pt-0">
            <div className="custom-button relative box-border flex h-[48px] w-full cursor-pointer items-center justify-between rounded-[14px] bg-[#FD7453] px-4 transition-colors duration-350 ease-in-out md:h-[3.5rem] md:rounded-[25px] md:px-8">
              <span className="leading-full relative text-base whitespace-nowrap text-white md:text-[1.25rem]">
                Checkout
              </span>
              <span className="leading-full relative text-base whitespace-nowrap text-white md:text-[1.25rem]">
                € 276.00
              </span>
            </div>
            <Link
              to="/cart"
              className="custom-button relative box-border flex h-[48px] w-full cursor-pointer items-center justify-between rounded-[14px] bg-[#1d1d1d] px-4 transition-colors duration-350 ease-in-out md:h-[3.5rem] md:rounded-[25px] md:px-8"
            >
              <span className="leading-full relative text-base whitespace-nowrap text-white md:text-[1.25rem]">
                View cart
              </span>
              <span className="leading-full relative text-base whitespace-nowrap text-white md:text-[1.25rem]">
                (4)
              </span>
            </Link>
            <span
              className="continue-shopping leading-full relative mt-2 w-auto cursor-pointer text-[#1d1d1d] underline md:mt-8"
              onClick={onClose}
            >
              Continue shopping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
