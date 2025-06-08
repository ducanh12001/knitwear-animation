import { useLocation } from 'react-router';
import { getPageTitle } from '@/constant/functions';
import { useProductDetail } from '@/hooks/pages/useProductDetail';
import type { Product } from '@/types';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const useBreadcrumb = (): BreadcrumbItem[] => {
  const location = useLocation();

  const getIdFromPath = (pathname: string) => {
    const match = pathname.match(/\/product-category\/(.+)/);
    return match ? match[1] : undefined;
  };
  const id = getIdFromPath(location.pathname);
  const { product } = useProductDetail(id);

  const getCategoryInfo = (product: Product) => {
    if (!product || !product.id) return null;

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

  if (location.pathname.startsWith('/product-category') && product?.id) {
    const categoryInfo = getCategoryInfo(product);

    return [
      { label: 'Homepage', path: '/' },
      ...(categoryInfo ? [categoryInfo] : []),
      { label: product.title },
    ];
  }

  return [
    { label: 'Homepage', path: '/' },
    { label: getPageTitle(location.pathname) },
  ];
};
