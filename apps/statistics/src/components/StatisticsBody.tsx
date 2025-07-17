import { SubTitle, Title } from '@repo/ui/styles';
import { HorizonLine } from '../styles/Common.style';
import { StatisticsPie } from './Datas/PieData';
import { tempData, tempYearData } from '../data/tempData';
import { PieDataTable } from './Datas/PieDataTable';
import { MapData } from './Datas/MapData';
import { LineData } from './Datas/LineData';
import { commonApiInstance } from '@repo/ui/hooks';
import { useQuery } from '@tanstack/react-query';

const data = tempYearData().reduce<{ x: number; y: number }[]>((acc, y, i) => {
  const item = tempData[i];
  if (item) {
    acc.push({ x: y, y: item.value });
  }
  return acc;
}, []);

const lineData = [
  {
    id: 'data',
    data: data,
  },
];

const getPublicData = async (data: any, selected: any) => {
  const response = await commonApiInstance.post(`/datas/${selected}`, data);
  return response.data;
};

export const StatisticsBody = (rawData: any) => {
  const { filteredData, selected } = rawData.rawData;
  const { data, isLoading } = useQuery({
    queryKey: ['statistics', selected, filteredData],
    queryFn: () => getPublicData(filteredData, selected),
    staleTime: 1000 * 60,
  });
  console.log(filteredData, selected);

  console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <Title>인구 통계 결과</Title>
      <HorizonLine />
      <div className="flex flex-col gap-3">
        <SubTitle>연도별 인구 비율</SubTitle>
        <div className="flex flex-row h-full min-h-[500px]">
          <div className="flex flex-row basis-[600px] shrink order-0">
            <StatisticsPie data={tempData} />
          </div>
          <div className="m-5 p-5 shadow-lg rounded-[10px] flex flex-row grow shrink">
            <PieDataTable />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <SubTitle>연도별 인구 비율(누적)</SubTitle>
        <div className="flex flex-row">
          <div className="p-5 flex flex-row basis-[600px] shrink-1 order-0">
            <MapData />
          </div>
          <div className="m-5 p-5 rounded-[10px] flex flex-col grow shrink shadow-lg">
            <LineData data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
};
