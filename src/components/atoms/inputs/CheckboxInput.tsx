import type { CheckboxInputProps } from '@/types';
import type { FieldValues } from 'react-hook-form';

export const CheckboxInput = <TFormData extends FieldValues = FieldValues>({
  name,
  register,
  validation,
  errors,
  isChecked,
  setIsChecked,
  label,
  errorPosition = 'left-0',
}: CheckboxInputProps<TFormData>) => {
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="relative h-auto w-full">
      <label className="relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 md:gap-[1rem]">
        <input
          type="checkbox"
          {...register(name, validation)}
          className="invisible z-2 box-border hidden p-0 opacity-0"
          onChange={handleChange}
        />
        <div className="custom-check border-primary relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border md:h-[2rem] md:w-[2rem] md:rounded-[0.6rem]">
          <div
            className={`inner-check bg-primary relative h-3 w-3 mask-[url('/check.svg')] mask-no-repeat transition-opacity duration-200 ease-in-out md:h-[1.5rem] md:w-[1.5rem] ${isChecked ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <span className="leading-full text-primary flex-1 basis-[100%] text-[14px] md:basis-auto md:text-base">
          {label}
        </span>
        <div className={`absolute bottom-[-1rem] ${errorPosition}`}>
          {errors[name] && (
            <span className="leading-full text-secondary absolute bottom-0 left-0 text-xs whitespace-nowrap opacity-100 transition-all duration-300 ease-in-out">
              {errors[name].message as string}
            </span>
          )}
        </div>
      </label>
    </div>
  );
};
