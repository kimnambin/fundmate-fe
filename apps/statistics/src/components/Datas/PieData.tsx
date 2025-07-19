import { ResponsivePie } from '@nivo/pie';
import type { ConvertedChartData } from '../../utils/pieChartConverter';

type DataProps = {
  data: ConvertedChartData[];
};

export const StatisticsPie = ({ data }: DataProps) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
      colors={data.map((d: ConvertedChartData) => d.color)}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    />
  );
};
