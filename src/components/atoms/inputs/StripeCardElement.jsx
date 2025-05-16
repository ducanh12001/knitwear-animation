import { useEffect, useRef } from "react";
import { CardElement, useElements } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "18px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export const StripeCardElement = ({ onCardChange, error }) => {
  const elements = useElements();
  const cardElementRef = useRef(null);

  useEffect(() => {
    if (error && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.focus();
      }
    }
  }, [error, elements]);

  const handleChange = (event) => {
    if (onCardChange) {
      onCardChange(event);
    }
  };

  return (
    <div
      id="wc-stripe-card-element"
      className="stripe-card-container"
      ref={cardElementRef}
    >
      <div className="relative px-4 py-3">
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
      </div>

      {error && <div className="mt-2 text-sm text-[#FD7453]">{error}</div>}
    </div>
  );
};
