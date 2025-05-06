import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm({ handleTabSwitch }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "login-user": "",
      "login-password": "",
      "login-remember": false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data); // Dữ liệu form khi submit
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-block absolute top-0 left-0 box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw]"
    >
      <div className="login-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type="text"
            placeholder="Username/Email address"
            {...register("login-user", {
              required: "The field cannot be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "The email is invalid",
              },
            })}
          />
          <div className="errors absolute bottom-[-1rem] left-0">
            {errors["login-user"] && (
              <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["login-user"].message === "The field cannot be empty"
                  ? "The field cannot be empty"
                  : "The username is invalid"}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex h-auto w-full flex-col">
          <input
            className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:text-[1.25rem]"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("login-password", {
              required: "The field cannot be empty",
              minLength: {
                value: 6,
                message: "The password is incorrect",
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
            {errors["login-password"] && (
              <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
                {errors["login-password"].message}
              </span>
            )}
          </div>
        </div>
        <div className="relative h-auto w-full">
          <label className="relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 md:gap-[1rem]">
            <input
              type="checkbox"
              {...register("login-remember")}
              className="invisible z-2 box-border hidden p-0 opacity-0"
              onChange={() => setIsChecked(!isChecked)}
            />
            <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#1d1d1d] md:h-[2rem] md:w-[2rem] md:rounded-[0.6rem]">
              <div
                className={`inner-check relative h-3 w-3 bg-[#1d1d1d] mask-[url('/src/assets/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out md:h-[1.5rem] md:w-[1.5rem] ${isChecked ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <span className="leading-full flex-1 basis-[100%] text-[14px] text-[#1d1d1d] md:basis-0 md:text-base">
              Remember login
            </span>
          </label>
        </div>
      </div>
      <div className="login-submit relative flex h-full w-full flex-col items-center justify-between gap-[2rem]">
        <div className="tp relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
          <button
            type="submit"
            className="send-login relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#FD7453] px-4 transition-all duration-350 ease-in-out hover:bg-[#fd5932] md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
          >
            <span className="leading-full text-base text-white md:text-[1.25rem]">Log in</span>
          </button>
          <a
            className="goToRecPassword leading-full cursor-pointer text-base text-[#1d1d1d] underline"
            href="https://akkeknitwear.com/en/password-recovery/"
          >
            Did you forget your password?
          </a>
        </div>
        <div className="bt relative h-auto w-full">
          <div
            className="send-login relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#1d1d1d] px-4 transition-all duration-350 ease-in-out hover:bg-[#616161] md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
            onClick={() => handleTabSwitch("signup")}
          >
            <span className="leading-full text-base whitespace-nowrap text-white md:text-[1.25rem]">
              Do not have an account? Sign up
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
