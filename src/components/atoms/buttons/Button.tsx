import React from 'react';
import { Link } from 'react-router';
import { cn } from '@/utils/cn';

interface BaseButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  bgColor?: string;
  hoverColor?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  to: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  loading = false,
  className = '',
  bgColor = 'bg-secondary',
  hoverColor = 'hover:bg-secondary-hover',
  ...props
}) => {
  const baseClasses = cn(
    'relative box-border flex h-[48px] w-full items-center justify-center rounded-[14px] px-4 transition-colors duration-300 ease-in-out md:h-[5rem] md:rounded-[25px] md:px-8',
    'text-base whitespace-nowrap text-white md:text-[1.25rem]',
    bgColor,
    hoverColor,
    disabled || loading
      ? 'cursor-not-allowed opacity-50'
      : 'cursor-pointer opacity-100',

    className,
  );

  if (props.as === 'link') {
    const { to, onClick, ...linkProps } = props;
    return (
      <Link
        to={to}
        className={baseClasses}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const { type = 'button', onClick } = props;

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};
