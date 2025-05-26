import { useMediaQuery } from 'react-responsive';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import ImagesSection from '@/pages/AkkeLimited/ImagesSection';
import IntroSection from '@/pages/AkkeLimited/IntroSection';

const AkkeLimited = () => {
  const isSP = useMediaQuery({
    query: '(width < 768px)',
  });

  useGSAPAnimation();

  return (
    <div className="page-akkelimited bg-[#93A7A8]">
      <IntroSection isSP={isSP} />
      <ImagesSection
        blockTop={{
          title: 'Everest AKKE Limited',
          des: 'EVEREST è una creazione esclusiva AKKE con una doppia anima. Da una parte il blend di lana e cordura in una colorazione neutra e dall’altra puro cashmere in una nuance taupé',
        }}
        blockColumns={{
          leftTitle: 'Only 100 Items',
          leftImage:
            'https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-2.jpg',
          rightTitle: 'Double Face',
          rightImage:
            'https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-3.jpg',
        }}
        blockFull={{
          image:
            'https://akkeknitwear.com/website/wp-content/uploads/2023/12/Everest-4.jpg',
          des: 'Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.',
        }}
      />
      <ProductSection
        product={{
          id: 452123,
          url: 'https://akkeknitwear.com/prodotto/indrasan-mf2415gc1-acid-lime/',
          title: 'Everest',
          image:
            'https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2415GC1_AcidLime_1-2.jpg',
          description:
            'Production limited to 100 items worldwide. This reversible garment is created using 8 strands of wool/Cordura in a natural colour (side A), combined with 4 strands of pure cashmere in taupe (side B).',
          price: { regular: '850.00' },
          colors: [
            {
              id: 452,
              hex: '#b9cb5f',
              active: true,
              url: 'https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2415GC1_AcidLime_1-2.jpg',
            },
            {
              id: 2377,
              hex: '#003b84',
              url: 'https://akkeknitwear.com/website/wp-content/uploads/2024/09/INDRASAN-INDIGO-1.jpg',
            },
            {
              id: 425,
              hex: '#d4ccc8',
              url: 'https://akkeknitwear.com/website/wp-content/uploads/2023/11/MF2415GC1_Turtledove_1-1.jpg',
            },
          ],
        }}
        themeColor="#93A7A8"
        hoverColor="#82999a"
        sectionClass="bg-[#e1e1e1] pt-[10vh]"
      />
    </div>
  );
};

export default AkkeLimited;
