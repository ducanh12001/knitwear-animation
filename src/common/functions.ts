import { ROUTES } from '@/common/const/routes';

export const getPageTitle = (pathname: string) => {
  const route = ROUTES.find((route) => route.path.includes(pathname));
  return route ? route.title : 'Akke Knitwear';
};
