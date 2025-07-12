import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  getISOWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import classNames from 'classnames';

const StatsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const renderHeader = () => (
    <div className="flex justify-between items-center w-full px-2">
      <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="text-[20px]">{`<`}</button>
      <span className="text-[16px] font-normal">{format(currentDate, 'MMMM yyyy')}</span>
      <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-[20px]">{`>`}</button>
    </div>
  );

  const renderDays = () => {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return (
      <div className="grid grid-cols-8 mt-2 w-full text-center text-sm">
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
      const weekNumber = getISOWeek(day);
      const weekRow = [
        <div
          key={`week-${weekNumber}`}
          className="bg-[#333] text-white text-xs rounded flex items-center justify-center h-10"
        >
          {weekNumber % 100}
        </div>,
      ];

      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const isToday = isSameDay(day, selectedDate ?? new Date());

        weekRow.push(
          <div
            key={day.toString()}
            className={classNames(
              "h-10 md:h-[43px] flex items-center justify-center rounded cursor-pointer text-sm",
              {
                "text-gray-400": !isSameMonth(day, monthStart),
                "bg-[#333] text-white": isToday,
                "text-[#DC3E3E]": !isToday && day.getDay() === 0,
                "text-[#00406C]": !isToday && day.getDay() === 6,
              }
            )}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-8 gap-[6px] mt-1 w-full">
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
