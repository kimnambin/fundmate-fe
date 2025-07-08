import { ResponsiveLine } from "@nivo/line"

export const LineData = ({ data }: any) => {
  <ResponsiveLine
    data={data}
    margin={{ top: 50, bottom: 50, right: 50, left: 50 }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    axisBottom={{ legend: '연도', legendOffset: 36 }}
    axisLeft={{ legend: '명', legendOffset: -40 }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'seriesColor' }}
    pointLabelYOffset={-12}
    enableCrosshair={true}
    useMesh={true}
  />
}
