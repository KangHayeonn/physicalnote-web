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
