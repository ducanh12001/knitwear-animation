import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler, FieldErrors } from 'react-hook-form';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import useCart from '@/hooks/others/useCart';
import type { PaymentForm, PaymentMethod } from '@/types';
import { DEFAULT_FORM_VALUES } from '@/constant/mock-datas/payment';

export const usePayment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const [isShipDifferent, setIsShipDifferent] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>('stripe_cc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

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

  const allErrors = {
    ...errors,
    ...(selectedPayment === 'stripe_cc' &&
      !cardComplete &&
      cardError && {
        card_error: {
          type: 'manual',
          message: cardError,
        },
      }),
  } as FieldErrors<PaymentForm> & {
    card_error?: { type: string; message: string };
  };

  const canSubmit =
    selectedPayment === 'stripe_cc'
      ? stripe && elements && cardComplete && !cardError
      : true;

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    setCardError(event.error?.message ?? null);
  };

  const handleFieldChange = async (
    fieldName: keyof PaymentForm,
    value: string,
  ) => {
    setValue(fieldName, value);
    await trigger(fieldName);
  };

  const handlePaymentMethodChange = (method: PaymentMethod): void => {
    setSelectedPayment(method);
    setPaymentError(null);
    setCardError(null);
  };

  const processStripePayment = async (data: PaymentForm): Promise<boolean> => {
    if (!stripe || !elements) {
      setPaymentError('Stripe is not loaded yet');
      return false;
    }

    if (!cardComplete) {
      setCardError('Please enter valid card details.');
      scrollToField('wc-stripe-card-element');
      return false;
    }

    try {
      const cardElement = elements.getElement('card');
      if (!cardElement) {
        setCardError('Card element not found.');
        return false;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${data.billing_first_name} ${data.billing_last_name}`,
          email: data.billing_email,
          phone: data.billing_phone,
          address: {
            line1: data.billing_address_1,
            city: data.billing_city,
            state: data.billing_state,
            postal_code: data.billing_postcode,
            country: data.billing_country,
          },
        },
      });

      if (error) {
        console.error('[payment error]', error);
        setPaymentError(error.message ?? 'Payment failed');
        return false;
      }

      console.log('[PaymentMethod]', paymentMethod);

      // TODO: Send paymentMethod.id to server
      // const response = await processPaymentOnServer(paymentMethod.id, data);

      return true;
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const processBankTransfer = async (data: PaymentForm): Promise<boolean> => {
    try {
      // TODO: Process bank transfer order
      console.log('Processing bank transfer order:', data);
      return true;
    } catch (err) {
      console.error('Bank transfer error:', err);
      setPaymentError('Failed to process bank transfer order');
      return false;
    }
  };

  const onSubmit: SubmitHandler<PaymentForm> = async (data) => {
    console.log('Order data:', data);
    if (!canSubmit || isProcessing) return;

    setIsProcessing(true);
    setPaymentError(null);

    let success = false;

    try {
      switch (selectedPayment) {
        case 'stripe_cc':
          success = await processStripePayment(data);
          break;
        case 'bacs':
          success = await processBankTransfer(data);
          break;
        default:
          setPaymentError('Invalid payment method selected');
          break;
      }

      if (success) {
        // TODO: Clear cart and redirect
        // clearCart();
        // navigate('/order-confirmation');
        console.log('Order processed successfully');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setPaymentError('Order submission failed');
    } finally {
      setIsProcessing(false);
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

  useEffect(() => {
    setPaymentError(null);
    setCardError(null);
  }, [selectedPayment]);

  return {
    register,
    handleSubmit,
    formState: { errors },
    allErrors,
    onSubmit,
    handleFieldChange,

    // Shipping
    isShipDifferent,
    setIsShipDifferent,

    // Payment
    selectedPayment,
    setSelectedPayment: handlePaymentMethodChange,
    isProcessing,

    // Stripe
    handleCardChange,
    cardComplete,
    cardError,
    stripe,
    elements,

    // Errors
    paymentError,

    // Cart
    cartItems,
    cartTotal,
    removeFromCart,

    // Utilities
    scrollToField,
  };
};
