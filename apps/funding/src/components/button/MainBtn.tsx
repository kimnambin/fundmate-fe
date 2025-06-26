import { Wrapper } from '../../style/button/mainBtn.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
}

const MainBtn = ({ label, width, ...props }: Props) => {
  return (
    <Wrapper width={width} {...props}>
      {label}
    </Wrapper>
  );
};

export default MainBtn;
