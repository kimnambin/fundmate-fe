import { Wrapper } from './pointButton.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const PointButton = ({ label, ...props }: Props) => {
  return <Wrapper {...props}>{label}</Wrapper>;
};

export default PointButton;
