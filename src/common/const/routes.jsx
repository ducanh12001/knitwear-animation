import AkkeLimited from "@/pages/AkkeLimited";
import AkkeWorld from "@/pages/AkkeWorld";
import Cart from "@/pages/Cart";
import Contacts from "@/pages/Contacts";
import HomePage from "@/pages/HomePage";
import PasswordRecovery from "@/pages/PasswordRecovery";
import Payment from "@/pages/Payment";
import ProductCollection from "@/pages/ProductCollection";
import ProductDetail from "@/pages/ProductDetail";
import TermsAndPolicies from "@/pages/TermsAndPolicies";

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
  {
    path: "/product-category/:id",
    title: "Product",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    title: "Cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    title: "Checkout",
    element: <Payment />,
  },
  {
    path: "/terms-of-sale",
    title: "Terms of Sale",
    element: <TermsAndPolicies isTerm={true} />,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    element: <TermsAndPolicies isTerm={false} />,
  },
  {
    path: "/password-recovery",
    title: "Recover Password",
    element: <PasswordRecovery />,
  },
];
