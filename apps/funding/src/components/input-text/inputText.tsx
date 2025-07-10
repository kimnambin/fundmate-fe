import React from 'react';
import { InputStyle, Label, Wrapper } from './inputText.styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  width?: string;
  isError?: boolean;
}

const InputText = ({
  label,
  type = 'text',
  width,
  isError,
  ...props
}: Props) => {
  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <InputStyle type={type} {...props} isError={isError} {...props} />
    </Wrapper>
  );
};

export default InputText;
