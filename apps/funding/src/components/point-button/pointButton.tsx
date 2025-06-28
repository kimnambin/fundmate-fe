import { Wrapper } from './pointButton.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
}

const PointButton = ({ label, width, ...props }: Props) => {
  return (
    <Wrapper width={width} {...props}>
      {label}
    </Wrapper>
  );
};

export default PointButton;
