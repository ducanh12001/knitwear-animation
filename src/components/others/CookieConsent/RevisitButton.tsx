import { useRef, useEffect } from 'react';
import type { FC, MouseEventHandler } from 'react';
import { gsap } from 'gsap';

interface RevisitButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const RevisitButton: FC<RevisitButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.3,
        ease: 'back.out(1.7)',
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
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      className="cky-btn-revisit-wrapper bg-primary fixed bottom-4 left-4 z-999 flex h-[45px] w-[45px] items-center justify-center rounded-full"
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
      </button>
    </div>
  );
};

export default RevisitButton;
