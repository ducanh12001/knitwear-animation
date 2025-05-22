export default function OrderSummary({ cartItems, cartTotal, removeFromCart }) {
  return (
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
                        € {(parseFloat(item.price) * item.quantity).toFixed(2)}
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
  );
}
