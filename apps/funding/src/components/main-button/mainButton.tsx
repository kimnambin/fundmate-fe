import { Wrapper } from './mainButton.styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
}

const MainButton = ({ label, width, ...props }: Props) => {
  return (
    <Wrapper width={width} {...props}>
      {label}
    </Wrapper>
  );
};

export default MainButton;
