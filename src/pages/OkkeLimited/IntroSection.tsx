import type { FC } from 'react';
import Banner3 from '@/assets/images/banner/banner-3.jpg';
import Banner3Sp from '@/assets/images/banner/banner-3-sp.jpg';

interface IntroSectionProps {
  isSP: boolean;
}

const IntroSection: FC<IntroSectionProps> = ({ isSP }) => {
  return (
    <section className="relative h-auto w-full md:h-screen">
      <div className="relative h-full w-full">
        <img
          className="block h-full w-full object-cover object-center"
          src={isSP ? Banner3Sp : Banner3}
        />
      </div>
    </section>
  );
};

export default IntroSection;
