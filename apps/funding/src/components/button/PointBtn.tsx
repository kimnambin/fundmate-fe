import { Wrapper } from '../../style/button/pointBtn.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const PointBtn = ({ label, ...props }: Props) => {
  return <Wrapper {...props}>{label}</Wrapper>;
};

export default PointBtn;
