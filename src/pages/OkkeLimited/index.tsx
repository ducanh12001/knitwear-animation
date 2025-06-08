import { useMediaQuery } from 'react-responsive';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import ImagesSection from '@/pages/OkkeLimited/ImagesSection';
import IntroSection from '@/pages/OkkeLimited/IntroSection';
import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';

import Everest2 from '@/assets/images/banner/everest-2.jpg';
import Everest3 from '@/assets/images/banner/everest-3.jpg';
import Everest4 from '@/assets/images/banner/everest-4.jpg';

const OkkeLimited = () => {
  const isSP = useMediaQuery({
    query: `(width < ${DESKTOP_BREAKPOINT}px)`,
  });

  useGSAPAnimation();

  return (
    <div className="page-okkelimited bg-[#93A7A8]">
      <IntroSection isSP={isSP} />
      <ImagesSection
        blockTop={{
          title: 'Everest OKKE Limited',
          des: 'EVEREST è una creazione esclusiva OKKE con una doppia anima. Da una parte il blend di lana e cordura in una colorazione neutra e dall’altra puro cashmere in una nuance taupé',
        }}
        blockColumns={{
          leftTitle: 'Only 100 Items',
          leftImage: Everest2,
          rightTitle: 'Double Face',
          rightImage: Everest3,
        }}
        blockFull={{
          image: Everest4,
          des: 'Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.',
        }}
      />
      <ProductSection
        product={{
          id: 1,
          gender: 'male',
          title: 'Tephra',
          image: '/src/assets/images/products/tephra_blu_MS2415PL6-BLU-1.jpg',
          description: 'Essential polo in organic cotton.',
          price: { regular: '69.00' },
          colors: [
            {
              id: 'blu',
              image:
                '/src/assets/images/products/tephra_blu_MS2415PL6-BLU-1.jpg',
              hex: '#1E40AF',
              name: 'Blu',
            },
            {
              id: 'avorio',
              image:
                '/src/assets/images/products/tephra_avorio_MS2415PL6-AVORIO-1.jpg',
              hex: '#FEF7ED',
              name: 'Avorio',
            },
          ],
          slides: [
            {
              img: '/src/assets/images/slides/column/men-1.jpg',
              alt: 'Everest sweater front view - Men 1',
            },
            {
              img: '/src/assets/images/slides/column/men-2.jpg',
              alt: 'Everest sweater back view - Cordura side',
            },
            {
              img: '/src/assets/images/slides/column/men-3.jpg',
              alt: 'Everest sweater detail 1 - Cashmere side',
            },
            {
              img: '/src/assets/images/slides/column/men-4.jpg',
              alt: 'Everest sweater detail 2 - Cashmere side',
            },
            {
              img: '/src/assets/images/slides/column/men-5.jpg',
              alt: 'Everest sweater detail 2 - Cordura side',
            },
            {
              img: '/src/assets/images/slides/column/men-6.jpg',
              alt: 'Everest sweater detail 1 - Cordura side',
            },
          ],
        }}
        themeColor="#93A7A8"
        sectionClass="bg-[#e1e1e1]"
      />
    </div>
  );
};

export default OkkeLimited;
