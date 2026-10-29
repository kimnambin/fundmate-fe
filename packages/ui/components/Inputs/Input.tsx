import React from 'react';
import { Input } from '../ui/input';
import { Title } from '../../styles';
import { cn } from '../../utils/cn';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  width?: string;
  textSize?: string;
  isError?: boolean;
}

/** shadcn Input 위에 기존 InputText API(label/width/textSize 등)를 유지한 래퍼. */
export const InputText = ({
  label,
  type = 'text',
  width,
  textSize,
  isError,
  className,
  ...props
}: InputTextProps) => {
  return (
    <div className={cn(width ?? 'w-auto', 'flex flex-col gap-[20px]')}>
      {label && <Title>{label}</Title>}
      <Input
        type={type}
        isError={isError}
        className={cn(textSize ?? 'text-[14px]', className)}
        {...props}
      />
    </div>
  );
};
