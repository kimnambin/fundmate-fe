import { forwardRef } from 'react';
import CalendarIcon from '../../assets/icons/ic_calendar-days.svg';
import {
  DatePickerField,
  DatePickerWrapper,
} from '../../style/input/inputDate.styles';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
}

const DatePickerInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <DatePickerWrapper>
      <DatePickerField
        ref={ref}
        readOnly
        value={value}
        onClick={onClick}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-y-0 right-4 flex items-center"
        aria-label="달력 열기"
      >
        <img src={CalendarIcon} alt="calender icon" />
      </button>
    </DatePickerWrapper>
  ),
);

export default DatePickerInput;
