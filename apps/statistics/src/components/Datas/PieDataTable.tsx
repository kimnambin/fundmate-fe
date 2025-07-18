import { FaCircle } from "react-icons/fa6";
import { MediumFont } from "@repo/ui/styles";
import { tempData, tempYearData } from "../../data/tempData";

export const PieDataTable = () => {
  const years = tempYearData();
  const result = tempData.reduce((acc, curr) => acc + curr.value, 0);

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
            <MediumFont>
              연도
            </MediumFont>
          </th>
          <th className="text-end px-3">
            <MediumFont>
              값
            </MediumFont>
          </th>
          <th className="text-end px-3">
            <MediumFont>
              %
            </MediumFont>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          years.map((v, i) => {
            const item = tempData[i];
            if (!item) return null;
            return (
              <tr key={v}>
                <td className="p-3">
                  <div className="flex flex-row items-center gap-3">
                    <FaCircle style={{ color: item.color }} />
                    {v}
                  </div>
                </td>
                <td className="p-3 text-end">{item.value}</td>
                <td className="p-3 text-end">{(item.value / result * 100).toFixed(2)}%</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
