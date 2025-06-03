import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { Button } from '@/components/atoms/buttons/Button';
import { CloseButton } from '@/components/atoms/buttons/CloseButton';
import { useCartPage } from '@/hooks/pages/useCart';
import type { CouponFormData } from '@/types';
import { VALIDATION } from '@/constant/validation';
import { DESKTOP_BREAKPOINT } from '@/constant/breakpoint';

const Cart: FC = () => {
  const isSP = useMediaQuery({
    query: `(width < ${DESKTOP_BREAKPOINT}px)`,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    cartItems,
    cartTotal,
    removeFromCart,
    onApplyCoupon,
  } = useCartPage();

  return (
    <>
      <section className="cart--section-intro relative box-border h-auto w-full px-[5vw] pt-[8rem] xl:pt-[calc(10vh+10rem)]">
        <div className="relative">
          <div
            className={`section-empty absolute top-0 z-11 flex h-auto w-full flex-col items-start justify-start ${cartItems.length > 0 ? 'invisible opacity-0' : 'visible opacity-100'}`}
          >
            <h2 className="font-humane text-secondary text-[6vw] leading-[75%]">
              Empty cart
            </h2>
          </div>
        </div>
      </section>
      <section
        className={`cart--section-table relative box-border h-auto min-h-[calc(90vh-10rem)] w-full px-[12px] pb-[5rem] md:px-[5vw] md:pb-[10vh] ${cartItems.length > 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="relative flex w-full flex-col gap-[5rem] xl:grid xl:grid-cols-[66%_auto] xl:gap-[2rem]">
          <div className="relative flex w-full flex-col gap-[4rem]">
            <div className="block-title relative">
              <div className="section-title relative h-auto w-full">
                <h1 className="font-humane text-secondary text-[6rem] leading-[75%] xl:text-[6vw]">
                  Shopping list
                </h1>
              </div>
            </div>
            <div className="product-list relative flex h-auto w-full flex-col items-start justify-start xl:w-[80%]">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="product-item border-primary/50 relative box-border h-auto w-full border-b py-[1.5rem]"
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
                      <h3 className="text-secondary text-2xl leading-[75%]">
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className="product-image relative h-auto w-full"
                      style={{ gridArea: isSP ? 'image' : 'initial' }}
                    >
                      <div className="relative h-auto w-full">
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
                      <div className="relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="leading-full text-primary">
                          Amount
                        </span>
                        <span className="leading-full text-primary">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="leading-full text-primary">Size</span>
                        <span className="leading-full text-primary">
                          {item.size}
                        </span>
                      </div>
                      <div className="relative flex w-full items-center justify-between md:w-[20rem]">
                        <span className="leading-full text-primary">Price</span>
                        <span className="leading-full text-primary">
                          € {item.price}
                        </span>
                      </div>
                      <div className="relative mt-[1.5rem] flex w-full items-center justify-between md:w-[20rem]">
                        <span className="leading-full text-primary">
                          Subtotal
                        </span>
                        <span className="leading-full text-primary flex flex-col items-end justify-start">
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
                        className="remove-product leading-full text-primary relative flex cursor-pointer items-center justify-end gap-2 md:justify-start"
                        onClick={() => removeFromCart(index)}
                      >
                        <CloseButton
                          sizeClassName="h-[14px] w-[14px] md:h-4 md:w-4"
                          lineHeight="h-[1px]"
                        />
                        <span className="leading-full text-primary relative cursor-pointer underline">
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
            <div className="relative flex h-auto w-full flex-col items-start justify-start gap-[4rem]">
              <form
                onSubmit={handleSubmit(onApplyCoupon)}
                className="cart--coupon relative flex w-full flex-col items-start justify-start gap-4"
              >
                <FormInput<CouponFormData>
                  name="coupon-code"
                  placeholder="Code"
                  register={register}
                  validation={VALIDATION.REQUIRED}
                  errors={errors}
                />
                <Button type="submit">Apply coupon</Button>
              </form>
              <div className="cart--totals relative flex w-full flex-col items-start justify-start gap-8">
                <div className="relative flex h-auto w-full flex-col items-start justify-start">
                  <div className="sub-total border-primary/50 relative flex w-full items-center justify-between border-b py-[1.25rem]">
                    <span className="leading-full text-primary text-base md:text-xl">
                      Subtotal
                    </span>
                    <span className="leading-full text-primary text-base md:text-xl">
                      € {cartTotal}
                    </span>
                  </div>
                  <div className="last-total relative flex w-full items-center justify-between py-[1.25rem]">
                    <span className="leading-full text-primary text-base md:text-xl">
                      Total
                    </span>
                    <span className="leading-full text-primary text-base md:text-xl">
                      € {cartTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-auto w-full">
              <Button
                as="link"
                to="/checkout"
                disabled={cartItems.length === 0}
                className="font-bold uppercase"
              >
                Proceed to payment
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
