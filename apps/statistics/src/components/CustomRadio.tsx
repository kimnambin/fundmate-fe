import { FaCheck } from "react-icons/fa6"
import { CheckboxStyle } from "../styles/Checkbox.style";

type CustomRadioProps = {
  id: string;
  name: string;
  value: string;
  selected: string;
  onChange: (value: string) => void
}

export const CustomRadio = ({ id, selected, value, name, onChange }: CustomRadioProps) => {
  const isSelected = selected === id;

  return (
    <div>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        className="hidden"
        checked={isSelected}
        onChange={() => onChange(id)}
      />
      <CheckboxStyle htmlFor={id} $checked={isSelected}>
        {
          isSelected && <FaCheck className="text-white font-semibold" />
        }
      </CheckboxStyle>
    </div>
  )
}
