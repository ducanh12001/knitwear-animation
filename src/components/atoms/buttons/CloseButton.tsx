import React from 'react';
import { cn } from '@/utils/cn';

interface CloseButtonProps {
  onClick?: () => void;
  sizeClassName?: string;
  lineHeight?: string;
  className?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  sizeClassName = 'h-5 w-5 md:h-12 md:w-12',
  lineHeight = 'h-[3px]',
  className = '',
}) => {
  const lineClasses = cn(
    'bg-primary absolute top-1/2 left-1/2  w-full -translate-1/2',
    lineHeight,
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn('relative cursor-pointer', sizeClassName, className)}
      onClick={handleClick}
      role="button"
    >
      <div className={cn(lineClasses, 'rotate-45')} />
      <div className={cn(lineClasses, '-rotate-45')} />
    </div>
  );
};
