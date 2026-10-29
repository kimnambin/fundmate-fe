import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isError?: boolean;
  isVerificated?: boolean;
  width?: string;
  textSize?: string;
  textWeight?: string;
  label: string;
}

/** @repo/ui의 shadcn Button 위에 기존 MainButton API(label/isError/isVerificated 등)를 유지한 래퍼. */
export const MainButton = ({
  isError,
  isVerificated,
  width,
  textSize,
  textWeight,
  label,
  className,
  disabled,
  ...props
}: MainButtonProps) => {
  return (
    <Button
      variant={isError ? 'secondary' : 'default'}
      disabled={disabled || isError || isVerificated}
      className={cn(
        width ?? 'w-auto',
        textSize ?? 'text-[14px]',
        textWeight ?? 'font-normal',
        isVerificated && 'cursor-not-allowed opacity-50',
        isError && 'cursor-not-allowed bg-gray-400 text-white',
        className,
      )}
      {...props}
    >
      {label}
    </Button>
  );
};
