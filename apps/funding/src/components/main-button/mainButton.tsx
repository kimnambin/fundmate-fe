import { Wrapper } from './mainButton.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
  textSize?: string;
  textWeight?: string;
}

const MainButton = ({
  label,
  width,
  textSize,
  textWeight,
  ...props
}: Props) => {
  return (
    <Wrapper
      width={width}
      textSize={textSize}
      textWeight={textWeight}
      {...props}
    >
      {label}
    </Wrapper>
  );
};

export default MainButton;
