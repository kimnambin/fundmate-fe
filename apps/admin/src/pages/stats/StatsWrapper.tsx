import { useState } from 'react';
import StatsCalendar from '../../components/stats/StatsCalendar';
import StatsSummary from '../../pages/stats/statsSummary';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const StatsWrapper = () => {
  const today = new Date();
  const defaultStart = format(startOfMonth(today), 'yyyy-MM-dd');
  const defaultEnd = format(endOfMonth(today), 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex gap-10 w-full">
      <StatsCalendar onDateChange={handleDateChange} />
      <StatsSummary startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default StatsWrapper;
