export const getDateFormatMonthDay = (date: Date) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  const day = newDate.getDate();

  const newMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

  return `${newMonth}월 ${day}일`;
};
