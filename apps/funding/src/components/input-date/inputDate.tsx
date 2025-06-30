import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Wrapper } from './inputDate.styles';
import { Label } from '../input-text/inputText.styles';
import InputDatePicker from '../input-date-picker/inputDatePicker';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  width?: string;
}

const InputDate = ({ label, placeholder, width }: Props) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <ReactDatePicker
        selected={date}
        onChange={(d) => setDate(d as Date)}
        placeholderText={placeholder}
        customInput={<InputDatePicker placeholder={placeholder} />}
        dateFormat="yyyy-MM-dd"
      />
    </Wrapper>
  );
};

export default InputDate;
