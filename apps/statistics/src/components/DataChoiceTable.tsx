import { MediumFont } from '@repo/ui/styles';
import { TableDataStyle } from '../styles/TableData.style';
import { CustomCheckbox } from './CustomCheckbox';
import { StatisticsTableData } from '@repo/ui/utils';
import type {
  DataChoiceTableProps,
  DataSelectionProps,
} from '../types/Statistics.type';

export const DataChoiceTable = ({
  selected,
  setSelected,
}: DataChoiceTableProps) => {
  const handleSelected = (value: keyof DataSelectionProps) => {
    setSelected((prev) => ({
      ...prev,
      [value]: prev[value] === 0 ? 1 : 0,
    }));
  };

  return (
    <table className="table-fixed w-full">
      <colgroup>
        <col className="w-[55px]" />
        <col className="max-w-[300px] w-[300px]" />
        <col />
      </colgroup>
      <thead>
        <tr className="text-left">
          <td className="px-2 py-2 !text-center">
            <MediumFont>선택</MediumFont>
          </td>
          <td className="px-2 py-2">
            <MediumFont>이름</MediumFont>
          </td>
          <td className="px-2 py-2">
            <MediumFont>설명</MediumFont>
          </td>
        </tr>
      </thead>
      <tbody>
        {StatisticsTableData.map((v) => (
          <tr className="text-lg" key={v.name}>
            <TableDataStyle>
              <div className="flex justify-center items-center">
                <CustomCheckbox
                  id={v.name}
                  value={v.name}
                  checked={selected[v.name as keyof DataSelectionProps] === 1}
                  onChange={() =>
                    handleSelected(v.name as keyof DataSelectionProps)
                  }
                />
              </div>
            </TableDataStyle>
            <TableDataStyle>
              <MediumFont>{v.menuName}</MediumFont>
            </TableDataStyle>
            <TableDataStyle>
              <MediumFont>{v.description}</MediumFont>
            </TableDataStyle>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
