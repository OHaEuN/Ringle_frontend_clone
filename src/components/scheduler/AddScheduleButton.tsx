import { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import Plusimg from "../../assets/images/plus.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface AddScheduleButtonProps {
  isOpen: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function AddScheduleButton({
  isOpen,
  setIsOpenModal,
}: AddScheduleButtonProps) {
  return (
    <button
      className="floatingButton"
      onClick={() => {
        setIsOpenModal((prev) => !prev);
      }}
      style={{
        border: "none",
        background: "none",
        position: "fixed",
        top: "70px",
        zIndex: 999,
      }}
    >
      <ButtonInner isOpen={isOpen}>
        <img src={Plusimg} alt="plus button" />
        {isOpen && (
          <>
            <div>만들기</div>
            <ArrowDropDownIcon sx={{ color: "#999" }} />
          </>
        )}
      </ButtonInner>
    </button>
  );
}

const ButtonInner = styled.div<{ isOpen: boolean }>`
  ${(props) =>
    props.isOpen
      ? `width: 140px; height: 48px; padding-left: 10px;`
      : `width: 52px; height: 52px;`};
  box-shadow: 1px 1px 1px 1px rgba(153, 153, 153, 0.55);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0 0 10px;
  color: #353535;
  :hover {
    box-shadow: 4px 4px 10px 0px rgba(153, 153, 153, 0.55);
    background-color: #f1f1f4;
  }
`;
