import { CloseButton } from '@/components/atoms/buttons/CloseButton';
import type { CartItem } from '@/types';

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: string | number;
  removeFromCart: (index: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  cartTotal,
  removeFromCart,
}) => {
  return (
    <div className="relative">
      <h3 className="font-humane leading-full text-secondary mb-[3rem] text-[6rem] md:text-[6vw]">
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
                className="cart_item border-primary/50 relative box-border grid h-auto w-full grid-cols-[30%_calc(70%-2rem)] gap-8 border-b py-[2.5rem] md:py-[1.5rem]"
              >
                <div className="item-image hide-image-on-email relative flex h-auto w-full items-center justify-center">
                  <div className="image relative h-auto w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
                <div className="top relative flex h-auto w-full flex-col items-start justify-start gap-2">
                  <h3 className="leading-full text-secondary mb-8 text-[1.5rem]">
                    {item.title}
                  </h3>
                  <div className="row relative flex h-auto w-full items-center justify-between">
                    <span className="label leading-full text-primary relative flex w-full items-center justify-between">
                      Amount
                    </span>
                    <span className="value leading-full text-primary relative flex w-full flex-col items-end justify-start">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="row relative flex h-auto w-full items-center justify-between">
                    <span className="label leading-full text-primary relative flex w-full items-center justify-between">
                      Size
                    </span>
                    <span className="value leading-full text-primary relative flex w-full flex-col items-end justify-start">
                      {item.size}
                    </span>
                  </div>
                  <div className="row relative flex h-auto w-full items-center justify-between">
                    <span className="label leading-full text-primary relative flex w-full items-center justify-between">
                      Price
                    </span>
                    <span className="value leading-full text-primary relative flex w-full flex-col items-end justify-start">
                      € {item.price}
                    </span>
                  </div>
                  <span className="label leading-full text-primary relative flex w-full items-center justify-between">
                    Subtotal
                  </span>
                  <span className="value leading-full text-primary relative flex w-full flex-col items-end justify-start">
                    € {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="bottom">
                  <div
                    className="remove-product leading-full text-primary relative flex cursor-pointer items-center justify-start gap-1 md:justify-start md:gap-2"
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
            ))}
          </div>
          {/* Order Totals */}
          <div className="row cart-subtotal border-primary/50 relative flex w-full items-center justify-between border-b py-4 md:py-[1.5rem]">
            <span className="value text-primary text-base leading-[120%] md:text-[1.25rem]">
              Subtotal
            </span>
            <span className="value text-primary text-base leading-[120%] md:text-[1.25rem]">
              € {cartTotal}
            </span>
          </div>
          <div className="row order-total border-primary/50 relative flex w-full items-center justify-between border-b py-4 md:py-[1.5rem]">
            <span className="value text-primary text-base leading-[120%] md:text-[1.25rem]">
              Total
            </span>
            <span className="value text-primary text-base leading-[120%] md:text-[1.25rem]">
              € {cartTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
