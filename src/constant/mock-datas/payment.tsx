import type { PaymentForm } from '@/types';

import Amex from '@/assets/images/payment/amex.svg';
import Discover from '@/assets/images/payment/discover.svg';
import Visa from '@/assets/images/payment/visa.svg';
import Mastercard from '@/assets/images/payment/mastercard.svg';

export const PAYMENT_CARDS = [
  {
    image: Amex,
    alt: 'Amex',
  },
  {
    image: Discover,
    alt: 'Discover',
  },
  {
    image: Visa,
    alt: 'Visa',
  },
  {
    image: Mastercard,
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
