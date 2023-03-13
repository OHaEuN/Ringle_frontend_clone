import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { schdulesType, scheduleType } from "../type";
import { format } from "date-fns";

const today = new Date();
const todayText = format(today, "yyyy-MM-dd");
export const initialSchdulesState: schdulesType = {
  currentSchedule: {
    id: "",
    date: todayText,
    startDate: { hour: 0, min: 0 },
    endDate: { hour: 0, min: 0 },
    title: "",
  },
  schedules: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialSchdulesState,
  reducers: {
    setCurrentSchedule: (
      state: schdulesType,
      action: PayloadAction<scheduleType>
    ) => {
      return { ...state, currentSchedule: action.payload };
    },
    addSchedule: (state: schdulesType, action: PayloadAction<scheduleType>) => {
      state.schedules.push({
        ...action.payload,
        id: Math.random().toString(36).substring(2, 16),
      });
    },
    deleteSchedule: (state: schdulesType, action: PayloadAction<string>) => {
      const currentState = state.schedules.filter(
        (data) => data.id !== action.payload
      );
      return { ...state, schedules: currentState };
    },
  },
});

export const { addSchedule, deleteSchedule, setCurrentSchedule } =
  scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;
export default scheduleSlice.reducer;
