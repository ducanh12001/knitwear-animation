import { useEffect, useState } from 'react';
import { ProductService } from '@/services/productService';
import type { Product } from '@/types';

export const useProductDetail = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProduct = async () => {
      setIsLoading(true);
      const productId = parseInt(id, 10);
      const foundProduct = await ProductService.getProductById(productId);

      if (cancelled) return;

      setProduct(foundProduct ?? null);
      setIsLoading(false);
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, isLoading };
};
