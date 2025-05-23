import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../atoms/inputs/FormInput";
import { CheckboxInput } from "../../atoms/inputs/CheckboxInput";

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

  const PrivacyLabel = () => (
    <>
      I have read and accepted the
      <a
        href="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="leading-full mx-1 text-[14px] font-bold text-[#1d1d1d] md:text-base"
      >
        Privacy Policy
      </a>
      provided by New ESSE Maglieria s.r.l.
    </>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signin-block box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw]"
    >
      <div className="signin-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <FormInput
          name="signin-name"
          placeholder="Name"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
        />

        <FormInput
          name="signin-surname"
          placeholder="Surname"
          register={register}
          validation={{
            required: "The field cannot be empty",
          }}
          errors={errors}
        />

        <FormInput
          name="signin-username"
          placeholder="Username"
          register={register}
          validation={{
            required: "The field cannot be empty",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          }}
          errors={errors}
        />

        <FormInput
          name="signin-mail"
          placeholder="Email address"
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
          type="password"
          name="signin-password"
          placeholder="Password"
          register={register}
          validation={{
            required: "The field cannot be empty",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          errors={errors}
          showPasswordToggle={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <CheckboxInput
          name="signin-privacy"
          register={register}
          validation={{
            required: "Accept our privacy policy",
          }}
          errors={errors}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          label={<PrivacyLabel />}
          errorPosition="left-[3rem]"
        />
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
