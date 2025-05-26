import { useState } from 'react';
import { useForm, type Path, type RegisterOptions } from 'react-hook-form';
import { Link } from 'react-router';
import type { TabType } from '@/types';
import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import { FormInput } from '@/components/atoms/inputs/FormInput';

interface LoginFormData {
  'login-user': string;
  'login-password': string;
  'login-remember': boolean;
}

interface LoginFormProps {
  handleTabSwitch: (tab: TabType) => void;
}

const validationRules: Record<
  keyof LoginFormData,
  RegisterOptions<LoginFormData, Path<LoginFormData>>
> = {
  'login-user': {
    required: 'The field cannot be empty',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'The email is invalid',
    },
  },
  'login-password': {
    required: 'The field cannot be empty',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  'login-remember': {},
};

const defaultValues: LoginFormData = {
  'login-user': '',
  'login-password': '',
  'login-remember': false,
};

const LoginForm: React.FC<LoginFormProps> = ({ handleTabSwitch }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Form Data:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="login-block box-border flex h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw]"
    >
      <div className="login-form relative flex h-auto w-full grow flex-col items-start justify-start gap-[16px] md:gap-[1.6rem]">
        <FormInput<LoginFormData>
          name="login-user"
          placeholder="Username/Email address"
          register={register}
          validation={validationRules['login-user']}
          errors={errors}
        />

        <FormInput<LoginFormData>
          type="password"
          name="login-password"
          placeholder="Password"
          register={register}
          validation={validationRules['login-password']}
          errors={errors}
          showPasswordToggle={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <CheckboxInput<LoginFormData>
          name="login-remember"
          register={register}
          validation={validationRules['login-remember']}
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
            disabled={isSubmitting}
            className={`send-login relative flex h-[48px] w-full items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-400 opacity-70'
                : 'cursor-pointer bg-[#FD7453] hover:bg-[#fd5932]'
            }`}
          >
            <span className="leading-full text-base text-white md:text-[1.25rem]">
              Login
            </span>
          </button>

          <Link
            className="leading-full cursor-pointer text-base text-[#1d1d1d] !underline"
            to="/password-recovery"
          >
            Did you forget your password?
          </Link>
        </div>
        <div className="bt relative h-auto w-full">
          <div
            className={`send-login relative flex h-[48px] w-full items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
              isSubmitting
                ? 'cursor-not-allowed bg-gray-500 opacity-70'
                : 'cursor-pointer bg-[#1d1d1d] hover:bg-[#616161]'
            }`}
            onClick={() => handleTabSwitch('signup')}
          >
            <span className="leading-full text-base whitespace-nowrap text-white md:text-[1.25rem]">
              Do not have an account? Sign up
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
