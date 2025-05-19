import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const RevisitButton = ({ onClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "back.out(1.7)",
      },
    );

    // Small hover animation
    const handleMouseEnter = () => {
      gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      className="cky-btn-revisit-wrapper fixed bottom-4 left-4 z-999 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#1d1d1d]"
      data-tooltip="Consent Preferences"
      ref={buttonRef}
    >
      <button
        className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-full border-none bg-transparent shadow-lg"
        onClick={onClick}
        aria-label="Consent Preferences"
      >
        <img
          src="https://cdn-cookieyes.com/assets/images/revisit.svg"
          alt="Revisit consent button"
          className="m-0 h-[30px] w-[30px] max-w-fit"
        />
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3.75C7.44 3.75 3.75 7.44 3.75 12C3.75 16.56 7.44 20.25 12 20.25C16.56 20.25 20.25 16.56 20.25 12C20.25 7.44 16.56 3.75 12 3.75ZM12 18.75C8.27 18.75 5.25 15.73 5.25 12C5.25 8.27 8.27 5.25 12 5.25C15.73 5.25 18.75 8.27 18.75 12C18.75 15.73 15.73 18.75 12 18.75ZM12 9C12.41 9 12.75 9.34 12.75 9.75V15.75C12.75 16.16 12.41 16.5 12 16.5C11.59 16.5 11.25 16.16 11.25 15.75V9.75C11.25 9.34 11.59 9 12 9ZM12 8.25C11.59 8.25 11.25 7.91 11.25 7.5C11.25 7.09 11.59 6.75 12 6.75C12.41 6.75 12.75 7.09 12.75 7.5C12.75 7.91 12.41 8.25 12 8.25Z"
            fill="white"
          />
        </svg> */}
      </button>
    </div>
  );
};

export default RevisitButton;
