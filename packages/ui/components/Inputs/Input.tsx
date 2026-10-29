import React from 'react';
import TextField from '@mui/material/TextField';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  width?: string;
  textSize?: string;
  isError?: boolean;
}

/** MUI TextField 위에 기존 InputText API(label/width/textSize 등)를 유지한 래퍼. */
export const InputText = ({
  label,
  type = 'text',
  width,
  textSize,
  isError,
  ...props
}: InputTextProps) => {
  return (
    <TextField
      label={label}
      type={type}
      error={isError}
      variant="outlined"
      size="small"
      sx={{
        width: width ?? 'auto',
        '& .MuiInputBase-input': { fontSize: textSize ?? 14 },
      }}
      {...(props as React.ComponentProps<typeof TextField>)}
    />
  );
};
