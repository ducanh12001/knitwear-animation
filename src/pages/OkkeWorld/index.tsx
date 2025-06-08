import type { FC } from 'react';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import DecryptedText from '@/components/animations/DecryptedText';
import FeaturesSection from '@/pages/OkkeWorld/FeaturesSection';
import AdvSection from '@/pages/OkkeWorld/AdvSection';
import ImagesSection from '@/pages/OkkeLimited/ImagesSection';
import FeaturesVideo from '@/assets/features.mp4';

import WorldBanner from '@/assets/images/banner/world-banner.jpg';
import WorldBannerSp from '@/assets/images/banner/world-banner-sp.jpg';
import World1 from '@/assets/images/banner/world-1.jpg';
import World2 from '@/assets/images/banner/world-2.jpg';
import World3 from '@/assets/images/banner/world-3.jpg';
import World4 from '@/assets/images/banner/world-4.jpg';

const OkkeWorld: FC = () => {
  useGSAPAnimation();

  return (
    <div className="page-okkeworld">
      <section className="relative h-auto w-full md:h-screen">
        <div className="desktop relative h-full w-full">
          <img
            className="block h-full w-full object-cover object-center"
            src={WorldBanner}
            alt=""
          />
        </div>
        <div className="mobile relative h-full w-full">
          <img
            className="block h-full w-full object-cover object-center"
            src={WorldBannerSp}
            alt=""
          />
        </div>
      </section>
      <ImagesSection
        bgColor="#A9AFA4"
        blockTop={{
          title: 'The epitome of italian excellence',
          des: 'OKKE transforms high-performance technical fibers into luxurious garments, knitting a 3D future that embraces craftsmanship and extraordinary functionality. All of our garments are meticulously crafted to welcome your body.',
        }}
        blockColumns={{
          leftTitle: 'Research and experiment',
          leftImage: World1,
          rightTitle: 'Durable and timeless',
          rightImage: World2,
        }}
        blockFull={{
          image: World3,
          des: 'The innovation of materials and the study of details push OKKE knitwear beyond the boundaries of the ordinary.',
          des2: 'We want to inspire those who are looking for something more, those who want to experience the unlimited potential of textile creations.',
        }}
      />
      <FeaturesSection />
      <section className="okkeworld--video relative box-border h-auto w-full bg-black p-8 md:px-[10vw] md:py-[10vh]">
        <div className="elAnimation" data-animation="clip-top-to-bottom">
          <video src={FeaturesVideo} controls />
        </div>
      </section>
      <section className="okkeworld--image-full relative h-auto w-full">
        <div className="relative h-auto w-full">
          <div className="relative z-10 h-auto w-full">
            <img src={World4} alt="" className="block h-auto w-full" />
          </div>
          <div className="absolute top-1/2 left-1/2 z-15 -translate-1/2">
            <h2 className="font-humane text-[90px] leading-[75%] whitespace-nowrap text-white uppercase md:text-[12vw]">
              <DecryptedText
                text="42°54’21.60” N 13°11’42.00”E"
                animateOn="view"
                revealDirection="center"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                maxIterations={30}
              />
            </h2>
          </div>
          <div
            className="gradient absolute top-0 left-0 z-50 h-full w-full"
            style={{
              backgroundImage:
                'linear-gradient(0deg, #1d1d1d 0%, rgba(29, 29, 29, 0) 26%, rgba(29, 29, 29, 0) 100%)',
            }}
          />
        </div>
      </section>
      <AdvSection />
    </div>
  );
};

export default OkkeWorld;
