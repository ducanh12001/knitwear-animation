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

export type PaymentMethod = 'stripe_cc' | 'bacs';
