import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

export function ImageSlider({ slides, onSwiper }) {
  return (
    <Swiper
      modules={[Navigation, Controller]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      className="imagesSlider relative !z-10 h-full w-full"
      onSwiper={onSwiper}
      speed={1500}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link to={slide.href} className="swiper-slide relative h-full w-full">
            <div className="slide-image relative hidden h-full w-full md:block">
              <img
                src={slide.desktopImg}
                alt={slide.title}
                className="block h-full w-full object-cover object-[center_bottom]"
              />
            </div>
            <div className="slide-image relative block h-full w-full md:hidden">
              <img
                src={slide.mobileImg}
                alt={slide.title}
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
