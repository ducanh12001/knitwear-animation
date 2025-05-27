import { useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';

interface CheckoutErrorNoticeProps {
  errors: Record<string, { message?: string }> | null;
  scrollToField: (fieldId: string) => void;
}

const CheckoutErrorNotice: FC<CheckoutErrorNoticeProps> = ({
  errors,
  scrollToField,
}) => {
  const noticeRef = useRef(null);

  useEffect(() => {
    if (!noticeRef.current || !errors || Object.keys(errors).length === 0)
      return;

    const tl = gsap.timeline();

    tl.to(noticeRef.current, {
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    tl.to(noticeRef.current, {
      x: '100%',
      duration: 0.6,
      ease: 'power3.in',
      delay: 2.5,
    });

    return () => {
      tl.kill();
    };
  }, [errors]);

  if (!errors || Object.keys(errors).length === 0) return null;

  const { card_error, ...otherErrors } = errors;
  const hasCardError = !!card_error;

  const errorFields = Object.keys(otherErrors).map((fieldName) => {
    const fieldLabel = fieldName
      .replace('_', ' ')
      .replace('billing', 'Billing')
      .replace('shipping', 'Shipping')
      .replace('first name', 'First name')
      .replace('last name', 'Last name')
      .replace('address 1', 'Street address')
      .replace('postcode', 'Postcode / ZIP')
      .replace('city', 'Town / City')
      .replace('phone', 'Phone')
      .replace('email', 'Email address')
      .replace('state', 'Province/Region')
      .replace('country', 'Country / Region');

    return {
      id: fieldName,
      label: fieldLabel,
      message:
        otherErrors[fieldName].message || `${fieldLabel} is a required field.`,
    };
  });

  return (
    <div
      ref={noticeRef}
      className="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout fixed top-[20rem] right-0 z-55 translate-x-full"
    >
      <div role="alert">
        <ul
          className="woocommerce-error bg-primary relative box-border flex w-auto flex-col items-start justify-start gap-[0.25rem] !px-8 !py-4"
          style={{ wordWrap: 'break-word' }}
        >
          {errorFields.map((error, index) => (
            <li key={index} data-id={error.id} className="text-[#ff0000]">
              <a
                href={`#${error.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToField(error.id);
                }}
              >
                <strong className="text-white">{error.label}</strong>{' '}
                {error.message}
              </a>
            </li>
          ))}

          {hasCardError && (
            <li data-id="stripe_card_element" className="text-[#ff0000]">
              <a
                href="#wc-stripe-card-element"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToField('wc-stripe-card-element');
                }}
              >
                <strong className="text-white">Card details</strong>{' '}
                {card_error.message || 'Please enter valid card details.'}
              </a>
            </li>
          )}

          {errorFields.length > 0 && (
            <li className="mt-3 font-medium text-white">
              Please complete all required fields to continue.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutErrorNotice;
