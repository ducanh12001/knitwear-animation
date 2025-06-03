import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { ModalState } from '@/types';

const HEADER_ANIMATION_CONFIG = {
  duration: {
    color: 0.4,
    hamburger: 0.25,
    fade: 0.2,
  },
  ease: 'power2.inOut',
  colors: {
    menu: '#1d1d1d',
  },
  hamburger: {
    scale: 0.8,
    rotation: {
      top: 20,
      bottom: -20,
    },
    position: {
      top: '8px',
      bottom: '8px',
    },
  },
} as const;

const SELECTORS = {
  headerColor: '.js-header-color',
  headerBackground: '.js-header-background',
  hamburger: {
    top: '.hamburger .top',
    center: '.hamburger .center',
    bottom: '.hamburger .bottom',
  },
} as const;

const createColorAnimation = (
  targets: { background: string; color: string },
  colors: { background: string; color: string },
  duration: number = HEADER_ANIMATION_CONFIG.duration.color,
) => {
  const tl = gsap.timeline();

  tl.to(targets.background, {
    backgroundColor: colors.background,
    duration,
    ease: HEADER_ANIMATION_CONFIG.ease,
  }).to(
    targets.color,
    {
      color: colors.color,
      duration,
      ease: HEADER_ANIMATION_CONFIG.ease,
    },
    '<',
  );

  return tl;
};

const createHamburgerOpenAnimation = () => {
  const tl = gsap.timeline();
  const config = HEADER_ANIMATION_CONFIG;

  tl.to(SELECTORS.hamburger.top, {
    top: config.hamburger.position.top,
    duration: config.duration.hamburger,
    ease: config.ease,
  }).to(
    SELECTORS.hamburger.bottom,
    {
      bottom: config.hamburger.position.bottom,
      duration: config.duration.hamburger,
      ease: config.ease,
    },
    '<',
  );

  tl.to(
    SELECTORS.hamburger.center,
    {
      autoAlpha: 0,
      duration: config.duration.fade,
      ease: config.ease,
    },
    '-=0.1',
  )
    .to(
      SELECTORS.hamburger.top,
      {
        scale: config.hamburger.scale,
        rotation: config.hamburger.rotation.top,
        duration: config.duration.hamburger,
        ease: config.ease,
      },
      '<',
    )
    .to(
      SELECTORS.hamburger.bottom,
      {
        scale: config.hamburger.scale,
        rotation: config.hamburger.rotation.bottom,
        duration: config.duration.hamburger,
        ease: config.ease,
      },
      '<',
    );

  return tl;
};

const createHamburgerCloseAnimation = () => {
  const tl = gsap.timeline();
  const config = HEADER_ANIMATION_CONFIG;

  tl.to([SELECTORS.hamburger.top, SELECTORS.hamburger.bottom], {
    scale: 1,
    rotation: 0,
    duration: config.duration.hamburger,
    ease: config.ease,
  }).to(
    SELECTORS.hamburger.center,
    {
      autoAlpha: 1,
      duration: config.duration.fade,
      ease: config.ease,
    },
    '<',
  );

  tl.to(
    SELECTORS.hamburger.top,
    {
      top: 0,
      duration: config.duration.hamburger,
      ease: config.ease,
    },
    '-=0.1',
  ).to(
    SELECTORS.hamburger.bottom,
    {
      bottom: 0,
      duration: config.duration.hamburger,
      ease: config.ease,
    },
    '<',
  );

  return tl;
};

export const useHeaderAnimation = (
  modalState: ModalState,
  textColor: string,
  headerRef: React.RefObject<HTMLElement | null>,
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleScrolledClass = useCallback(
    (isOpening: boolean) => {
      if (!headerRef.current) return;

      const header = headerRef.current;

      if (isOpening && header.classList.contains('scrolled-mob')) {
        header.classList.replace('scrolled-mob', 'was-scrolled');
      } else if (!isOpening && header.classList.contains('was-scrolled')) {
        header.classList.replace('was-scrolled', 'scrolled-mob');
      }
    },
    [headerRef],
  );

  const animateMenuOpen = useCallback(() => {
    if (!headerRef.current) return;

    handleScrolledClass(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();
    const masterTl = timelineRef.current;

    const colorTl = createColorAnimation(
      {
        background: SELECTORS.headerBackground,
        color: SELECTORS.headerColor,
      },
      {
        background: HEADER_ANIMATION_CONFIG.colors.menu,
        color: HEADER_ANIMATION_CONFIG.colors.menu,
      },
    );

    const hamburgerTl = createHamburgerOpenAnimation();

    masterTl.add(colorTl).add(hamburgerTl, '-=0.2');
  }, [headerRef, handleScrolledClass]);

  const animateMenuClose = useCallback(() => {
    if (!headerRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const masterTl = gsap.timeline({
      onComplete: () => handleScrolledClass(false),
    });

    const hamburgerTl = createHamburgerCloseAnimation();

    const colorTl = createColorAnimation(
      {
        background: SELECTORS.headerBackground,
        color: SELECTORS.headerColor,
      },
      {
        background: textColor,
        color: textColor,
      },
    );

    masterTl.add(hamburgerTl).add(colorTl, '-=0.3');
  }, [headerRef, textColor, handleScrolledClass]);

  const setInitialState = useCallback(() => {
    if (!headerRef.current) return;

    gsap.set(SELECTORS.headerColor, { color: textColor });
    gsap.set(SELECTORS.headerBackground, { backgroundColor: textColor });
  }, [headerRef, textColor]);

  useGSAP(() => {
    if (!headerRef.current) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    if (modalState.menuOpen) {
      animateMenuOpen();
    } else {
      setInitialState();
      animateMenuClose();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [
    modalState.menuOpen,
    textColor,
    animateMenuOpen,
    animateMenuClose,
    setInitialState,
  ]);

  return {
    forceMenuOpen: animateMenuOpen,
    forceMenuClose: animateMenuClose,
    setInitialState,
  };
};
