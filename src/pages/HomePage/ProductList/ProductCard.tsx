import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [hoveredColor, setHoveredColor] = useState<number | string | null>(
    null,
  );

  return (
    <div
      className="product-card home-rel-product relative h-auto w-full"
      data-id={product.id}
    >
      <div className="relative h-full w-full">
        <Link
          to={`/product-category/${product.id}`}
          className="group relative flex h-full w-full flex-col gap-8"
          onMouseLeave={() => setHoveredColor(null)}
        >
          <div className="product-image relative h-auto w-full">
            <img
              src={product.image}
              alt={product.title}
              className="block h-full w-full"
            />
            <div className="absolute top-0 left-0 h-auto w-full">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 h-auto w-full transition-opacity duration-300 ${
                    hoveredColor === color.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    key={index}
                    src={color.image}
                    alt={product.title}
                    className="block h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-info relative flex h-full w-full grow flex-col items-start justify-between gap-4">
            <div className="relative flex h-auto w-full flex-col items-center justify-start text-center">
              <div className="relative">
                <h3 className="font-humane group-hover:visibility-hidden visibility-visible text-[3rem] font-normal text-[#302F35] uppercase opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0 md:text-[4vw]">
                  {product.title}
                </h3>
                <div className="absolute top-1/2 left-1/2 flex w-auto -translate-1/2 items-center justify-center gap-4 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
                      style={{ backgroundColor: color.hex }}
                      data-product={color.id}
                      onMouseEnter={() => setHoveredColor(color.id)}
                    />
                  ))}
                </div>
              </div>
              <div className="text-primary relative w-[80%] text-base">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="product-price relative h-auto w-full">
              <div className="group-hover:visibility-hidden visibility-visible flex h-auto w-full flex-col items-center justify-end opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                {product.price?.sale ? (
                  <>
                    <span className="text-secondary line-through">
                      € {product.price.regular}
                    </span>
                    <span className="text-primary text-2xl">
                      € {product.price.sale}
                    </span>
                  </>
                ) : (
                  <span className="leading-full text-primary text-xl">
                    € {product.price?.regular}
                  </span>
                )}
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                <div className="bg-primary relative box-border rounded-3xl px-14 py-4">
                  <span className="text-xs whitespace-nowrap text-white uppercase">
                    Discover now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
