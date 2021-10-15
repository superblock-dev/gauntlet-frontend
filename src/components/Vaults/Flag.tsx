import {
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import {
  amountState,
  rewardPrices,
  popupState,
  isDeposit as depositState,
  activeFlagIndex,
} from "recoil/atoms";
import Countup from 'react-countup';
import { useWallet } from "@solana/wallet-adapter-react";
import { makeStyles } from "@material-ui/core"
import WalletConnectPopup from "components/WalletConnectPopup";
import SmallButton from "components/Buttons/SmallButton";
import SmallPrimaryButton from "components/Buttons/SmallPrimaryButton";
import Stone from 'components/Stone/Stone';
import { TokenName } from "types";
import CursorPointer from 'assets/CursorPointer.svg';
import LargeFlag from "assets/svgs/flags/large.svg";
import SmallFlag from "assets/svgs/flags/small.svg";
import MiniFlag from "assets/svgs/flags/mini-1.svg";
import dot from "assets/svgs/Dot.svg";
import { HOME_FLAG_DATA, REWARDS } from "utils/constants";

const useStyles = makeStyles({
  activeFlag: {
    backgroundRepeat: "no-repeat",
    width: 420,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  inactiveFlag: {
    height: 274,
    width: 169,
    padding: 4,
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      backgroundImage: `url("/mini-flag-hover.svg") !important`,
      transform: 'scale(1.05)',
    }
  },
  xlargeSoul: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -10%)"
  },
  tokenName: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    background: "linear-gradient(#FFD271, #825900)",
    color: "transparent",
    WebkitBackgroundClip: "text",
  },
  reward: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD271",
  },
  rewardInUSD: {
    fontFamily: "Spectral SC",
    textAlign: 'center',
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD271",
  },
  claimButton: {
    marginTop: 8,
    width: 104,
    height: 32,
  },
  topDivider0: { // TODO: reuse
    marginTop: 32,
    width: 266,
    borderTop: "0",
    borderBottom: "1px solid",
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
    display: "flex",
  },
  topDivider1: {
    marginTop: 4,
    width: 152,
    borderTop: "0",
    borderBottom: "1px solid",
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(0, 201, 177, 0), #00C9B1 50%, rgba(0, 201, 177, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
    display: "flex",
  },
  buttonContainer: {
    display: "flex",
    fontFamily: "Spectral SC",
    fontStyle: "bold",
    fontSize: 14,
    lineHeight: "21px",
    gap: 16,
    marginTop: 32,
  },
  buttonWrapper: {
    height: 27,
    display: "flex",
    flexDirection: "column",
    cursor: `url(${CursorPointer}), pointer`,
  },
  activeButton: {
    color: "#00C9B1",
    fontWeight: 700,
  },
  inactiveButton: {
    marginTop: "auto",
    color: "#007664",
    fontWeight: 700,
  },
  inputContainer: {
    marginTop: 23,
    marginBottom: 1,
    width: 266,
    height: 54,
    background: "linear-gradient(78deg rgba(136, 98, 241, 0.11) 0%, rgba(138, 100, 247, 0) 79.55%)",
    display: "flex",
    alignItems: "center",
    '&:hover': {
      borderBottom: '1px solid',
      borderImage: 'linear-gradient(to right, rgba(143, 103, 255, 0) 0%, #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
      borderImageSlice: 1,
      borderImageWidth: '0 0 1px 0',
      marginBottom: 0,
    },
    '&:focus-within': {
      borderBottom: '1px solid',
      borderImage: 'linear-gradient(to right, rgba(143, 103, 255, 0) 0%, #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
      borderImageSlice: 1,
      borderImageWidth: '0 0 1px 0',
      marginBottom: 0,
    },
  },
  input: {
    margin: "0 8px",
    background: "none",
    border: "none",
    "&:focus": {
      outline: "none"
    },
    color: "#997614",
    fontFamily: "Spectral SC",
    fontWeight: "bold",
    minWidth: 0, // to hanlde overflow
    "&::placeholder": {
      color: "inherit",
      fontSize: "inherit"
    }
  },
  maxButton: {
    width: 52,
    height: 24,
    color: "#00C9B1",
    fontSize: 14,
    lineHeight: "21px",
    margin: "0 8px 0 0",
    cursor: `url(${CursorPointer}), pointer`,
    fontWeight: 700,
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "266px",
    marginTop: 8,
  },
  textLabel: {
    fontFamily: "Sen",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "14px",
    color: "#CBA344"
  },
  connectBtn: {
    marginTop: 32,
    marginBottom: 184,
  },
  confirmBtn: {
    marginTop: 32,
    marginBottom: 154,
  }
});

interface InactiveFlagProps {
  tokenName: TokenName;
  onClickConnect?: (...args: any) => void;
}

interface FlagProps {
  tokenName: TokenName;
  deposited: number;
  balance: number;
  index: number;
  reward?: number;
  isHome?: boolean;
  onClickDeposit: (amount: number, tokenName: TokenName) => void;
  onClickWithdraw: (amount: number, tokenName: TokenName) => void;
  onClickClaim: (...args: any) => void;
}

interface ActiveFlagProps {
  isDeposit?: boolean
  onChange?: (mode: boolean) => void;
  flagProps: FlagProps
}

function NotConnectedFlag({ tokenName, onClickConnect }: InactiveFlagProps) {
  const classes = useStyles();
  return (
    <div className={classes.activeFlag} style={{ backgroundImage: `url(${SmallFlag})` }}>
      <Stone tokenName={tokenName} size="xxlarge" style={{ marginTop: 32, }} />
      <div className={classes.tokenName}>{tokenName}</div>
      <div className={classes.connectBtn} style={{ marginTop: 120, }} onClick={onClickConnect}>
        <SmallPrimaryButton>Connect Wallet</SmallPrimaryButton>
      </div>
    </div>
  );
}

function InActiveFlag({ tokenName }: InactiveFlagProps) {
  const classes = useStyles();
  return (
    <div
      className={classes.inactiveFlag}
      style={{
        backgroundImage: `url(${MiniFlag})`,
      }}>
      <Stone tokenName={tokenName} size="xlarge" style={{ marginTop: 32, width: 120, }} />
    </div>
  );
}

function NormalFlag({
  flagProps,
  isDeposit,
  onChange
}: ActiveFlagProps) {
  const {
    tokenName,
    deposited,
    balance,
    reward,
    onClickClaim,
    onClickDeposit,
    onClickWithdraw,
  } = flagProps;
  const classes = useStyles();
  const prices = useRecoilValue(rewardPrices);
  const [amount, setAmount] = useRecoilState(amountState);
  const resetAmount = useResetRecoilState(amountState);

  const mode = isDeposit ? "Deposit" : "Withdraw";
  const price = reward ?
    reward * (tokenName in prices ?
      prices[tokenName] :
      0) :
    0;

  return (
    <div className={classes.activeFlag} style={{ backgroundImage: `url(${LargeFlag})` }}>
      <Stone tokenName={tokenName} size="xxlarge" style={{ marginTop: 32, }} />
      <div className={classes.tokenName}>{tokenName}</div>
      <div className={classes.reward}>
        <Countup
          start={0}
          end={reward ? reward : 0}
          delay={0}
          duration={0.75}
          separator=","
          decimals={2}
          decimal="."
        />
      </div>
      <div className={classes.rewardInUSD}>
        <Countup
          start={0}
          end={price}
          delay={0}
          duration={0.75}
          separator=","
          decimals={3}
          decimal="."
          prefix="$ "
        />
      </div>
      <div className={classes.claimButton} onClick={onClickClaim}>
        <SmallButton text="claim" />
      </div>
      <div className={classes.topDivider0} />
      <div className={classes.topDivider1} />
      <div className={classes.buttonContainer}>
        <div className={classes.buttonWrapper} onClick={() => onChange ? onChange(true) : undefined}>
          {isDeposit ? <img src={dot} /> : undefined}
          <div className={isDeposit ? classes.activeButton : classes.inactiveButton}>DEPOSIT</div>
        </div>
        <div className={classes.buttonWrapper} onClick={() => onChange ? onChange(false) : undefined}>
          {!isDeposit ? <img src={dot} /> : undefined}
          <div className={!isDeposit ? classes.activeButton : classes.inactiveButton}>WITHDRAW</div>
        </div>
      </div>
      <div className={classes.inputContainer}>
        <input
          key="input-main"
          className={classes.input}
          type='number'
          step='0.1'
          placeholder="0.000"
          value={amount ? amount : ""}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <div
          className={classes.maxButton}
          onClick={() => {
            isDeposit ?
              setAmount(balance) :
              setAmount(deposited)
          }}
        >MAX</div>
      </div>
      <div className={classes.labelContainer}>
        <span className={classes.textLabel}>{`Deposit: ${(deposited).toFixed(6)}`}</span>
        <span className={classes.textLabel}>{`Balance: ${(balance).toFixed(6)}`}</span>
      </div>
      <div
        className={classes.confirmBtn}
        onClick={
          isDeposit ?
            () => {
              onClickDeposit(amount, tokenName)
              resetAmount()
            } :
            () => {
              onClickWithdraw(amount, tokenName)
              resetAmount()
            }
        }>
        <SmallPrimaryButton>{mode}</SmallPrimaryButton>
      </div>
    </div>
  );
}

function ActiveFlag(props: ActiveFlagProps) {
  const { tokenName, isHome } = props.flagProps;
  const [isDeposit, setIsDeposit] = useRecoilState(depositState);
  const setPopupState = useSetRecoilState(popupState);
  const resetAmount = useResetRecoilState(amountState);
  const { connected } = useWallet();

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }

  return isHome || connected ?
    <NormalFlag
      flagProps={props.flagProps}
      isDeposit={isDeposit}
      onChange={(mode) => {
        setIsDeposit(mode);
        resetAmount();
      }} /> :
    <NotConnectedFlag tokenName={tokenName} onClickConnect={handleConnect} />
}

export default function Flag(props: FlagProps) {
  const { tokenName, index, isHome } = props;
  const activeIndex = useRecoilValue(activeFlagIndex);
  const length = isHome ? HOME_FLAG_DATA.length : REWARDS.length;
  
  const mod = activeIndex % length;
  const aIndex = mod < 0 ? mod + 12 : mod;
  

  return (
    aIndex === index ?
      <ActiveFlag flagProps={props} /> :
      <InActiveFlag tokenName={tokenName} />
  )
}