import { FaCircle } from 'react-icons/fa6';
import { MediumFont } from '@repo/ui/styles';

interface PieItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface PieDataTableProps {
  data: PieItem[];
}

export const PieDataTable = ({ data }: PieDataTableProps) => {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <table className="w-full p-4 h-full">
      <colgroup>
        <col />
        <col className="max-w-[300px] w-[300px]" />
        <col className="max-w-[300px] w-[300px]" />
      </colgroup>
      <thead className="border-b border-r-gray-200">
        <tr>
          <th className="text-start px-3">
            <MediumFont>항목</MediumFont>
          </th>
          <th className="text-end px-3">
            <MediumFont>값</MediumFont>
          </th>
          <th className="text-end px-3">
            <MediumFont>%</MediumFont>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="p-3">
              <div className="flex flex-row items-center gap-3">
                <FaCircle style={{ color: item.color }} />
                {item.label}
              </div>
            </td>
            <td className="p-3 text-end">{item.value}</td>
            <td className="p-3 text-end">
              {((item.value / total) * 100).toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
