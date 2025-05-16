import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import useCart from "@/hooks/useCart";
import { FormInput } from "@/components/atoms/inputs/FormInput";
import { CheckboxInput } from "@/components/atoms/inputs/CheckboxInput";
import { RadioInput } from "@/components/atoms/inputs/RadioInput";
import { CountrySelect } from "@/components/atoms/inputs/CountrySelect";
import { StripeCardElement } from "@/components/atoms/inputs/StripeCardElement";
import { CheckoutErrorNotice } from "./CheckoutErrorNotice";

const COUNTRIES_WITH_STATES = ["US", "CA", "AU", "MX", "BR", "IN"];

function Payment() {
  const navigate = useNavigate();
  const [isShipDifferent, setIsShipDifferent] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("stripe_cc");
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      billing_first_name: "",
      billing_last_name: "",
      billing_country: "",
      billing_state: "",
      billing_address_1: "",
      billing_postcode: "",
      billing_city: "",
      billing_phone: "",
      billing_email: "",
      ship_to_different_address: false,
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_country: "",
      shipping_state: "",
      shipping_address_1: "",
      shipping_postcode: "",
      shipping_city: "",
      order_comments: "",
      payment_method: "stripe_cc",
    },
    mode: "onBlur",
  });

  const scrollToField = (fieldId) => {
    const element =
      document.getElementById(fieldId) ||
      document.querySelector(`[name="${fieldId}"]`) ||
      document.querySelector(`[data-id="${fieldId}"]`);

    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth",
      });

      setTimeout(() => {
        element.focus();
      }, 500);
    }
  };

  const allErrors = { ...errors };
  if (selectedPayment === "stripe_cc" && !cardComplete && cardError) {
    allErrors.card_error = {
      type: "manual",
      message: cardError,
    };
  }

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const onSubmit = async (data) => {
    console.log("Order data:", data);

    if (selectedPayment === "stripe_cc") {
      if (!stripe || !elements) {
        // Stripe chưa được tải xong
        return;
      }
      if (!cardComplete) {
        setCardError("Please enter valid card details.");
        scrollToField("wc-stripe-card-element");
        return;
      }

      setIsProcessing(true);
      setPaymentError(null);

      try {
        // Tạo payment method với CardElement
        const cardElement = elements.getElement("card");
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          console.error("[payment error]", error);
          setPaymentError(error.message);
          setIsProcessing(false);
          return;
        }

        // Nếu thành công, bạn sẽ có paymentMethod.id
        console.log("[PaymentMethod]", paymentMethod);

        // Trong ứng dụng thực tế, bạn sẽ gửi paymentMethod.id đến server
        // để tạo payment intent và xác nhận thanh toán

        // Reset giỏ hàng và chuyển hướng đến trang xác nhận thanh toán
        // clearCart();
        // navigate('/order-confirmation');
      } catch (err) {
        console.error("Payment error:", err);
        setPaymentError("An unexpected error occurred. Please try again.");
      }

      setIsProcessing(false);
    } else if (selectedPayment === "bacs") {
      // Xử lý thanh toán chuyển khoản ngân hàng
      // Thường thì sẽ chỉ gửi đơn hàng đến server và đợi xác nhận sau
      // clearCart();
      // navigate('/order-confirmation');
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      const redirectTimer = setTimeout(() => {
        navigate("/cart");
      }, 100);

      return () => clearTimeout(redirectTimer);
    }
  }, [cartItems, navigate]);

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
                    <div className="woocommerce-billing-fields relative h-auto w-full">
                      <h3 className="font-humane leading-full mb-[3rem] text-[6rem] text-[#FD7453] md:text-[6vw]">
                        Billing details
                      </h3>

                      <div className="woocommerce-billing-fields__field-wrapper relative flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
                        <FormInput
                          name="billing_first_name"
                          placeholder="First name"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_last_name"
                          placeholder="Last name"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <div
                          className="form-item z-20"
                          id="billing_country_field"
                        >
                          <CountrySelect
                            name="billing_country"
                            id="billing_country"
                            register={register}
                            validation={{ required: "Please select a country" }}
                            errors={errors}
                            onChange={(val) => {
                              setValue("billing_country", val);
                            }}
                          />
                        </div>

                        <FormInput
                          name="billing_state"
                          placeholder="Province/Region*"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_address_1"
                          placeholder="Street address"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_postcode"
                          placeholder="Postcode / ZIP"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_city"
                          placeholder="Town / City"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_phone"
                          placeholder="Phone"
                          register={register}
                          validation={{ required: "The field cannot be empty" }}
                          errors={errors}
                          showErrors={false}
                        />

                        <FormInput
                          name="billing_email"
                          type="email"
                          placeholder="Email address"
                          register={register}
                          validation={{
                            required: "The field cannot be empty",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          }}
                          errors={errors}
                          showErrors={false}
                        />
                      </div>
                    </div>
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
                        <div className="shipping_address">
                          <div className="woocommerce-billing-fields__field-wrapper relative mb-[3rem] flex h-auto w-full flex-col gap-x-[2rem] gap-y-[1.5rem] md:grid md:grid-cols-2">
                            <FormInput
                              name="shipping_first_name"
                              placeholder="First name"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />

                            <FormInput
                              name="shipping_last_name"
                              placeholder="Last name"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />

                            <div
                              className="form-item z-20"
                              id="shipping_country_field"
                            >
                              <CountrySelect
                                name="shipping_country"
                                id="shipping_country"
                                register={register}
                                validation={{
                                  required: "Please select a country",
                                }}
                                errors={errors}
                                onChange={(val) => {
                                  setValue("shipping_country", val);
                                }}
                              />
                            </div>

                            <FormInput
                              name="shipping_state"
                              placeholder="Province/Region*"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />

                            <FormInput
                              name="shipping_address_1"
                              placeholder="Street address"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />

                            <FormInput
                              name="shipping_postcode"
                              placeholder="Postcode / ZIP"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />

                            <FormInput
                              name="shipping_city"
                              placeholder="Town / City"
                              register={register}
                              validation={{
                                required: "The field cannot be empty",
                              }}
                              errors={errors}
                              showErrors={false}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="woocommerce-additional-fields">
                      <div className="woocommerce-additional-fields__field-wrapper">
                        <div
                          className="form-item relative flex h-auto w-full flex-col"
                          id="order_comments_field"
                        >
                          <textarea
                            name="order_comments"
                            id="order_comments"
                            placeholder="Order notes"
                            className="leading-full relative box-border h-[120px] w-full resize-none rounded-[14px] border-none bg-white p-4 text-base text-[#1d1d1d] outline-none md:h-[15rem] md:rounded-[25px] md:px-[3rem] md:py-[2rem] md:text-[1.25rem]"
                            {...register("order_comments")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="checkout-column relative box-border h-auto w-full self-start overflow-hidden">
                <div className="wrapper">
                  <h3 className="font-humane leading-full mb-[3rem] text-[6rem] text-[#FD7453] md:text-[6vw]">
                    Order Summary
                  </h3>

                  <div
                    id="order_review"
                    className="woocommerce-checkout-review-order relative h-auto w-full"
                  >
                    <div className="shop_table woocommerce-checkout-review-order-table relative flex h-auto w-full flex-col items-start justify-start">
                      <div className="order-products relative flex h-auto w-full flex-col items-start justify-start">
                        {cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="cart_item relative box-border grid h-auto w-full grid-cols-[30%_calc(70%-2rem)] gap-8 border-b border-[#1d1d1d]/50 py-[2.5rem] md:py-[1.5rem]"
                          >
                            <div className="item-image hide-image-on-email relative flex h-auto w-full items-center justify-center">
                              <div className="image relative h-auto w-full">
                                <img
                                  src={item.image || null}
                                  alt={item.title}
                                  className="block h-auto w-full"
                                />
                              </div>
                            </div>

                            <div className="item-info hide-info-on-email relative flex w-full flex-col items-start justify-between gap-8">
                              <div className="top relative flex h-auto w-full flex-col items-start justify-start gap-2">
                                <h3 className="leading-full mb-8 text-[1.5rem] text-[#FD7453]">
                                  {item.title}
                                </h3>
                                <div className="row relative flex h-auto w-full items-center justify-between">
                                  <span className="label leading-full relative flex w-full items-center justify-between text-[#1d1d1d]">
                                    Amount
                                  </span>
                                  <span className="value leading-full relative flex w-full flex-col items-end justify-start text-[#1d1d1d]">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div className="row relative flex h-auto w-full items-center justify-between">
                                  <span className="label leading-full relative flex w-full items-center justify-between text-[#1d1d1d]">
                                    Size
                                  </span>
                                  <span className="value leading-full relative flex w-full flex-col items-end justify-start text-[#1d1d1d]">
                                    {item.size}
                                  </span>
                                </div>
                                <div className="row relative flex h-auto w-full items-center justify-between">
                                  <span className="label leading-full relative flex w-full items-center justify-between text-[#1d1d1d]">
                                    Price
                                  </span>
                                  <span className="value leading-full relative flex w-full flex-col items-end justify-start text-[#1d1d1d]">
                                    € {item.price}
                                  </span>
                                </div>
                                <div className="row sub relative mt-4 flex h-auto w-full items-center justify-between">
                                  <span className="label leading-full relative flex w-full items-center justify-between text-[#1d1d1d]">
                                    Subtotal
                                  </span>
                                  <span className="value leading-full relative flex w-full flex-col items-end justify-start text-[#1d1d1d]">
                                    €{" "}
                                    {(
                                      parseFloat(item.price) * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <div className="bottom">
                                <div
                                  className="remove-product leading-full relative flex cursor-pointer items-center justify-start gap-1 text-[#1d1d1d] md:justify-start md:gap-2"
                                  onClick={() => removeFromCart(index)}
                                >
                                  <div className="relative h-[14px] w-[14px] cursor-pointer md:h-4 md:w-4">
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

                      {/* Order Totals */}
                      <div className="order-recap relative flex h-auto w-full flex-col items-start justify-start">
                        <div className="row cart-subtotal relative flex w-full items-center justify-between border-b border-[#1d1d1d]/50 py-4 md:py-[1.5rem]">
                          <span className="value text-base leading-[120%] text-[#1d1d1d] md:text-[1.25rem]">
                            Subtotal
                          </span>
                          <span className="value text-base leading-[120%] text-[#1d1d1d] md:text-[1.25rem]">
                            € {cartTotal}
                          </span>
                        </div>

                        <div className="row order-total relative flex w-full items-center justify-between border-b border-[#1d1d1d]/50 py-4 md:py-[1.5rem]">
                          <span className="value text-base leading-[120%] text-[#1d1d1d] md:text-[1.25rem]">
                            Total
                          </span>
                          <span className="value text-base leading-[120%] text-[#1d1d1d] md:text-[1.25rem]">
                            € {cartTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <ul className="wc_payment_methods payment_methods methods relative m-0 flex flex-col items-start justify-start gap-2 text-left md:gap-4">
                      {/* Credit Card Payment Method */}
                      <RadioInput
                        id="payment_method_stripe_cc"
                        name="payment_method"
                        value="stripe_cc"
                        checked={selectedPayment === "stripe_cc"}
                        onChange={() => setSelectedPayment("stripe_cc")}
                        label="Credit card"
                      >
                        <span className="wc-stripe-card-icons-container float-right inline-block">
                          {[
                            {
                              image:
                                "https://akkeknitwear.com/website/wp-content/plugins/woo-stripe-payment/assets/img/cards/amex.svg",
                              alt: "Amex",
                            },
                            {
                              image:
                                "https://akkeknitwear.com/website/wp-content/plugins/woo-stripe-payment/assets/img/cards/discover.svg",
                              alt: "Discover",
                            },
                            {
                              image:
                                "https://akkeknitwear.com/website/wp-content/plugins/woo-stripe-payment/assets/img/cards/visa.svg",
                              alt: "Visa",
                            },
                            {
                              image:
                                "https://akkeknitwear.com/website/wp-content/plugins/woo-stripe-payment/assets/img/cards/mastercard.svg",
                              alt: "Mastercard",
                            },
                          ].map((item, index) => (
                            <img
                              key={index}
                              className="wc-stripe-card-icon amex relative -mt-[2px] ml-[2px] inline h-[26px] max-h-[26px] w-[43px] max-w-[43px] align-middle"
                              alt={item.alt}
                              src={item.image}
                            />
                          ))}
                        </span>
                      </RadioInput>

                      {selectedPayment === "stripe_cc" && (
                        <div
                          className="payment_box payment_method_stripe_cc wc-stripe-no-methods relative box-border w-full bg-white p-0 text-[0.92em] leading-[1.5] text-[#515151]"
                          style={{ gridArea: "box" }}
                        >
                          <div className="wc-stripe_cc-container wc-stripe-gateway-container">
                            <div className="wc-stripe_cc-new-method-container">
                              <div
                                id="wc-stripe-card-element"
                                className="inline-type StripeElement StripeElement--empty"
                              >
                                {/* Stripe Card Element will be inserted here by Stripe JS */}
                                <StripeCardElement
                                  onCardChange={handleCardChange}
                                  error={cardError}
                                />

                                {paymentError && (
                                  <div className="mt-2 text-sm text-[#FD7453]">
                                    {paymentError}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer Payment Method */}
                      <RadioInput
                        id="payment_method_bacs"
                        name="payment_method"
                        value="bacs"
                        checked={selectedPayment === "bacs"}
                        onChange={() => setSelectedPayment("bacs")}
                        label="Bank transfer"
                      />

                      {selectedPayment === "bacs" && (
                        <div className="payment_box payment_method_bacs relative box-border w-full rounded-[2px] bg-[#dcd7e3] p-[1em] leading-[1.5] text-[#515151] before:absolute before:top-[-0.75em] before:left-0 before:mt-[-1em] before:ml-[2em] before:block before:border-[1em] before:border-[transparent_transparent_#dcd7e3_transparent] before:content-['']">
                          <p className="text-sm">
                            Make your payment via bank transfer. Use your order
                            ID as the reason for payment. Your order will not be
                            shipped until the funds have cleared in our bank
                            account.
                          </p>
                        </div>
                      )}
                    </ul>

                    <div className="form-row place-order mt-8 mb-[6px] flex flex-col items-start justify-start gap-8">
                      <div className="woocommerce-terms-and-conditions-wrapper relative">
                        <div className="woocommerce-privacy-policy-text">
                          <p className="leading-full text-[14px] text-[#1d1d1d] md:text-base">
                            Your personal data will be used to process your
                            order, support your experience on this website and
                            for other purposes described in our{" "}
                            <Link
                              to="https://akkeknitwear.com/en/privacy-policy/"
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
                          (selectedPayment === "stripe_cc" &&
                            (!stripe || !elements))
                        }
                      >
                        <span className="leading-full text-base font-bold text-white md:text-[1.25rem]">
                          {isProcessing ? "Processing..." : "Place order"}
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
}

export default Payment;
