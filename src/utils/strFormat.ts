export const getTimeFormat = (time: string) => {
  const timeParts = time.split(":");
  return timeParts[0] + ":" + timeParts[1];
};
