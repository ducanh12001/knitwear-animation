import { useState, forwardRef } from 'react';
import { useForm, type Path, type RegisterOptions } from 'react-hook-form';
import type { TabType } from '@/types';
import { CheckboxInput } from '@/components/atoms/inputs/CheckboxInput';
import { FormInput } from '@/components/atoms/inputs/FormInput';
import { useModalAwareNavigation } from '@/hooks/others/useModalAwareNavigation';
import { VALIDATION } from '@/constant/validation';

interface LoginFormData {
  'login-user': string;
  'login-password': string;
  'login-remember': boolean;
}

const validationRules: Record<
  keyof LoginFormData,
  RegisterOptions<LoginFormData, Path<LoginFormData>>
> = {
  'login-user': {
    ...VALIDATION.REQUIRED,
    ...VALIDATION.EMAIL,
  },
  'login-password': {
    ...VALIDATION.REQUIRED,
    ...VALIDATION.MIN_LENGTH('Password', 6),
  },
  'login-remember': {},
};

const defaultValues: LoginFormData = {
  'login-user': '',
  'login-password': '',
  'login-remember': false,
};

interface LoginFormProps {
  handleSwitchTab: (tab: TabType) => void;
  activeTab: TabType;
}

const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(
  ({ handleSwitchTab, activeTab }, ref) => {
    const { navigate } = useModalAwareNavigation();
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
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className={`box-border h-full w-full flex-col items-start justify-start gap-[3rem] px-[5vw] pb-[2.5vw] ${activeTab === 'login' ? 'flex' : 'hidden'}`}
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
          <div className="relative flex h-auto w-full flex-col items-center justify-start gap-4 md:gap-[2rem]">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative flex h-[48px] w-full items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
                isSubmitting
                  ? 'cursor-not-allowed bg-gray-400 opacity-70'
                  : 'bg-secondary cursor-pointer hover:bg-[#fd5932]'
              }`}
            >
              <span className="leading-full text-base text-white md:text-xl">
                Login
              </span>
            </button>

            <div
              className="leading-full text-primary cursor-pointer text-base !underline"
              onClick={() => navigate('/password-recovery')}
            >
              Did you forget your password?
            </div>
          </div>
          <div className="relative h-auto w-full">
            <div
              className={`relative flex h-[48px] w-full items-center justify-center rounded-[14px] px-4 transition-all duration-350 ease-in-out md:h-[6rem] md:rounded-[25px] md:px-[2rem] ${
                isSubmitting
                  ? 'cursor-not-allowed bg-gray-500 opacity-70'
                  : 'bg-primary cursor-pointer hover:bg-[#616161]'
              }`}
              onClick={() => handleSwitchTab('signup')}
            >
              <span className="leading-full text-center text-base text-white md:text-xl">
                Do not have an account? Sign up
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  },
);

export default LoginForm;
