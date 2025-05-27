import { useRef, type FC } from 'react';
import { useModal } from '@/hooks/useModal';
import useCart from '@/hooks/useCart';
import SideModal from '@/components/organisms/modal/SideModal';
import { Button } from '@/components/atoms/buttons/Button';
import { CloseButton } from '@/components/atoms/buttons/CloseButton';
import { useModalAwareNavigation } from '@/hooks/useModalAwareNavigation';

const CartModal: FC = () => {
  const { navigate } = useModalAwareNavigation();
  const { modalState, toggleCartModal } = useModal();
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const closeRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    toggleCartModal(false);
  };

  return (
    <SideModal
      isOpen={modalState.cartModalOpen}
      onClose={onClose}
      closeRef={closeRef}
    >
      <div className="relative z-20 box-border flex h-full w-full flex-col items-start justify-start gap-0 px-[12px] py-[1rem] md:gap-[2rem] md:p-[1.25rem]">
        <div className="minicart-header relative box-border flex h-auto w-full items-stretch justify-between px-[5vw] pt-[2.5rem] pb-[12px] md:py-[2.5vw]">
          <div className="minicart-title relative flex w-full items-end justify-between">
            <span className="font-humane relative w-auto text-[3em] leading-[75%] text-[#302F35] md:text-[6vw]">
              Items added to cart
            </span>
            <span className="leading-full text-primary relative w-auto text-[20px] md:text-[1.5rem] md:leading-[75%]">
              ({cartItems.length})
            </span>
          </div>
          <div
            ref={closeRef}
            className="minicart-close absolute top-0 right-0 -m-4 p-4"
          >
            <CloseButton onClick={onClose} />
          </div>
        </div>
        <div className="minicart-container relative box-border h-1/10 w-full grow px-[5vw]">
          <div
            className="scrollable-list relative h-full w-full overflow-y-scroll overscroll-contain"
            data-lenis-prevent
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="list relative flex h-auto w-full flex-col items-start justify-start">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="minicart-item border-primary relative box-border flex h-auto w-full items-stretch justify-start overflow-hidden border-t py-[1.25rem]"
                    style={{
                      borderBottom:
                        index === cartItems.length - 1 ? '1px solid' : '0',
                    }}
                  >
                    <div className="contain relative grid h-auto w-full grid-cols-[40%_auto]">
                      <div className="item-image relative h-auto w-full">
                        <img
                          alt={item.title}
                          src={item.image || undefined}
                          className="block h-full w-full object-cover object-[center_bottom]"
                        />
                      </div>
                      <div className="item-info relative flex w-auto flex-col items-start justify-between gap-[1.25rem]">
                        <div className="top relative flex h-auto w-full flex-col gap-[0.75rem]">
                          <h3 className="mb-[1.25rem] text-[1.5rem] leading-[75%] text-[#302F35]">
                            {item.title}
                          </h3>
                          <div className="row relative flex h-auto w-full items-center justify-between">
                            <span className="leading-full text-primary text-base">
                              Amount
                            </span>
                            <span className="leading-full text-primary text-base">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="row relative flex h-auto w-full items-center justify-between">
                            <span className="leading-full text-primary text-base">
                              Size
                            </span>
                            <span className="leading-full text-primary text-base">
                              {item.size}
                            </span>
                          </div>
                          <div className="row relative flex h-auto w-full items-center justify-between">
                            <span className="leading-full text-primary text-base">
                              Price
                            </span>
                            <span className="regular leading-full text-primary text-base">
                              € {item.price}
                            </span>
                          </div>
                          <div className="row last relative mt-4 mb-6 flex h-auto w-full items-center justify-between md:mt-8 md:mb-0">
                            <span className="leading-full text-primary text-base">
                              Subtotal
                            </span>
                            <span className="sub leading-full text-primary text-base">
                              €{' '}
                              {(parseFloat(item.price) * item.quantity).toFixed(
                                2,
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="bottom relative h-auto w-full">
                          <div
                            className="remove leading-full text-primary relative flex cursor-pointer items-center justify-start gap-1 text-base md:gap-[0.5rem]"
                            onClick={() => removeFromCart(index)}
                          >
                            <CloseButton
                              sizeClassName="h-[14px] w-[14px] md:h-4 md:w-4"
                              lineHeight="h-[1px]"
                            />
                            <span className="leading-full text-primary relative cursor-pointer text-[14px] underline md:text-base">
                              Remove
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart w-full py-8 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="minicart-total relative box-border flex h-auto w-full flex-col items-center gap-[0.75rem] px-[5vw] pt-4 md:pt-0">
          <Button
            disabled={cartItems.length === 0}
            className="justify-between"
            onClick={() => {
              navigate('/checkout');
            }}
          >
            <span>Checkout</span>
            <span>€ {cartTotal}</span>
          </Button>
          <Button
            disabled={cartItems.length === 0}
            bgColor="bg-primary"
            hoverColor="hover:bg-primary-hover"
            className="justify-between"
            onClick={() => {
              navigate('/cart');
            }}
          >
            <span>View cart</span>
            <span>({cartItems.length})</span>
          </Button>

          <span
            className="leading-full text-primary relative mt-2 w-auto cursor-pointer text-base underline md:mt-8 md:text-[1.25rem]"
            onClick={onClose}
          >
            Continue shopping
          </span>
        </div>
      </div>
    </SideModal>
  );
};

export default CartModal;
