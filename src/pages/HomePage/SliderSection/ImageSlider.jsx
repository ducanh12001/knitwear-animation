import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function ImageSlider({ slides, swiperRef, onSwiper }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      className="imagesSlider"
      ref={swiperRef}
      onSwiper={onSwiper}
      speed={1500}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <a href={""} className="swiper-slide relative h-full w-full">
            <div className="slide-image desktop relative h-full w-full">
              <img
                src={slide.desktopImg}
                alt={slide.title}
                className="block h-full w-full object-cover"
                style={{ objectPosition: "center bottom" }}
              />
            </div>
            <div className="slide-image mobile relative h-full w-full">
              <img src={slide.mobileImg} alt={slide.title} />
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
