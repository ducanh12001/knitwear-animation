import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraF-1.jpg",
    alt: "Everest sweater front view - Cordura side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraR-1.jpg",
    alt: "Everest sweater back view - Cordura side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireD1-1.jpg",
    alt: "Everest sweater detail 1 - Cashmere side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CachemireD2-1.jpg",
    alt: "Everest sweater detail 2 - Cashmere side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraD2-1.jpg",
    alt: "Everest sweater detail 2 - Cordura side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraD1-1.jpg",
    alt: "Everest sweater detail 1 - Cordura side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraF-1.jpg",
    alt: "Everest sweater front view - Cordura side",
  },
  {
    img: "https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2405DV4_CorduraR-1.jpg",
    alt: "Everest sweater back view - Cordura side",
  },
];

const ProductDetails = ({ isMobile }) => {
  const details = [
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
  ];

  const className = `product-details ${isMobile ? "mobile" : "desktop"} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`;

  return details.map((detail, index) => (
    <div key={index} className={className}>
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
  ));
};

const HeatIndicator = ({ isMobile }) => {
  const className = `product-heat ${isMobile ? "mobile" : "desktop"} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`;

  return (
    <div className={className}>
      <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">Calore</span>
      <div className="circles relative flex h-auto w-full items-center justify-start gap-[0.25rem]">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="relative box-border flex h-4 w-4 items-center justify-center rounded-full border border-[#93A7A8] after:h-3 after:w-3 after:rounded-full after:bg-[#93A7A8] after:content-['']"
            aria-hidden="true"
          />
        ))}
        {!isMobile && (
          <div className="circle_plus">
            <span className="leading-full flex items-center justify-center text-base font-bold text-[#1d1d1d] uppercase">
              +
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

function ProductSection() {
  const isSP = useMediaQuery({
    query: "(width < 768px)",
  });

  const sectionRef = useRef(null);
  const productLeftRef = useRef(null);
  const productRightRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState(-1);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (isSP) return;

    const sectionElement = sectionRef.current;
    const leftElement = productLeftRef.current;
    const rightElement = productRightRef.current;

    if (!sectionElement || !leftElement || !rightElement) return;

    const leftTrigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top top",
      end: "bottom bottom",
      pin: leftElement,
      pinSpacing: false,
    });

    const rightTrigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top top",
      end: "bottom bottom",
      pin: rightElement,
      pinSpacing: false,
    });

    return () => {
      leftTrigger.kill();
      rightTrigger.kill();
    };
  }, [isSP]);

  const handleAddToCart = () => {
    if (selectedSize >= 0) {
      console.log(`Added size ${sizes[selectedSize]} to cart`);
      // Add your cart logic here
    }
  };

  return (
    <section
      className="akke-limited--product relative h-auto w-full bg-[#e1e1e1] pt-[10vh]"
      ref={sectionRef}
    >
      <div
        className="wrapper relative flex h-auto w-full flex-col items-start justify-start gap-0 md:grid md:gap-[2rem]"
        style={{
          gridTemplateColumns: "1fr calc(1150 * (100vh - (6rem + 5vh)) / 1440) 1fr",
        }}
      >
        {/* Left Column */}
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

            <ProductDetails isMobile={false} />
            <HeatIndicator isMobile={false} />
          </div>
        </div>

        {/* Middle Column - Images */}
        <div className="product-middle relative h-auto w-full">
          <div className="images relative hidden h-auto w-full flex-col items-start justify-start gap-[1.25rem] pt-[calc(6rem+5vh)] md:flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full md:w-[calc(1150*(100vh-(6rem+5vh))/1440)]"
              >
                <img
                  src={slide.img}
                  alt={slide.alt}
                  loading={index > 2 ? "lazy" : "eager"}
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
                <img src={slide.img} alt={slide.alt} className="block h-full w-full object-cover" />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev absolute top-1/2 !left-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
              <div
                className="h-full w-full bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]"
                aria-hidden="true"
              />
            </div>
            <div className="swiper-button-next absolute top-1/2 !right-[5vw] !m-0 flex !h-4 !w-4 -translate-y-1/2 -rotate-90 cursor-pointer items-center justify-center md:!h-[3rem] md:!w-[3rem]">
              <div
                className="h-full w-full bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:h-[1.5rem] md:w-[1.5rem]"
                aria-hidden="true"
              />
            </div>
          </Swiper>
        </div>

        {/* Right Column */}
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
                  <span className="regular leading-full text-[2rem] text-[#1d1d1d]">€ 850.00</span>
                </div>
              </div>

              <div className="product-colors-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <span className="leading-full relative flex h-auto w-full items-center justify-start gap-[0.5rem] text-base font-bold text-[#1d1d1d] uppercase">
                  Color<span className="font-normal normal-case">Natural/Taupe</span>
                </span>
                <div className="col-list relative flex h-auto w-full items-center justify-start gap-[1rem]">
                  <div
                    className="product-color current relative box-border flex h-[3rem] w-[3rem] items-center justify-center rounded-full border-2 border-[#c1bab7] bg-[#c1bab7] md:h-[4rem] md:w-[4rem]"
                    aria-label="Natural/Taupe color"
                    role="radio"
                    aria-checked="true"
                  >
                    <div className="inner h-[2.5rem] w-[2.5rem] rounded-full bg-[#c1bab7] md:h-[3.25rem] md:w-[3.25rem]" />
                  </div>
                </div>
              </div>

              <div className="product-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <div className="top relative flex h-auto w-full items-center justify-between">
                  <span className="label leading-full relative flex items-center justify-start gap-[0.5rem] font-bold text-[#1d1d1d] uppercase">
                    Size
                  </span>
                  <button className="sizes-guide-btn relative w-auto">
                    <span className="font-base leading-full font-bold text-[#302F35] uppercase">
                      Size chart
                    </span>
                  </button>
                </div>
                <div className="row relative flex h-auto w-full flex-col items-start justify-between md:flex-row">
                  <div
                    className="variations-list limited relative flex h-auto w-full flex-wrap items-center justify-start gap-[1rem]"
                    role="radiogroup"
                    aria-label="Select size"
                  >
                    {sizes.map((size, index) => (
                      <div
                        className={`relative box-border flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full border-2 border-solid transition-all duration-350 ease-in-out md:h-[4rem] md:w-[4rem] ${selectedSize === index ? "border-[#93A7A8]" : "border-[#1d1d1d]"}`}
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        role="radio"
                        aria-checked={selectedSize === index}
                        aria-label={`Size ${size}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedSize(index);
                          }
                        }}
                      >
                        <div
                          className={`leading-full relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full text-[0.75rem] transition-colors duration-350 ease-in-out md:h-[3.25rem] md:w-[3.25rem] md:text-base ${selectedSize === index ? "bg-[#93A7A8] text-white" : "bg-transparent text-[#1d1d1d]"}`}
                        >
                          {size}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="product-description relative w-full">
                <p>
                  Production limited to 100 items worldwide. This reversible garment is created
                  using 8 strands of wool/Cordura in a natural colour (side A), combined with 4
                  strands of pure cashmere in taupe (side B).
                </p>
              </div>
            </div>

            <div className="product-bottom relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-button relative flex h-auto w-full items-start justify-start">
                <button
                  id="add2cart"
                  className={`custom-button relative flex h-[48px] w-full items-center justify-center rounded-[14px] bg-[#93A7A8] px-[1rem] hover:bg-[#82999a] md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${selectedSize < 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}`}
                  onClick={handleAddToCart}
                  disabled={selectedSize < 0}
                  aria-label={selectedSize < 0 ? "Select a size first" : "Add to Cart"}
                >
                  <span className="leading-full relative text-base font-bold whitespace-nowrap text-white uppercase md:text-[1.25rem]">
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>

            <ProductDetails isMobile={true} />
            <HeatIndicator isMobile={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
