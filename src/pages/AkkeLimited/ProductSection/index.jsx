import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireF-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireR-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireD1-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireD2-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraD2-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraD1-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraF-1-1280x1603.webp",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraR-1-1280x1603.webp",
  },
];

function ProductSection() {
  const sectionRef = useRef(null);
  const productMiddleRef = useRef(null);
  const imagesRef = useRef(null);
  const productLeftRef = useRef(null);
  const productRightRef = useRef(null);

  useEffect(() => {
    // Đảm bảo sticky hoạt động với CustomScrollbar và Lenis
    const fixStickyElements = () => {
      if (productLeftRef.current && productRightRef.current) {
        const updateSticky = () => {
          const scrollTop = window.scrollY;
          const sectionTop =
            sectionRef.current.getBoundingClientRect().top + scrollTop;
          const sectionHeight = sectionRef.current.offsetHeight;
          const viewportHeight = window.innerHeight;

          // Chiều cao của phần tử sticky
          const leftHeight = productLeftRef.current.offsetHeight;
          const rightHeight = productRightRef.current.offsetHeight;

          // Điểm bắt đầu và kết thúc sticky
          const stickyStart = sectionTop + 10; // Thêm một chút offset
          const stickyEndLeft = sectionTop + sectionHeight - leftHeight - 10;
          const stickyEndRight = sectionTop + sectionHeight - rightHeight - 10;

          // Giải quyết các trường hợp khác nhau
          if (scrollTop < stickyStart) {
            // Trước vùng sticky
            productLeftRef.current.style.position = "relative";
            productLeftRef.current.style.top = "calc(6rem+10vh)";
            productRightRef.current.style.position = "relative";
            productRightRef.current.style.top = "calc(6rem+10vh)";
          } else if (scrollTop >= stickyStart && scrollTop <= stickyEndLeft) {
            // Trong vùng sticky
            productLeftRef.current.style.position = "sticky";
            productLeftRef.current.style.top = "calc(6rem+10vh)";
          } else {
            // Sau vùng sticky
            productLeftRef.current.style.position = "relative";
            productLeftRef.current.style.top = `${stickyEndLeft - stickyStart}px`;
          }

          // Tương tự cho phần tử bên phải
          if (scrollTop >= stickyStart && scrollTop <= stickyEndRight) {
            productRightRef.current.style.position = "sticky";
            productRightRef.current.style.top = "calc(6rem+10vh)";
          } else if (scrollTop > stickyEndRight) {
            productRightRef.current.style.position = "relative";
            productRightRef.current.style.top = `${stickyEndRight - stickyStart}px`;
          }
        };

        // Thêm sự kiện scroll
        window.addEventListener("scroll", updateSticky);

        // Đảm bảo cập nhật khi resize
        window.addEventListener("resize", updateSticky);

        // Khởi tạo đúng vị trí
        updateSticky();

        return () => {
          window.removeEventListener("scroll", updateSticky);
          window.removeEventListener("resize", updateSticky);
        };
      }
    };

    // Chạy sau khi component được render
    const timer = setTimeout(fixStickyElements, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="akke-limited--product relative h-auto w-full bg-[#e1e1e1] pt-[10vh]"
      ref={sectionRef}
    >
      <div
        className="wrapper relative flex h-auto w-full flex-col items-start justify-start gap-0 md:grid md:gap-[2rem]"
        style={{
          gridTemplateColumns:
            "1fr calc(1150 * (100vh - (6rem + 5vh)) / 1440) 1fr",
        }}
      >
        <div
          ref={productLeftRef}
          className="product-left relative box-border h-auto w-full pt-[6rem] pr-[5vw] pl-[5vw] md:sticky md:top-[calc(6rem+10vh)] md:h-[calc(100vh-(6rem+5vh))] md:pt-0 md:pr-0"
        >
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
            <div className="product-top relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-title desktop relative w-full">
                <h1 className="font-humane leading-full text-[15vw] text-[#93A7A8] uppercase md:text-[8vw]">
                  Everest
                </h1>
              </div>
            </div>
            {[
              {
                title: "Dettagli",
                items: [
                  "Struttura in mezza maglia inglese",
                  "Capo double face",
                  "Bandierina logo “AKKE” double face",
                  "Collo vulcano con calature a vista",
                  "8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere 2-28",
                ],
              },
              {
                title: "Materiali e cura",
                items: ["50% Cashmere", "30% Lana", "20% Cordura"],
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="product-details desktop relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex"
              >
                <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                  {detail.title}
                </span>
                <ul className="relative flex h-auto w-full flex-col">
                  {detail.items.map((text, index) => (
                    <li
                      key={index}
                      className="relative flex items-start justify-start gap-[0.3rem] text-base leading-[1.2rem] text-[#1d1d1d] before:text-[1.5rem] before:leading-[1rem] before:content-['·']"
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="product-heat desktop relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex">
              <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                Calore
              </span>
              <div className="circles relative flex h-auto w-full items-center justify-start gap-[0.25rem]">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="relative box-border flex h-4 w-4 items-center justify-center rounded-full border border-[#93A7A8] after:h-3 after:w-3 after:rounded-full after:bg-[#93A7A8] after:content-['']"
                  />
                ))}
                <div className="circle_plus">
                  <span className="leading-full flex items-center justify-center text-base font-bold text-[#1d1d1d] uppercase">
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={productMiddleRef}
          className="product-middle relative h-auto w-full"
        >
          <div
            className="images relative hidden h-auto w-full flex-col items-start justify-start gap-[1.25rem] pt-[calc(6rem+5vh)] md:flex"
            ref={imagesRef}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full md:w-[calc(1150*(100vh-(6rem+5vh))/1440)]"
              >
                <img
                  src={slide.img}
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            className="!block md:!hidden"
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} swiper-pagination-bullet"></span>`;
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <img
                  src={slide.img}
                  alt={""}
                  className="block h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev absolute top-1/2 !left-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
              <div className="h-full w-full bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]" />
            </div>
            <div className="swiper-button-next absolute top-1/2 !right-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
              <div className="h-full w-full bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]" />
            </div>
          </Swiper>
        </div>
        <div
          ref={productRightRef}
          className="product-right relative box-border h-auto w-full py-[2rem] pr-[5vw] pl-[5vw] md:sticky md:top-[calc(6rem+10vh)] md:h-[calc(100vh-(6rem+5vh))] md:py-0 md:pl-0"
        >
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3.75rem]">
            <div className="product-top relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
              <div className="product-title limited mobile relative w-full">
                <h1 className="leading-full font-humane text-center text-[20vw] font-bold text-[#93A7A8] uppercase">
                  Everest
                </h1>
              </div>
              <div className="product-price relative flex h-auto w-full items-center justify-between">
                <div className="left relative flex h-auto w-auto flex-col items-start justify-end">
                  <span className="regular leading-full text-[2rem] text-[#1d1d1d]">
                    € 850.00
                  </span>
                </div>
              </div>
              <div className="product-colors-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <span className="leading-full relative flex h-auto w-full items-center justify-start gap-[0.5rem] text-base font-bold text-[#1d1d1d] uppercase">
                  Colore<em>Natural/Taupe</em>
                </span>
                <div className="col-list relative flex h-auto w-full items-center justify-start gap-[1rem]">
                  <div className="product-color current relative box-border flex h-[3rem] w-[3rem] items-center justify-center rounded-full border-2 border-[#c1bab7] bg-[#c1bab7] md:h-[4rem] md:w-[4rem]">
                    <div className="inner h-[2.5rem] w-[2.5rem] rounded-full bg-[#c1bab7] md:h-[3.25rem] md:w-[3.25rem]" />
                  </div>
                </div>
              </div>
              <div className="product-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <div className="top relative flex h-auto w-full items-center justify-between">
                  <span className="label font-base leading-full relative flex items-center justify-start gap-[0.5rem] font-bold text-[#1d1d1d] uppercase">
                    Taglia
                  </span>
                  <div className="sizes-guide-btn relative w-auto">
                    <span className="font-base leading-full font-bold text-[#302F35] uppercase">
                      Guida taglie
                    </span>
                  </div>
                </div>
                <div className="row relative flex h-auto w-full flex-col items-start justify-between md:flex-row">
                  <div className="variations-list limited relative flex h-auto w-full flex-wrap items-center justify-start gap-[1rem]">
                    {["S", "M", "L", "XL", "XXL"].map((variation, index) => (
                      <div
                        className="item relative box-border flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full border-2 border-solid border-[#1d1d1d] transition-all duration-350 ease-in-out md:h-[4rem] md:w-[4rem]"
                        key={index}
                      >
                        <div className="inner leading-full relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-transparent text-[0.75rem] text-[#1d1d1d] transition-all duration-350 ease-in-out md:text-base">
                          {variation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="product-description relative w-full">
                <p>
                  Tiratura limitata di 100 pezzi al mondo. Questo capo double
                  face è realizzato con 8 fili di lana/cordura nel colore
                  natural (lato A), combinati a 4 fili di puro cashmere nel
                  colore taupe (lato B).
                </p>
              </div>
            </div>
            <div className="product-bottom relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-button relative flex h-auto w-full items-start justify-start">
                <div
                  id="add2cart"
                  className="custom-button relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#93A7A8] px-[1rem] disabled:cursor-not-allowed disabled:opacity-50 md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
                >
                  <span className="leading-full relative text-base font-bold whitespace-nowrap text-white uppercase md:text-[1.25rem]">
                    Aggiungi al carrello
                  </span>
                </div>
              </div>
            </div>
            {[
              {
                title: "Dettagli",
                items: [
                  "Struttura in mezza maglia inglese",
                  "Capo double face",
                  "Bandierina logo “AKKE” double face",
                  "Collo vulcano con calature a vista",
                  "8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere 2-28",
                ],
              },
              {
                title: "Materiali e cura",
                items: ["50% Cashmere", "30% Lana", "20% Cordura"],
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="product-details mobile relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex"
              >
                <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                  {detail.title}
                </span>
                <ul className="relative flex h-auto w-full flex-col">
                  {detail.items.map((text, index) => (
                    <li
                      key={index}
                      className="relative flex items-start justify-start gap-[0.3rem] text-base leading-[1.2rem] text-[#1d1d1d] before:text-[1.5rem] before:leading-[1rem] before:content-['·']"
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="product-heat mobile relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex">
              <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
                Calore
              </span>
              <div className="circles relative flex h-auto w-full items-center justify-start gap-[0.25rem]">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="relative box-border flex h-4 w-4 items-center justify-center rounded-full border border-[#93A7A8] after:h-3 after:w-3 after:rounded-full after:bg-[#93A7A8] after:content-['']"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
