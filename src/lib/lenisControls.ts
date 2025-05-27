import type { ScrollToOptions } from 'lenis';
import { useLenis } from 'lenis/react';

export const useLenisControls = () => {
  const lenis = useLenis();

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: ScrollToOptions,
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  const scrollToBottom = () => {
    if (lenis) {
      lenis.scrollTo('bottom', { duration: 1.5 });
    }
  };

  const stop = () => {
    if (lenis) {
      lenis.stop();
    }
  };

  const start = () => {
    if (lenis) {
      lenis.start();
    }
  };

  const resize = () => {
    if (lenis) {
      lenis.resize();
    }
  };

  return {
    lenis,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    stop,
    start,
    resize,
  };
};
