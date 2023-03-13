import styled from "@emotion/styled";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  DateFormatter,
  ClassNames,
  ModifiersClassNames,
  DayPicker,
  SelectSingleEventHandler,
} from "react-day-picker";
import styles from "react-day-picker/dist/style.css";
import { useSelector, useDispatch } from "react-redux";
import { currentCalendar, setDay, setMonth } from "../../store/calendar";
import { schedules, setCurrentSchedule } from "../../store/scheduler";

const DayPickerWrap = styled.div`
  .rdp {
    --rdp-cell-size: 30px;
  }
  .rdp-button_reset {
    font-size: 12px;
  }
  .caption {
    display: flex;
    justify-content: space-between;
  }
  .rdp-caption_label {
    font-weight: 400;
    font-size: 1rem;
  }

  .rdp-nav_button {
    width: 20px;
  }
  .rdp-nav_button_next {
    margin-left: 10px;
  }
  .rdp-caption {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
  }
  .rdp-head_cell {
    font-weight: 400;
  }
  .rdp-cell {
    padding: 2px;
  }
  .rdp-month {
    color: #353535;
    width: 100%;
  }
  .outside {
    color: #b7b7b7;
  }
  .selected:not([disabled]) {
    font-weight: bold;
    background-color: #8ab4f8;
    color: #1967d2;
  }
  .selected:hover:not([disabled]) {
    background-color: #a9c3f1;
  }
  .today {
    color: #fff;
    background-color: #1967d2;
  }
`;

const classNames: ClassNames = {
  ...styles,
  caption: "caption",
  table: "table",
  cell: "cell",
};

const modifiersClassNames: ModifiersClassNames = {
  today: "today",
  selected: "selected",
  outside: "outside",
};

const formatCaption: DateFormatter = (month) => format(month, "yyyy년 M월");

export default function MonthlyCalendar() {
  const { selectDay, current } = useSelector(currentCalendar);
  const { currentSchedule } = useSelector(schedules);
  const dispatch = useDispatch();

  return (
    <>
      <DayPickerWrap>
        <DayPicker
          mode="single"
          selected={selectDay}
          locale={ko}
          formatters={{ formatCaption }}
          classNames={classNames}
          modifiersClassNames={modifiersClassNames}
          showOutsideDays
          fixedWeeks
          month={new Date(`${current.year}-${current.month}`)}
          onMonthChange={(e: unknown) =>
            dispatch(setMonth((e as Date).toString()))
          }
          onSelect={(e: unknown) => {
            dispatch(setDay((e as SelectSingleEventHandler).toString()));
            dispatch(
              setCurrentSchedule({
                ...currentSchedule,
                date: format(e as Date, "yyyy-MM-dd"),
              })
            );
          }}
        />
      </DayPickerWrap>
    </>
  );
}
