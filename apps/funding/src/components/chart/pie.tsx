import { ResponsivePie } from '@nivo/pie';
import type { ChartData } from '../../pages/askFundi/askFundiResult';

interface Props {
  data: ChartData[];
}

export const PieChart = ({ data }: Props) => {
  return (
    <div className="w-[400px] h-[300px] my-auto mx-0">
      <ResponsivePie
        data={data}
        colors={{ datum: 'data.color' }}
        margin={{ top: 40, bottom: 80 }}
        innerRadius={0.5}
        padAngle={1} // 파이 조각 간격
        cornerRadius={2} // 파이 조각 모서리
        activeOuterRadiusOffset={8} // 호버 시 강조 세기
        // 파이와 텍스트 이어주는 선
        arcLinkLabelsSkipAngle={10} // 해당 각도 미만이면 표시 생략
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10} // 해당 각도 미만이면 표시 생략
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      />
    </div>
  );
};

export default PieChart;
