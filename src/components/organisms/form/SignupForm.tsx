import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import type { TabType } from '@/types';
import { MESSAGES } from '@/constant/validation';

interface SignupFormData {
  'signup-name': string;
  'signup-surname': string;
  'signup-username': string;
  'signup-mail': string;
  'signup-password': string;
  'signup-privacy': boolean;
}

const validationRules = {
  'signup-name': {
    required: MESSAGES.REQUIRED,
  },
  'signup-surname': {
    required: MESSAGES.REQUIRED,
  },
  'signup-username': {
    required: MESSAGES.REQUIRED,
    minLength: {
      value: 3,
      message: MESSAGES.MIN_LENGTH('Username', 3),
    },
  },
  'signup-mail': {
    required: MESSAGES.REQUIRED,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: MESSAGES.INVALID_EMAIL,
    },
  },
  'signup-password': {
    required: MESSAGES.REQUIRED,
    minLength: {
      value: 6,
      message: MESSAGES.MIN_LENGTH('Password', 6),
    },
  },
  'signup-privacy': {
    required: MESSAGES.ACCEPT_PRIVACY,
  },
} as const;

const defaultValues: SignupFormData = {
  'signup-name': '',
  'signup-surname': '',
  'signup-username': '',
  'signup-mail': '',
  'signup-password': '',
  'signup-privacy': false,
};

interface SignupFormProps {
  handleSwitchTab: (tab: TabType) => void;
  activeTab: TabType;
}

const SignupForm = forwardRef<HTMLFormElement, SignupFormProps>(
  ({ handleSwitchTab, activeTab }, ref) => {
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
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className={`box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw] ${activeTab === 'signup' ? 'flex' : 'hidden'}`}
      >
        <div className="signup-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
          <FormInput<SignupFormData>
            name="signup-name"
            placeholder="Name"
            register={register}
            validation={validationRules['signup-name']}
            errors={errors}
          />

          <FormInput<SignupFormData>
            name="signup-surname"
            placeholder="Surname"
            register={register}
            validation={validationRules['signup-surname']}
            errors={errors}
          />

          <FormInput<SignupFormData>
            name="signup-username"
            placeholder="Username"
            register={register}
            validation={validationRules['signup-username']}
            errors={errors}
          />

          <FormInput<SignupFormData>
            name="signup-mail"
            placeholder="Email address"
            register={register}
            validation={validationRules['signup-mail']}
            errors={errors}
          />

          <FormInput<SignupFormData>
            type="password"
            name="signup-password"
            placeholder="Password"
            register={register}
            validation={validationRules['signup-password']}
            errors={errors}
            showPasswordToggle={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <CheckboxInput<SignupFormData>
            name="signup-privacy"
            register={register}
            validation={validationRules['signup-privacy']}
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
        <div className="signup-submit relative flex h-full w-full flex-col items-center justify-between gap-[2rem]">
          <div className="relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
            <button
              type="submit"
              className={`bg-secondary relative flex h-[48px] w-full cursor-pointer items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out hover:bg-[#fd5932] md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
                isSubmitting
                  ? 'cursor-not-allowed bg-gray-400 opacity-70'
                  : 'bg-secondary cursor-pointer hover:bg-[#fd5932]'
              }`}
            >
              <span className="leading-full text-base text-white md:text-xl">
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
              onClick={() => handleSwitchTab('login')}
            >
              <span className="leading-full text-center text-base text-white md:text-xl">
                Do you already have an account? Log in
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  },
);

export default SignupForm;
