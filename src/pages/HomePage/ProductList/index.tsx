import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import type { Product } from '@/types';
import ProductCard from '@/pages/HomePage/ProductList/ProductCard';
import { ProductService } from '@/services/productService';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

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

          <motion.div
            className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            {menProducts.map((product, index) => (
              <motion.div
                key={`men-${product.id}-${index}`}
                variants={itemVariants}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative flex h-auto w-full flex-col items-center justify-start">
          <h2
            className="elAnimation font-humane text-6xl text-[90px] font-light text-[#A9AFA4] uppercase md:text-[15vw]"
            data-animation="ease-bottom-to-top"
          >
            Women best seller
          </h2>

          <motion.div
            className="relative grid h-auto w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            {womenProducts.map((product, index) => (
              <motion.div
                key={`women-${product.id}-${index}`}
                variants={itemVariants}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
