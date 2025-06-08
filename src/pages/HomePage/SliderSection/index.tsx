import { useEffect, useState } from 'react';
import type Swiper from 'swiper';
import ImageSlider from '@/pages/HomePage/SliderSection/ImageSlider';
import TitleSlider from '@/pages/HomePage/SliderSection/TitleSlider';

import Banner1 from '@/assets/images/banner/banner-1.jpg';
import Banner1Sp from '@/assets/images/banner/banner-1-sp.jpg';
import Banner2 from '@/assets/images/banner/banner-2.jpg';
import Banner2Sp from '@/assets/images/banner/banner-2-sp.jpg';
import Banner3 from '@/assets/images/banner/banner-3.jpg';
import Banner3Sp from '@/assets/images/banner/banner-3-sp.jpg';

const slides: SlideData[] = [
  {
    href: '/product-category/menswear-collection',
    title: 'New Collection',
    desktopImg: Banner1,
    mobileImg: Banner1Sp,
  },
  {
    href: '/product-category/womenswear-collection',
    title: 'Promo Launch 50% off',
    desktopImg: Banner2,
    mobileImg: Banner2Sp,
  },
  {
    href: '/everest-okke-limited',
    title: 'Everest Okke Limited',
    desktopImg: Banner3,
    mobileImg: Banner3Sp,
  },
];

export interface SlideData {
  href: string;
  title: string;
  desktopImg: string;
  mobileImg: string;
}

export const SliderSection = () => {
  const [firstSwiper, setFirstSwiper] = useState<Swiper | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    if (firstSwiper && secondSwiper) {
      firstSwiper.controller.control = secondSwiper;
      secondSwiper.controller.control = firstSwiper;
    }
  }, [firstSwiper, secondSwiper]);

  return (
    <section className="homepage--slider relative h-screen w-full">
      <div className="relative h-full w-full">
        <ImageSlider slides={slides} onSwiper={setFirstSwiper} />
        <TitleSlider slides={slides} onSwiper={setSecondSwiper} />
      </div>
    </section>
  );
};
