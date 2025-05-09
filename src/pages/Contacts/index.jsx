import { useState } from "react";
import { useForm } from "react-hook-form";

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
    <section className="contacts--form-section relative h-auto w-full md:h-screen">
      <div className="relative flex h-full w-full flex-col items-start justify-start bg-[#1d1d1d] pb-[2.5rem] md:flex-row md:pb-0">
        <div className="left relative flex h-full w-full flex-col md:w-[55%] md:flex-row-reverse">
          <div className="desktop relative h-full w-[42vh] bg-[#A9AFA4] mask-[url(/src/assets/contact-bg.svg)] mask-no-repeat" />
          <div className="relative box-border flex w-full flex-col items-center justify-start gap-8 bg-[#A9AFA4] pt-[7.5rem] pr-[5vw] pl-[5vw] md:w-[calc(100%-42vh)] md:flex-row md:gap-0 md:pt-0 md:pr-0">
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
            <div className="mobile relative mx-[-2px] mb-[-2px] h-[calc(124*(100vw+4px)/300)] w-[calc(100vw+4px)] bg-[#1d1d1d] mask-[url(/src/assets/contact-bg2.svg)] mask-no-repeat" />
          </div>
        </div>
        <div className="right relative flex h-full w-full items-center justify-center pt-[2rem] md:w-[45%] md:pt-0">
          <form
            className="form relative mx-auto flex h-auto w-[90%] flex-col items-center justify-start gap-[1.25rem] md:mx-0 md:w-auto md:items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-item relative flex h-auto w-full flex-col md:w-[30vw]">
              <input
                type="text"
                name="contact-firstname"
                placeholder="Name *"
                className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none md:h-[4rem] md:rounded-[25px] md:px-[3rem] xl:h-[6rem]"
                {...register("contact-firstname", {
                  required: "The field cannot be empty",
                })}
              />
              <div className="errors absolute right-[3rem] bottom-[1rem]">
                {errors["contact-firstname"] && (
                  <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                    {errors["contact-firstname"].message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-item relative flex h-auto w-full flex-col md:w-[30vw]">
              <input
                type="text"
                name="contact-lastname"
                placeholder="Surname *"
                className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none md:h-[4rem] md:rounded-[25px] md:px-[3rem] xl:h-[6rem]"
                {...register("contact-lastname", {
                  required: "The field cannot be empty",
                })}
              />
              <div className="errors absolute right-[3rem] bottom-[1rem]">
                {errors["contact-lastname"] && (
                  <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                    {errors["contact-lastname"].message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-item relative flex h-auto w-full flex-col md:w-[30vw]">
              <input
                type="email"
                name="contact-mail"
                placeholder="Email address *"
                className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none md:h-[4rem] md:rounded-[25px] md:px-[3rem] xl:h-[6rem]"
                {...register("contact-mail", {
                  required: "The field cannot be empty",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              <div className="errors absolute right-[3rem] bottom-[1rem]">
                {errors["contact-mail"]?.type === "required" && (
                  <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                    {errors["contact-mail"].message}
                  </span>
                )}
                {errors["contact-mail"]?.type === "pattern" && (
                  <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                    {errors["contact-mail"].message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-item relative flex h-auto w-full flex-col md:w-[30vw]">
              <input
                type="text"
                name="contact-order"
                placeholder="Order ID"
                className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none md:h-[4rem] md:rounded-[25px] md:px-[3rem] xl:h-[6rem]"
                {...register("contact-order")}
              />
            </div>
            <div className="form-item relative flex h-auto w-full flex-col md:w-[30vw]">
              <textarea
                name="contact-message"
                placeholder="Message"
                className="leading-full relative z-2 box-border h-[120px] w-full resize-none rounded-[14px] border border-[#e1e1e1] bg-transparent px-[1rem] py-[1rem] text-[1.25rem] text-[#e1e1e1] outline-none md:h-[200px] md:rounded-[25px] md:px-[3rem] xl:h-[300px]"
                {...register("contact-message")}
              />
            </div>
            <div className="form-item custom-checkbox relative mt-4 h-auto w-auto md:mt-[2.5rem]">
              <label className="check-container relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 md:gap-4">
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
                <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#e1e1e1] md:h-[2rem] md:w-[2rem] md:rounded-[0.6rem]">
                  <div
                    className={`inner-check relative h-3 w-3 bg-[#e1e1e1] mask-[url('/src/assets/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out md:h-[1.5rem] md:w-[1.5rem] ${isChecked ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
                <span className="leading-full flex-1 basis-[100%] text-[14px] text-[#e1e1e1] md:basis-auto md:text-base">
                  I have read and accepted the
                  <a
                    href="https://akkeknitwear.com/en/privacy-policy/"
                    target="_blank"
                    className="leading-full mx-1 text-[14px] font-bold text-[#e1e1e1] md:text-base"
                  >
                    Privacy Policy
                  </a>
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
                className="btn relative flex h-[48px] w-full cursor-pointer items-center justify-center gap-4 rounded-[14px] bg-[#FD7453] transition-colors duration-350 ease-in-out md:h-[6rem]"
              >
                <span className="leading-full text-base text-[#e1e1e1] uppercase md:text-[1.25rem]">
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
