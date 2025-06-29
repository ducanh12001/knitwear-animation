import type { FC } from 'react';

interface IntroSectionProps {
  isSP: boolean;
}

const IntroSection: FC<IntroSectionProps> = ({ isSP }) => {
  return (
    <section className="relative h-auto w-full md:h-screen">
      <div className="relative h-full w-full">
        <img
          className="block h-full w-full object-cover object-center"
          src={
            isSP
              ? '/images/banner/banner-3-sp.jpg'
              : '/images/banner/banner-3.jpg'
          }
        />
      </div>
    </section>
  );
};

export default IntroSection;
