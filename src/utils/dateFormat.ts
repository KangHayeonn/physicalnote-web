export const getDateFormatMonthDay = (date: Date) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  const day = newDate.getDate();

  return `${month + 1}월 ${day}일`;
};

export const getDateToString = (date: Date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();

  const newMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

  return `${year}-${newMonth}`;
};

export const getFullDateToString = (date: Date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();

  const newMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
  const newDay = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${newMonth}-${newDay}`;
};

export const getDateToNum = (date: string) => {
  const [hour, minute, second] = date.split(":").map(Number);
  const totalHours = hour + minute / 60 + second / 3600;
  return totalHours;
};
