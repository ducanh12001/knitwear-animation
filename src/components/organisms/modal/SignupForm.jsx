import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupForm({ handleTabSwitch }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "signin-name": "",
      "signin-surname": "",
      "signin-username": "",
      "signin-mail": "",
      "signin-password": "",
      "signin-privacy": false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signin-block invisible absolute top-0 left-0 box-border hidden h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw] opacity-0"
    >
      <div className="signin-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type="text"
            placeholder="Name"
            name="signin-name"
            {...register("signin-name", {
              required: "The field cannot be empty",
            })}
          />
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["signin-name"] && (
              <span className="error empty leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["signin-name"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type="text"
            placeholder="Surname"
            name="signin-surname"
            {...register("signin-surname", {
              required: "The field cannot be empty",
            })}
          />
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["signin-surname"] && (
              <span className="error empty leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["signin-surname"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type="text"
            placeholder="Username"
            name="signin-username"
            {...register("signin-username", {
              required: "The field cannot be empty",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["signin-username"] && (
              <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["signin-username"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type="text"
            placeholder="Email address"
            name="signin-mail"
            {...register("signin-mail", {
              required: "The field cannot be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["signin-mail"] && (
              <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["signin-mail"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="login-password"
            {...register("signin-password", {
              required: "The field cannot be empty",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <div
            className="show-hide absolute top-1/2 right-[1rem] z-15 -translate-y-1/2 cursor-pointer md:right-[3rem]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="leading-full text-[10px] text-[#1d1d1d] uppercase md:text-[0.75rem]">
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["signin-password"] && (
              <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["signin-password"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative h-auto w-full">
          <label className="relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 md:gap-[1rem]">
            <input
              type="checkbox"
              {...register("signin-privacy", {
                required: "Accept our privacy policy",
              })}
              name="signin-privacy"
              className="invisible z-2 box-border hidden p-0 opacity-0"
              onChange={() => setIsChecked(!isChecked)}
            />
            <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#1d1d1d] md:h-[2rem] md:w-[2rem] md:rounded-[0.6rem]">
              <div
                className={`inner-check relative h-3 w-3 bg-[#1d1d1d] mask-[url('/src/assets/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out md:h-[1.5rem] md:w-[1.5rem] ${isChecked ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <span className="leading-full flex-1 basis-[100%] text-[14px] text-[#1d1d1d] md:basis-auto md:text-base">
              I have read and accepted the
              <a
                href="https://akkeknitwear.com/en/privacy-policy/"
                target="_blank"
                className="leading-full mx-1 text-[14px] font-bold text-[#1d1d1d] md:text-base"
              >
                Privacy Policy
              </a>
              provided by New ESSE Maglieria s.r.l.
            </span>
            <div className="errors absolute bottom-[-1rem] left-[3rem]">
              {errors["signin-privacy"] && (
                <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-opacity duration-300 ease-in-out">
                  {errors["signin-privacy"].message}
                </span>
              )}
            </div>
          </label>
        </div>
      </div>
      <div className="signin-submit relative flex h-full w-full flex-col items-center justify-between gap-[2rem]">
        <div className="tp relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
          <button
            type="submit"
            className="send-login relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#FD7453] px-4 transition-all duration-350 ease-in-out hover:bg-[#fd5932] md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
          >
            <span className="leading-full text-base text-white md:text-[1.25rem]">
              Sign up
            </span>
          </button>
        </div>
        <div className="bt relative h-auto w-full">
          <div
            className="send-login relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#1d1d1d] px-4 transition-all duration-350 ease-in-out hover:bg-[#616161] md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
            onClick={() => handleTabSwitch("login")}
          >
            <span className="leading-full text-base whitespace-nowrap text-white md:text-[1.25rem]">
              Do you already have an account? Log in
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
