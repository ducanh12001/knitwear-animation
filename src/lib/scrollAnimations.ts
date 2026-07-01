import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ANIMATION } from '@/constant/animation';

const ANIMATED_ATTR = 'data-gsap-animated';

type AnimationCleanup = {
  animations: gsap.core.Tween[];
  triggers: ScrollTrigger[];
};

const cleanups: AnimationCleanup[] = [];

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
};

const isAnimated = (element: Element): boolean =>
  element.hasAttribute(ANIMATED_ATTR);

export const animateElement = (
  element: Element,
  cleanup: AnimationCleanup,
): void => {
  const animationType = element.getAttribute('data-animation');
  if (!animationType || isAnimated(element)) return;

  const { duration, ease, stagger } = ANIMATION;

  switch (animationType) {
    case 'fade-in':
    case 'scrambleText': {
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
      );
      break;
    }
    case 'ease-bottom-to-top': {
      const anim = gsap.to(element, {
        y: 0,
        autoAlpha: 1,
        duration: duration.normal,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
        onComplete: () => markAnimated(element),
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);
      markAnimated(element);
      break;
    }
    case 'ease-left-to-right':
    case 'ease-right-to-left': {
      const anim = gsap.to(element, {
        x: 0,
        autoAlpha: 1,
        duration: duration.normal,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
        onComplete: () => markAnimated(element),
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);
      markAnimated(element);
      break;
    }
    case 'clip-top-to-bottom': {
      const imageScale = element.querySelector('.imageScale');
      const clipAnimation = gsap.to(element, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: duration.clip,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
      });
      cleanup.animations.push(clipAnimation);
      if (clipAnimation.scrollTrigger)
        cleanup.triggers.push(clipAnimation.scrollTrigger);

      if (imageScale) {
        const scaleAnimation = gsap.to(imageScale, {
          scale: 1,
          duration: duration.clip,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
        });
        cleanup.animations.push(scaleAnimation);
        if (scaleAnimation.scrollTrigger)
          cleanup.triggers.push(scaleAnimation.scrollTrigger);
      }
      markAnimated(element);
      break;
    }
    case 'ease-bottom-to-top-scaled': {
      const anim = gsap.to(element, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: duration.slow,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
        onComplete: () => markAnimated(element),
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);
      markAnimated(element);
      break;
    }
    case 'road': {
      const path = element.querySelector('.road path') as SVGPathElement | null;
      if (!path) break;

      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = pathLength.toString();

      const pathAnim = gsap.fromTo(
        path,
        { strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: duration.road,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element, 'top 70%'),
        },
      );
      cleanup.animations.push(pathAnim);
      if (pathAnim.scrollTrigger) cleanup.triggers.push(pathAnim.scrollTrigger);

      const roadG = element.querySelectorAll('.road svg g');
      if (roadG.length > 0) {
        const itemAnim = gsap.to(roadG, {
          autoAlpha: 1,
          duration: duration.slow,
          stagger: 0.2,
          ease: ease.out,
          scrollTrigger: scrollTriggerConfig(element),
        });
        cleanup.animations.push(itemAnim);
        if (itemAnim.scrollTrigger) cleanup.triggers.push(itemAnim.scrollTrigger);
      }
      markAnimated(element);
      break;
    }
    case 'ease-scale': {
      const anim = gsap.to(element, {
        autoAlpha: 1,
        scale: 1,
        duration: duration.normal,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
        onComplete: () => markAnimated(element),
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);
      markAnimated(element);
      break;
    }
    case 'ease-stagger-list': {
      const items = element.querySelectorAll(
        '.home-rel-product:not([data-gsap-animated])',
      );
      if (items.length === 0) break;

      const anim = gsap.to(items, {
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
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);

      if (isInViewport(element)) {
        ScrollTrigger.refresh();
      }
      break;
    }
    default: {
      const anim = gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: duration.normal,
        ease: ease.out,
        scrollTrigger: scrollTriggerConfig(element),
        onComplete: () => markAnimated(element),
      });
      cleanup.animations.push(anim);
      if (anim.scrollTrigger) cleanup.triggers.push(anim.scrollTrigger);
      markAnimated(element);
      break;
    }
  }
};

export const initScrollAnimations = (
  root: ParentNode = document,
): (() => void) => {
  const cleanup: AnimationCleanup = { animations: [], triggers: [] };
  cleanups.push(cleanup);

  const elements = root.querySelectorAll('.elAnimation:not([data-gsap-animated])');
  elements.forEach((element) => animateElement(element, cleanup));

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    cleanup.animations.forEach((animation) => animation.kill());
    cleanup.triggers.forEach((trigger) => trigger.kill());
    const index = cleanups.indexOf(cleanup);
    if (index >= 0) cleanups.splice(index, 1);
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
      }
    });

  const cleanup: AnimationCleanup = { animations: [], triggers: [] };
  cleanups.push(cleanup);

  main
    .querySelectorAll('.elAnimation:not([data-gsap-animated])')
    .forEach((element) => animateElement(element, cleanup));

  ScrollTrigger.refresh();
};

export const clearScrollAnimationMarks = (root: ParentNode = document): void => {
  root
    .querySelectorAll(`[${ANIMATED_ATTR}]`)
    .forEach((el) => el.removeAttribute(ANIMATED_ATTR));
};
