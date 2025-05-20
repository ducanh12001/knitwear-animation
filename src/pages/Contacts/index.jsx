import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function Contacts() {
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "contact-firstname": "",
      "contact-lastname": "",
      "contact-mail": "",
      "contact-order": "",
      "contact-message": "",
      "contact-privacy": false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="contacts--form-section relative h-auto w-full xl:h-screen">
      <div className="relative flex h-full w-full flex-col items-start justify-start bg-[#1d1d1d] pb-[2.5rem] xl:flex-row xl:pb-0">
        <div className="left relative flex h-full w-full flex-col xl:w-[55%] xl:flex-row-reverse">
          <div className="relative hidden h-full w-[42vh] bg-[#A9AFA4] mask-[url(/src/assets/contact-bg.svg)] mask-no-repeat xl:block" />
          <div className="relative box-border flex w-full flex-col items-center justify-start gap-8 bg-[#A9AFA4] pt-[7.5rem] pr-[5vw] pl-[5vw] xl:w-[calc(100%-42vh)] xl:flex-row xl:gap-0 xl:pt-0 xl:pr-0">
            <div className="center relative flex h-auto w-full flex-col gap-4">
              <h1 className="font-humane leading-full text-[80px] font-light text-white uppercase md:text-[15vw]">
                Contact us
              </h1>
              <div className="wp-block-group relative mb-8 box-border flex w-full">
                <div className="wp-block-group__inner-container relative flex h-auto w-full flex-col gap-2">
                  <p className="leading-full text-[1.25rem] text-white">
                    Our Customer Service is active from Monday to Thursday{" "}
                  </p>
                  <p className="leading-full text-[1.25rem] text-white">
                    9:00 – 13:00 / 14:00 – 18:00 (Italian time)
                  </p>
                </div>
              </div>
              <p className="leading-full text-[1.25rem] text-white">
                Contact us via the form
              </p>
            </div>
            <div className="relative mx-[-2px] mb-[-2px] block h-[calc(124*(100vw+4px)/300)] w-[calc(100vw+4px)] bg-[#1d1d1d] mask-[url(/src/assets/contact-bg2.svg)] mask-no-repeat xl:hidden" />
          </div>
        </div>
        <div className="right relative flex h-full w-full items-center justify-center pt-[2rem] xl:w-[45%] xl:pt-0">
          <form
            className="form relative mx-auto flex h-auto w-[90%] flex-col items-center justify-start gap-[1.25rem] md:max-xl:grid md:max-xl:grid-cols-2 xl:mx-0 xl:w-auto xl:items-start xl:pr-[5vw]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              name="contact-firstname"
              placeholder="Name *"
              register={register}
              validation={{ required: "The field cannot be empty" }}
              errors={errors}
            />

            <FormInput
              name="contact-lastname"
              placeholder="Surname *"
              register={register}
              validation={{ required: "The field cannot be empty" }}
              errors={errors}
            />

            <FormInput
              type="email"
              name="contact-mail"
              placeholder="Email address *"
              register={register}
              validation={{
                required: "The field cannot be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              }}
              errors={errors}
            />

            <FormInput
              name="contact-order"
              placeholder="Order ID"
              register={register}
              errors={errors}
            />

            <div className="form-item relative flex h-auto w-full flex-col md:max-xl:col-span-2">
              <textarea
                name="contact-message"
                placeholder="Message"
                className="leading-full relative z-2 box-border h-[120px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] py-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none lg:h-[200px] xl:h-[300px] xl:rounded-[25px] xl:px-[3rem]"
                {...register("contact-message")}
              />
            </div>
            <div className="form-item custom-checkbox relative mt-4 h-auto w-auto md:max-xl:col-span-2 md:max-xl:mt-0 xl:mt-[2.5rem]">
              <label className="check-container relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 xl:gap-4">
                <input
                  type="checkbox"
                  id="contact-privacy"
                  name="contact-privacy"
                  className="invisible hidden opacity-0"
                  {...register("contact-privacy", {
                    required: "Accept our privacy policy",
                  })}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#e1e1e1] xl:h-[2rem] xl:w-[2rem] xl:rounded-[0.6rem]">
                  <div
                    className={`inner-check relative h-3 w-3 bg-[#e1e1e1] mask-[url('/src/assets/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out xl:h-[1.5rem] xl:w-[1.5rem] ${isChecked ? "opacity-100" : "opacity-0"}`}
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
                  {errors["contact-privacy"] && (
                    <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-opacity duration-300 ease-in-out">
                      {errors["contact-privacy"].message}
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
                className="btn relative flex h-[48px] w-full cursor-pointer items-center justify-center gap-4 rounded-[14px] bg-[#FD7453] transition-colors duration-350 ease-in-out hover:bg-[#fd5932] xl:h-[6rem]"
              >
                <span className="leading-full text-base text-[#e1e1e1] uppercase xl:text-[1.25rem]">
                  Send
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const FormInput = ({
  type = "text",
  name,
  placeholder,
  register,
  validation = {},
  errors,
}) => {
  return (
    <div className="form-item relative flex h-auto w-full flex-col">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none xl:h-[4rem] xl:h-[6rem] xl:rounded-[25px] xl:px-[3rem]"
        {...register(name, validation)}
      />
      <div className="errors absolute right-[3rem] bottom-[1rem]">
        {errors[name] && (
          <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
            {errors[name].message}
          </span>
        )}
      </div>
    </div>
  );
};
