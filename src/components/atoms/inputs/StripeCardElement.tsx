import React, { useEffect, useRef } from 'react';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import type {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '18px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

interface StripeCardElementProps {
  onCardChange?: (event: StripeCardElementChangeEvent) => void;
  error?: string | null;
}

export const StripeCardElement: React.FC<StripeCardElementProps> = ({
  onCardChange,
  error,
}) => {
  const elements = useElements();
  const cardElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.focus();
      }
    }
  }, [error, elements]);

  const handleChange = (event: StripeCardElementChangeEvent): void => {
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

      {error && <div className="text-secondary mt-2 text-sm">{error}</div>}
    </div>
  );
};
