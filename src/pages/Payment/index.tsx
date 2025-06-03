import { Link } from 'react-router';

import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import BillingForm from '@/components/pages/checkout/BillingForm';
import ShippingForm from '@/components/pages/checkout/ShippingForm';
import OrderSummary from '@/components/pages/checkout/OrderSummary';
import PaymentMethods from '@/components/pages/checkout/PaymentMethods';
import CheckoutErrorNotice from '@/pages/Payment/CheckoutErrorNotice';
import { Button } from '@/components/atoms/buttons/Button';
import { usePayment } from '@/hooks/pages/usePayment';

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    allErrors,
    scrollToField,
    handleFieldChange,
    isShipDifferent,
    setIsShipDifferent,
    selectedPayment,
    setSelectedPayment,
    cartItems,
    cartTotal,
    removeFromCart,
    handleCardChange,
    isProcessing,
    paymentError,
    cardError,
    stripe,
    elements,
  } = usePayment();

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
                      <h3 className="leading-full text-primary relative mb-[3rem] flex w-full items-start justify-start text-xl font-medium">
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
                            className="leading-full text-primary relative box-border h-[120px] w-full resize-none rounded-[14px] border-none bg-white p-4 text-base outline-none md:h-[15rem] md:rounded-[25px] md:px-[3rem] md:py-[2rem] md:text-xl"
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
                <h3 className="font-humane leading-full text-secondary mb-[3rem] text-[6rem] md:text-[6vw]">
                  Payment
                </h3>
                <div className="relative box-border h-auto w-full">
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
                          <p className="leading-full text-primary text-[14px] md:text-base">
                            Your personal data will be used to process your
                            order, support your experience on this website and
                            for other purposes described in our{' '}
                            <Link
                              to="/privacy-policy"
                              className="woocommerce-privacy-policy-link text-primary font-bold"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              privacy policy
                            </Link>
                            .
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          isProcessing ||
                          (selectedPayment === 'stripe_cc' &&
                            (!stripe || !elements))
                        }
                        className="font-bold"
                      >
                        {isProcessing ? 'Processing...' : 'Place order'}
                      </Button>
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
