import { useSetRecoilState } from 'recoil';
import { popupState } from 'recoil/atoms';

import { makeStyles } from '@material-ui/core';
import BGConnectWallet from 'assets/svgs/BGConnectWallet.svg';
import BtnExitEnabled from 'assets/svgs/BtnExitEnabled.svg';
import BtnExitHovered from 'assets/svgs/BtnExitHovered.svg';
import BtnExitPressed from 'assets/svgs/BtnExitPressed.svg';
import ItemWalletType from 'assets/svgs/ItemWalletType.svg';
import WalletIconPhantom from 'assets/svgs/WalletIconPhantom.svg';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 448,
    height: 218,
    backgroundImage: `url(${BGConnectWallet})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  titleContainer: {
    marginTop: 40,
    marginLeft: 32,
    marginRight: 32,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: 'rgba(255, 210, 113, 1)',
  },
  exitBtn: {
    width: 32,
    height: 32,
    backgroundImage: `url(${BtnExitEnabled})`,
    '&:hover': {
      backgroundImage: `url(${BtnExitHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${BtnExitPressed})`,
    },
    cursor: `url(${CursorPointer}), pointer`,
  },
  listContainer: {
    width: '100%',
    marginTop: 40,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 384,
    height: 66,
    cursor: `url(${CursorPointer}), pointer`,
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${ItemWalletType})`,
    '&:hover': {
    },
    '&:active': {
    },
  },
  icon: {
    width: 34,
    height: 34,
    marginLeft: 24,
    marginRight: 24,
  },
  text: {
    fontWeight: 700,
    color: 'rgba(119, 107, 238, 1)',
  }
})

function WalletConnectPopup() {
  const classes = useStyles();
  const setPopupState = useSetRecoilState(popupState);

  const handleExit = () => {
    setPopupState(undefined);
  }
  const handleInvalidClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  return (
    <div className={classes.root} onClick={handleExit}>
      <div className={classes.box} onClick={handleInvalidClick}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>CONNECT WALLET</div>
          <div className={classes.exitBtn} onClick={handleExit} />
        </div>
        <div className={classes.listContainer}>
          <div className={classes.item}>
            <img 
              className={classes.icon} 
              src={WalletIconPhantom} 
              alt={"phatom_icon"}  
            />
            <div className={classes.text} >
              PHANTOM
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default WalletConnectPopup;
