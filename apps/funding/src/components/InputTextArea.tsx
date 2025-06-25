import { Label } from '../style/inputText.styles';
import { InputStyle, Wrapper } from '../style/inputTextArea.style';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const InputTextArea = ({ label, placeholder, ...props }: Props) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputStyle placeholder={placeholder} rows={6} {...props} />
    </Wrapper>
  );
};

export default InputTextArea;
