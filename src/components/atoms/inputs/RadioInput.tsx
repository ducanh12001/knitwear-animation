import React from 'react';
import type { RadioInputProps } from '@/types';

export const RadioInput: React.FC<RadioInputProps> = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  children,
}) => {
  return (
    <div className="wc_payment_method relative flex h-auto w-full items-center justify-start py-[10px] text-left">
      <input
        id={id}
        type="radio"
        className="input-radio mr-[1em] hidden"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="relative flex h-auto w-full items-center justify-start gap-2 text-base leading-[120%] text-[#1d1d1d] md:gap-4 md:text-[1.25rem]"
        style={{ gridArea: 'label' }}
      >
        <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#1d1d1d] md:h-[1.5rem] md:w-[1.5rem]">
          {checked && (
            <div className="inner absolute top-1/2 left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1d1d1d] md:h-[1.125rem] md:w-[1.125rem]" />
          )}
        </div>
        {label}
        {children}
      </label>
    </div>
  );
};
