import { useState, type FC } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { CloseButton } from '@/components/atoms/buttons/CloseButton';

interface Feature {
  label: string;
  desktop: { top: string; left: string };
  mobile: { top: string; left: string };
  des: string;
}

const featuresData: Feature[] = [
  {
    label: 'Wholegarment®',
    desktop: { top: '15vh', left: '35%' },
    mobile: { top: 'calc(3.75rem + 48px + 80px)', left: '2.5vw' },
    des: "WHOLEGARMENT® is the world's first seam-free knitwear technology. It can be described as a 3D printer for textiles. The garments that come out of the machine need only some finishing, but they are almost ready to be worn. This technology allows us to reduce the number of steps that were necessary in traditional knitwear. This means that we are able to reduce yarn waste, as we only order and use as much yarn as we need.",
  },
  {
    label: 'Dyeing Process',
    desktop: { top: '20vh', left: '56%' },
    mobile: { top: 'calc(3.75rem + 72px + 80px)', left: 'auto' },
    des: 'Our garments have been dyed following the DARKNESS technique which gives an iridescent effect of light-dark shadows. The dye gives each garment deep and always different shades. For this reason each piece is one of a kind. We focused our attention on 4 colors in particular, making sure that each color worked when combined with all the others.',
  },
  {
    label: 'Yarn',
    desktop: { top: '50vh', left: '54%' },
    mobile: { top: `calc(3.75rem + ${625 / 3}vw + 120px)`, left: '35vw' },
    des: 'The long research conducted by our team led us to the discovery of a yarn that combines wool and Cordura. The latter is a fabric that derives from a particular processing of nylon, thanks to which the material acquires a very resistant grid structure with specific properties. Its main characteristic is that of being considered a highly robust fabric, and therefore resistant to wear and tear with the ability to last over time. The grid structure offers high breathability to water vapor, not generating overheating of the body, but with a limit to its waterproof capacity. In fact, it can be considered a fabric that has the ability to repel medium water, having passed the water column test with a value of 5,000 mm. Its combination with wool has allowed us to create extremely warm, soft and resistant garments, perfect for outdoor clothing.',
  },
  {
    label: 'Gorpcorec',
    desktop: { top: '75vh', left: '55%' },
    mobile: { top: `calc(3.75rem + ${625 / 3}vw + 80px)`, left: '60vw' },
    des: 'Gorpcore is a style inspired by hiking and climbing clothing, but is designed for the city. "Gorp" comes from "Good ol\' Raisins and Peanuts", alluding to the classic dried fruit snacks, which have always been faithful travel companions for hikers. The aesthetic movement took hold during the lockdown periods, when everyone - and especially those who live in the city - expressed, even in style, the need to reconnect with nature. Another fundamental aspect of the Gorpcore style, beyond the ideal techwear for escaping the rain or trekking in style, is its unisex essence: the boundaries between men\'s and women\'s clothing are blurred to a new level. ',
  },
];

const FeaturesSection: FC = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  const [selected, setSelected] = useState(0);

  const openFeatureModal = (index: number) => {
    setSelected(index);
    gsap.set('.akkeworld--features .custom-modal', {
      autoAlpha: 1,
      ease: 'power2.out',
    });
    gsap.to('.akkeworld--features .custom-modal .modal-bg', {
      autoAlpha: 1,
      ease: 'power2.out',
    });
    gsap.to('.akkeworld--features .custom-modal .modal-zoom', {
      autoAlpha: 1,
      scale: 1,
      ease: 'power2.out',
      duration: 0.4,
      delay: 0.2,
    });
  };

  const closeFeatureModal = () => {
    gsap.to('.akkeworld--features .custom-modal .modal-zoom', {
      autoAlpha: 0,
      scale: 0.6,
      duration: 0.4,
      ease: 'power2.in',
    });
    gsap.set('.akkeworld--features .custom-modal', {
      autoAlpha: 0,
      delay: 0.6,
    });
  };

  return (
    <section className="akkeworld--features">
      <div className="wrapper relative h-auto w-full overflow-hidden bg-[#e1e1e1] py-[3.75rem] md:bg-inherit md:py-0">
        <div className="title relative top-0 left-0 z-15 mb-[2.5rem] translate-y-0 text-center md:absolute md:top-1/2 md:left-[5vw] md:mb-0 md:-translate-y-1/2 md:text-left">
          <h2
            className="elAnimation font-humane m-0 text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]"
            data-animation="ease-left-to-right"
          >
            AKKE Features
          </h2>
        </div>
        <div
          className="image elAnimation desktop relative z-10 h-auto w-full"
          data-animation="ease-bottom-to-top-scaled"
        >
          <img
            src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-6.jpg"
            alt=""
            className="block h-auto w-full"
          />
        </div>
        <div className="image mobile">
          <div className="relative mx-auto w-[80%]">
            <img
              src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/akkeworld.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="dots absolute top-0 left-0 z-20 w-full">
          {featuresData.map((item, index) => (
            <div
              key={index}
              className={`dot elAnimation absolute flex items-center justify-start gap-1 md:gap-4 ${index === 0 && 'flex-row-reverse'} ${index === 1 && 'right-[2.5vw]'}`}
              data-animation={
                index === 0 ? 'ease-left-to-right' : 'ease-right-to-left'
              }
              style={{
                top: isDesktop ? item.desktop.top : item.mobile.top,
                left: isDesktop ? item.desktop.left : item.mobile.left,
              }}
            >
              <div
                className="circle border-primary relative box-border flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-1 transition-all duration-350 ease-in-out md:h-[2.5vw] md:w-[2.5vw] md:border-2 md:border-[#A9AFA4]"
                onClick={() => {
                  openFeatureModal(index);
                }}
              >
                <div className="inner bg-primary relative h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full transition-all duration-350 ease-in-out md:h-[calc(100%-8px)] md:w-[calc(100%-8px)] md:bg-[#A9AFA4]" />
              </div>
              <span className="leading-full text-primary cursor-pointer text-[11px] font-bold whitespace-nowrap uppercase md:text-base md:font-normal md:whitespace-normal">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="custom-modal invisible fixed top-0 left-0 z-999 h-full w-full opacity-0">
        <div
          className="modal-bg bg-primary/85 absolute top-0 left-0 h-full w-full opacity-0"
          onClick={closeFeatureModal}
        />
        <div className="modal-zoom invisible absolute top-1/2 left-1/2 h-auto w-[90%] -translate-1/2 scale-60 bg-white opacity-0 md:w-[50vw]">
          <div className="modal-close absolute top-4 right-4 z-45">
            <CloseButton onClick={closeFeatureModal} />
          </div>
          <div className="featuresTexts relative box-border h-auto w-full px-[5vw] py-[3rem] md:py-[5rem]">
            <div className="relative flex h-auto w-full flex-col items-start justify-start gap-4">
              <h3 className="font-humane text-secondary m-0 text-[15vw] leading-[75%] uppercase md:text-[5vw]">
                {featuresData[selected].label}
              </h3>
              <p className="text-primary text-base leading-[1.25rem]">
                {featuresData[selected].des}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
