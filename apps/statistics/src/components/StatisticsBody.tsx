import { Title } from "@repo/ui/styles"
import { HorizonLine } from "../styles/Common.style";
import { StatisticsPie } from "./Datas/PieData";
import { tempData, tempYearData } from '../../public/tempData'
import { PieDataTable } from "./Datas/PieDataTable";
import { MapData } from "./Datas/MapData";
import { LineData } from "./Datas/LineData";

const data = tempYearData().map((y, i) => {
  const item = tempData[i]
  const makeData = { x: y, y: item.value }

})

const lineData = [
  {
    id: 'data',
    data: data
  }
]

export const StatisticsBody = () => {
  return (
    <div>
      <Title>인구 통계 결과</Title>
      <HorizonLine />
      <div className="flex flex-row">
        <div className="flex flex-row basis-[800px] shrink-1 order-0">
          <StatisticsPie data={tempData} />
        </div>
        <div className="m-5 p-5 shadow-lg rounded-[10px] w-full flex flex-row grow shrink">
          <PieDataTable />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="m-5 p-5 rounded-[10px] shadow-lg flex flex-row basis-[600px] shrink-1 order-0 border border-e-rose-50">
          <MapData />
        </div>
        <div className="flex flex-col grow shrink border border-r-sky-200">
          <LineData />
        </div>
      </div>
    </div>
  );
};
