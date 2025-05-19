import { useEffect, useRef, useState } from "react";
import { ImageSlider } from "./ImageSlider";
import { TitleSlider } from "./TitleSlider";

export function SliderSection() {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  useEffect(() => {
    if (firstSwiper && secondSwiper) {
      firstSwiper.controller.control = secondSwiper;
      secondSwiper.controller.control = firstSwiper;
    }
  }, [firstSwiper, secondSwiper]);

  const slides = [
    {
      href: "/product-category/menswear-collection",
      title: "New Collection",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/bannerhome.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/bannerhome-mob.jpg",
    },
    {
      href: "/product-category/womenswear-collection",
      title: "Promo Launch 50% off",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Akke-Banner-2.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Akke-Banner-mobile-women.jpg",
    },
    {
      href: "/everest-akke-limited",
      title: "Everest Akke Limited",
      desktopImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/10/Limited-Akke-Everest.jpg",
      mobileImg:
        "https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-1.jpg",
    },
  ];

  return (
    <section className="homepage--slider relative h-screen w-full">
      <div className="relative h-full w-full">
        <ImageSlider slides={slides} onSwiper={setFirstSwiper} />
        <TitleSlider slides={slides} onSwiper={setSecondSwiper} />
      </div>
    </section>
  );
}
