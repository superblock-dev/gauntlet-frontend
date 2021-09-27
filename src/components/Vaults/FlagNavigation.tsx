import { makeStyles } from "@material-ui/core";
import CursorPointer from "../../assets/CursorPointer.svg";
import leftNavigation from "../../assets/svgs/big-arrow-left.svg";
import rightNavigation from "../../assets/svgs/big-arrow-right.svg";

const useStyles = makeStyles({
  navigationIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    cursor: `url(${CursorPointer}), pointer`,
    zIndex: 5,
  }
})

interface FlagNavigationProps {
  onClick: (direction: number) => void
}

export default function FlagNavigation({ onClick }: FlagNavigationProps) {
  const classes = useStyles();

  return (
    <>
      <img
        src={leftNavigation}
        onClick={() => onClick(-1)}
        className={classes.navigationIcon}
        style={{
          top: '37%',
          left: '30%',
        }} />
      <img
        src={rightNavigation}
        onClick={() => onClick(1)}
        className={classes.navigationIcon}
        style={{
          top: '37%',
          right: '30%',
        }} />
    </>
  );
}
