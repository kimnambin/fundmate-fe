import { ResponsiveLine } from '@nivo/line';

interface DataProps {
  x: string | number;
  y: number;
}

export interface DataArrayProps {
  id: any;
  data: DataProps[];
}

interface LineDataProps {
  data: DataArrayProps[];
}

export const LineData = ({ data }: LineDataProps) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, bottom: 50, right: 150, left: 100 }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      axisBottom={{ legend: '연도', legendOffset: 36 }}
      axisLeft={{ legend: '명', legendOffset: -40, tickValues: 7 }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'seriesColor' }}
      pointLabelYOffset={-12}
      enableCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 100,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: 'circle',
        },
      ]}
    />
  );
};
