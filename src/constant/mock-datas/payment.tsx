import type { PaymentForm } from '@/types';

export const PAYMENT_CARDS = [
  {
    image: '/images/payment/amex.svg',
    alt: 'Amex',
  },
  {
    image: '/images/payment/discover.svg',
    alt: 'Discover',
  },
  {
    image: '/images/payment/visa.svg',
    alt: 'Visa',
  },
  {
    image: '/images/payment/mastercard.svg',
    alt: 'Mastercard',
  },
];

export const DEFAULT_FORM_VALUES: PaymentForm = {
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
