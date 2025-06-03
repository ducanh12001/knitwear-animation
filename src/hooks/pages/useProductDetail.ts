import { useEffect, useState } from 'react';
import {
  menProducts,
  womenProducts,
} from '@/constant/mock-datas/sampleProductList';

export const useProductDetail = (id: string | undefined) => {
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    if (id) {
      const paramProduct = [...menProducts, ...womenProducts].find(
        (item) => item.id.toString() === id,
      );
      if (paramProduct) {
        setProduct(paramProduct);
      } else {
        console.error('Product not found');
      }
    }
  }, [id]);

  return { product };
};
