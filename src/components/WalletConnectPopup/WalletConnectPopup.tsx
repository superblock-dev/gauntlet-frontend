import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupState } from 'recoil/atoms';
import { useWallet } from '@solana/wallet-adapter-react';

import { makeStyles } from '@material-ui/core';
import BGConnectWallet from 'assets/svgs/BGConnectWallet.svg';
import BGConnectedWallet from 'assets/svgs/BGConnectedWallet.svg';
import BtnExitEnabled from 'assets/svgs/BtnExitEnabled.svg';
import BtnExitHovered from 'assets/svgs/BtnExitHovered.svg';
import BtnExitPressed from 'assets/svgs/BtnExitPressed.svg';
import WalletIconPhantom from 'assets/svgs/WalletIconPhantom.svg';
import LineMyAddress from 'assets/svgs/LineMyAddress.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { useSnackbar } from 'notistack';
import { ErrorSnackbar, SuccessSnackbar } from 'components/Snackbar/Snackbar';
import DisconnectButton from 'components/Buttons/DisconnectButton';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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
  connectedBox: {
    width: 448,
    height: 284,
    backgroundImage: `url(${BGConnectedWallet})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  item: {
    width: 384,
    height: 66,
    cursor: `url(${CursorPointer}), pointer`,
    display: 'flex',
    alignItems: 'center',
    // backgroundImage: `url(${ItemWalletType})`,
    '&:hover': {
      backgroundImage: 'radial-gradient(78.76% 933.51% at 50% 100%, rgba(0, 201, 177, 0.11) 0%, rgba(0, 201, 177, 0) 79.55%)',
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
  },
  contentContainer: {
    marginTop: 32,
    marginLeft: 32,
    marginRight: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addressHeader: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    color: '#CBA344',
    alignSelf: 'flex-start',
  },
  addressContainer: {
    width: 336,
    height: 24,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  addressText: {
    width: 256,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 16,
    fontWeight: 700,
    color: '#776BEE',
  },
  copyText: {
    cursor: `url(${CursorPointer}), pointer`,
    fontSize: 14,
    fontWeight: 700,
    color: '#00C9B1',
    padding: '0 8px'
  },
  addressLine: {
    backgroundImage: `url(${LineMyAddress})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    width: '100%',
    height: 20,
    marginBottom: 30,
  },
});

function WalletConnectPopup() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const setPopupState = useSetRecoilState(popupState);
  const { wallets, connect, connected, disconnect, select, publicKey } = useWallet();

  //@ts-ignore
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => document.body.style.overflow = 'unset';
  });

  const handleExit = () => {
    setPopupState(undefined);
  }

  const handleInvalidClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  const handleSelectWallet = useCallback(
    (walletName) => {
      select(walletName);
    },
    [select]
  );

  const handleClickConnect = useCallback(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      connect()
        .then(() =>
          enqueueSnackbar(<SuccessSnackbar message={"Wallet Connected"} />)
        ).catch(() => { });
      setPopupState(undefined);
    },
    [connect, setPopupState]
  );
  const handleClickDisconnect: React.MouseEventHandler<HTMLDivElement> = useCallback(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      disconnect().catch(() => { });
      setPopupState(undefined);
    },
    [disconnect, setPopupState]
  );

  const address = publicKey?.toBase58();

  return (
    <div className={classes.root} style={{
      top: document.documentElement.scrollTop,
    }} onClick={handleExit} >
      <div className={connected ? classes.connectedBox : classes.box} onClick={handleInvalidClick}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>{
            connected ?
              "YOUR WALLET" :
              "CONNECT WALLET"
          }</div>
          <div className={classes.exitBtn} onClick={handleExit} />
        </div>
        {
          connected ?
            <div className={classes.contentContainer}>
              <div className={classes.addressHeader}>YOUR ADDRESS</div>
              <div className={classes.addressContainer}>
                <div className={classes.addressText}>{address}</div>
                <div
                  className={classes.copyText}
                  onClick={() => {
                    navigator.clipboard.writeText(address ? address : "");
                    enqueueSnackbar(<SuccessSnackbar message={"Address copied"} />);
                  }}>COPY</div>
              </div>
              <div className={classes.addressLine} />
              <DisconnectButton handleClick={handleClickDisconnect} />
            </div> :
            <div className={classes.listContainer}>
              {
                wallets.map(walletInfo => (
                  <div key={walletInfo.name} className={classes.item} 
                    onMouseOver={() => handleSelectWallet(walletInfo.name)}
                    onClick={() => { handleClickConnect();}}>
                    <img
                      className={classes.icon}
                      src={WalletIconPhantom}
                      alt={"phatom_icon"}
                    />
                    <div className={classes.text} >
                      {walletInfo.name.toUpperCase()}
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}

export default WalletConnectPopup;
