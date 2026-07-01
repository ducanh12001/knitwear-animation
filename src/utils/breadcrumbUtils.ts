import { matchPath } from 'react-router';
import { getPageTitle } from '@/constant/functions';
import { usePageTransitionContext } from '@/contexts/PageTransitionContext';
import { useProductDetail } from '@/hooks/pages/useProductDetail';
import type { Product } from '@/types';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

const getCategoryInfo = (product: Product) => {
  if (product.gender === 'male') {
    return {
      label: 'Menswear',
      path: '/product-category/menswear-collection',
    };
  }

  if (product.gender === 'female') {
    return {
      label: 'Womenswear',
      path: '/product-category/womenswear-collection',
    };
  }

  return null;
};

export const useBreadcrumb = (): BreadcrumbItem[] => {
  const { displayPathname } = usePageTransitionContext();
  const productMatch = matchPath('/product/:id', displayPathname);
  const productId = productMatch?.params.id;
  const { product } = useProductDetail(productId);

  if (productMatch && product) {
    const categoryInfo = getCategoryInfo(product);

    return [
      { label: 'Homepage', path: '/' },
      ...(categoryInfo ? [categoryInfo] : []),
      { label: product.title },
    ];
  }

  if (displayPathname.startsWith('/product-category')) {
    return [
      { label: 'Homepage', path: '/' },
      { label: getPageTitle(displayPathname) },
    ];
  }

  return [
    { label: 'Homepage', path: '/' },
    { label: getPageTitle(displayPathname) },
  ];
};
