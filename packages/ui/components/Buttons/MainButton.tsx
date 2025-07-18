import { ButtonWrapper } from "../../styles/Button.styles";

interface MainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isError?: boolean;
  isVerificated?: boolean;
  width?: string;
  textSize?: string;
  textWeight?: string;
  label: string;
}

export const MainButton = ({
  isError,
  isVerificated,
  width,
  textSize,
  textWeight,
  label,
  ...props
}: MainButtonProps) => {
  return (
    <ButtonWrapper
      $width={width}
      $textSize={textSize}
      $textWeight={textWeight}
      $isError={isError}
      $isVerificated={isVerificated}
      {...props}
    >
      {label}
    </ButtonWrapper>
  );
}
