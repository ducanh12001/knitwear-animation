import type { FC } from 'react';
import {
  menProducts,
  womenProducts,
} from '@/constant/mock-datas/sampleProductList';
import ProductCard from '@/pages/HomePage/ProductList/ProductCard';

const ProductList: FC = () => {
  return (
    <section className="relative h-auto w-full bg-[#e1e1e1] px-[5vw] py-[10vh]">
      <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[15vh]">
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation font-humane text-[90px] font-light text-[#302F35] uppercase md:text-[15vw]"
            data-animation="ease-bottom-to-top"
          >
            Men best seller
          </h2>
          <div
            className="elAnimation relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            data-animation="ease-stagger-list"
          >
            {Array(4)
              .fill(menProducts[0])
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation font-humane text-6xl text-[90px] font-light text-[#A9AFA4] uppercase md:text-[15vw]"
            data-animation="ease-bottom-to-top"
          >
            Women best seller
          </h2>
          <div
            className="elAnimation relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            data-animation="ease-stagger-list"
          >
            {Array(4)
              .fill(womenProducts[0])
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
