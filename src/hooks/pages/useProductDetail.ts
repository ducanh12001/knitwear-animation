import { useEffect, useState } from 'react';

import products from '@/constant/mock-datas/sampleProductList.json';

export const useProductDetail = (id: string | undefined) => {
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    if (id) {
      const paramProduct = products.find((item) => item.id.toString() === id);
      if (paramProduct) {
        setProduct(paramProduct);
      } else {
        console.error('Product not found');
      }
    }
  }, [id]);

  return { product };
};
