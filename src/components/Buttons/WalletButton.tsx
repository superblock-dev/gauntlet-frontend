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
    fontSize: 10,
    fontWeight: 700,
    backgroundColor: 'transparent',
    marginTop: 4,
    color: 'rgba(255, 210, 113, 1)',
    lineHeight: '18.26px',
    userSelect: 'none',
  }
})

function WalletButton({ connected, address }: WalletBtnProp) {
  const classes = useStyles();

  if (connected) {
    <div className={classes.root}>
      <div className={classes.text}>
        {address}
      </div>
    </div>
  }

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        CONNECT WALLET
      </div>
    </div>
  )
}

export default WalletButton;
