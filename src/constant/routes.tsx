import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductCollection = lazy(() => import('@/pages/ProductCollection'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const OkkeLimited = lazy(() => import('@/pages/OkkeLimited'));
const OkkeWorld = lazy(() => import('@/pages/OkkeWorld'));
const Contacts = lazy(() => import('@/pages/Contacts'));
const Cart = lazy(() => import('@/pages/Cart'));
const Payment = lazy(() => import('@/pages/Payment'));
const TermsAndPolicies = lazy(() => import('@/pages/TermsAndPolicies'));
const PasswordRecovery = lazy(() => import('@/pages/PasswordRecovery'));

export const ROUTES = [
  {
    path: '/',
    title: 'Okke Knitwear',
    element: <HomePage />,
  },
  {
    path: '/product-category/menswear-collection',
    title: 'Menswear',
    element: <ProductCollection isMen={true} />,
  },
  {
    path: '/product-category/womenswear-collection',
    title: 'Womenswear',
    element: <ProductCollection isMen={false} />,
  },
  {
    path: '/everest-okke-limited',
    title: 'Everest Okke Limited',
    element: <OkkeLimited />,
  },
  {
    path: '/okkeworld',
    title: 'Okkeworld',
    element: <OkkeWorld />,
  },
  {
    path: '/contacts',
    title: 'Contacts',
    element: <Contacts />,
  },
  {
    path: '/product/:id',
    title: 'Product',
    element: <ProductDetail />,
  },
  {
    path: '/cart',
    title: 'Cart',
    element: <Cart />,
  },
  {
    path: '/checkout',
    title: 'Checkout',
    element: <Payment />,
  },
  {
    path: '/terms-of-sale',
    title: 'Terms of Sale',
    element: <TermsAndPolicies isTerm={true} />,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    element: <TermsAndPolicies isTerm={false} />,
  },
  {
    path: '/password-recovery',
    title: 'Recover Password',
    element: <PasswordRecovery />,
  },
];

export const whiteRoutes = [
  '/',
  '/everest-okke-limited',
  '/okkeworld',
  '/contacts',
];
