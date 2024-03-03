import React, { useState, useEffect, MouseEventHandler } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { setHours, setMinutes } from "date-fns";

interface CalendarProps {
  calendarType?: string;
  initDate?: Date;
  changeDate?: React.Dispatch<React.SetStateAction<Date>> | undefined;
  changeYear?: React.Dispatch<React.SetStateAction<Date | null>> | undefined;
  onClick?: () => void;
}

const DatePickerComponent = ({
  calendarType,
  initDate,
  changeDate,
  changeYear,
  onClick,
}: CalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(initDate || new Date());
  const [year, setYear] = useState<Date | null>(new Date());

  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  useEffect(() => {
    if (changeDate) changeDate(startDate);
  }, [changeDate, startDate]);

  useEffect(() => {
    if (changeYear) changeYear(year);
    if (onClick) onClick();
  }, [changeYear, year]);

  useEffect(() => {
    if (initDate) setStartDate(initDate);
  }, [initDate]);

  if (calendarType === "yearMonth") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={0}
              height={0}
              alt="Clock Icon"
              className="calendar-icon"
              style={{ width: "100%", height: "auto" }}
            />
          }
          showMonthYearPicker
          locale={ko}
          maxDate={today}
          selected={year}
          dateFormat="yyyy년 MM월"
          onChange={(date) => {
            setYear(date);
          }}
        />
      </div>
    );
  }

  if (calendarType === "year") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={0}
              height={0}
              alt="Clock Icon"
              className="calendar-icon"
              style={{ width: "100%", height: "auto" }}
            />
          }
          showYearPicker
          locale={ko}
          maxDate={today}
          selected={year}
          dateFormat="yyyy"
          onChange={(date) => {
            setYear(date);
          }}
          placeholderText="연도 입력"
        />
      </div>
    );
  }

  if (calendarType === "free") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={10}
              height={10}
              alt="Clock Icon"
              className="calendar-icon"
            />
          }
          locale={ko}
          selected={startDate}
          dateFormat="yy년 MM월 dd일"
          onChange={(date) => {
            if (date) setStartDate(date);
          }}
        />
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        icon={
          <Image
            src="/images/arrow_down.svg"
            width={10}
            height={10}
            alt="Clock Icon"
            className="calendar-icon"
          />
        }
        locale={ko}
        selected={startDate}
        maxDate={today}
        dateFormat="yy년 MM월 dd일"
        onChange={(date) => {
          if (date) setStartDate(date);
        }}
      />
    </div>
  );
};

export default DatePickerComponent;
