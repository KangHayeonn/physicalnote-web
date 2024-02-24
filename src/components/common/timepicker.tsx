import React from "react";
import dayjs from "dayjs";
import { TimePicker } from "antd";

interface TimePickerProps {
  initTime?: string;
  changeTime: React.Dispatch<React.SetStateAction<string>>;
}

const TimePickerComponent = ({ initTime, changeTime }: TimePickerProps) => {
  const format = "HH:mm";

  const onChangeTime = (date: dayjs.Dayjs, dateString: string | string[]) => {
    const newTime = Array.isArray(dateString) ? dateString[0] : dateString;
    changeTime(newTime);
  };

  return (
    <TimePicker
      defaultValue={dayjs(initTime, format)}
      format={format}
      placeholder="시간을 입력해주세요"
      size="large"
      popupStyle={{
        fontSize: "16px",
      }}
      style={{
        width: "180px",
        boxShadow: "0 2px 10px 0px rgba(0,0,0,0.25)",
      }}
      allowClear={false}
      onChange={(date, dateString) => onChangeTime(date, dateString)}
      inputReadOnly
    />
  );
};

export default TimePickerComponent;
