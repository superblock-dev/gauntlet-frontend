import React, { FC, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { popupState } from 'recoil/atoms';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { makeStyles } from '@material-ui/core';
import BGConnectWallet from 'assets/svgs/BGConnectWallet.svg';
import BGConnectedWallet from 'assets/svgs/BGConnectedWallet.svg';
import BtnExitEnabled from 'assets/svgs/BtnExitEnabled.svg';
import BtnExitHovered from 'assets/svgs/BtnExitHovered.svg';
import BtnExitPressed from 'assets/svgs/BtnExitPressed.svg';
import ItemWalletType from 'assets/svgs/ItemWalletType.svg';
import WalletIconPhantom from 'assets/svgs/WalletIconPhantom.svg';
import LineMyAddress from 'assets/svgs/LineMyAddress.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { useSnackbar } from 'notistack';
import { ErrorSnackbar, SuccessSnackbar } from 'components/Snackbar/Snackbar';
import DisconnectButton from 'components/Buttons/DisconnectButton';

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

export const Wallet: FC = () => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getLedgerWallet(),
    getSolletWallet({ network }),
    getSolletExtensionWallet({ network }),
  ], [network]);

  const { connect, connected, disconnect, select, publicKey } = useWallet();

  const setPopupState = useSetRecoilState(popupState);

  const handleExit = () => {
    setPopupState(undefined);
  }

  const handleInvalidClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }
  console.log(connected)

  const classes = useStyles();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <div className={classes.root} onClick={handleExit}>
          <div className={connected ? classes.connectedBox : classes.box} onClick={handleInvalidClick}>
            <WalletModalProvider>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </WalletModalProvider>
          </div>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};