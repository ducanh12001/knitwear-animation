import type { FC } from 'react';
import { useState } from 'react';
import { useForm, type Path, type RegisterOptions } from 'react-hook-form';
import { Link } from 'react-router';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { Button } from '@/components/atoms/buttons/Button';
import { MESSAGES } from '@/constant/validation';
import { useGSAPAnimation } from '@/hooks/others/useGSAPAnimation';

interface ContactFormData {
  'contact-firstname': string;
  'contact-lastname': string;
  'contact-mail': string;
  'contact-order': string;
  'contact-message': string;
  'contact-privacy': boolean;
}

const validationRules = {
  'contact-firstname': { required: MESSAGES.REQUIRED },
  'contact-lastname': { required: MESSAGES.REQUIRED },
  'contact-mail': {
    required: MESSAGES.REQUIRED,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: MESSAGES.INVALID_EMAIL,
    },
  },
  'contact-order': {},
} satisfies Record<
  'contact-firstname' | 'contact-lastname' | 'contact-mail' | 'contact-order',
  RegisterOptions<ContactFormData, Path<ContactFormData>>
>;

const defaultValues: ContactFormData = {
  'contact-firstname': '',
  'contact-lastname': '',
  'contact-mail': '',
  'contact-order': '',
  'contact-message': '',
  'contact-privacy': false,
};

const INPUT_CLASS =
  'border border-primary/15 bg-white text-primary placeholder:text-primary/40 focus:border-primary/30';

const INFO_ITEMS = [
  {
    label: 'Hours',
    lines: ['Monday – Thursday', '9:00 – 13:00 / 14:00 – 18:00 (CET)'],
  },
  {
    label: 'Email',
    lines: ['info@okke.it', 'Reply within 1–2 business days'],
  },
] as const;

const Contacts: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAPAnimation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormData>({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const isPrivacyChecked = watch('contact-privacy');
  const showErrors = isSubmitted;

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSuccess(true);
    reset(defaultValues);
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
  };

  return (
    <section className="contacts-page relative w-full px-[5vw] pt-[calc(5vh+5.5rem)] pb-16 md:pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <h1
          className="elAnimation font-humane leading-full text-[clamp(3rem,12vw,7rem)] font-light text-surface-dark uppercase"
          data-animation="ease-bottom-to-top"
        >
          Contact us
        </h1>
        <p
          className="elAnimation mt-4 max-w-xl text-base text-primary/70 md:text-lg"
          data-animation="ease-bottom-to-top"
        >
          Our Customer Service team can help with orders, sizing, and product
          questions.
        </p>

        {isSuccess ? (
          <div
            className="elAnimation mt-12 max-w-lg rounded-2xl border border-primary/10 bg-white p-8 md:p-10"
            data-animation="fade-in"
          >
            <h2 className="font-humane leading-full text-[clamp(2rem,6vw,3rem)] text-surface-dark uppercase">
              Message sent
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary/70">
              Thank you for reaching out. We will get back to you as soon as
              possible.
            </p>
            <div className="mt-6 w-full sm:w-auto">
              <Button type="button" onClick={handleSendAnother}>
                Send another message
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <aside
              className="elAnimation flex flex-col gap-6"
              data-animation="ease-stagger-list"
            >
              {INFO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-primary/10 bg-white p-6"
                >
                  <span className="text-xs font-bold tracking-widest text-primary/50 uppercase">
                    {item.label}
                  </span>
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="mt-1 text-base text-primary first:mt-2 md:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
              <p className="text-sm text-primary/50">
                New ESSE Maglieria s.r.l.
              </p>
            </aside>

            <form
              className="elAnimation rounded-2xl border border-primary/10 bg-white p-6 md:p-8"
              data-animation="ease-bottom-to-top"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FormInput<ContactFormData>
                    name="contact-firstname"
                    placeholder="Name *"
                    register={register}
                    validation={validationRules['contact-firstname']}
                    errors={errors}
                    showErrors={false}
                    inputClassName={INPUT_CLASS}
                  />
                  {showErrors && errors['contact-firstname'] && (
                    <span className="text-secondary mt-1 block text-xs">
                      {errors['contact-firstname'].message}
                    </span>
                  )}
                </div>

                <div>
                  <FormInput<ContactFormData>
                    name="contact-lastname"
                    placeholder="Surname *"
                    register={register}
                    validation={validationRules['contact-lastname']}
                    errors={errors}
                    showErrors={false}
                    inputClassName={INPUT_CLASS}
                  />
                  {showErrors && errors['contact-lastname'] && (
                    <span className="text-secondary mt-1 block text-xs">
                      {errors['contact-lastname'].message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <FormInput<ContactFormData>
                    type="email"
                    name="contact-mail"
                    placeholder="Email address *"
                    register={register}
                    validation={validationRules['contact-mail']}
                    errors={errors}
                    showErrors={false}
                    inputClassName={INPUT_CLASS}
                  />
                  {showErrors && errors['contact-mail'] && (
                    <span className="text-secondary mt-1 block text-xs">
                      {errors['contact-mail'].message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <FormInput<ContactFormData>
                    name="contact-order"
                    placeholder="Order ID (optional)"
                    register={register}
                    validation={validationRules['contact-order']}
                    errors={errors}
                    showErrors={false}
                    inputClassName={INPUT_CLASS}
                  />
                </div>

                <div className="sm:col-span-2">
                  <textarea
                    placeholder="Your message"
                    rows={3}
                    className={`leading-relaxed box-border w-full resize-none rounded-[14px] border px-4 py-3 text-base outline-none transition-colors duration-200 md:h-[6rem] md:px-8 md:text-xl ${INPUT_CLASS}`}
                    {...register('contact-message', {
                      maxLength: {
                        value: 1000,
                        message: MESSAGES.MAX_LENGTH(1000),
                      },
                    })}
                  />
                  {showErrors && errors['contact-message'] && (
                    <span className="text-secondary mt-1 block text-xs">
                      {errors['contact-message'].message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register('contact-privacy', {
                        required: MESSAGES.ACCEPT_PRIVACY,
                      })}
                    />
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-200 ${
                        isPrivacyChecked
                          ? 'border-secondary bg-secondary'
                          : 'border-primary/30 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isPrivacyChecked && (
                        <svg
                          viewBox="0 0 12 10"
                          className="h-2.5 w-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 5l3.5 3.5L11 1" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm leading-relaxed text-primary/70">
                      I have read and accepted the{' '}
                      <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary underline-offset-2 hover:underline"
                      >
                        Privacy Policy
                      </Link>{' '}
                      provided by New ESSE Maglieria s.r.l.
                    </span>
                  </label>
                  {showErrors && errors['contact-privacy'] && (
                    <span className="text-secondary mt-2 block text-xs">
                      {errors['contact-privacy'].message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contacts;
