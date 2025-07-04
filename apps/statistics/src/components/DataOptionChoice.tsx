import { TableDataStyle } from "../styles/TableData.style"
import { StatisticsOptionData } from '@repo/ui/utils'
import { CustomRadio } from "./CustomRadio"
import { useState } from "react"

export const DataOptionChoiceTable = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <table className='table-fixed w-full'>
      <colgroup>
        <col className='max-w-[300px] w-[100px]' />
        <col />
      </colgroup>
      <thead>
        <tr className='text-left text-lg'>
          <td className='py-2 !text-center'>옵션명</td>
          <td className='px-2 py-2'>선택</td>
        </tr>
      </thead>
      <tbody>
        {
          StatisticsOptionData.map((v) => (
            <tr className="text-lg" key={v.name}>
              <TableDataStyle>{v.menuName}</TableDataStyle>
              <TableDataStyle>
                <div className="grid grid-cols-9 gap-3">
                  {
                    v.options.map((item) => (
                      <div key={item} className="flex flex-row gap-3">
                        <CustomRadio
                          id={`${v.name}-${item}`}
                          name={v.name}
                          selected={selectedOptions[v.name] || ""}
                          onChange={(value) => handleChange(v.name, value)} />
                        {item}
                      </div>
                    ))
                  }
                </div>
              </TableDataStyle>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
