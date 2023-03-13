import styled from "@emotion/styled";
import { AllHours } from "../../util/Hours";
import { allTime, deleteModalInfoType, scheduleType } from "../../type.d";
import { useSelector } from "react-redux";
import { currentCalendar } from "../../store/calendar";
import { schedules } from "../../store/scheduler";
import { format } from "date-fns";
import { MouseEvent, MouseEventHandler, useState } from "react";
import DeleteScheduleModal from "./DeleteScheduleModal";

const SchedulerInnerWrap = styled.div`
  height: calc(100vh - 71px - 105px);
  overflow-y: scroll;
  margin-left: 10px;
  width: 100%;
  display: flex;
`;

const ScheduleBlock = styled.div<{ height: string; top: string }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: absolute;
  width: 85%;
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  min-height: 46.67px;
  background-color: #0399e2;
  border: 1px solid #fff;
  padding: 2px 5px;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 8px;
  overflow-y: hidden;
  z-index: 50;

  :active {
    cursor: pointer;
    box-shadow: 1px 1px 7px 1px rgba(152, 164, 176, 0.55);
  }
`;

function DayHourRow() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "end" }}
    >
      {AllHours.map((hour) => {
        return (
          <div
            style={{
              marginBottom: "30px",
              color: "#9f9f9f",
              fontSize: "0.7rem",
            }}
            key={hour.hour}
          >
            {hour.showHour}시
          </div>
        );
      })}
    </div>
  );
}

export default function MainScheduler() {
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [clickedId, setClickedID] = useState<string>("");
  const [deleteModalInfo, setDeleteModalInfo] = useState<deleteModalInfoType>({
    id: "",
    title: "",
    date: "",
    startDate: { hour: 0, min: 0 },
    endDate: { hour: 0, min: 0 },
    position: { x: 0, y: 0 },
  });
  const schedulesArr = useSelector(schedules);
  const { current, today } = useSelector(currentCalendar);

  const handleOpenDeleteModal = (
    e: MouseEvent<HTMLDivElement>,
    data: scheduleType
  ) => {
    console.log(e.clientX);
    console.log(e.clientY);
    setDeleteModalOpen(true);
    setDeleteModalInfo({
      ...data,
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  function SchedulerHeader() {
    const HeaderWrap = styled.div`
      display: flex;
      background-color: #fff;
      width: 100%;
      height: 95px;
      position: sticky;
      border-bottom: 1px solid #eee;
    `;
    const HeaderDaysWrap = styled.div`
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    `;

    const DayBlock = styled.div`
      flex: 1;
      height: 94px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `;
    return (
      <HeaderWrap>
        <div
          style={{
            color: "#9f9f9f",
            fontSize: "0.7rem",
            display: "flex",
            alignSelf: "end",
            fontFamily: "initial",
            margin: "0 10px",
          }}
        >
          GMT+09
        </div>
        <HeaderDaysWrap>
          {weekday.map((day: string, index: number) => {
            const isToday =
              format(today, "yyyyMMdd") ===
              format(
                new Date(current.year, current.month - 1, current.days[index]),
                "yyyyMMdd"
              );
            return (
              <DayBlock key={index}>
                <div style={{ fontSize: "0.8rem", marginBottom: "5px" }}>
                  {day}
                </div>
                <div
                  style={
                    isToday
                      ? {
                          fontSize: "1.6rem",
                          fontFamily: "initial",
                          color: "#1a73E8",
                          fontWeight: "700",
                        }
                      : { fontSize: "1.6rem", fontFamily: "initial" }
                  }
                >
                  {current.days[index]}
                </div>
              </DayBlock>
            );
          })}
        </HeaderDaysWrap>
      </HeaderWrap>
    );
  }

  function DaySchedulerColumn() {
    const CalendarTableDay = styled.div`
      flex: 1;
      border-left: 1px solid #eee;
      height: 1120px;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    `;

    const CalendarTableHour = styled.div`
      flex: 1;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
    `;

    return (
      <div
        style={{
          width: "calc(100% - 75px)",
          marginLeft: "15px",
          display: "flex",
        }}
      >
        {weekday.map((day: string, index) => (
          <CalendarTableDay key={`CalendarTable${day} `}>
            {AllHours.map((hour: allTime) => (
              <CalendarTableHour key={`CalendarTable${day}${hour.hour} `}>
                {schedulesArr.schedules
                  .filter((schedule) => {
                    return (
                      schedule.date ===
                        `${format(
                          new Date(
                            current.year,
                            current.month - 1,
                            current.days[index]
                          ),
                          "yyyy-MM-dd"
                        )}` && hour.hour === schedule.startDate.hour
                    );
                  })
                  .map((data) => {
                    let height =
                      (data.endDate.hour - data.startDate.hour) * 46.67 -
                      (data.startDate.min * 12.1675) / 15 +
                      (data.endDate.min * 12.1675) / 15;
                    const top = (data.startDate.min * 12.1675) / 15; // 46.67 / 4 = 12.1675
                    return (
                      <div key={`${data.id}${data.date}`}>
                        <ScheduleBlock
                          height={`${height}px`}
                          top={`${top}px`}
                          title={`${data.startDate.hour}시${data.startDate.min}분 - ${data.endDate.hour}시${data.endDate.min}분`}
                          data-schedule={data.id}
                          onClick={(e) => {
                            handleOpenDeleteModal(e, { ...data });
                            setClickedID(data.id);
                          }}
                        >
                          <div
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {data.title ? data.title : "(제목 없음)"}
                          </div>
                          <div style={{ wordBreak: "keep-all" }}>
                            {data.startDate.hour}시{data.startDate.min}분 -{" "}
                            {data.endDate.hour}시{data.endDate.min}분
                          </div>
                        </ScheduleBlock>
                        {isDeleteModalOpen && (
                          <DeleteScheduleModal
                            isOpenModal={
                              isDeleteModalOpen && clickedId === data.id
                            }
                            setIsOpenModal={setDeleteModalOpen}
                            deleteModalInfo={deleteModalInfo}
                          />
                        )}
                      </div>
                    );
                  })}
              </CalendarTableHour>
            ))}
          </CalendarTableDay>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", marginLeft: "15px" }}>
      <SchedulerHeader />
      <SchedulerInnerWrap>
        <DayHourRow />
        <DaySchedulerColumn />
      </SchedulerInnerWrap>
    </div>
  );
}
