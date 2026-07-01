import { useForm } from 'react-hook-form';
import useCart from '@/hooks/others/useCart';
import type { CouponFormData } from '@/types';

export const useCartPage = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      'coupon-code': '',
    },
  });

  const onApplyCoupon = () => {
    // Coupon code processing logic goes here
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    cartItems,
    cartTotal,
    removeFromCart,
    onApplyCoupon,
  };
};
