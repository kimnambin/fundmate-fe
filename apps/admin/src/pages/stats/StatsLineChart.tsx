import React from "react";
import { ResponsiveLine } from "@nivo/line";

interface LineChartDataPoint {
  x: number | string;
  y: number;
}

interface LineChartSeries {
  id: string;
  data: LineChartDataPoint[];
}

interface StatsLineChartProps {
  data?: LineChartSeries[]; // ❗ 선택적 + undefined 허용
}

const StatsLineChart: React.FC<StatsLineChartProps> = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveLine
        data={safeData}
        margin={{ top: 20, right: 30, bottom: 50, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          stacked: false,
          reverse: false,
        }}
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -30,
          legendPosition: "middle",
        }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        colors={["#4FADF7", "#71C3F5"]}
        sliceTooltip={({ slice }) => (
          <div
            style={{
              background: "white",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              whiteSpace: "nowrap",
            }}
          >
            {slice.points.map((point) => (
              <div
                key={point.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    background: point.seriesColor,
                    borderRadius: "2px",
                  }}
                />
                <span style={{ color: "#333", fontWeight: 500 }}>
                  {point.seriesId}:
                </span>
                <span style={{ color: "#333", fontWeight: 600 }}>
                  {point.data.yFormatted}
                </span>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default StatsLineChart;
