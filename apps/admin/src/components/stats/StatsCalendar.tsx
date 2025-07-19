import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  getISOWeek,
  isSameMonth,
  isSameDay,
  setMonth,
  setYear,
} from 'date-fns';
import classNames from 'classnames';

interface StatsCalendarProps {
  onDateChange?: (startDate: string, endDate: string) => void;
}

const StatsCalendar: React.FC<StatsCalendarProps> = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const triggerDateRange = (date: Date) => {
    const start = format(startOfMonth(date), 'yyyy-MM-dd');
    const end = format(endOfMonth(date), 'yyyy-MM-dd');
    onDateChange?.(start, end);
  };

  const handleMonthChange = (month: number) => {
    const updated = setMonth(currentDate, month);
    console.log("월 변경:", month + 1);
    setCurrentDate(updated);
    triggerDateRange(updated);
  };

  const handleYearChange = (year: number) => {
    const updated = setYear(currentDate, year);
    console.log("연도 변경:", year);
    setCurrentDate(updated);
    triggerDateRange(updated);
  };

  const handleDateClick = (date: Date) => {
    console.log("날짜 클릭:", format(date, 'yyyy-MM-dd'));
    setSelectedDate(date);
    setCurrentDate(date);
    triggerDateRange(date);
  };

  useEffect(() => {
    console.log("초기 마운트 시 triggerDateRange");
    triggerDateRange(currentDate);
  }, []);

  const renderHeader = () => (
    <div className="flex justify-center gap-3 items-center mb-2">
      <select
        className="border rounded px-2 py-1"
        value={currentDate.getFullYear()}
        onChange={(e) => handleYearChange(parseInt(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>

      <select
        className="border rounded px-2 py-1"
        value={currentDate.getMonth()}
        onChange={(e) => handleMonthChange(parseInt(e.target.value))}
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m + 1}월
          </option>
        ))}
      </select>
    </div>
  );

  const renderDays = () => {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return (
      <div className="grid grid-cols-8 w-full text-center text-sm">
        <div></div>
        {days.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const weekStart = new Date(day);
      const weekNumber = getISOWeek(weekStart);

      const weekRow = [
        <div
          key={`week-${weekNumber}`}
          className="bg-[#333] text-white text-xs rounded flex items-center justify-center h-10"
        >
          {weekNumber % 100}
        </div>,
      ];

      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const formattedDate = format(cloneDay, 'd');
        const isSelectedDay = isSameDay(cloneDay, selectedDate);

        weekRow.push(
          <div
            key={cloneDay.toString()}
            className={classNames(
              'h-10 md:h-[43px] flex items-center justify-center rounded cursor-pointer text-sm',
              {
                'text-gray-400': !isSameMonth(cloneDay, monthStart),
                'bg-[#333] text-white': isSelectedDay,
                'text-[#DC3E3E]': !isSelectedDay && cloneDay.getDay() === 0,
                'text-[#00406C]': !isSelectedDay && cloneDay.getDay() === 6,
              }
            )}
            onClick={() => handleDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div
          key={`week-row-${format(weekStart, 'yyyy-MM-dd')}`}
          className="grid grid-cols-8 gap-[6px] mt-1 w-full"
        >
          {weekRow}
        </div>
      );
    }

    return <div className="w-full">{rows}</div>;
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default StatsCalendar;
