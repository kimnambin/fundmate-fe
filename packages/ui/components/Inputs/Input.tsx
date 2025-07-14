import React from 'react';
import { Wrapper } from '../../styles/Input.style';
import { Title } from '../../styles';
import { InputStyle } from '../../styles/Input.style';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  width?: string;
  textSize?: string;
  isError?: boolean;
}

export const InputText = ({ label, type = 'text', width, textSize, isError, ...props }: InputTextProps) => {
  return (
    <Wrapper $width={width}>
      {label && <Title>{label}</Title>}
      <InputStyle type={type} $textSize={textSize} $isError={isError} {...props} />
    </Wrapper>
  );
};
