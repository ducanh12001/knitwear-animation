import { useEffect, useState } from 'react';
import type Swiper from 'swiper';
import ImageSlider from '@/pages/HomePage/SliderSection/ImageSlider';
import TitleSlider from '@/pages/HomePage/SliderSection/TitleSlider';

const slides: SlideData[] = [
  {
    href: '/product-category/menswear-collection',
    title: 'New Collection',
    desktopImg: '/images/banner/banner-1.jpg',
    mobileImg: '/images/banner/banner-1-sp.jpg',
  },
  {
    href: '/product-category/womenswear-collection',
    title: 'Promo Launch 50% off',
    desktopImg: '/images/banner/banner-2.jpg',
    mobileImg: '/images/banner/banner-2-sp.jpg',
  },
  {
    href: '/everest-okke-limited',
    title: 'Everest Okke Limited',
    desktopImg: '/images/banner/banner-3.jpg',
    mobileImg: '/images/banner/banner-3-sp.jpg',
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
