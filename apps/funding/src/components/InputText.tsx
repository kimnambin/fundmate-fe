import React from 'react';
import { InputStyle, Label, Wrapper } from '../style/inputText.styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number';
}

const InputText = ({ label, type = 'text', ...props }: Props) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputStyle type={type} {...props} />
    </Wrapper>
  );
};

export default InputText;
