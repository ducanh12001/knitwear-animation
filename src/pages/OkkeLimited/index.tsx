import { useMediaQuery } from 'react-responsive';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import ImagesSection from '@/pages/OkkeLimited/ImagesSection';
import IntroSection from '@/pages/OkkeLimited/IntroSection';
import { menProducts } from '@/constant/mock-datas/sampleProductList';
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
          ...menProducts[0],
          title: 'Everest',
          description:
            'Production limited to 100 items worldwide. This reversible garment is created using 8 strands of wool/Cordura in a natural colour (side A), combined with 4 strands of pure cashmere in taupe (side B).',
          price: { regular: '850.00' },
        }}
        themeColor="#93A7A8"
        sectionClass="bg-[#e1e1e1] pt-[10vh]"
      />
    </div>
  );
};

export default OkkeLimited;
