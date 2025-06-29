import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [hoveredColor, setHoveredColor] = useState<number | string | null>(
    null,
  );

  return (
    <div className="product-card relative h-auto w-full" data-id={product.id}>
      <div className="relative h-full w-full">
        <Link
          to={`/product/${product.id}`}
          className="group relative flex h-full w-full flex-col gap-8"
          onMouseLeave={() => setHoveredColor(null)}
        >
          <div className="product-image relative h-auto w-full overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.title}
              className="block h-full w-full"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            <div className="absolute top-0 left-0 h-auto w-full">
              <AnimatePresence>
                {product.colors.map(
                  (color) =>
                    hoveredColor === color.id && (
                      <motion.div
                        key={color.id}
                        className="absolute top-0 left-0 h-auto w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src={color.image}
                          alt={product.title}
                          className="block h-full w-full"
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative flex h-full w-full grow flex-col items-start justify-between gap-4">
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
            <div className="relative h-auto w-full">
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
