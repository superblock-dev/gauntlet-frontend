import styled from "@emotion/styled";
import CursorPointer from "../../assets/CursorPointer.svg";
import leftNavigation from "../../assets/svgs/big-arrow-left.svg";
import rightNavigation from "../../assets/svgs/big-arrow-right.svg";

const NavigationButtons = styled.div`
  position: absolute;
  display: flex;
  height: 40px;
  top: 38.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1;
  img {
    height: 100%;
    cursor: url(${CursorPointer}), pointer;
  };
`;

interface FlagNavigationProps {
    onClick: (direction: number) => void
}

export default function FlagNavigation({ onClick }: FlagNavigationProps) {
    return (
        <NavigationButtons>
            <img
            src={leftNavigation}
            onClick={() => onClick(-1)}
            style={{ marginRight: "2rem" }} />
            <img
            src={rightNavigation}
            onClick={() => onClick(1)}
            style={{ marginLeft: "2rem" }} />
        </NavigationButtons>
    );
}
