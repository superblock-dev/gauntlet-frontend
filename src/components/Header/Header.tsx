import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { popupState } from 'recoil/atoms';
import { HeaderProps } from './Header.types';
import { makeStyles } from '@material-ui/core';
import NavButton from 'components/Buttons/NavButton';
import WalletButton from 'components/Buttons/WalletButton';
import Logo from 'assets/svgs/logo.svg';
import WalletConnectPopup from 'components/WalletConnectPopup';

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
    height: 36,
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }
})


function Header({ routeList }: HeaderProps) {
  const location = useLocation();
  const classes = useStyles();
  const setPopupState = useSetRecoilState(popupState);

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }

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
              active={location.pathname === menu.path}
              title={menu.label} />
          </Link>
        ))}
      </div>
      <div className={classes.connectBtn} onClick={handleConnect}>
        <WalletButton connected={false} address="" />
      </div>
    </div>
  )
}

export default Header;
