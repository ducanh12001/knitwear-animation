import { matchPath } from 'react-router';
import { ROUTES } from '@/constant/routes';

export const getPageTitle = (pathname: string): string => {
  const exactMatch = ROUTES.find((route) => route.path === pathname);
  if (exactMatch) return exactMatch.title;

  const paramMatch = ROUTES.find((route) =>
    matchPath({ path: route.path, end: true }, pathname),
  );
  if (paramMatch) return paramMatch.title;

  return 'Okke Knitwear';
};
