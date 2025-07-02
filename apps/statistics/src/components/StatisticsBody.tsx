import { StatisticsTableData } from '@repo/ui/utils';

export const StatisticsBody = () => {
  return (
    <div className="my-[70px] w-full outline outline-emerald-600">
      <span className="text-2xl font-semibold">타겟층 통계 및 지역 분석</span>
      <table className='my-7 w-full outline outline-indigo-600'>
        <thead>
          <tr>
            <th>선택</th>
            <th>지표명</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {StatisticsTableData.map((data) => (
            <tr key={data.name}>
              <td>
                <input value={data.name} type="checkbox" />
              </td>
              <td>{data.menuName}</td>
              <td>{data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
