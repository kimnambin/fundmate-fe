import { TableDataStyle } from "../styles/TableData.style"
import { CustomCheckbox } from "./CustomCheckbox"
import { StatisticsTableData } from '@repo/ui/utils'

export const DataChoiceTable = () => {
  return (

    <table className='table-fixed w-full'>
      <colgroup>
        <col className='w-[55px]' />
        <col className='max-w-[300px] w-[300px]' />
        <col />
      </colgroup>
      <thead>
        <tr className='text-left text-lg'>
          <td className='px-2 py-2 !text-center'>선택</td>
          <td className='px-2 py-2'>이름</td>
          <td className='px-2 py-2'>설명</td>
        </tr>
      </thead>
      <tbody>
        {
          StatisticsTableData.map((v) => (
            <tr className='text-lg' key={v.name}>
              <TableDataStyle><CustomCheckbox id={v.name} value={v.name} /></TableDataStyle>
              <TableDataStyle>{v.menuName}</TableDataStyle>
              <TableDataStyle>{v.description}</TableDataStyle>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
