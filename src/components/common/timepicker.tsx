import React from "react";
import dayjs from "dayjs";
import { TimePicker } from "antd";

const TimePickerComponent = () => {
  const format = "HH:mm";

  const onChangeTime = (date: dayjs.Dayjs, dateString: string | string[]) => {
    console.log(date);
    console.log(dateString);
  };

  return (
    <TimePicker
      defaultValue={dayjs("12:08", format)}
      format={format}
      placeholder="안녕"
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
