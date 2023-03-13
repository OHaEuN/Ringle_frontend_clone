import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calendarType } from "../type";
import { createCurrentDate } from "../util/CurrentDate";
import { getWeekDays } from "../util/Weeks";
import { RootState } from "./index";

const today = new Date();
const initialState: calendarType = {
  today: today,
  selectDay: today,
  current: {
    days: getWeekDays(today.toString()),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    currentDate: today,
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDay: (state: calendarType, action: PayloadAction<string>) => {
      const currentDate = new Date(action.payload);
      state.selectDay = currentDate;
      state.current = createCurrentDate(action.payload);
    },
    prevWeek: (state: calendarType) => {
      const currentDate = new Date(state.selectDay);
      state.selectDay = new Date(
        currentDate.setDate(currentDate.getDate() - 7)
      );
      state.current = createCurrentDate(state.selectDay);
    },
    nextWeek: (state: calendarType) => {
      const currentDate = new Date(state.selectDay);
      state.selectDay = new Date(
        currentDate.setDate(currentDate.getDate() + 7)
      );
      state.current = createCurrentDate(state.selectDay);
    },
    setMonth: (state: calendarType, action: PayloadAction<string>) => {
      state.current = createCurrentDate(action.payload);
    },
  },
});

export const { setDay, prevWeek, nextWeek, setMonth } = calendarSlice.actions;
export const currentCalendar = (state: RootState) => state.calendar;
export default calendarSlice.reducer;
