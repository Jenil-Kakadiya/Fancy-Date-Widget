import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDown } from 'lucide-react';

const DatePicker = () => {
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const popoverRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 }, 
    (_, i) => currentYear - i
  ).reverse();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsMonthSelectOpen(false);
        setIsYearSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleDateClick = (newDate) => {
    setDate(newDate);
    setIsOpen(false);
  };

  const handleMonthChange = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex));
    setIsMonthSelectOpen(false);
  };

  const handleYearChange = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setIsYearSelectOpen(false);
  };

  const generateCalendarDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-6 h-6" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = new Date().toDateString() === currentDate.toDateString();
      const isSelected = date && date.toDateString() === currentDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(currentDate)}
          className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs
            transition-all duration-200
            ${isSelected 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : isToday
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                : 'hover:bg-gray-100'
            }
            ${!isSelected && !isToday ? 'text-gray-700' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 px-2 py-1.5 border rounded-md flex items-center gap-2 bg-white hover:bg-gray-50 
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          shadow-sm text-sm"
      >
        <CalendarIcon className="w-4 h-4 text-gray-500" />
        <span className={`flex-1 text-left ${!date ? 'text-gray-500' : 'text-gray-900'}`}>
          {date ? formatDate(date) : 'Pick a date'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg p-3 w-56 z-50">
          <div className="flex items-center justify-between mb-2 gap-1">
            <div className="relative">
              <button
                onClick={() => {
                  setIsMonthSelectOpen(!isMonthSelectOpen);
                  setIsYearSelectOpen(false);
                }}
                className="px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-1"
              >
                {months[currentMonth.getMonth()]}
                <ChevronDown className="w-3 h-3" />
              </button>
              {isMonthSelectOpen && (
                <div className="absolute top-full mt-1 bg-white border rounded-md shadow-md py-1 z-10 max-h-48 overflow-auto w-24">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthChange(index)}
                      className="w-full px-2 py-1 text-left text-xs hover:bg-gray-100 text-gray-700"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsYearSelectOpen(!isYearSelectOpen);
                  setIsMonthSelectOpen(false);
                }}
                className="px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-1"
              >
                {currentMonth.getFullYear()}
                <ChevronDown className="w-3 h-3" />
              </button>
              {isYearSelectOpen && (
                <div className="absolute top-full mt-1 bg-white border rounded-md shadow-md py-1 z-10 max-h-48 overflow-auto w-16">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className="w-full px-2 py-1 text-left text-xs hover:bg-gray-100 text-gray-700"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="w-6 h-6 flex items-center justify-center text-xs text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {generateCalendarDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;