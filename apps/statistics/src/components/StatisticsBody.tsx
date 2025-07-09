import { SubTitle, Title } from "@repo/ui/styles"
import { HorizonLine } from "../styles/Common.style";
import { StatisticsPie } from "./Datas/PieData";
import { tempData, tempYearData } from '../../public/tempData'
import { PieDataTable } from "./Datas/PieDataTable";
import { MapData } from "./Datas/MapData";
import { LineData } from "./Datas/LineData";


const data = tempYearData().map((y, i) => ({
  x: y,
  y: tempData[i].value
}))

const lineData = [
  {
    id: 'data',
    data: data
  }
]

export const StatisticsBody = () => {
  return (
    <div className="flex flex-col gap-5">
      <Title>인구 통계 결과</Title>
      <HorizonLine />
      <div className="flex flex-col gap-3">
        <SubTitle>연도별 인구 비율</SubTitle>
        <div className="flex flex-row">
          <div className="flex flex-row basis-[600px] shrink-1 order-0">
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
