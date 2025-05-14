import { Link } from "react-router";

function Cart() {
  return (
    <section className="cart--section-table relative box-border h-auto min-h-[calc(90vh-10rem)] w-full px-[12px] pb-[5rem] md:px-[5vw] md:pb-[10vh]">
      <div className="wrapper relative flex w-full flex-col gap-[5rem] md:grid md:grid-cols-[66%_auto] md:gap-[2rem]">
        <div className="relative flex w-full flex-col gap-[4rem]">
          <div className="block-title relative">
            <div className="section-title relative h-auto w-full">
              <h1 className="font-humane text-[6rem] leading-[75%] text-[#FD7453] md:text-[6vw]">
                Shopping list
              </h1>
            </div>
          </div>
          <div className="product-list relative flex h-auto w-full flex-col items-start justify-start md:w-[80%]">
            {}
            <div className="product-item"></div>
          </div>
        </div>
        <div className="cart-total relative flex h-auto w-full flex-col items-start justify-start gap-[4rem] overflow-hidden">
          <div className="cart-loader dark">
            <div className="svg-center"></div>
            <div className="text-center"></div>
          </div>
          <div className="cont">
            <div className="cart--coupon">
              <div className="form-item dark-gray text-dark back-white full-w text-small no-border h-5">
                <input
                  type="text"
                  name="coupon-code"
                  id="coupon-code"
                  placeholder="Code"
                />
                <div className="errors">
                  <span className="error empty">The field cannot be empty</span>
                  <span className="error wrong-code">
                    Code non-existent or incorrect
                  </span>
                  <span className="error inserted-code">
                    The code has already been entered
                  </span>
                </div>
              </div>
              <div
                className="custom-button bg-orange text-mid h-5 w-full rounded"
                cursor-className="hover"
              >
                <span>Apply coupon</span>
              </div>
            </div>
            <div className="cart--totals">
              <div className="table">
                <div className="sub-total item">
                  <span className="title">Subtotal</span>
                  <span className="value">€ 276.00</span>
                </div>
                <div className="last-total item">
                  <span className="title">Total</span>
                  <span className="value">€ 276.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="link">
            <Link
              data-no-swup=""
              to="https://akkeknitwear.com/en/checkout/"
              className="custom-button bg-dark text-big h-6 w-full rounded"
            >
              <span>Proceed to payment</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
