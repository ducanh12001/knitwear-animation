import { useState, useRef, useMemo, type FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';
import CollectionLink from '@/components/pages/akke-world/CollectionLink';
import PolaroidModal from '@/components/organisms/modal/PolaroidModal';
import PolaroidCard from '@/components/pages/akke-world/PolaroidCard';
import RoadSvg from '@/components/pages/akke-world/RoadSvg';

import Adv1 from '@/assets/images/banner/adv-1.jpg';
import Adv2 from '@/assets/images/banner/adv-2.jpg';
import Adv3 from '@/assets/images/banner/adv-3.jpg';
import Adv4 from '@/assets/images/banner/adv-4.jpg';
import Adv5 from '@/assets/images/banner/adv-5.jpg';
import Adv6 from '@/assets/images/banner/adv-6.jpg';
import Adv7 from '@/assets/images/banner/adv-7.jpg';
import Adv8 from '@/assets/images/banner/adv-8.jpg';
import Adv9 from '@/assets/images/banner/adv-9.jpg';

export interface Polaroid {
  id: string;
  label: string;
  image: string;
  alt: string;
  position: {
    top: string;
    left: string;
  };
  labelPosition: {
    right: string;
    left: string;
  };
}

export interface CollectionLinkType {
  id: string;
  to: string;
  image: string;
  title: string;
  alt: string;
  className?: string;
}

const POLAROIDS_DATA: Polaroid[] = [
  {
    id: 'everest-1',
    label: 'Everest',
    image: Adv1,
    alt: 'Everest mountain landscape',
    position: { top: '5vh', left: '10vw' },
    labelPosition: { right: '2vw', left: 'initial' },
  },
  {
    id: 'trisul',
    label: 'Trisul',
    image: Adv2,
    alt: 'Trisul mountain peak',
    position: { top: '20vh', left: '15vw' },
    labelPosition: { right: '3vw', left: 'initial' },
  },
  {
    id: 'kardong',
    label: 'Kardong',
    image: Adv3,
    alt: 'Kardong mountain view',
    position: { top: '30vh', left: '8vw' },
    labelPosition: { right: 'initial', left: '2vw' },
  },
  {
    id: 'k2',
    label: 'K2',
    image: Adv4,
    alt: 'K2 mountain summit',
    position: { top: '8vh', left: '65vw' },
    labelPosition: { right: '1vw', left: 'initial' },
  },
  {
    id: 'nanga-parbat-1',
    label: 'Nanga Parbat',
    image: Adv5,
    alt: 'Nanga Parbat mountain range',
    position: { top: '15vh', left: '62vw' },
    labelPosition: { right: 'initial', left: '0' },
  },
  {
    id: 'nanga-parbat-2',
    label: 'Nanga Parbat',
    image: Adv6,
    alt: 'Nanga Parbat scenic view',
    position: { top: '5vh', left: '10vw' },
    labelPosition: { right: '2vw', left: 'initial' },
  },
];

const COLLECTION_LINKS: CollectionLinkType[] = [
  {
    id: 'menswear',
    to: '/product-category/menswear-collection',
    image: Adv7,
    title: 'Menswear',
    alt: "Men's collection showcase",
  },
  {
    id: 'womenswear',
    to: '/product-category/womenswear-collection',
    image: Adv8,
    title: 'Womenswear',
    alt: "Women's collection showcase",
    className: 'mt-[15vh]',
  },
  {
    id: 'everest-limited',
    to: '/everest-akke-limited',
    image: Adv9,
    title: 'Everest Akke Limited',
    alt: 'Everest limited edition collection',
  },
];

const AdvSection: FC = () => {
  const isDesktop = useMediaQuery({
    query: `(min-width: ${DESKTOP_BREAKPOINT}px)`,
  });

  const [selectedPolaroid, setSelectedPolaroid] = useState<number>(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const polaroidRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { contextSafe } = useGSAP();

  const memoizedPolaroids = useMemo(() => POLAROIDS_DATA, []);

  const showPolaroid = contextSafe((index: number) => {
    if (!isDesktop) return;
    const polaroid = polaroidRefs.current[index];
    if (!polaroid) return;

    gsap.to(polaroid, {
      autoAlpha: 1,
      rotate: -2.5,
      scale: 1,
    });
  });

  const hidePolaroid = contextSafe((index: number) => {
    const polaroid = polaroidRefs.current[index];
    if (!polaroid) return;

    gsap.to(polaroid, {
      autoAlpha: 0,
      rotate: 0,
      scale: 0.8,
    });
  });

  const openPolaroidModal = contextSafe((index: number) => {
    setSelectedPolaroid(index);

    if (isDesktop) {
      showPolaroid(index);
      return;
    }

    const tl = gsap.timeline();

    tl.set(modalRef.current, { autoAlpha: 1 })
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

  const closeModal = contextSafe(() => {
    const tl = gsap.timeline();

    tl.to(modalContentRef.current, {
      autoAlpha: 0,
      scale: 0.6,
      duration: 0.3,
      ease: 'power2.in',
    }).set(
      modalRef.current,
      {
        autoAlpha: 0,
      },
      0.5,
    );
  });

  return (
    <section
      className="akkeworld--adv bg-primary relative h-auto w-full"
      aria-label="Adventure Campaign"
    >
      <div
        className="road elAnimation absolute top-0 left-1/2 z-15 h-full -translate-x-1/2 xl:h-[60%]"
        data-animation="road"
      >
        <RoadSvg
          onPointClick={openPolaroidModal}
          onPointMouseEnter={showPolaroid}
          onPointMouseLeave={hidePolaroid}
        />
      </div>

      <div className="polaroid-list absolute z-12">
        {memoizedPolaroids.map((polaroid, index) => (
          <PolaroidCard
            key={polaroid.id}
            ref={(el) => {
              polaroidRefs.current[index] = el;
            }}
            polaroid={polaroid}
            index={index}
          />
        ))}
      </div>

      <div className="adv-section relative z-10 box-border flex h-auto w-full items-start justify-end px-[5vw] pt-[2.5rem] pb-[15rem] md:py-[25vh]">
        <div className="relative flex flex-col items-end justify-start gap-2 md:gap-8">
          <h2
            className="elAnimation font-humane text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]"
            data-animation="ease-right-to-left"
          >
            ADV Campaign
          </h2>
          <h3
            className="elAnimation text-base leading-[75%] text-[#A9AFA4] uppercase md:text-xl"
            data-animation="ease-right-to-left"
          >
            Spring Summer 2025
          </h3>
        </div>
      </div>

      <div className="collections-section relative z-20 mt-[15v] box-border h-auto w-full px-[5vw] pt-0 pb-[15vh] md:mt-0 md:pt-[15vh]">
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation font-humane mb-[5vw] text-[90px] leading-[75%] text-[#A9AFA4] uppercase md:text-[12vw]"
            data-animation="ease-bottom-to-top"
          >
            Explore AKKE Collections
          </h2>
          <div className="relative grid h-auto w-full grid-cols-2">
            <CollectionLink collection={COLLECTION_LINKS[0]} />
            <CollectionLink collection={COLLECTION_LINKS[1]} />
          </div>

          <div className="relative mt-8 flex h-auto w-full items-start justify-center">
            <CollectionLink collection={COLLECTION_LINKS[2]} isSpecial />
          </div>
        </div>
      </div>

      <PolaroidModal
        modalRef={modalRef}
        modalBgRef={modalBgRef}
        modalContentRef={modalContentRef}
        memoizedPolaroids={memoizedPolaroids}
        selectedPolaroid={selectedPolaroid}
        closeModal={closeModal}
      />
    </section>
  );
};

export default AdvSection;
