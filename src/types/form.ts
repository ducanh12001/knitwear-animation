import type {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';

export interface FormInputProps {
  type?: 'text' | 'email' | 'password' | 'tel';
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showErrors?: boolean;
  className?: string;
}

export interface CheckboxInputProps {
  name: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  label: React.ReactNode;
  errorPosition?: string;
}

export interface RadioInputProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export interface CountryOption {
  value: string;
  label: string;
}

export interface CountrySelectProps {
  name: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors?: FieldErrors;
}

export interface StripeCardElementProps {
  onCardChange?: (event: any) => void;
  error?: string | null;
}
