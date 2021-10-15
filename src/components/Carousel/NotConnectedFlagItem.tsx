import { useSetRecoilState } from 'recoil';
import { popupState } from 'recoil/atoms';
import { makeStyles } from '@material-ui/core';
import Stone from 'components/Stone/Stone';
import WalletConnectPopup from 'components/WalletConnectPopup';
import { TokenName } from 'types';
import BgFlag from 'assets/backgrounds/bg_flag.png';
import FlagLeftDeco from 'assets/backgrounds/flag_left_deco.png';
import FlagRightDeco from 'assets/backgrounds/flag_right_deco.png';
import FlagLeftTail from 'assets/backgrounds/flag_left_tail.png';
import FlagRightTail from 'assets/backgrounds/flag_right_tail.png';
import SmallPrimaryButton from 'components/Buttons/SmallPrimaryButton';
import './Carousel.css';

export interface NotConnectedFlagItemProps {
  id: any;
  level: number;
  symbol: TokenName;
  onClick: () => void;
}

const useStyles = makeStyles({
  flagContainer: {
    backgroundImage: `url(${BgFlag})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textSymbol: {
    fontSize: 16,
    fontWeight: "bold",
    background: "linear-gradient(175.49deg, #FFD271 26.78%, #825900 64.2%)",
    color: "transparent",
    WebkitBackgroundClip: "text",
  },
  divider: {
    marginTop: 64,
    width: 266,
    borderTop: "0",
    borderBottom: "1px solid",
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
    display: "flex",
  },
  confirmBtn: {
    marginTop: 175,
  }
})

export default function NotConnectedFlagItem(props: NotConnectedFlagItemProps) {
  const classes = useStyles();
  const { level, symbol, onClick } = props;
  const setPopupState = useSetRecoilState(popupState);

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }

  return (
    <div
      className={`item level${level} ${classes.flagContainer}`}
      onClick={() => onClick()}
    >
      <img src={FlagLeftDeco} className={`left-deco`} />
      <img src={FlagRightDeco} className={`right-deco`} />
      <img src={FlagLeftTail} className={`left-tail-deco`} />
      <img src={FlagRightTail} className={`right-tail-deco`} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: level === 0 ? 80 : Math.abs(level) == 1 ? 160 : 129,
        marginBottom: level === 0 ? 0 : 16,
        transition: 'all 0.25s',
        transitionDelay: '0s',
      }}>
        <Stone tokenName={symbol} size="xlarge" />
        <span className={classes.textSymbol}>{symbol}</span>
        <div style={{
          width: level === 0 ? 266 : 0,
          height: level === 0 ? 488 : 0,
          transition: 'height 0s ease 0.25s, width 0s ease 0s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
          <div className={classes.divider} />

          <div
            className={classes.confirmBtn}
            onClick={handleConnect}
          >
            <SmallPrimaryButton>Connect Wallet</SmallPrimaryButton>
          </div>
        </div>
      </div>
    </div >
  )
}
