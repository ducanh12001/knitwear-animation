import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ScrollTrigger } from '@/lib/gsap';
import { useMediaQuery } from 'react-responsive';

import useCart from '@/hooks/others/useCart';
import { useModal } from '@/hooks/others/useModal';
import { TABLET_BREAKPOINT } from '@/constant/breakpoint';
import type { Product } from '@/types';

import ProductDetails from '@/components/pages/product-detail/ProductDetails';
import HeatIndicator from '@/components/pages/product-detail/HeatIndicator';
import { Button } from '@/components/atoms/buttons/Button';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

interface ProductSectionProps {
  product: Product;
  themeColor?: string;
  sectionClass?: string;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;

const ProductSection: FC<ProductSectionProps> = ({
  product,
  themeColor = 'var(--color-primary)',
  sectionClass = '',
}) => {
  const isDesktop = useMediaQuery({
    query: `(min-width: ${TABLET_BREAKPOINT}px)`,
  });
  const { toggleCartModal } = useModal();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(-1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const productLeftRef = useRef<HTMLDivElement>(null);
  const productRightRef = useRef<HTMLDivElement>(null);
  const imagesLoadedCountRef = useRef(0);

  const handleImageLoaded = useCallback(() => {
    imagesLoadedCountRef.current += 1;
    if (imagesLoadedCountRef.current >= (product.slides?.length || 0)) {
      setImagesLoaded(true);
    }
  }, [product.slides]);

  useEffect(() => {
    imagesLoadedCountRef.current = 0;
    setImagesLoaded(false);
  }, [product.id]);

  useEffect(() => {
    if (!isDesktop) return;

    const sectionElement = sectionRef.current;
    const leftElement = productLeftRef.current;
    const rightElement = productRightRef.current;

    if (!sectionElement || !leftElement || !rightElement) return;

    const getPinOffset = () => {
      const header = document.querySelector<HTMLElement>('header.has-banner');
      return header
        ? Math.ceil(header.getBoundingClientRect().height) + 16
        : 100;
    };

    const pinConfig: ScrollTrigger.Vars = {
      trigger: sectionElement,
      start: () => `top top+=${getPinOffset()}`,
      end: 'bottom bottom',
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    };

    const leftTrigger = ScrollTrigger.create({
      ...pinConfig,
      pin: leftElement,
    });

    const rightTrigger = ScrollTrigger.create({
      ...pinConfig,
      pin: rightElement,
    });

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      leftTrigger.kill();
      rightTrigger.kill();
    };
  }, [isDesktop, product.id]);

  useEffect(() => {
    if (!isDesktop || !imagesLoaded) return;

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refreshId);
  }, [isDesktop, imagesLoaded]);

  const handleAddToCart = () => {
    if (selectedSize >= 0) {
      addToCart(product, SIZES[selectedSize], selectedColor, 1);
      toggleCartModal(true);
    }
  };

  const selectedColorName =
    product.colors?.[selectedColor]?.name ?? 'Select color';

  return (
    <section
      className={`product--shop-section relative w-full pt-[calc(5vh+4.5rem)] pb-10 md:pb-16 ${sectionClass}`}
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-[1440px] px-[5vw] lg:px-[4vw]">
        <div className="relative flex w-full flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,480px)_minmax(0,1fr)] lg:items-start lg:gap-x-10 xl:gap-x-14">
          {/* Left — title & details (desktop) */}
          <div ref={productLeftRef} className="hidden lg:block lg:pt-4">
            <div className="flex flex-col gap-8 pr-2 xl:gap-10">
              <h1
                className="font-humane leading-full text-[clamp(2.5rem,5vw,5.5rem)] uppercase"
                style={{ color: themeColor }}
              >
                {product.title}
              </h1>
              <ProductDetails isMobile={false} />
              <HeatIndicator isMobile={false} />
            </div>
          </div>

          {/* Center — images */}
          <div className="product-middle relative w-full lg:mx-auto lg:max-w-[480px]">
            <div className="images relative hidden flex-col gap-4 lg:flex">
              {product.slides?.map((slide, index) => (
                <div key={index} className="relative w-full overflow-hidden">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="block aspect-[3/4] w-full object-cover object-center"
                    onLoad={handleImageLoaded}
                  />
                </div>
              ))}
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: '.product-swiper-prev',
                nextEl: '.product-swiper-next',
              }}
              spaceBetween={0}
              slidesPerView={1}
              loop={Boolean(product.slides?.length && product.slides.length > 1)}
              className="product-mobile-swiper !block lg:!hidden"
              pagination={{
                clickable: true,
                renderBullet: (_, className) =>
                  `<span class="${className} swiper-pagination-bullet"></span>`,
              }}
            >
              {product.slides?.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="block aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
              <button
                type="button"
                className="product-swiper-prev absolute top-1/2 left-3 z-10 flex h-8 w-8 -translate-y-1/2 rotate-90 items-center justify-center"
                aria-label="Previous image"
              >
                <div
                  className="bg-primary h-full w-full mask-[url('/arrow.svg')] mask-no-repeat"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="product-swiper-next absolute top-1/2 right-3 z-10 flex h-8 w-8 -translate-y-1/2 -rotate-90 items-center justify-center"
                aria-label="Next image"
              >
                <div
                  className="bg-primary h-full w-full mask-[url('/arrow.svg')] mask-no-repeat"
                  aria-hidden="true"
                />
              </button>
            </Swiper>
          </div>

          {/* Right — purchase info */}
          <div ref={productRightRef} className="product-right lg:pt-4 lg:pl-2">
            <div className="flex flex-col gap-6 md:gap-7">
              <h1
                className="font-humane leading-full text-center text-[clamp(2rem,10vw,3.5rem)] uppercase lg:hidden"
                style={{ color: themeColor }}
              >
                {product.title}
              </h1>

              <div className="flex items-end">
                {product.price?.sale ? (
                  <div className="flex flex-col items-start gap-1">
                    <span className="leading-full text-secondary text-base line-through md:text-lg">
                      € {product.price.regular}
                    </span>
                    <span className="leading-full text-primary text-2xl">
                      € {product.price.sale}
                    </span>
                  </div>
                ) : (
                  <span className="leading-full text-primary text-2xl">
                    € {product.price?.regular}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <span className="leading-full text-primary flex flex-wrap items-center gap-2 text-sm font-bold uppercase">
                  Color
                  <span className="font-normal normal-case">{selectedColorName}</span>
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {product.colors?.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      className="flex h-11 w-11 items-center justify-center rounded-full xl:h-12 xl:w-12"
                      aria-label={`Select color ${item.name}`}
                      aria-pressed={selectedColor === index}
                      style={{
                        backgroundColor:
                          selectedColor === index
                            ? 'transparent'
                            : item.hex || '#c1bab7',
                        border:
                          selectedColor === index
                            ? `2px solid ${item.hex}`
                            : '2px solid transparent',
                      }}
                      onClick={() => setSelectedColor(index)}
                    >
                      <span
                        className="block h-9 w-9 rounded-full xl:h-10 xl:w-10"
                        style={{
                          backgroundColor:
                            selectedColor === index
                              ? item.hex || '#c1bab7'
                              : 'transparent',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="leading-full text-primary text-sm font-bold uppercase">
                    Size
                  </span>
                  <button
                    type="button"
                    className="text-sm font-bold text-surface-dark uppercase"
                  >
                    Size chart
                  </button>
                </div>
                <div
                  className="flex flex-wrap gap-2.5"
                  role="radiogroup"
                  aria-label="Select size"
                >
                  {SIZES.map((size, index) => (
                    <button
                      type="button"
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-solid transition-all duration-350 ease-in-out"
                      key={size}
                      onClick={() => setSelectedSize(index)}
                      aria-pressed={selectedSize === index}
                      aria-label={`Size ${size}`}
                      style={{
                        borderColor:
                          selectedSize === index
                            ? themeColor
                            : 'var(--color-primary)',
                      }}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs ${selectedSize === index ? 'text-white' : 'text-primary'}`}
                        style={{
                          backgroundColor:
                            selectedSize === index ? themeColor : 'transparent',
                        }}
                      >
                        {size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-primary max-w-prose text-sm leading-relaxed md:text-base">
                {product.description}
              </p>

              <Button
                disabled={selectedSize < 0}
                className="w-full font-bold uppercase sm:w-auto"
                onClick={handleAddToCart}
                bgColor={themeColor}
              >
                Add to Cart
              </Button>

              <div className="flex flex-col gap-6 border-t border-primary/10 pt-6 lg:hidden">
                <ProductDetails isMobile={true} />
                <HeatIndicator isMobile={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
