import { Dispatch, MouseEvent, SetStateAction } from "react";
import { deleteModalInfoType } from "../../type";
import { useDispatch } from "react-redux";
import { deleteSchedule } from "../../store/scheduler";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteScheduleModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  deleteModalInfo: deleteModalInfoType;
}

export default function DeleteSchduleModal({
  isOpenModal,
  setIsOpenModal,
  deleteModalInfo,
}: DeleteScheduleModalProps) {
  const dispatch = useDispatch();

  const weekDays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const { id, title, date, startDate, endDate } = deleteModalInfo;
  const day = date.split("-").map(Number);
  const selectDay = new Date(day[0], day[1], day[2]);
  const displaySelectDay = `${format(selectDay, "MM월 dd일")} (${
    weekDays[selectDay.getDay()]
  })`;
  function showHour(hour: number) {
    return hour < 13 ? `오전 ${hour === 0 ? 12 : hour}` : `오후 ${hour % 12}`;
  }
  const displayTime = `${showHour(startDate.hour)}:${startDate.min
    .toString()
    .padStart(2, "0")} ~ ${showHour(endDate.hour)}:${endDate.min
    .toString()
    .padStart(2, "0")}`;

  return (
    <DeleteModalContainer
      isOpenModal={isOpenModal}
      deleteModalInfo={deleteModalInfo}
      className="deleteModal"
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).classList.contains("deleteModal") &&
          setIsOpenModal(false);
      }}
    >
      <div>
        <IconButtonContainer>
          <IconButton
            onClick={() => {
              dispatch(deleteSchedule(id));
              setIsOpenModal(false);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setIsOpenModal(false)}>
            <ClearIcon />
          </IconButton>
        </IconButtonContainer>
        <ScheduleTitleContainer>
          <ScheduleColorIcon />
          <div className="ScheduleTitle" style={{ fontSize: "1.4rem" }}>
            {title ? title : "(제목 없음)"}
          </div>
        </ScheduleTitleContainer>
        <DisplayDayNTime>
          {displaySelectDay} ⋅ {displayTime}
        </DisplayDayNTime>
      </div>
    </DeleteModalContainer>
  );
}

const DeleteModalContainer = styled.div<{
  isOpenModal: boolean;
  deleteModalInfo: deleteModalInfoType;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 90;
  ${(props) =>
    props.isOpenModal ? { visibility: "visible" } : { visibility: "hidden" }}
  >div {
    display: flex;
    flex-direction: column;
    width: 380px;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 20%);
    z-index: 90;
    padding: 5px;
    position: absolute;
    top: ${(props) => (props.deleteModalInfo.position.y > 800 ? -120 : 50)}px;
    left: ${(props) => (props.deleteModalInfo.position.x > 800 ? -385 : 130)}px;

    @media (max-width: 1150px) {
      left: ${(props) => (props.deleteModalInfo.position.x > 800 ? -385 : 90)}px;
    }
    @media (min-width: 1350px) {
      left: ${(props) => (props.deleteModalInfo.position.x > 800 ? -385 : 160)}px;
    }
    @media (min-width: 1500px) {
      left: ${(props) => (props.deleteModalInfo.position.x > 800 ? -385 : 200)}px;
    }
  }
`;

const ScheduleColorIcon = styled.div`
  width: 16px;
  height: 16px;
  background-color: #0399e2;
  border-radius: 5px;
  margin: 0px 10px;
`;

const IconButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ScheduleTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DisplayDayNTime = styled.div`
  font-family: initial;
  color: #555;
  margin: 20px;
`;
