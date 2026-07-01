import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from '@/lib/gsap';

export const useLenisScrollTrigger = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          if (lenis.isScrolling !== 'smooth') {
            lenis.scrollTo(value, { immediate: true });
          }
        }
        return lenis.scroll;
      },
      scrollHeight: () => document.documentElement.scrollHeight,
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [lenis]);
};
