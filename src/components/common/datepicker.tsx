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
  changeTime?: React.Dispatch<React.SetStateAction<Date | null>> | undefined;
  changeYear?: React.Dispatch<React.SetStateAction<Date | null>> | undefined;
  onClick?: () => void;
}

const DatePickerComponent = ({
  calendarType,
  initDate,
  changeDate,
  changeTime,
  changeYear,
  onClick,
}: CalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(initDate || new Date());
  const [time, setTime] = useState<Date | null>(null);
  const [year, setYear] = useState<Date | null>(new Date());

  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const tomorrow = new Date(today.setDate(today.getDate() + 1));

  useEffect(() => {
    if (changeDate) changeDate(startDate);
  }, [changeDate, startDate]);

  useEffect(() => {
    if (changeTime) changeTime(time);
  }, [changeTime, time]);

  useEffect(() => {
    if (changeYear) changeYear(year);
    if (onClick) onClick();
  }, [changeYear, year]);

  useEffect(() => {
    if (initDate) setStartDate(initDate);
  }, [initDate]);

  if (calendarType === "time") {
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
          selected={time}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          minTime={setHours(setMinutes(new Date(), 0), 8)}
          maxTime={setHours(setMinutes(new Date(), 0), 23)}
          dateFormat="h:mm aa"
          onChange={(date) => setTime(date)}
          className="calendar-time"
          placeholderText="시간 입력"
        />
      </div>
    );
  }

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

  if (calendarType === "date") {
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
        minDate={tomorrow}
        dateFormat="yyyy.MM.dd"
        onChange={(date) => {
          if (date) setStartDate(date);
        }}
        placeholderText="날짜 입력"
      />
    </div>
  );
};

export default DatePickerComponent;
