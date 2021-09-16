import { makeStyles } from "@material-ui/core";
import { WalletBtnProp } from 'types';
import WalletBtnEnabled from 'assets/svgs/WalletBtnEnabled.svg';
import WalletBtnHovered from 'assets/svgs/WalletBtnHovered.svg';
import WalletBtnPressed from 'assets/svgs/WalletBtnPressed.svg';
import WalletBtnSelected from 'assets/svgs/WalletBtnSelected.svg';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  root: {
    width: 140,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${WalletBtnEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      backgroundImage: `url(${WalletBtnHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${WalletBtnPressed})`,
    },
    '&:focus': {
      backgroundImage: `url(${WalletBtnSelected})`,
    },
    cursor: `url(${CursorPointer}), pointer`,
  },
  text: {
    fontFamily: 'Spectral SC',
    fontSize: 12,
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
