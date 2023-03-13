import { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/common/Header";
import MainContents from "./MainContents";
import AddScheduleModal from "../components/scheduler/AddScheduleModal";

const HomeWrap = styled.div`
  min-width: 1024px;
  overflow: hidden;
`;

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <HomeWrap>
      <Header setIsOpen={setIsOpen} />
      <MainContents isOpen={isOpen} setIsOpenModal={setIsOpenModal} />
      <AddScheduleModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </HomeWrap>
  );
}
