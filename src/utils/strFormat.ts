export const getTimeFormat = (time: string) => {
  const timeParts = time.split(":");
  return timeParts[0] + ":" + timeParts[1];
};

export const getWeekdayFormat = (weekday: string) => {
  const day = weekday.match(/[가-힣]+\s*(?=요일)/);
  return day ? day[0] : null;
};
