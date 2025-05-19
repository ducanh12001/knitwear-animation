import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./assets/css/index.js";
import { BrowserRouter } from "react-router";
import CartProvider from "./contexts/CartProvider.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ModalProvider } from "./contexts/ModalProvider";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";

const stripePromise = loadStripe("your_publishable_key");

const stripeOptions = {
  locale: "en",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookieConsentProvider>
      <CartProvider>
        <ModalProvider>
          <Elements stripe={stripePromise} options={stripeOptions}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Elements>
        </ModalProvider>
      </CartProvider>
    </CookieConsentProvider>
  </StrictMode>,
);
