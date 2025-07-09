import React, { useEffect, useRef } from 'react';
import { Label } from '../input-text/inputText.styles';
import { InputStyle, Wrapper } from './inputTextArea.styles';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  width?: string;
  rows?: number;
}

const InputTextArea = ({
  label,
  placeholder,
  width,
  rows = 1,
  onChange,
  ...props
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (ta: HTMLTextAreaElement) => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  });

  const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    autoResize(e.currentTarget);
    props.onInput?.(e);
  };

  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <InputStyle
        placeholder={placeholder}
        rows={rows}
        ref={textareaRef}
        onInput={handleInput}
        onChange={onChange}
        {...props}
      />
    </Wrapper>
  );
};

export default InputTextArea;
