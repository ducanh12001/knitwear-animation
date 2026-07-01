import type { FC } from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/pages/product/ProductCard';
import ProductSection from '@/components/pages/product-detail/ProductSection';
import { useProductDetail } from '@/hooks/pages/useProductDetail';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import { refreshScrollAnimations } from '@/lib/scrollAnimations';
import { ProductService } from '@/services/productService';
import type { Product } from '@/types';

const ProductDetail: FC = () => {
  const { id } = useParams();
  const { product, isLoading } = useProductDetail(id);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useGSAPAnimation();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const products = await ProductService.getMenProducts();
      setRelatedProducts(products.slice(0, 4));
    };
    fetchRelatedProducts();
  }, []);

  useEffect(() => {
    if (relatedProducts.length === 0) return;
    const timer = setTimeout(() => refreshScrollAnimations(), 50);
    return () => clearTimeout(timer);
  }, [relatedProducts]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-[calc(5vh+5.5rem)]">
        <p className="text-primary text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-[calc(5vh+5.5rem)]">
        <p className="text-primary text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <>
      <ProductSection product={product} themeColor="var(--color-secondary)" />
      <section className="relative w-full px-[5vw] py-[8vh] md:py-[10vh]">
        <h2
          className="elAnimation font-humane leading-full text-secondary mb-[5vh] text-[clamp(2.5rem,8vw,6rem)] uppercase"
          data-animation="ease-bottom-to-top"
        >
          You may like it
        </h2>
        <div
          className="elAnimation grid w-full grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
          data-animation="ease-stagger-list"
        >
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="home-rel-product">
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
