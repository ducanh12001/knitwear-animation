import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import type { TabType } from '@/types';

interface SignupFormData {
  'signin-name': string;
  'signin-surname': string;
  'signin-username': string;
  'signin-mail': string;
  'signin-password': string;
  'signin-privacy': boolean;
}

interface SignupFormProps {
  handleTabSwitch: (tab: TabType) => void;
}

const validationRules = {
  'signin-name': {
    required: 'The field cannot be empty',
  },
  'signin-surname': {
    required: 'The field cannot be empty',
  },
  'signin-username': {
    required: 'The field cannot be empty',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters',
    },
  },
  'signin-mail': {
    required: 'The field cannot be empty',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Enter a valid email address',
    },
  },
  'signin-password': {
    required: 'The field cannot be empty',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  'signin-privacy': {
    required: 'Accept our privacy policy',
  },
} as const;

const defaultValues: SignupFormData = {
  'signin-name': '',
  'signin-surname': '',
  'signin-username': '',
  'signin-mail': '',
  'signin-password': '',
  'signin-privacy': false,
};

const SignupForm: FC<SignupFormProps> = ({ handleTabSwitch }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Form Data:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signin-block box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw]"
    >
      <div className="signin-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <FormInput<SignupFormData>
          name="signin-name"
          placeholder="Name"
          register={register}
          validation={validationRules['signin-name']}
          errors={errors}
        />

        <FormInput<SignupFormData>
          name="signin-surname"
          placeholder="Surname"
          register={register}
          validation={validationRules['signin-surname']}
          errors={errors}
        />

        <FormInput<SignupFormData>
          name="signin-username"
          placeholder="Username"
          register={register}
          validation={validationRules['signin-username']}
          errors={errors}
        />

        <FormInput<SignupFormData>
          name="signin-mail"
          placeholder="Email address"
          register={register}
          validation={validationRules['signin-mail']}
          errors={errors}
        />

        <FormInput<SignupFormData>
          type="password"
          name="signin-password"
          placeholder="Password"
          register={register}
          validation={validationRules['signin-password']}
          errors={errors}
          showPasswordToggle={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <CheckboxInput<SignupFormData>
          name="signin-privacy"
          register={register}
          validation={validationRules['signin-privacy']}
          errors={errors}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          label={
            <>
              I have read and accepted the
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="leading-full text-primary mx-1 text-[14px] font-bold md:text-base"
              >
                Privacy Policy
              </Link>
              provided by New ESSE Maglieria s.r.l.
            </>
          }
          errorPosition="left-[3rem]"
        />
      </div>
      <div className="signin-submit relative flex h-full w-full flex-col items-center justify-between gap-[2rem]">
        <div className="relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
          <button
            type="submit"
            className={`bg-secondary relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out hover:bg-[#fd5932] md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-400 opacity-70'
                : 'bg-secondary cursor-pointer hover:bg-[#fd5932]'
            }`}
          >
            <span className="leading-full text-base text-white md:text-[1.25rem]">
              Sign up
            </span>
          </button>
        </div>
        <div className="relative h-auto w-full">
          <div
            className={`bg-primary relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out hover:bg-[#616161] md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-500 opacity-70'
                : 'bg-primary cursor-pointer hover:bg-[#616161]'
            }`}
            onClick={() => handleTabSwitch('login')}
          >
            <span className="leading-full text-base whitespace-nowrap text-white md:text-[1.25rem]">
              Do you already have an account? Log in
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
