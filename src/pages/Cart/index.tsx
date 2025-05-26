import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useCart from '@/hooks/useCart';
import { FormInput } from '@/components/atoms/inputs/FormInput';

interface CouponFormData {
  'coupon-code': string;
}

const Cart: FC = () => {
  const isSP = useMediaQuery({
    query: '(width < 768px)',
  });

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

  return (
    <>
      <section className="cart--section-intro relative box-border h-auto w-full px-[5vw] pt-[8rem] xl:pt-[calc(10vh+10rem)]">
        <div className="wrapper relative">
          <div
            className={`section-empty absolute top-0 z-11 flex h-auto w-full flex-col items-start justify-start ${cartItems.length > 0 ? 'invisible opacity-0' : 'visible opacity-100'}`}
          >
            <h2 className="font-humane text-[6vw] leading-[75%] text-[#FD7453]">
              Empty cart
            </h2>
          </div>
        </div>
      </section>
      <section
        className={`cart--section-table relative box-border h-auto min-h-[calc(90vh-10rem)] w-full px-[12px] pb-[5rem] md:px-[5vw] md:pb-[10vh] ${cartItems.length > 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="wrapper relative flex w-full flex-col gap-[5rem] xl:grid xl:grid-cols-[66%_auto] xl:gap-[2rem]">
          <div className="relative flex w-full flex-col gap-[4rem]">
            <div className="block-title relative">
              <div className="section-title relative h-auto w-full">
                <h1 className="font-humane text-[6rem] leading-[75%] text-[#FD7453] xl:text-[6vw]">
                  Shopping list
                </h1>
              </div>
            </div>
            <div className="product-list relative flex h-auto w-full flex-col items-start justify-start xl:w-[80%]">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="product-item relative box-border h-auto w-full border-b border-[#1d1d1d]/50 py-[1.5rem]"
                >
                  <div
                    className="inner-product relative grid h-auto w-full grid-cols-[35%_65%] gap-y-8 md:grid-cols-[15%_15%_auto_15%] md:gap-y-0"
                    style={{
                      gridTemplateAreas: isSP
                        ? `"title title" "image info" "delete delete"`
                        : 'initial',
                    }}
                  >
                    <div
                      className="product-title relative"
                      style={{ gridArea: isSP ? 'title' : 'initial' }}
                    >
                      <h3 className="text-[1.5rem] leading-[75%] text-[#FD7453]">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className="product-image relative h-auto w-full"
                      style={{ gridArea: isSP ? 'image' : 'initial' }}
                    >
                      <div className="image relative h-auto w-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="block h-auto w-full"
                        />
                      </div>
                    </div>
                    <div
                      className="product-info relative flex h-auto w-full flex-col items-start justify-start gap-[0.75rem] md:gap-[1.25rem]"
                      style={{ gridArea: isSP ? 'info' : 'initial' }}
                    >
                      <div className="row relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="label leading-full text-[#1d1d1d]">
                          Amount
                        </span>
                        <span className="value leading-full text-[#1d1d1d]">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="row relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="label leading-full text-[#1d1d1d]">
                          Size
                        </span>
                        <span className="value leading-full text-[#1d1d1d]">
                          {item.size}
                        </span>
                      </div>
                      <div className="row relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="label leading-full text-[#1d1d1d]">
                          Price
                        </span>
                        <span className="value leading-full text-[#1d1d1d]">
                          € {item.price}
                        </span>
                      </div>
                      <div className="row relative mt-[1.5rem] flex w-full items-center justify-between md:w-[20rem]">
                        <span className="label leading-full text-[#1d1d1d]">
                          Subtotal
                        </span>
                        <span className="value leading-full flex flex-col items-end justify-start text-[#1d1d1d]">
                          €{' '}
                          {(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="product-delete grid-area relative"
                      style={{ gridArea: isSP ? 'delete' : 'initial' }}
                    >
                      <div
                        className="remove-product leading-full relative flex cursor-pointer items-center justify-end gap-2 text-[#1d1d1d] md:justify-start"
                        onClick={() => removeFromCart(index)}
                      >
                        <div className="relative h-4 w-4 cursor-pointer">
                          <div className="icon absolute top-1/2 left-1/2 h-[1px] w-full -translate-1/2 rotate-45 bg-[#1d1d1d]" />
                          <div className="icon absolute top-1/2 left-1/2 h-[1px] w-full -translate-1/2 -rotate-45 bg-[#1d1d1d]" />
                        </div>
                        <span className="leading-full relative cursor-pointer text-[#1d1d1d] underline">
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-total relative flex h-auto w-full flex-col items-start justify-start gap-[4rem] overflow-hidden">
            <div className="cont relative flex h-auto w-full flex-col items-start justify-start gap-[4rem]">
              <form
                onSubmit={handleSubmit(onApplyCoupon)}
                className="cart--coupon relative flex w-full flex-col items-start justify-start gap-4"
              >
                <FormInput<CouponFormData>
                  name="coupon-code"
                  placeholder="Code"
                  register={register}
                  validation={{
                    required: 'The field cannot be empty',
                  }}
                  errors={errors}
                />
                <button
                  type="submit"
                  className="custom-button relative box-border flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#FD7453] px-4 transition-colors duration-350 ease-in-out hover:bg-[#fd5932] md:h-[5rem] md:rounded-[25px] md:px-8"
                >
                  <span className="leading-full relative text-base whitespace-nowrap text-white md:text-[1.25rem]">
                    Apply coupon
                  </span>
                </button>
              </form>
              <div className="cart--totals relative flex w-full flex-col items-start justify-start gap-8">
                <div className="relative flex h-auto w-full flex-col items-start justify-start">
                  <div className="sub-total relative flex w-full items-center justify-between border-b border-[#1d1d1d]/50 py-[1.25rem]">
                    <span className="title leading-full text-base text-[#1d1d1d] md:text-[1.25rem]">
                      Subtotal
                    </span>
                    <span className="value leading-full text-base text-[#1d1d1d] md:text-[1.25rem]">
                      € {cartTotal}
                    </span>
                  </div>
                  <div className="last-total relative flex w-full items-center justify-between py-[1.25rem]">
                    <span className="title leading-full text-base text-[#1d1d1d] md:text-[1.25rem]">
                      Total
                    </span>
                    <span className="value leading-full text-base text-[#1d1d1d] md:text-[1.25rem]">
                      € {cartTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="link relative h-auto w-full">
              <Link
                data-no-swup
                to="/checkout"
                className="custom-button relative box-border flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#1d1d1d] px-4 transition-colors duration-350 ease-in-out hover:bg-[#616161] md:h-[6rem] md:rounded-[25px] md:px-8"
              >
                <span className="leading-full relative text-base font-bold whitespace-nowrap text-white uppercase md:text-[1.25rem]">
                  Proceed to payment
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
