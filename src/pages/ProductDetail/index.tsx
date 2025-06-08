import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useParams } from 'react-router';
import ProductCard from '@/pages/HomePage/ProductList/ProductCard';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import { useProductDetail } from '@/hooks/pages/useProductDetail';
import type { Product } from '@/types';

const ProductDetail: FC = () => {
  const { id } = useParams();
  const { product } = useProductDetail(id);
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    fetch('/src/constant/mock-datas/sampleProductList.json')
      .then((res) => res.json())
      .then((data) => {
        setMenProducts(data.filter((item: Product) => item.gender === 'male'));
      });
  }, []);

  return (
    <div className="pt-32 md:pt-[20vh]">
      <ProductSection product={product} themeColor="#FD7453" />
      <section className="relative box-border h-auto w-full p-[5vw]">
        <div className="relative flex h-auto w-full flex-col items-start justify-start">
          <h2 className="font-humane leading-full text-secondary mb-[5vh] text-[15vw] md:text-[8vw]">
            You may like it
          </h2>
          <div className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-4">
            {menProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
