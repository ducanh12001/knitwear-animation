import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import type { SubmitHandler, FieldErrors } from 'react-hook-form';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';

import useCart from '@/hooks/useCart';
import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import BillingForm from '@/components/checkout/BillingForm';
import ShippingForm from '@/components/checkout/ShippingForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import CheckoutErrorNotice from '@/pages/Payment/CheckoutErrorNotice';

const DEFAULT_FORM_VALUES = {
  billing_first_name: '',
  billing_last_name: '',
  billing_country: '',
  billing_state: '',
  billing_address_1: '',
  billing_postcode: '',
  billing_city: '',
  billing_phone: '',
  billing_email: '',
  ship_to_different_address: false,
  shipping_first_name: '',
  shipping_last_name: '',
  shipping_country: '',
  shipping_state: '',
  shipping_address_1: '',
  shipping_postcode: '',
  shipping_city: '',
  order_comments: '',
  payment_method: 'stripe_cc',
};

export interface PaymentForm {
  billing_first_name: string;
  billing_last_name: string;
  billing_country: string;
  billing_state: string;
  billing_address_1: string;
  billing_postcode: string;
  billing_city: string;
  billing_phone: string;
  billing_email: string;
  ship_to_different_address: boolean;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_country: string;
  shipping_state: string;
  shipping_address_1: string;
  shipping_postcode: string;
  shipping_city: string;
  order_comments: string;
  payment_method: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const [isShipDifferent, setIsShipDifferent] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('stripe_cc');
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<PaymentForm>({
    defaultValues: { ...DEFAULT_FORM_VALUES },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const scrollToField = (fieldId: string) => {
    const element =
      document.getElementById(fieldId) ||
      document.querySelector(`[name="${fieldId}"]`) ||
      document.querySelector(`[data-id="${fieldId}"]`);

    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'smooth',
      });

      setTimeout(() => {
        (element as HTMLElement).focus();
      }, 500);
    }
  };

  const allErrors = { ...errors } as FieldErrors<PaymentForm> & {
    card_error?: { type: string; message: string };
  };
  if (selectedPayment === 'stripe_cc' && !cardComplete && cardError) {
    allErrors.card_error = {
      type: 'manual',
      message: cardError,
    };
  }

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    if (event.error) {
      setCardError(event.error.message ?? '');
    } else {
      setCardError('');
    }
  };

  const onSubmit: SubmitHandler<PaymentForm> = async (data) => {
    console.log('Order data:', data);

    if (selectedPayment === 'stripe_cc') {
      if (!stripe || !elements) {
        // Stripe chưa được tải xong
        return;
      }
      if (!cardComplete) {
        setCardError('Please enter valid card details.');
        scrollToField('wc-stripe-card-element');
        return;
      }

      setIsProcessing(true);
      setPaymentError(null);

      try {
        // Tạo payment method với CardElement
        const cardElement = elements.getElement('card');
        if (!cardElement) {
          setCardError('Card element not found.');
          setIsProcessing(false);
          return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          console.error('[payment error]', error);
          setPaymentError(error.message ?? '');
          setIsProcessing(false);
          return;
        }

        // Nếu thành công, bạn sẽ có paymentMethod.id
        console.log('[PaymentMethod]', paymentMethod);

        // Trong ứng dụng thực tế, bạn sẽ gửi paymentMethod.id đến server
        // để tạo payment intent và xác nhận thanh toán

        // Reset giỏ hàng và chuyển hướng đến trang xác nhận thanh toán
        // clearCart();
        // navigate('/order-confirmation');
      } catch (err) {
        console.error('Payment error:', err);
        setPaymentError('An unexpected error occurred. Please try again.');
      }

      setIsProcessing(false);
    } else if (selectedPayment === 'bacs') {
      // Xử lý thanh toán chuyển khoản ngân hàng
      // Thường thì sẽ chỉ gửi đơn hàng đến server và đợi xác nhận sau
      // clearCart();
      // navigate('/order-confirmation');
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const redirectTimer = setTimeout(() => {
        navigate('/cart');
      }, 100);

      return () => clearTimeout(redirectTimer);
    }
  }, [cartItems, navigate]);

  const handleFieldChange = async (
    fieldName: keyof PaymentForm,
    value: string,
  ) => {
    setValue(fieldName, value);
    await trigger(fieldName);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout--redirect-loading flex h-screen w-full items-center justify-center">
        <p className="text-xl">Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <>
      <section className="checkout--section-intro relative box-border h-auto w-full px-[5vw] pt-[8rem] xl:pt-[calc(10vh+10rem)]" />
      <section className="checkout--section-form relative box-border h-auto w-full px-[5vw] pb-[10vh]">
        <div className="relative h-auto w-full">
          <div className="woocommerce">
            <form
              name="checkout"
              className="woocommerce-checkout relative flex h-auto w-full flex-col gap-[5rem] md:grid md:grid-cols-[auto_25%_25%] md:gap-[5vw]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CheckoutErrorNotice
                errors={Object.keys(allErrors).length > 0 ? allErrors : null}
                scrollToField={scrollToField}
              />

              {/* Billing Details Column */}
              <div className="checkout-column relative h-auto w-full">
                <div className="relative flex h-auto w-full flex-col gap-[3rem]">
                  <div className="relative flex w-full flex-col items-start justify-start gap-[2rem]">
                    <BillingForm
                      register={register}
                      errors={errors}
                      handleFieldChange={handleFieldChange}
                    />
                  </div>

                  {/* Ship to different address checkbox */}
                  <div className="relative w-full">
                    <div className="woocommerce-shipping-fields">
                      <h3 className="leading-full relative mb-[3rem] flex w-full items-start justify-start text-[1.25rem] font-medium text-[#1d1d1d]">
                        <CheckboxInput
                          name="ship_to_different_address"
                          register={register}
                          validation={{}}
                          errors={errors}
                          isChecked={isShipDifferent}
                          setIsChecked={setIsShipDifferent}
                          label="Ship to a different address?"
                        />
                      </h3>

                      {isShipDifferent && (
                        <ShippingForm
                          register={register}
                          errors={errors}
                          handleFieldChange={handleFieldChange}
                        />
                      )}
                    </div>

                    <div className="woocommerce-additional-fields">
                      <div className="woocommerce-additional-fields__field-wrapper">
                        <div
                          className="form-item relative flex h-auto w-full flex-col"
                          id="order_comments_field"
                        >
                          <textarea
                            id="order_comments"
                            placeholder="Order notes"
                            className="leading-full relative box-border h-[120px] w-full resize-none rounded-[14px] border-none bg-white p-4 text-base text-[#1d1d1d] outline-none md:h-[15rem] md:rounded-[25px] md:px-[3rem] md:py-[2rem] md:text-[1.25rem]"
                            {...register('order_comments')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="checkout-column relative box-border h-auto w-full self-start overflow-hidden">
                <OrderSummary
                  cartItems={cartItems.map((item) => ({
                    ...item,
                    image: item.image === null ? undefined : item.image,
                  }))}
                  cartTotal={
                    cartTotal === null || cartTotal === undefined
                      ? 0
                      : cartTotal
                  }
                  removeFromCart={removeFromCart}
                />
              </div>

              {/* Payment Methods Column */}
              <div className="checkout-column relative box-border h-auto w-full self-start overflow-hidden">
                <h3 className="font-humane leading-full mb-[3rem] text-[6rem] text-[#FD7453] md:text-[6vw]">
                  Payment
                </h3>
                <div className="wrapper relative box-border h-auto w-full">
                  <div
                    id="payment"
                    className="woocommerce-checkout-payment relative rounded-[5px] bg-transparent"
                  >
                    {/* Payment Methods List */}
                    <PaymentMethods
                      selectedPayment={selectedPayment}
                      setSelectedPayment={setSelectedPayment}
                      cardError={cardError}
                      handleCardChange={handleCardChange}
                      paymentError={paymentError}
                    />

                    <div className="form-row place-order mt-8 mb-[6px] flex flex-col items-start justify-start gap-8">
                      <div className="woocommerce-terms-and-conditions-wrapper relative">
                        <div className="woocommerce-privacy-policy-text">
                          <p className="leading-full text-[14px] text-[#1d1d1d] md:text-base">
                            Your personal data will be used to process your
                            order, support your experience on this website and
                            for other purposes described in our{' '}
                            <Link
                              to="/privacy-policy"
                              className="woocommerce-privacy-policy-link font-bold text-[#1d1d1d]"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              privacy policy
                            </Link>
                            .
                          </p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="custom-button relative box-border flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#1d1d1d] px-4 transition-colors duration-350 ease-in-out hover:bg-[#616161] md:h-[6rem] md:rounded-[25px] md:px-8"
                        disabled={
                          isProcessing ||
                          (selectedPayment === 'stripe_cc' &&
                            (!stripe || !elements))
                        }
                      >
                        <span className="leading-full text-base font-bold text-white md:text-[1.25rem]">
                          {isProcessing ? 'Processing...' : 'Place order'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
