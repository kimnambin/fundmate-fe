import { useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { CheckboxStyle } from "../styles/Checkbox.style";

type CustomCheckboxProps = {
  id: string;
  value: string;
}

export const CustomCheckbox = ({ id, value }: CustomCheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        type='checkbox'
        id={id}
        value={value}
        className="hidden"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <CheckboxStyle htmlFor={id} $checked={checked}>
        {
          checked && <FaCheck className="text-white font-semibold" />
        }
      </CheckboxStyle>
    </div>
  )
}
