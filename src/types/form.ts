import type { ReactNode } from 'react';
import type {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

export interface BaseFormInputProps<
  TFormData extends FieldValues = FieldValues,
> {
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
  validation?: RegisterOptions<TFormData, Path<TFormData>>;
  errors: FieldErrors<TFormData>;
}

export interface FormInputProps<TFormData extends FieldValues = FieldValues>
  extends BaseFormInputProps<TFormData> {
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showErrors?: boolean;
  className?: string;
}

export interface CheckboxInputProps<TFormData extends FieldValues = FieldValues>
  extends BaseFormInputProps<TFormData> {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  label: ReactNode;
  errorPosition?: string;
}

export interface RadioInputProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface CountrySelectProps<TFormData extends FieldValues = FieldValues>
  extends BaseFormInputProps<TFormData> {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}
