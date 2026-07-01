import { useState, useEffect } from 'react';
import ProductCard from '@/components/pages/product/ProductCard';
import { ProductService } from '@/services/productService';
import { refreshScrollAnimations } from '@/lib/scrollAnimations';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';
import type { Product } from '@/types';

const FILTER_ITEMS = [
  { label: 'View all', href: '/product-category/menswear-collection' },
  { label: 'Polo', href: '/product-category/menswear-collection' },
  { label: 'Hoodie', href: '/product-category/menswear-collection' },
  { label: 'Knitwear', href: '/product-category/menswear-collection' },
  { label: 'Joggers', href: '/product-category/menswear-collection' },
  { label: 'T-shirt', href: '/product-category/menswear-collection' },
  { label: 'Accessories', href: '/product-category/menswear-collection' },
];

interface ProductCollectionProps {
  isMen: boolean;
}

const ProductCollection = ({ isMen }: ProductCollectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useGSAPAnimation();

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = isMen
        ? await ProductService.getMenProducts()
        : await ProductService.getWomenProducts();
      setProducts(productList);
    };
    fetchProducts();
  }, [isMen]);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setTimeout(() => refreshScrollAnimations(), 50);
    return () => clearTimeout(timer);
  }, [products]);

  return (
    <section className="relative w-full px-[5vw] pt-[calc(5vh+5.5rem)] pb-[10vh] md:pt-[calc(6rem+5vh)]">
      <div className="relative flex w-full flex-col gap-10 md:gap-16">
        <div className="relative flex w-full flex-col items-center gap-8">
          <h1
            className="elAnimation font-humane leading-full text-[clamp(3rem,15vw,9rem)] font-light text-surface-dark uppercase"
            data-animation="ease-bottom-to-top"
          >
            {isMen ? 'Menswear' : 'Womenswear'}
          </h1>

          <ul
            className="elAnimation flex flex-wrap items-center justify-center gap-3 md:gap-4"
            data-animation="ease-bottom-to-top"
          >
            {FILTER_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block rounded-full border border-surface-dark px-4 py-2 transition-colors duration-350 hover:bg-surface-dark/10 md:border-2 md:px-8 md:py-3"
                >
                  <span className="leading-full text-primary text-sm uppercase md:text-base">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="elAnimation relative grid w-full grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:grid-cols-4"
          data-animation="ease-stagger-list"
        >
          {products.map((product) => (
            <div key={product.id} className="home-rel-product">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;
