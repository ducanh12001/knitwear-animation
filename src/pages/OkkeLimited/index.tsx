import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import { ProductService } from '@/services/productService';
import type { Product } from '@/types';

import ProductSection from '@/components/pages/product-detail/ProductSection';
import ImagesSection from '@/pages/OkkeLimited/ImagesSection';
import IntroSection from '@/pages/OkkeLimited/IntroSection';

const OkkeLimited = () => {
  const isSP = useMediaQuery({
    query: `(width < ${DESKTOP_BREAKPOINT}px)`,
  });
  const [firstProduct, setFirstProduct] = useState<Product | null>(null);

  useGSAPAnimation();

  useEffect(() => {
    const fetchFirstProduct = async () => {
      const products = await ProductService.getMenProducts();
      setFirstProduct(products[0]);
    };
    fetchFirstProduct();
  }, []);

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
          leftImage: '/images/banner/everest-2.jpg',
          rightTitle: 'Double Face',
          rightImage: '/images/banner/everest-3.jpg',
        }}
        blockFull={{
          image: '/images/banner/everest-4.jpg',
          des: 'Un maglione double face che chiede di diventare parte integrante del tuo abbigliamento tecnico, regalandoti adattabilità, resistenza e durevolezza, ma anche un capo che entra nella quotidianità con la sua traspirabilità, la sua leggerezza e indiscusse qualità estetiche.',
        }}
      />
      {firstProduct && (
        <ProductSection
          product={{
            ...firstProduct,
            title: 'Everest',
            description:
              'Production limited to 100 items worldwide. This reversible garment is created using 8 strands of wool/Cordura in a natural colour (side A), combined with 4 strands of pure cashmere in taupe (side B).',
            price: { regular: '850.00' },
          }}
          themeColor="#93A7A8"
          sectionClass="bg-[#e1e1e1] pt-[10vh]"
        />
      )}
    </div>
  );
};

export default OkkeLimited;
