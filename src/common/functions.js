import { ROUTES } from "./const/routes";

export const getPageTitle = (pathname) => {
  const route = ROUTES.find((route) => route.path.includes(pathname));
  return route ? route.title : "Akke Knitwear";
};
