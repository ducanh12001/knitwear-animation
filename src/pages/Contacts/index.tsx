import type { FC } from 'react';
import { useState } from 'react';
import { useForm, type Path, type RegisterOptions } from 'react-hook-form';
import { Link } from 'react-router';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { MESSAGES } from '@/constant/validation';

interface ContactFormData {
  'contact-firstname': string;
  'contact-lastname': string;
  'contact-mail': string;
  'contact-order': string;
  'contact-message': string;
  'contact-privacy': boolean;
}

const validationRules: Record<
  keyof ContactFormData,
  RegisterOptions<ContactFormData, Path<ContactFormData>>
> = {
  'contact-firstname': {
    required: MESSAGES.REQUIRED,
  },
  'contact-lastname': {
    required: MESSAGES.REQUIRED,
  },
  'contact-mail': {
    required: MESSAGES.REQUIRED,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: MESSAGES.INVALID_EMAIL,
    },
  },
  'contact-order': {},
  'contact-message': {},
  'contact-privacy': {
    required: MESSAGES.ACCEPT_PRIVACY,
  },
};

const defaultValues: ContactFormData = {
  'contact-firstname': '',
  'contact-lastname': '',
  'contact-mail': '',
  'contact-order': '',
  'contact-message': '',
  'contact-privacy': false,
};

const Contacts: FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form Data:', data);
  };

  return (
    <section className="contacts--form-section relative h-auto w-full xl:h-screen">
      <div className="bg-primary relative flex h-full w-full flex-col items-start justify-start pb-[2.5rem] xl:flex-row xl:pb-0">
        <div className="relative flex h-full w-full flex-col xl:w-[55%] xl:flex-row-reverse">
          <div className="relative hidden h-full w-[42vh] bg-[#A9AFA4] mask-[url(/contact-bg.svg)] mask-no-repeat xl:block" />
          <div className="relative box-border flex w-full flex-col items-center justify-start gap-8 bg-[#A9AFA4] pt-[7.5rem] pr-[5vw] pl-[5vw] xl:w-[calc(100%-42vh)] xl:flex-row xl:gap-0 xl:pt-0 xl:pr-0">
            <div className="center relative flex h-auto w-full flex-col gap-4">
              <h1 className="font-humane leading-full text-[80px] font-light text-white uppercase md:text-[15vw]">
                Contact us
              </h1>
              <div className="wp-block-group relative mb-8 box-border flex w-full">
                <div className="wp-block-group__inner-container relative flex h-auto w-full flex-col gap-2">
                  <p className="leading-full text-xl text-white">
                    Our Customer Service is active from Monday to Thursday{' '}
                  </p>
                  <p className="leading-full text-xl text-white">
                    9:00 – 13:00 / 14:00 – 18:00 (Italian time)
                  </p>
                </div>
              </div>
              <p className="leading-full text-xl text-white">
                Contact us via the form
              </p>
            </div>
            <div className="bg-primary relative mx-[-2px] mb-[-2px] block h-[calc(124*(100vw+4px)/300)] w-[calc(100vw+4px)] mask-[url(/contact-bg2.svg)] mask-no-repeat xl:hidden" />
          </div>
        </div>
        <div className="relative flex h-full w-full items-center justify-center pt-[2rem] xl:w-[45%] xl:pt-0">
          <form
            className="relative mx-auto flex h-auto w-[90%] flex-col items-center justify-start gap-[1.25rem] md:max-xl:grid md:max-xl:grid-cols-2 xl:mx-0 xl:w-auto xl:items-start xl:pr-[5vw]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput<ContactFormData>
              name="contact-firstname"
              placeholder="Name *"
              register={register}
              validation={validationRules['contact-firstname']}
              errors={errors}
              inputClassName="border border-[#e1e1e1] bg-transparent text-xl text-[#e1e1e1] xl:h-[4rem] xl:rounded-[25px] xl:px-[3rem]"
            />

            <FormInput<ContactFormData>
              name="contact-lastname"
              placeholder="Surname *"
              register={register}
              validation={validationRules['contact-lastname']}
              errors={errors}
              inputClassName="border border-[#e1e1e1] bg-transparent text-xl text-[#e1e1e1] xl:h-[4rem] xl:rounded-[25px] xl:px-[3rem]"
            />

            <FormInput<ContactFormData>
              type="email"
              name="contact-mail"
              placeholder="Email address *"
              register={register}
              validation={validationRules['contact-mail']}
              errors={errors}
              inputClassName="border border-[#e1e1e1] bg-transparent text-xl text-[#e1e1e1] xl:h-[4rem] xl:rounded-[25px] xl:px-[3rem]"
            />

            <FormInput<ContactFormData>
              name="contact-order"
              placeholder="Order ID"
              register={register}
              validation={validationRules['contact-order']}
              errors={errors}
              inputClassName="border border-[#e1e1e1] bg-transparent text-xl text-[#e1e1e1] xl:h-[4rem] xl:rounded-[25px] xl:px-[3rem]"
            />

            <div className="form-item relative flex h-auto w-full flex-col md:max-xl:col-span-2">
              <textarea
                placeholder="Message"
                className="leading-full relative z-2 box-border h-[120px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] py-[1rem] text-xl text-[#e1e1e1] outline-none lg:h-[200px] xl:h-[300px] xl:rounded-[25px] xl:px-[3rem]"
                {...register('contact-message')}
              />
            </div>

            <div className="form-item custom-checkbox relative mt-4 h-auto w-auto md:max-xl:col-span-2 md:max-xl:mt-0 xl:mt-[2.5rem]">
              <label className="check-container relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 xl:gap-4">
                <input
                  type="checkbox"
                  id="contact-privacy"
                  className="invisible hidden opacity-0"
                  {...register('contact-privacy', {
                    required: 'Accept our privacy policy',
                  })}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#e1e1e1] xl:h-[2rem] xl:w-[2rem] xl:rounded-[0.6rem]">
                  <div
                    className={`inner-check relative h-3 w-3 bg-[#e1e1e1] mask-[url('/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out xl:h-[1.5rem] xl:w-[1.5rem] ${isChecked ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
                <span className="leading-full flex-1 basis-[100%] text-[14px] text-[#e1e1e1] xl:basis-auto xl:text-base">
                  I have read and accepted the
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    className="leading-full mx-1 text-[14px] font-bold text-[#e1e1e1] xl:text-base"
                  >
                    Privacy Policy
                  </Link>
                  provided by New ESSE Maglieria s.r.l.
                </span>
                <div className="errors absolute -bottom-4 left-[3rem]">
                  {errors['contact-privacy'] && (
                    <span className="error leading-full text-secondary absolute bottom-0 left-0 text-xs whitespace-nowrap opacity-100 transition-opacity duration-300 ease-in-out">
                      {errors['contact-privacy'].message}
                    </span>
                  )}
                </div>
              </label>
            </div>

            <div className="submit-contact-form relative flex h-auto w-full items-center justify-end">
              <input
                type="hidden"
                name="contacts-success"
                value='{"title":"Email sent successfully","subtitle":"We will contact you as soon as possible."}'
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn relative flex h-[48px] w-full items-center justify-center gap-4 rounded-[14px] transition-colors duration-350 ease-in-out xl:h-[6rem] ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-gray-400 opacity-70'
                    : 'bg-secondary cursor-pointer hover:bg-[#fd5932]'
                }`}
              >
                <span className="leading-full text-base text-[#e1e1e1] uppercase xl:text-xl">
                  {isSubmitting ? 'Sending...' : 'Send'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
