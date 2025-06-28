import React from 'react';
import { InputStyle, Label, Wrapper } from './inputText.styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  width?: string;
}

const InputText = ({ label, type = 'text', width, ...props }: Props) => {
  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <InputStyle type={type} {...props} />
    </Wrapper>
  );
};

export default InputText;
