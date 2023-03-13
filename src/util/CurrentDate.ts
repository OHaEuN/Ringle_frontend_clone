import { getWeekDays } from "./Weeks";
import { currentCalendarType } from "../type";

export const createCurrentDate = (date: string): currentCalendarType => {
  const currentDate = new Date(date);
  return {
    days: getWeekDays(currentDate.toString()),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    currentDate: currentDate,
  };
};
