import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

import CookieConsentProvider from '@/contexts/cookie/CookieConsentContext';
import CartProvider from '@/contexts/cart/CartProvider';
import ModalProvider from '@/contexts/modal/ModalProvider';
import App from '@/App';
import './index.css';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const stripeOptions: StripeElementsOptions = {
  locale: 'en',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CookieConsentProvider>
        <CartProvider>
          <ModalProvider>
            <Elements stripe={stripePromise} options={stripeOptions}>
              <App />
            </Elements>
          </ModalProvider>
        </CartProvider>
      </CookieConsentProvider>
    </BrowserRouter>
  </StrictMode>,
);
