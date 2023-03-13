import styled from "@emotion/styled";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSchedule,
  initialSchdulesState,
  schedules,
  setCurrentSchedule,
} from "../../store/scheduler";
import { currentCalendar } from "../../store/calendar";
import { format } from "date-fns";
import { createSelectTime } from "../../util/selectTime";
import MonthlyCalendar from "../calendar/MonthlyCalendar";
import { Button, IconButton, Box, Input, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface AddScheduleModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function AddScheduleModal({
  isOpenModal,
  setIsOpenModal,
}: AddScheduleModalProps) {
  const dispatch = useDispatch();
  const { selectDay } = useSelector(currentCalendar);
  const { currentSchedule } = useSelector(schedules);
  const [datePickerModalIsOpen, setDatePickerModalIsOpen] =
    useState<boolean>(false);
  const [endSeleteTime, setEndSelectTime] = useState(createSelectTime());
  const startSeleteTime = createSelectTime();
  const weekDays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const displaySelectDay = `${format(selectDay, "MM월 dd일")} (${
    weekDays[selectDay.getDay()]
  })`;
  const handleClose = () => setIsOpenModal(false);

  const handleStartDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, min] = e.target.value.split(":");
    const startIndex = (e.target as HTMLSelectElement).selectedIndex; // 선택된 option index
    setEndSelectTime(createSelectTime(startIndex));
    dispatch(
      setCurrentSchedule({
        ...currentSchedule,
        startDate: {
          hour: parseInt(hour),
          min: parseInt(min),
        },
        endDate: {
          hour: parseInt(hour),
          min: parseInt(min),
        },
      })
    );
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, min] = e.target.value.split(":");
    dispatch(
      setCurrentSchedule({
        ...currentSchedule,
        endDate: {
          hour: parseInt(hour),
          min: parseInt(min),
        },
      })
    );
  };

  const handleSubmit = () => {
    dispatch(addSchedule(currentSchedule));
    dispatch(setCurrentSchedule(initialSchdulesState.currentSchedule));
    setIsOpenModal(false);
  };

  return (
    <Modal open={isOpenModal} onClose={handleClose}>
      <Box sx={ModalStyle}>
        <div
          className="CloseButton"
          style={{ alignSelf: "end", marginBottom: "20px" }}
        >
          <IconButton onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </div>
        <div
          className="TitleInput"
          style={{ marginLeft: "45px", paddingRight: "15px" }}
        >
          <Input
            color="primary"
            placeholder="제목 추가"
            required
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(
                setCurrentSchedule({
                  ...currentSchedule,
                  title: e.target.value,
                })
              );
            }}
            value={currentSchedule.title}
            sx={{
              fontSize: "1.2rem",
            }}
          />
        </div>
        <TimeSelectWrap>
          <AccessTimeIcon sx={{ marginRight: "10px" }} />
          <StyledSelect
            as="div"
            onClick={() => {
              setDatePickerModalIsOpen((prev) => !prev);
            }}
          >
            {displaySelectDay}
            {datePickerModalIsOpen && (
              <CalendarModalWrap>
                <MonthlyCalendar />
              </CalendarModalWrap>
            )}
          </StyledSelect>
          <StyledSelect
            onChange={handleStartDateChange}
            value={`${currentSchedule.startDate.hour}:${currentSchedule.startDate.min}`}
          >
            {startSeleteTime.map((time, index) => (
              <option
                key={time.showText + index}
                value={`${time.hour}:${time.min}`}
              >
                {time.showText}
              </option>
            ))}
          </StyledSelect>
          -
          <StyledSelect
            onChange={handleEndDateChange}
            value={`${currentSchedule.endDate.hour}:${currentSchedule.endDate.min}`}
          >
            {endSeleteTime.map((time, index) => (
              <option
                key={time.showText + index}
                value={`${time.hour}:${time.min}`}
              >
                {time.showText}
              </option>
            ))}
          </StyledSelect>
        </TimeSelectWrap>
        <Button
          variant="contained"
          sx={{ alignSelf: "end", margin: "15px" }}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </Box>
    </Modal>
  );
}

const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 250,
  borderRadius: 2,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 1,
};

const CalendarModalWrap = styled.div`
  background-color: #fff;
  position: absolute;
  top: 180px;
  box-shadow: 4px 4px 10px 0px rgba(153, 153, 153, 0.55);
`;

const TimeSelectWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 15px;
  height: 50px;
`;

const StyledSelect = styled.select`
  appearance: none;
  border: none;
  outline: none;
  font-size: 1rem;
  text-align: center;
  padding: 5px 10px;
  margin: 3px;
  :hover {
    background-color: #eee;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 2px solid #1b65ca;
  }
`;
