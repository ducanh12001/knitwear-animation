import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App.jsx";
import CartProvider from "./contexts/CartProvider.jsx";
import { ModalProvider } from "./contexts/ModalProvider";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import "./index.css";

const stripePromise = loadStripe("your_publishable_key");

const stripeOptions = {
  locale: "en",
};

createRoot(document.getElementById("root")).render(
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
