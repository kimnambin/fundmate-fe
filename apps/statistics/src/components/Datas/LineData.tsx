import { ResponsiveLine } from '@nivo/line';
import { useIsMobile } from '@repo/ui/hooks';

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
  const isMobile = useIsMobile();

  return (
    <ResponsiveLine
      data={data}
      margin={
        isMobile
          ? { top: 20, bottom: 50, right: 20, left: 64 }
          : { top: 50, bottom: 50, right: 150, left: 100 }
      }
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      axisBottom={{ legend: '연도', legendOffset: 36 }}
      axisLeft={{
        legend: '명',
        legendOffset: isMobile ? -54 : -40,
        tickValues: 7,
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'seriesColor' }}
      pointLabelYOffset={-12}
      enableCrosshair={true}
      useMesh={true}
      // 모바일에서는 범례 자리가 없어 숨긴다 (시리즈는 툴팁으로 확인)
      legends={
        isMobile
          ? []
          : [
              {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: 'circle',
              },
            ]
      }
    />
  );
};
