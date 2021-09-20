import { makeStyles } from "@material-ui/core";
import SmallBtnEnabled from 'assets/svgs/SmallBtnEnabled.svg';
import SmallBtnHovered from 'assets/svgs/SmallBtnHovered.svg';
import SmallBtnPressed from 'assets/svgs/SmallBtnPressed.svg';
import SmallBtnSelected from 'assets/svgs/SmallBtnSelected.svg';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  root: {
    width: 104,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${SmallBtnEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      backgroundImage: `url(${SmallBtnHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${SmallBtnPressed})`,
    },
    '&:focus': {
      backgroundImage: `url(${SmallBtnSelected})`,
    },
    cursor: `url(${CursorPointer}), pointer`,
  },
  text: {
    fontFamily: 'Spectral SC',
    fontSize: 14,
    fontWeight: 700,
    backgroundColor: 'transparent',
    marginTop: 4,
    color: 'rgba(255, 210, 113, 1)',
    lineHeight: '18.26px',
    userSelect: 'none',
  }
})

interface SmallButtonProps {
  text?: string;
}

function SmallButton({text = "LET's do it"}: SmallButtonProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        {text}
      </div>
    </div>
  )
}

export default SmallButton;
