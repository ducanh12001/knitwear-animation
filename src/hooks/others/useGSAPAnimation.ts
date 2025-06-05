import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const createScrollTriggerConfig = (
  element: Element,
  start: string = 'top 80%',
): ScrollTrigger.Vars => ({
  trigger: element,
  start,
  toggleActions: 'play none none none',
});

export const useGSAPAnimation = () => {
  const location = useLocation();

  useEffect(() => {
    const animations: gsap.core.Tween[] = [];
    const triggers: ScrollTrigger[] = [];

    const elements = document.querySelectorAll('main .elAnimation');
    if (!elements) return;

    elements.forEach((element) => {
      const animationType = element.getAttribute('data-animation');
      switch (animationType) {
        case 'ease-bottom-to-top': {
          const anim = gsap.to(element, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: createScrollTriggerConfig(element),
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        case 'ease-left-to-right':
        case 'ease-right-to-left': {
          const anim = gsap.to(element, {
            x: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: createScrollTriggerConfig(element),
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        case 'clip-top-to-bottom': {
          const imageScale = element.querySelector('.imageScale');
          const clipAnimation = gsap.to(element, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 2.5,
            ease: 'power2.out',
            scrollTrigger: createScrollTriggerConfig(element),
          });

          animations.push(clipAnimation);
          if (clipAnimation.scrollTrigger) {
            triggers.push(clipAnimation.scrollTrigger);
          }

          if (imageScale) {
            const scaleAnimation = gsap.to(imageScale, {
              scale: 1,
              duration: 2.5,
              ease: 'power2.out',
              scrollTrigger: createScrollTriggerConfig(element),
            });
            animations.push(scaleAnimation);
            if (scaleAnimation.scrollTrigger) {
              triggers.push(scaleAnimation.scrollTrigger);
            }
          }
          break;
        }
        case 'ease-bottom-to-top-scaled': {
          const anim = gsap.to(element, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: createScrollTriggerConfig(element),
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        case 'scrumbleText': {
          const anim = gsap.to(element, {
            autoAlpha: 1,
            scrollTrigger: createScrollTriggerConfig(element),
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        case 'road': {
          const path = document.querySelector('.road path') as SVGPathElement;
          if (!path) return;
          const pathLength: number = path.getTotalLength();
          path.style.strokeDasharray = `${pathLength} ${pathLength}`;
          path.style.strokeDashoffset = pathLength.toString();

          const pathAnim = gsap.fromTo(
            path,
            { strokeDashoffset: pathLength },
            {
              strokeDashoffset: 0,
              duration: 7,
              ease: 'power2.out',
              scrollTrigger: createScrollTriggerConfig(element, 'top 60%'),
            },
          );

          animations.push(pathAnim);
          if (pathAnim.scrollTrigger) {
            triggers.push(pathAnim.scrollTrigger);
          }

          const roadG = document.querySelectorAll(
            '.page-okkeworld .road svg g',
          ) as NodeListOf<SVGGElement>;

          if (roadG && roadG.length > 0) {
            const itemAnim = gsap.to(roadG, {
              autoAlpha: 1,
              duration: 2,
              stagger: 0.3,
              ease: 'power2.out',
              scrollTrigger: createScrollTriggerConfig(element),
            });
            animations.push(itemAnim);
            if (itemAnim.scrollTrigger) {
              triggers.push(itemAnim.scrollTrigger);
            }
          }
          break;
        }
        case 'ease-scale': {
          const anim = gsap.to(element, {
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: createScrollTriggerConfig(element),
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        case 'ease-stagger-list': {
          const anim = gsap.to(element.querySelectorAll('.home-rel-product'), {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
        default: {
          const anim = gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
          animations.push(anim);
          if (anim.scrollTrigger) {
            triggers.push(anim.scrollTrigger);
          }
          break;
        }
      }
    });

    return () => {
      animations.forEach((animation) => {
        if (animation) animation.kill();
      });

      triggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });

      ScrollTrigger.getAll().forEach((st) => {
        st.kill();
      });
    };
  }, [location.pathname]);
};
