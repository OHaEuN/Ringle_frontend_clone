export const getWeekDays = (selectDay: string) => {
  const currentDay = new Date(selectDay);
  const currentYear = currentDay.getFullYear();
  const currentMonth = currentDay.getMonth();
  const currentDate = currentDay.getDate();
  const currentDayOfWeek = currentDay.getDay();

  const weekDays = [...Array(7)].map((v, day) =>
    new Date(
      currentYear,
      currentMonth,
      currentDate + (day - currentDayOfWeek)
    ).getDate()
  );
  return weekDays;
};
