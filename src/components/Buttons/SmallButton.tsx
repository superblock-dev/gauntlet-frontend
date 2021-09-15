import { makeStyles } from "@material-ui/core";
import { WalletBtnProp } from 'types';
import SmallBtnEnabled from 'assets/svgs/SmallBtnEnabled.svg';
import SmallBtnHovered from 'assets/svgs/SmallBtnHovered.svg';
import SmallBtnPressed from 'assets/svgs/SmallBtnPressed.svg';
import SmallBtnSelected from 'assets/svgs/SmallBtnSelected.svg';

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
    cursor: 'pointer',
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

function SmallButton() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        LET’s do it
      </div>
    </div>
  )
}

export default SmallButton;
