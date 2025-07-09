import { FaCheck } from "react-icons/fa6"
import { CheckboxStyle } from "../styles/Checkbox.style";

type CustomCheckboxProps = {
  id: string;
  value: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const CustomCheckbox = ({ id, value, checked, onChange }: CustomCheckboxProps) => {
  return (
    <div>
      <input
        type='checkbox'
        id={id}
        value={value}
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
      />
      <CheckboxStyle htmlFor={id} $checked={checked}>
        {
          checked && <FaCheck className="text-white font-semibold" />
        }
      </CheckboxStyle>
    </div>
  )
}
