import { TableDataStyle } from "../styles/TableData.style"
import { StatisticsOptionData } from '@repo/ui/utils'
import { CustomRadio } from "./CustomRadio"
import { MediumFont } from "@repo/ui/styles"
import type { DataOptionChoiceProps, OptionSelectionProps } from "../types/Statistics.type"

export const DataOptionChoiceTable = ({ selected, setSelected }: DataOptionChoiceProps) => {
  const handleOptionChange = (group: keyof OptionSelectionProps, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [group]: value
    }))
  }

  return (
    <table className='table-fixed w-full'>
      <colgroup>
        <col className='max-w-[300px] w-[100px]' />
        <col />
      </colgroup>
      <thead>
        <tr className='text-left'>
          <td className='py-2 !text-center'>
            <MediumFont>
              옵션명
            </MediumFont>
          </td>
          <td className='px-2 py-2'>
            <MediumFont>
              선택
            </MediumFont>
          </td>
        </tr>
      </thead>
      <tbody>
        {
          StatisticsOptionData.map((v) => (
            <tr className="text-lg" key={v.name}>
              <TableDataStyle><MediumFont>{v.menuName}</MediumFont></TableDataStyle>
              <TableDataStyle>
                <div className="grid grid-cols-9 gap-1">
                  {
                    v.options.map((item) => (
                      <div key={item} className="flex flex-row items-center gap-3">
                        <CustomRadio
                          id={`${v.name}-${item}`}
                          name={v.name}
                          value={item}
                          selected={`${v.name}-${selected[v.name as keyof OptionSelectionProps]}`}
                          onChange={() => handleOptionChange(v.name as keyof OptionSelectionProps, item)} />
                        <MediumFont>
                          {item}
                        </MediumFont>
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
