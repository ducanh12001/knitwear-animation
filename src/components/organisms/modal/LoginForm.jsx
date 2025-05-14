import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../atoms/inputs/FormInput";
import { CheckboxInput } from "../../atoms/inputs/CheckboxInput";

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
      className="login-block box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw]"
    >
      <div className="login-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <FormInput
          name="login-user"
          placeholder="Username/Email address"
          register={register}
          validation={{
            required: "The field cannot be empty",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "The email is invalid",
            },
          }}
          errors={errors}
        />

        <FormInput
          type="password"
          name="login-password"
          placeholder="Password"
          register={register}
          validation={{
            required: "The field cannot be empty",
            minLength: {
              value: 6,
              message: "The password is incorrect",
            },
          }}
          errors={errors}
          showPasswordToggle={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <CheckboxInput
          name="login-remember"
          register={register}
          validation={{}}
          errors={errors}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          label="Remember login"
        />
      </div>
      <div className="login-submit relative flex h-full w-full flex-col items-center justify-between gap-[2rem]">
        <div className="tp relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
          <button
            type="submit"
            className="send-login relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] bg-[#FD7453] px-4 transition-all duration-350 ease-in-out hover:bg-[#fd5932] md:h-[6rem] md:rounded-[25px] md:px-[2rem]"
          >
            <span className="leading-full text-base text-white md:text-[1.25rem]">
              Login
            </span>
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
