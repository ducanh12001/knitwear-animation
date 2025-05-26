import React, { useEffect, useRef } from 'react';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import type {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import type { StripeCardElementProps } from '@/types';

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

      {error && <div className="mt-2 text-sm text-[#FD7453]">{error}</div>}
    </div>
  );
};
