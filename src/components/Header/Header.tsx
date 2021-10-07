import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSetRecoilState } from "recoil";
import { popupState } from 'recoil/atoms';
import { HeaderProps } from './Header.types';
import { makeStyles } from '@material-ui/core';
import NavButton from 'components/Buttons/NavButton';
import WalletButton from 'components/Buttons/WalletButton';
import Logo from 'assets/svgs/Logo.png';
import WalletConnectPopup from 'components/WalletConnectPopup';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  container: {
    marginLeft: 80,
    marginRight: 80,
    height: 56,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    left: 0,
    top: 18,
    height: 20,
  },
  navContainer: {
    position: 'absolute',
    top: 8,
    bottom: -4,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtn: {
    position: 'absolute',
    right: 0,
    top: 12,
    width: 140,
    height: 32,
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: `url(${CursorPointer}), pointer`,
  },
  tvlText: {
    position: 'absolute',
    right: 172,
    top: 16,
    fontSize: 16,
    fontWeight: 700,
    color: 'rgba(255, 210, 113, 1)',
  },
})


function Header({ routeList }: HeaderProps) {
  const location = useLocation();
  const classes = useStyles();
  const setPopupState = useSetRecoilState(popupState);
  const { publicKey, connected } = useWallet();

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }
  const address = publicKey?.toBase58();

  return (
    <div className={classes.container}>
      <Link to={'/'} className={classes.logo}>
        <img src={Logo} />
      </Link>
      <div className={classes.navContainer}>
        {routeList.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}>
            <NavButton
              active={
                (location.pathname === "/" && menu.label === "VAULT") || location.pathname.includes(menu.path)}
              title={menu.label} />
          </Link>
        ))}
      </div>
      <div className={classes.tvlText}>
        tvl: $785.06M
      </div>
      <div className={classes.connectBtn} onClick={handleConnect}>
        <WalletButton connected={connected} address={address} />
      </div>
    </div>
  )
}

export default Header;
