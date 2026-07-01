import type { FC } from 'react';
import { useState, useEffect } from 'react';

import type { Product } from '@/types';
import ProductCard from '@/components/pages/product/ProductCard';
import { ProductService } from '@/services/productService';
import { refreshScrollAnimations } from '@/lib/scrollAnimations';

const ProductList: FC = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const [men, women] = await Promise.all([
        ProductService.getMenProducts(),
        ProductService.getWomenProducts(),
      ]);
      setMenProducts(men.slice(0, 4));
      setWomenProducts(women.slice(0, 4));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (menProducts.length === 0 && womenProducts.length === 0) return;

    const timer = setTimeout(() => refreshScrollAnimations(), 50);
    return () => clearTimeout(timer);
  }, [menProducts, womenProducts]);

  return (
    <section className="relative w-full bg-surface px-[5vw] py-[10vh]">
      <div className="relative flex w-full flex-col gap-[12vh]">
        <div className="relative flex w-full flex-col items-center">
          <h2
            className="elAnimation font-humane text-[clamp(3rem,15vw,10rem)] font-light text-surface-dark uppercase"
            data-animation="ease-bottom-to-top"
          >
            Men best seller
          </h2>

          <div
            className="elAnimation relative mt-8 grid w-full grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4"
            data-animation="ease-stagger-list"
          >
            {menProducts.map((product) => (
              <div key={`men-${product.id}`} className="home-rel-product h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center">
          <h2
            className="elAnimation font-humane text-[clamp(3rem,15vw,10rem)] font-light text-accent-gray uppercase"
            data-animation="ease-bottom-to-top"
          >
            Women best seller
          </h2>

          <div
            className="elAnimation relative mt-8 grid w-full grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4"
            data-animation="ease-stagger-list"
          >
            {womenProducts.map((product) => (
              <div key={`women-${product.id}`} className="home-rel-product h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
