import { useRef } from "react";
import { ImageSlider } from "./ImageSlider";
import { TitleSlider } from "./TitleSlider";

export function SliderSection({}) {
  const imagesSwiperRef = useRef(null);
  const titlesSwiperRef = useRef(null);

  const syncSwipers = (swiperInstance) => {
    // if (imagesSwiperRef.current && titlesSwiperRef.current) {
    //   // imagesSwiperRef.current.swiper.swipeTo(swiperInstance.realIndex);
    //   const imagesSwiper = imagesSwiperRef.current.swiper;
    //   if (imagesSwiper) {
    //     imagesSwiper.slideTo(swiperInstance.realIndex);
    //   }
    // }
  };

  const slides = [
    {
      href: "https://akkeknitwear.com/categoria-prodotto/menswear/",
      title: "New Collection",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/bannerhome.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/bannerhome-mob.jpg",
    },
    {
      href: "https://akkeknitwear.com/categoria-prodotto/womenswear/",
      title: "Promo Launch 50% off",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Akke-Banner-2.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Akke-Banner-mobile-women.jpg",
    },
    {
      href: "https://akkeknitwear.com/everest-akke-limited/",
      title: "Everest Akke Limited",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Limited-Akke-Everest.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-1.jpg",
    },
  ];

  return (
    <section className="homepage--slider relative w-full h-screen">
      <div className="relative w-full h-full">
        <ImageSlider
          slides={slides}
          swiperRef={imagesSwiperRef}
          onSwiper={syncSwipers}
        />
        <TitleSlider
          slides={slides}
          swiperRef={titlesSwiperRef}
          onSwiper={syncSwipers}
        />
      </div>
    </section>
  );
}
