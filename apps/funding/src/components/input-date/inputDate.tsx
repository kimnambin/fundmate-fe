import ReactDatePicker from 'react-datepicker';
import InputDatePicker from '../input-date-picker/inputDatePicker';
import { Label } from '../input-text/inputText.styles';
import { Wrapper } from './inputDate.styles';

interface Props {
  label?: string;
  placeholder?: string;
  width?: string;
  isError?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const InputDate = ({
  label,
  placeholder,
  width,
  isError,
  value,
  onChange,
}: Props) => {
  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (!onChange) return;

    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  return (
    <Wrapper width={width}>
      {label && <Label>{label}</Label>}
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText={placeholder}
        customInput={
          <InputDatePicker placeholder={placeholder} isError={isError} />
        }
        dateFormat="yyyy-MM-dd"
      />
    </Wrapper>
  );
};

export default InputDate;
