import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import CartProvider from './contexts/cart/CartProvider.js';
import { CookieConsentProvider } from './contexts/CookieConsentContext.js';
import { ModalProvider } from './contexts/modal/ModalProvider.js';
import './index.css';
import App from './App.js';

const stripePromise = loadStripe('your_publishable_key');

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
