import {
  useEffect,
  useRef,
  type FC,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeRef: RefObject<HTMLDivElement | null>;
  lenis: Lenis | null;
  className?: string;
  animate?: boolean;
}

const SideModal: FC<SideModalProps> = ({
  isOpen,
  onClose,
  children,
  closeRef,
  lenis,
  className = '',
  animate = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const animations: gsap.core.Tween[] = [];

    if (isOpen) {
      if (lenis) lenis.stop();

      animations.push(
        gsap.set(modalRef.current, { autoAlpha: 1 }),
        gsap.to(bgRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power2.out',
        }),
        gsap.to(panelRef.current, {
          x: 0,
          scaleX: 1,
          duration: 0.3,
          delay: 0.4,
          ease: 'power2.out',
        }),
        gsap.to(closeRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          delay: 0.4,
          ease: 'power2.out',
        }),
      );
    } else {
      if (lenis) lenis.start();

      animations.push(
        gsap.to(closeRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.out',
        }),
        gsap.to(panelRef.current, {
          x: '100%',
          scaleX: 0.95,
          duration: 0.5,
          ease: 'power2.out',
        }),
        gsap.to(bgRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          delay: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(modalRef.current, {
              opacity: 0,
              visibility: 'hidden',
            });
          },
        }),
      );
    }

    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [isOpen, animate, lenis, closeRef]);

  return (
    <div
      ref={modalRef}
      className={`invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0 ${className}`}
    >
      <div
        ref={bgRef}
        className="absolute top-0 left-0 h-full w-full bg-[#1d1d1d]/85 opacity-0"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute top-0 right-0 z-20 h-full w-[95vw] origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:w-[35vw]"
      >
        {children}
      </div>
    </div>
  );
};

export default SideModal;
