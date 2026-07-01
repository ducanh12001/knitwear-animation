import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIMATION } from '@/constant/animation';

const ANIMATED_ATTR = 'data-gsap-animated';
const PENDING_ATTR = 'data-gsap-pending';

type AnimationCleanup = {
  animations: gsap.core.Tween[];
  triggers: ScrollTrigger[];
};

let initCleanup: AnimationCleanup | null = null;
let refreshCleanup: AnimationCleanup | null = null;

const killCleanup = (cleanup: AnimationCleanup | null) => {
  if (!cleanup) return;
  cleanup.animations.forEach((animation) => animation.kill());
  cleanup.animations.length = 0;
  cleanup.triggers.length = 0;
};

const scrollTriggerConfig = (
  element: Element,
  start: string = ANIMATION.scrollStart,
): ScrollTrigger.Vars => ({
  trigger: element,
  start,
  toggleActions: 'play none none none',
});

const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
};

const markAnimated = (element: Element) => {
  element.setAttribute(ANIMATED_ATTR, 'true');
  element.removeAttribute(PENDING_ATTR);
};

const isAnimated = (element: Element): boolean =>
  element.hasAttribute(ANIMATED_ATTR);

const isPending = (element: Element): boolean =>
  element.hasAttribute(PENDING_ATTR);

const markPending = (element: Element) => {
  element.setAttribute(PENDING_ATTR, 'true');
};

export const animateElement = (
  element: Element,
  cleanup: AnimationCleanup,
): void => {
  const animationType = element.getAttribute('data-animation');
  if (!animationType || isAnimated(element) || isPending(element)) return;

  markPending(element);

  const { duration, ease, stagger } = ANIMATION;

  const trackTween = (tween: gsap.core.Tween) => {
    cleanup.animations.push(tween);
    return tween;
  };

  switch (animationType) {
    case 'fade-in':
    case 'scrambleText': {
      trackTween(
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: duration.normal,
            ease: ease.out,
            delay: duration.heroDelay,
            onComplete: () => markAnimated(element),
          },
        ),
      );
      break;
    }
    case 'ease-bottom-to-top': {
      trackTween(
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          duration: duration.normal,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => markAnimated(element),
        }),
      );
      break;
    }
    case 'ease-left-to-right':
    case 'ease-right-to-left': {
      trackTween(
        gsap.to(element, {
          x: 0,
          autoAlpha: 1,
          duration: duration.normal,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => markAnimated(element),
        }),
      );
      break;
    }
    case 'clip-top-to-bottom': {
      const imageScale = element.querySelector('.imageScale');
      let completed = 0;
      const total = imageScale ? 2 : 1;
      const onClipDone = () => {
        completed += 1;
        if (completed >= total) markAnimated(element);
      };

      trackTween(
        gsap.to(element, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: duration.clip,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: onClipDone,
        }),
      );

      if (imageScale) {
        trackTween(
          gsap.to(imageScale, {
            scale: 1,
            duration: duration.clip,
            ease: ease.out,
            scrollTrigger: scrollTriggerConfig(element),
            onComplete: onClipDone,
          }),
        );
      }
      break;
    }
    case 'ease-bottom-to-top-scaled': {
      trackTween(
        gsap.to(element, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: duration.slow,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => markAnimated(element),
        }),
      );
      break;
    }
    case 'road': {
      const path = element.querySelector('.road path') as SVGPathElement | null;
      if (!path) {
        element.removeAttribute(PENDING_ATTR);
        break;
      }

      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = pathLength.toString();

      const roadG = element.querySelectorAll('.road svg g');
      let completed = 0;
      const total = roadG.length > 0 ? 2 : 1;
      const onRoadDone = () => {
        completed += 1;
        if (completed >= total) markAnimated(element);
      };

      trackTween(
        gsap.fromTo(
          path,
          { strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            duration: duration.road,
            ease: ease.out,
            scrollTrigger: scrollTriggerConfig(element, 'top 70%'),
            onComplete: onRoadDone,
          },
        ),
      );

      if (roadG.length > 0) {
        trackTween(
          gsap.to(roadG, {
            autoAlpha: 1,
            duration: duration.slow,
            stagger: 0.2,
            ease: ease.out,
            scrollTrigger: scrollTriggerConfig(element),
            onComplete: onRoadDone,
          }),
        );
      }
      break;
    }
    case 'ease-scale': {
      trackTween(
        gsap.to(element, {
          autoAlpha: 1,
          scale: 1,
          duration: duration.normal,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => markAnimated(element),
        }),
      );
      break;
    }
    case 'ease-stagger-list': {
      const items = element.querySelectorAll(
        '.home-rel-product:not([data-gsap-animated])',
      );
      if (items.length === 0) {
        element.removeAttribute(PENDING_ATTR);
        break;
      }

      trackTween(
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: duration.normal,
          stagger,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => {
            items.forEach((item) => markAnimated(item));
            markAnimated(element);
          },
        }),
      );

      if (isInViewport(element)) {
        ScrollTrigger.refresh();
      }
      break;
    }
    default: {
      trackTween(
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: duration.normal,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
          onComplete: () => markAnimated(element),
        }),
      );
      break;
    }
  }
};

export const initScrollAnimations = (
  root: ParentNode = document,
): (() => void) => {
  killCleanup(refreshCleanup);
  refreshCleanup = null;
  killCleanup(initCleanup);
  initCleanup = { animations: [], triggers: [] };

  root
    .querySelectorAll('.elAnimation:not([data-gsap-animated])')
    .forEach((element) => animateElement(element, initCleanup!));

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    killCleanup(initCleanup);
    killCleanup(refreshCleanup);
    initCleanup = null;
    refreshCleanup = null;
  };
};

export const refreshScrollAnimations = (): void => {
  const main = document.querySelector('main');
  if (!main) return;

  main
    .querySelectorAll('.elAnimation[data-animation="ease-stagger-list"]')
    .forEach((container) => {
      const hasPending = container.querySelector(
        '.home-rel-product:not([data-gsap-animated])',
      );
      if (hasPending) {
        container.removeAttribute(ANIMATED_ATTR);
        container.removeAttribute(PENDING_ATTR);
      }
    });

  killCleanup(refreshCleanup);

  main.querySelectorAll(`[${PENDING_ATTR}]`).forEach((el) => {
    el.removeAttribute(PENDING_ATTR);
  });

  refreshCleanup = { animations: [], triggers: [] };

  main
    .querySelectorAll('.elAnimation:not([data-gsap-animated])')
    .forEach((element) => animateElement(element, refreshCleanup!));

  ScrollTrigger.refresh();
};

export const clearScrollAnimationMarks = (root: ParentNode = document): void => {
  root
    .querySelectorAll(`[${ANIMATED_ATTR}], [${PENDING_ATTR}]`)
    .forEach((el) => {
      el.removeAttribute(ANIMATED_ATTR);
      el.removeAttribute(PENDING_ATTR);
    });
};
