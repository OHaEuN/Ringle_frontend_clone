import { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import AddScheduleButton from "../scheduler/AddScheduleButton";
import MonthlyCalendar from "../calendar/MonthlyCalendar";

interface LeftbarProps {
  isOpen: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function LeftSection({ isOpen, setIsOpenModal }: LeftbarProps) {
  return (
    <LeftSectionWrap>
      <AddScheduleButton isOpen={isOpen} setIsOpenModal={setIsOpenModal} />
      <LeftSectionInner isOpen={isOpen}>
        <MonthlyCalendar />
      </LeftSectionInner>
    </LeftSectionWrap>
  );
}

const LeftSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftSectionInner = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? `width: 265px` : `width: 0px`)};
  overflow: hidden;
  padding-top: 80px;
`;
