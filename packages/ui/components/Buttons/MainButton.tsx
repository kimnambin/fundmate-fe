import Button from '@mui/material/Button';

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isError?: boolean;
  isVerificated?: boolean;
  width?: string;
  textSize?: string;
  textWeight?: string;
  label: string;
}

/** MUI Button 위에 기존 MainButton API(label/isError/isVerificated 등)를 유지한 래퍼. */
export const MainButton = ({
  isError,
  isVerificated,
  width,
  textSize,
  textWeight,
  label,
  disabled,
  style,
  ...props
}: MainButtonProps) => {
  return (
    <Button
      variant="contained"
      color={isError ? 'inherit' : 'primary'}
      disabled={disabled || isError || isVerificated}
      disableElevation
      sx={{
        width: width ?? 'auto',
        fontSize: textSize ?? 14,
        fontWeight: textWeight ?? 400,
      }}
      style={style}
      {...(props as React.ComponentProps<typeof Button>)}
    >
      {label}
    </Button>
  );
};
