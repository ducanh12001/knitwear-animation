import AkkeLimited from "../../pages/AkkeLimited";
import AkkeWorld from "../../pages/AkkeWorld";
import Contacts from "../../pages/Contacts";
import HomePage from "../../pages/HomePage";
import ProductCollection from "../../pages/ProductCollection";

export const ROUTES = [
  {
    path: "/",
    title: "Akke Knitwear",
    element: <HomePage />,
  },
  {
    path: "/product-category/menswear-collection",
    title: "Menswear",
    element: <ProductCollection isMen={true} />,
  },
  {
    path: "/product-category/womenswear-collection",
    title: "Womenswear",
    element: <ProductCollection isMen={false} />,
  },
  {
    path: "/everest-akke-limited",
    title: "Everest Akke Limited",
    element: <AkkeLimited />,
  },
  {
    path: "/akkeworld",
    title: "Akkeworld",
    element: <AkkeWorld />,
  },
  {
    path: "/contacts",
    title: "Contacts",
    element: <Contacts />,
  },
];
