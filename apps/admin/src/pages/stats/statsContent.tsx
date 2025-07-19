import React, { useState } from "react";
import StatsCalendar from "../../components/stats/StatsCalendar";
import StatsSummary from "./statsSummary";
import SupporterPieChart from "./SupporterPieChart";
import StatsLineChart from "./StatsLineChart";
import { Title } from "@repo/ui/styles";
import { format, startOfMonth, endOfMonth } from "date-fns";

const StatsContent: React.FC = () => {
  const today = new Date();
  const defaultStart = format(startOfMonth(today), "yyyy-MM-dd");
  const defaultEnd = format(endOfMonth(today), "yyyy-MM-dd");

  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const targetMonth = startDate.slice(0, 7);

  return (
    <div className="w-full">
      <div className="w-full border border-gray-300 rounded-lg p-6 bg-white flex flex-col gap-6">
        <Title className="text-gray-800">통계 내역</Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white rounded-md p-4">
            <StatsCalendar onDateChange={handleDateChange} />
          </div>

          <div className="bg-white rounded-md p-4">
            <StatsSummary startDate={startDate} endDate={endDate} />
          </div>

          <div className="bg-white rounded-md p-4">
            <SupporterPieChart />
          </div>

          <div className="md:col-span-3 bg-white rounded-md p-6">
            <StatsLineChart targetMonth={targetMonth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsContent;
