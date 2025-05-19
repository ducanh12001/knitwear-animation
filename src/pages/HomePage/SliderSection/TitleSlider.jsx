import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { Link } from "react-router";
import DecryptedText from "@/components/animations/DecryptedText";

export function TitleSlider({ slides, onSwiper }) {
  return (
    <Swiper
      modules={[Navigation, EffectCreative, Controller]}
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
      className="titlesSlider !absolute top-0 left-0 !z-25 h-full w-full"
      onSwiper={onSwiper}
      speed={1500}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Link to={slide.href} className="swiper-slide">
            <h2
              className="elAnimation font-humane leading-full absolute top-1/2 left-0 z-20 m-0 h-auto w-full -translate-y-1/2 text-center text-[90px] font-light text-white uppercase mix-blend-difference md:text-[15vw]"
              animation="scrumbleText"
            >
              {index === 0 ? (
                <DecryptedText
                  text={slide.title}
                  animateOn="view"
                  revealDirection="center"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  maxIterations={30}
                />
              ) : (
                slide.title
              )}
            </h2>
          </Link>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev absolute top-1/2 !left-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
        <div className="h-full w-full bg-white mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]" />
      </div>
      <div className="swiper-button-next absolute top-1/2 !right-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
        <div className="h-full w-full bg-white mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]" />
      </div>
    </Swiper>
  );
}
