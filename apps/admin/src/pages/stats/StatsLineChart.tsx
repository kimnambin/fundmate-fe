import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";

interface LineChartDataPoint {
  x: number | string;
  y: number;
}

interface LineChartSeries {
  id: string;
  data: LineChartDataPoint[];
}

interface StatsLineChartProps {
  targetMonth: string;
}

const StatsLineChart: React.FC<StatsLineChartProps> = ({ targetMonth }) => {
  const [data, setData] = useState<LineChartSeries[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetMonth) return;

    const fetchGraphData = async () => {
      try {
        const res = await axios.get(`/api/statistics/graph?target=${targetMonth}`, {
          withCredentials: true,
        });

        const graphData = res.data.data as LineChartSeries[];

        const cleaned = graphData.map((series) => ({
          ...series,
          data: series.data.filter(
            (point) => typeof point.y === "number" && !isNaN(point.y)
          ),
        }));

        setData(cleaned);
      } catch (error) {
        console.error("통계 그래프 데이터 로드 실패:", error);
        setData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [targetMonth]);

  const hasValidData =
    Array.isArray(data) && data.some((series) => series.data.length > 0);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        불러오는 중...
      </div>
    );
  }

  if (!hasValidData) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveLine
        data={data}
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
