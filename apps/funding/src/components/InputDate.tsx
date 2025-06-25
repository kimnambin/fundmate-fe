import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import DatePickerInput from './DatePickerInput';
import { Wrapper } from '../style/inputDate.styles';
import { Label } from '../style/inputText.styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const InputDate = ({ label, placeholder }: Props) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <ReactDatePicker
        selected={date}
        onChange={(d) => setDate(d as Date)}
        placeholderText={placeholder}
        customInput={<DatePickerInput placeholder={placeholder} />}
        dateFormat="yyyy-MM-dd"
      />
    </Wrapper>
  );
};

export default InputDate;
