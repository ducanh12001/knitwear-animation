import type { FC } from 'react';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { RadioInput } from '@/components/atoms/inputs/RadioInput';
import { StripeCardElement } from '@/components/atoms/inputs/StripeCardElement';
import { PAYMENT_CARDS } from '@/constant/mock-datas/payment';
import type { PaymentMethod } from '@/types';

interface PaymentMethodsProps {
  selectedPayment: PaymentMethod;
  setSelectedPayment: (method: PaymentMethod) => void;
  cardError?: string | null;
  handleCardChange?: (event: StripeCardElementChangeEvent) => void;
  paymentError?: string | null;
}

const PaymentMethods: FC<PaymentMethodsProps> = ({
  selectedPayment,
  setSelectedPayment,
  cardError,
  handleCardChange,
  paymentError,
}) => {
  return (
    <ul className="wc_payment_methods payment_methods methods relative m-0 flex flex-col items-start justify-start gap-2 text-left md:gap-4">
      <RadioInput
        id="payment_method_stripe_cc"
        name="payment_method"
        value="stripe_cc"
        checked={selectedPayment === 'stripe_cc'}
        onChange={() => setSelectedPayment('stripe_cc')}
        label="Credit card"
      >
        <span className="wc-stripe-card-icons-container float-right inline-block">
          {PAYMENT_CARDS.map((item, index) => (
            <img
              key={index}
              className="wc-stripe-card-icon amex relative -mt-[2px] ml-[2px] inline h-[26px] max-h-[26px] w-[43px] max-w-[43px] align-middle"
              alt={item.alt}
              src={item.image}
            />
          ))}
        </span>
      </RadioInput>

      {selectedPayment === 'stripe_cc' && (
        <div
          className="payment_box payment_method_stripe_cc wc-stripe-no-methods relative box-border w-full bg-white p-0 text-[0.92em] leading-[1.5] text-[#515151]"
          style={{ gridArea: 'box' }}
        >
          <div className="wc-stripe_cc-container wc-stripe-gateway-container">
            <div className="wc-stripe_cc-new-method-container">
              <div
                id="wc-stripe-card-element"
                className="inline-type StripeElement StripeElement--empty"
              >
                {/* Stripe Card Element will be inserted here by Stripe JS */}
                <StripeCardElement
                  onCardChange={handleCardChange}
                  error={cardError}
                />

                {paymentError && (
                  <div className="text-secondary mt-2 text-sm">
                    {paymentError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Payment Method */}
      <RadioInput
        id="payment_method_bacs"
        name="payment_method"
        value="bacs"
        checked={selectedPayment === 'bacs'}
        onChange={() => setSelectedPayment('bacs')}
        label="Bank transfer"
      />

      {selectedPayment === 'bacs' && (
        <div className="payment_box payment_method_bacs relative box-border w-full rounded-[2px] bg-[#dcd7e3] p-[1em] leading-[1.5] text-[#515151] before:absolute before:top-[-0.75em] before:left-0 before:mt-[-1em] before:ml-[2em] before:block before:border-[1em] before:border-[transparent_transparent_#dcd7e3_transparent] before:content-['']">
          <p className="text-sm">
            Make your payment via bank transfer. Use your order ID as the reason
            for payment. Your order will not be shipped until the funds have
            cleared in our bank account.
          </p>
        </div>
      )}
    </ul>
  );
};

export default PaymentMethods;
