import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const CustomCursor: React.FC = () => {
  useGSAP(() => {
    const xTo = gsap.quickTo('#cursor', 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo('#cursor', 'y', { duration: 0.6, ease: 'power3' });

    const updateCursorPosition = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  return (
    <div
      id="cursor"
      className="desktop pointer-events-none fixed top-0 left-0 z-[200] will-change-transform"
    >
      <div
        className="cursor__circle -mt-[50%] -ml-[50%] h-[1.5rem] w-[1.5rem] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transitionProperty: 'opacity, background-color, width, height',
        }}
      />
    </div>
  );
};

export default CustomCursor;
