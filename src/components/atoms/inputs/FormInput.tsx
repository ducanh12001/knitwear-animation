import type { FieldValues } from 'react-hook-form';
import type { FormInputProps } from '@/types';

export const FormInput = <TFormData extends FieldValues = FieldValues>({
  type = 'text',
  name,
  placeholder,
  register,
  validation,
  errors,
  showPasswordToggle = false,
  showPassword = false,
  setShowPassword,
  showErrors = true,
  inputClassName = 'text-primary border-none bg-white text-base md:h-[5rem] md:px-[3rem] md:text-xl',
}: FormInputProps<TFormData>) => {
  const handleTogglePassword = () => {
    if (setShowPassword) {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className="relative flex h-auto w-full flex-col">
      <input
        className={`leading-full relative z-2 box-border h-12 w-full resize-none rounded-[14px] px-4 outline-none ${inputClassName}`}
        type={showPasswordToggle && showPassword ? 'text' : type}
        placeholder={placeholder}
        {...register(name, validation)}
      />

      {showPasswordToggle && setShowPassword && (
        <div
          className="absolute top-1/2 right-4 z-15 -translate-y-1/2 cursor-pointer md:right-[3rem]"
          onClick={handleTogglePassword}
        >
          <span className="leading-full text-primary text-[10px] uppercase md:text-xs">
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
      )}
      {showErrors && (
        <div className="errors absolute right-12 bottom-4 z-2">
          {errors[name] && (
            <span className="error leading-full text-secondary absolute right-0 bottom-0 text-xs whitespace-nowrap opacity-100 transition-all duration-300 ease-in-out">
              {errors[name].message as string}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
