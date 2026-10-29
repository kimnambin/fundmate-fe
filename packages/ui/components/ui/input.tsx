import * as React from 'react';

import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

/** shadcn/ui 표준 Input 프리미티브. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full rounded-[5px] border px-[15px] py-[10px] text-[14px] placeholder-input-text',
          'focus:border-main focus:outline-none',
          isError ? 'border-red' : 'border-line',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
