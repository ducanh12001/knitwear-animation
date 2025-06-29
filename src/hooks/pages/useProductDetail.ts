import { useEffect, useState } from 'react';
import { ProductService } from '@/services/productService';
import type { Product } from '@/types';

export const useProductDetail = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productId = parseInt(id);
        const foundProduct = await ProductService.getProductById(productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found');
        }
      }
    };
    fetchProduct();
  }, [id]);

  return { product };
};
