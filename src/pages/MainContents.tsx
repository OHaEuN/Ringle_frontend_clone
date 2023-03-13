import { Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";
import LeftSection from "../components/common/LeftSection";
import MainScheduler from "../components/scheduler/MainScheduler";

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
`;

interface MainProps {
  isOpen: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}
export default function MainContents({ isOpen, setIsOpenModal }: MainProps) {
  return (
    <ContentWrap>
      <LeftSection isOpen={isOpen} setIsOpenModal={setIsOpenModal} />
      <MainScheduler />
    </ContentWrap>
  );
}
