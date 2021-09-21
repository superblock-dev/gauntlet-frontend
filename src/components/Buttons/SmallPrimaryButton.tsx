import { makeStyles } from '@material-ui/core/styles';
import { PrimaryBtnProp } from 'types';
import SmallPrimaryBtnEnabled from 'assets/svgs/SmallPrimaryBtnEnabled.svg';
import SmallPrimaryBtnDisabled from 'assets/svgs/SmallPrimaryBtnDisabled.svg';
import SmallPrimaryBtnHovered from 'assets/svgs/SmallPrimaryBtnHover.svg';
import SmallPrimaryBtnPressed from 'assets/svgs/SmallPrimaryBtnPressed.svg';
import SmallPrimaryBtnSelected from 'assets/svgs/SmallPrimaryBtnSelected.svg';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  root: {
    width: 266,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${SmallPrimaryBtnEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: `url(${CursorPointer}), pointer`,
    '&:hover': {
      backgroundImage: `url(${SmallPrimaryBtnHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${SmallPrimaryBtnPressed})`,
    },
    '&:focus': {
      backgroundImage: `url(${SmallPrimaryBtnSelected})`,
    },
  },
  disabled: {
    width: 266,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${SmallPrimaryBtnDisabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    userSelect: 'none',
  },
  styledText: {
    fontFamily: "Spectral SC",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: "30px",
    fontWeight: "bold",
    background: "linear-gradient(to right, #8963F3, #00C9B1)",
    color: "transparent",
    WebkitBackgroundClip: "text",
  }
});

function SmallPrimaryButton({ disabled, children }: PrimaryBtnProp) {
  const classes = useStyles();

  return (
    <div className={disabled ? classes.disabled : classes.root}>
      <div className={classes.styledText}>
        {children}
      </div>
    </div>
  )
}

export default SmallPrimaryButton;
