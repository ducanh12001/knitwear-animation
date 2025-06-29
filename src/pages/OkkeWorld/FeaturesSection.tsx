import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';

import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';
import { FEATURES_DATA } from '@/constant/featuresData';
import FeatureModal from '@/components/organisms/modal/FeatureModal';

import ModelImage from '@/assets/images/banner/model.jpg';
import ModelImageSp from '@/assets/images/banner/model-sp.png';

const FeaturesSection: FC = () => {
  const isDesktop = useMediaQuery({
    query: `(min-width: ${DESKTOP_BREAKPOINT}px)`,
  });
  const { contextSafe } = useGSAP();

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<number>(0);

  const openFeatureModal = contextSafe((index: number) => {
    setSelected(index);

    const tl = gsap.timeline();
    tl.set(modalRef.current, {
      autoAlpha: 1,
      ease: 'power2.out',
    })
      .to(modalBgRef.current, {
        autoAlpha: 1,
        ease: 'power2.out',
      })
      .to(
        modalContentRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          ease: 'power2.out',
          duration: 0.4,
        },
        0.2,
      );
  });

  const closeFeatureModal = contextSafe(() => {
    const tl = gsap.timeline();
    tl.to(modalContentRef.current, {
      autoAlpha: 0,
      scale: 0.6,
      duration: 0.4,
      ease: 'power2.in',
    }).set(
      modalRef.current,
      {
        autoAlpha: 0,
      },
      0.6,
    );
  });

  return (
    <section className="okkeworld--features">
      <div className="relative h-auto w-full overflow-hidden bg-[#e1e1e1] py-[3.75rem] md:bg-inherit md:py-0">
        <div className="title relative top-0 left-0 z-15 mb-[2.5rem] translate-y-0 text-center md:absolute md:top-1/2 md:left-[5vw] md:mb-0 md:-translate-y-1/2 md:text-left">
          <h2
            className="elAnimation font-humane m-0 text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]"
            data-animation="ease-left-to-right"
          >
            OKKE Features
          </h2>
        </div>
        <div
          className="image elAnimation desktop relative z-10 h-auto w-full"
          data-animation="ease-bottom-to-top-scaled"
        >
          <img src={ModelImage} alt="" className="block h-auto w-full" />
        </div>
        <div className="image mobile">
          <div className="relative mx-auto w-[80%]">
            <img src={ModelImageSp} alt="" className="w-full" />
          </div>
        </div>
        <div className="dots absolute top-0 left-0 z-20 w-full">
          {FEATURES_DATA.map((feature, index) => (
            <div
              key={index}
              className={`dot elAnimation absolute flex items-center justify-start gap-1 md:gap-4 ${index === 0 && 'flex-row-reverse'} ${index === 1 && 'right-[2.5vw]'}`}
              data-animation={
                index === 0 ? 'ease-left-to-right' : 'ease-right-to-left'
              }
              style={{
                top: isDesktop ? feature.desktop.top : feature.mobile.top,
                left: isDesktop ? feature.desktop.left : feature.mobile.left,
              }}
            >
              <div
                className="circle border-primary relative box-border flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-1 transition-all duration-350 ease-in-out md:h-[2.5vw] md:w-[2.5vw] md:border-2 md:border-[#A9AFA4]"
                onClick={() => openFeatureModal(index)}
              >
                <div className="inner bg-primary relative h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full transition-all duration-350 ease-in-out md:h-[calc(100%-8px)] md:w-[calc(100%-8px)] md:bg-[#A9AFA4]" />
              </div>
              <span className="leading-full text-primary cursor-pointer text-[11px] font-bold whitespace-nowrap uppercase md:text-base md:font-normal md:whitespace-normal">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <FeatureModal
        modalRef={modalRef}
        modalBgRef={modalBgRef}
        modalContentRef={modalContentRef}
        selectedFeature={selected}
        closeFeatureModal={closeFeatureModal}
      />
    </section>
  );
};

export default FeaturesSection;
