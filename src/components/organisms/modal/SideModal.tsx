import {
  useEffect,
  useRef,
  type FC,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  animate?: boolean;
  width?: string;
}

const SideModal: FC<SideModalProps> = ({
  isOpen,
  onClose,
  children,
  closeRef,
  className = '',
  animate = true,
  width = '95vw',
}) => {
  const lenis = useLenis();
  const modalRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const openModal = contextSafe(() => {
    if (!animate) return;

    lenis?.stop();

    const tl = gsap.timeline();

    tl.set(modalRef.current, { autoAlpha: 1 })
      .to(bgRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(
        panelRef.current,
        {
          x: 0,
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.4,
      );
    if (closeRef?.current) {
      tl.to(
        closeRef.current,
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        `<`,
      );
    }
  });

  const closeModal = contextSafe(() => {
    if (!animate) return;

    lenis?.start();

    const tl = gsap.timeline();

    if (closeRef?.current) {
      tl.to(closeRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    tl.to(
      panelRef.current,
      {
        x: '100%',
        scaleX: 0.95,
        duration: 0.5,
        ease: 'power2.out',
      },
      '<',
    ).to(
      bgRef.current,
      {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(modalRef.current, { autoAlpha: 0 });
        },
      },
      0.3,
    );
  });

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  return (
    <div
      ref={modalRef}
      className={`invisible fixed top-0 left-0 z-155 h-full w-full overflow-hidden opacity-0 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        ref={bgRef}
        className="bg-primary/85 absolute top-0 left-0 h-full w-full opacity-0"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        ref={panelRef}
        className="absolute top-0 right-0 z-20 h-full origin-top-right translate-x-[100%] scale-x-95 overflow-hidden bg-[#e1e1e1] md:!w-[35vw]"
        style={{
          width,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SideModal;
