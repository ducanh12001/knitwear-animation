import type { FC } from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import ProductCard from '@/pages/HomePage/ProductList/ProductCard';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import { useProductDetail } from '@/hooks/pages/useProductDetail';
import { ProductService } from '@/services/productService';
import type { Product } from '@/types';

const ProductDetail: FC = () => {
  const { id } = useParams();
  const { product } = useProductDetail(id);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const products = await ProductService.getMenProducts();
      setRelatedProducts(products.slice(0, 4));
      setIsLoading(false);
    };
    fetchRelatedProducts();
  }, []);

  if (!product || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  return (
    <>
      <ProductSection product={product} themeColor="#FD7453" sectionClass="" />
      <section className="relative box-border h-auto w-full p-[5vw]">
        <div className="relative flex h-auto w-full flex-col items-start justify-start">
          <h2 className="font-humane leading-full text-secondary mb-[5vh] text-[15vw] md:text-[8vw]">
            You may like it
          </h2>
          <div className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
