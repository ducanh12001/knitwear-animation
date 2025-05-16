import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { imageSlides } from "../../../common/const/slides";
import { ProductDetails } from "./ProductDetails";
import { HeatIndicator } from "./HeatIndicator";
import useCart from "../../../hooks/useCart";
import { useModal } from "@/hooks/useModal";

gsap.registerPlugin(ScrollTrigger);

export function ProductSection({
  product,
  themeColor = "#FD7453",
  hoverColor = "#FD5932",
  sectionClass = "",
}) {
  const isSP = useMediaQuery({
    query: "(width < 768px)",
  });
  const { toggleCartModal } = useModal();
  const { addToCart } = useCart();

  const sectionRef = useRef(null);
  const productLeftRef = useRef(null);
  const productRightRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState(-1);
  const [selectedColor, setSelectedColor] = useState(0);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesLoadedCountRef = useRef(0);

  const handleImageLoaded = useCallback(() => {
    imagesLoadedCountRef.current += 1;
    if (imagesLoadedCountRef.current >= imageSlides.length) {
      setImagesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isSP) return;
    if (!imagesLoaded) return;

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
  }, [isSP, imagesLoaded]);

  const handleAddToCart = () => {
    if (selectedSize >= 0) {
      addToCart(product, sizes[selectedSize], selectedColor, 1);
      console.log(
        `Added ${product.title}, size ${sizes[selectedSize]}, color ${
          product.colors?.[selectedColor]?.name
        } to cart`,
      );
      toggleCartModal(true);
    }
  };

  return (
    <section
      className={`product--shop-section relative h-auto w-full ${sectionClass}`}
      ref={sectionRef}
    >
      <div
        className="wrapper relative flex h-auto w-full flex-col items-start justify-start gap-0 md:grid md:gap-[2rem]"
        style={{
          gridTemplateColumns:
            "1fr calc(1150 * (100vh - (6rem + 5vh)) / 1440) 1fr",
        }}
      >
        {/* Left Column */}
        <div
          ref={productLeftRef}
          className="product-left relative box-border h-auto w-full pt-[6rem] pr-[5vw] pl-[5vw] md:sticky md:top-[calc(6rem+10vh)] md:!h-auto md:pt-0 md:pr-0"
        >
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
            <div className="product-top relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-title desktop relative w-full">
                <h1
                  className="font-humane leading-full text-[15vw] uppercase md:text-[8vw]"
                  style={{ color: themeColor }}
                >
                  {product.title}
                </h1>
              </div>
            </div>
            {!isSP && (
              <>
                <ProductDetails isMobile={false} />
                <HeatIndicator isMobile={false} />
              </>
            )}
          </div>
        </div>

        {/* Middle Column - Images */}
        <div className="product-middle relative h-auto w-full">
          <div className="images relative hidden h-auto w-full flex-col items-start justify-start gap-[1.25rem] pt-[calc(6rem+5vh)] md:flex">
            {imageSlides.map((slide, index) => (
              <div
                key={index}
                className="relative w-full md:w-[calc(1150*(100vh-(6rem+5vh))/1440)]"
              >
                <img
                  src={slide.img}
                  alt={slide.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover object-center"
                  onLoad={handleImageLoaded}
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
              renderBullet: (index, className) =>
                `<span class="${className} swiper-pagination-bullet"></span>`,
            }}
          >
            {imageSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="block h-full w-full object-cover"
                  loading="lazy"
                />
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
          className="product-right relative box-border h-auto w-full py-[2rem] pr-[5vw] pl-[5vw] md:sticky md:top-[calc(6rem+10vh)] md:!h-auto md:py-0 md:pl-0"
        >
          <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[3.75rem]">
            <div className="product-top relative flex h-auto w-full flex-col items-start justify-start gap-[3rem]">
              <div className="product-title mobile relative w-full">
                <h1
                  className="leading-full font-humane text-center text-[20vw] font-bold uppercase"
                  style={{ color: themeColor }}
                >
                  {product.title}
                </h1>
              </div>

              <div className="product-price relative flex h-auto w-full items-center justify-between">
                <div className="left relative flex h-auto w-auto flex-col items-start justify-end">
                  {product.price?.sale ? (
                    <>
                      <span className="regular leading-full text-[#FD7453] line-through">
                        € {product.price.regular}
                      </span>
                      <span className="sale leading-full text-[2rem] text-[#1d1d1d]">
                        € {product.price.sale}
                      </span>
                    </>
                  ) : (
                    <span className="regular leading-full text-[2rem] text-[#1d1d1d]">
                      € {product.price?.regular}
                    </span>
                  )}
                </div>
              </div>

              <div className="product-colors-variations relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
                <span className="leading-full relative flex h-auto w-full items-center justify-start gap-[0.5rem] text-base font-bold text-[#1d1d1d] uppercase">
                  Color
                  <span className="font-normal normal-case">Natural/Taupe</span>
                </span>
                <div className="col-list relative flex h-auto w-full items-center justify-start gap-[1rem]">
                  {product.colors?.map((item, index) => (
                    <div
                      key={index}
                      className="product-color relative box-border flex h-[3rem] w-[3rem] items-center justify-center rounded-full md:h-[4rem] md:w-[4rem]"
                      aria-label={`Select color ${item.name}`}
                      role="radio"
                      aria-checked={selectedColor === index}
                      style={{
                        backgroundColor:
                          selectedColor === index
                            ? "transparent"
                            : item.hex || "#c1bab7",
                        border:
                          selectedColor === index
                            ? `2px solid ${item.hex}`
                            : "none",
                      }}
                      onClick={() => setSelectedColor(index)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedColor(index);
                        }
                      }}
                    >
                      <div
                        className="inner h-[2.5rem] w-[2.5rem] rounded-full md:h-[3.25rem] md:w-[3.25rem]"
                        style={{
                          backgroundColor:
                            selectedColor === index
                              ? item.hex || "#c1bab7"
                              : "transparent",
                        }}
                      />
                    </div>
                  ))}
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
                    className="variations-list relative flex h-auto w-full flex-wrap items-center justify-start gap-[1rem]"
                    role="radiogroup"
                    aria-label="Select size"
                  >
                    {sizes.map((size, index) => (
                      <button
                        className={`relative box-border flex h-[3rem] w-[3rem] items-center justify-center rounded-full border-2 border-solid transition-all duration-350 ease-in-out md:h-[4rem] md:w-[4rem] ${
                          selectedSize === index
                            ? `border-[${themeColor}]`
                            : "border-[#1d1d1d]"
                        } ${index % 2 === 1 ? "cursor-not-allowed opacity-20" : "cursor-pointer opacity-100"}`}
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        aria-checked={selectedSize === index}
                        aria-label={`Size ${size}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedSize(index);
                          }
                        }}
                      >
                        <div
                          className={`leading-full relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full text-[0.75rem] transition-colors duration-350 ease-in-out md:h-[3.25rem] md:w-[3.25rem] md:text-base ${
                            selectedSize === index
                              ? `bg-[${themeColor}] text-white`
                              : "bg-transparent text-[#1d1d1d]"
                          }`}
                        >
                          {size}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="product-description relative w-full">
                <p>
                  Production limited to 100 items worldwide. This reversible
                  garment is created using 8 strands of wool/Cordura in a
                  natural colour (side A), combined with 4 strands of pure
                  cashmere in taupe (side B).
                </p>
              </div>
            </div>

            <div className="product-bottom relative flex h-auto w-full flex-col items-start justify-start gap-[1rem]">
              <div className="product-button relative flex h-auto w-full items-start justify-start">
                <button
                  id="add2cart"
                  className={`custom-button relative flex h-[48px] w-full items-center bg-[${themeColor}] justify-center rounded-[14px] px-[1rem] md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
                    selectedSize < 0
                      ? `cursor-not-allowed opacity-50 hover:bg-[${themeColor}]`
                      : `cursor-pointer opacity-100 hover:bg-[${hoverColor}]`
                  }`}
                  onClick={handleAddToCart}
                  disabled={selectedSize < 0}
                  aria-label={
                    selectedSize < 0 ? "Select a size first" : "Add to Cart"
                  }
                >
                  <span className="leading-full relative text-base font-bold whitespace-nowrap text-white uppercase md:text-[1.25rem]">
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>

            {isSP && (
              <>
                <ProductDetails isMobile={true} />
                <HeatIndicator isMobile={true} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
