import type { FC } from 'react';

interface PromoMarqueeProps {
  text: string;
  className?: string;
}

const PromoMarquee: FC<PromoMarqueeProps> = ({ text, className = '' }) => {
  const label = text;

  return (
    <div
      className={`header-marquee relative w-full overflow-hidden ${className}`}
      aria-label={text}
    >
      <div className="header-marquee-track flex w-max">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 1}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={`${group}-${index}`}
                className="header-marquee-item shrink-0 px-8 text-[10px] tracking-[0.12em] whitespace-nowrap text-white uppercase md:text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoMarquee;
