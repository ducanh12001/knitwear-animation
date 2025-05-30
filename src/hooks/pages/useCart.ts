import { useForm } from 'react-hook-form';
import useCart from '@/hooks/others/useCart';

export const useCart = () => {
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

  const onApplyCoupon = (data: CouponFormData) => {
    console.log('Applying coupon:', data);
    // Logic xử lý coupon code ở đây
  };

  return {};
};
