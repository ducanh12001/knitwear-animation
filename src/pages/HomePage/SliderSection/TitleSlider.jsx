import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import DecryptedText from "../../../components/animations/DecryptedText.jsx";

export function TitleSlider({ slides, swiperRef, onSwiper }) {
  return (
    <Swiper
      modules={[Navigation, EffectCreative]}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      effect="creative"
      creativeEffect={{
        prev: {
          translate: [0, "-50%", 0],
          scale: 0.8,
          opacity: 0,
          origin: "center center",
        },
        next: {
          translate: [0, "50%", 0],
          scale: 0.8,
          opacity: 0,
          origin: "center center",
        },
      }}
      className="titlesSlider"
      ref={swiperRef}
      onSwiper={onSwiper}
      speed={1500}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <a href={""} className="swiper-slide">
            <h2 className="font-humane">
              {index === 0 ? (
                <DecryptedText
                  text={slide.title}
                  animateOn="view"
                  revealDirection="center"
                  maxIterations={40}
                />
              ) : (
                slide.title
              )}
            </h2>
          </a>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev">
        <div></div>
      </div>
      <div className="swiper-button-next">
        <div></div>
      </div>
    </Swiper>
  );
}
