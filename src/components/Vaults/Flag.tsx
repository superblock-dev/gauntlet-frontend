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
} from "recoil/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { makeStyles } from "@material-ui/core"
import WalletConnectPopup from "components/WalletConnectPopup";
import SmallButton from "components/Buttons/SmallButton";
import SmallPrimaryButton from "components/Buttons/SmallPrimaryButton";
import { TokenName } from "types";
import { STONES } from "utils/stones";
import CursorPointer from 'assets/CursorPointer.svg';
import LargeFlag from "assets/svgs/flags/large.svg";
import SmallFlag from "assets/svgs/flags/small.svg";
import MiniFlag from "assets/svgs/flags/mini-1.svg";
import dot from "assets/svgs/Dot.svg";

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
  },
  xxlargeSoul: {
    marginTop: 32,
    width: 120,
    height: 120,
    position: 'relative',
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
    marginTop: 24,
    width: 266,
    height: 54,
    background: "radial-gradient(78.76% 933.51% at 50% 100%, rgba(136, 98, 241, 0.11) 0%, rgba(138, 100, 247, 0) 79.55%)",
    display: "flex",
    alignItems: "center",
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

interface FlagProps {
  tokenName: TokenName;
  deposited: number;
  balance: number;
  reward?: number;
  active?: boolean;
}

type ActiveFlagProps = {
  isDeposit?: boolean
  onClick?: (...args: any) => void;
  onChange?: (mode: boolean) => void;
} & FlagProps;

function stoneImage(tokenName: TokenName, xlarge?: boolean) {
  const lpTokenNames: TokenName[] = [
    "RAY-ETH",
    'RAY-SOL',
    "RAY-USDC",
    "RAY-USDT",
  ];

  if (lpTokenNames.includes(tokenName)) {
    const firstToken = tokenName.split("-")[0];
    const secondToken = tokenName.split("-")[1];
    const stone1 = xlarge ? STONES[firstToken].xlarge : STONES[firstToken].xxlarge;
    const stone2 = xlarge ? STONES[secondToken].xlarge : STONES[secondToken].xxlarge;
    return (
      <>
        <img
          src={stone1}
          style={{
            position: "absolute",
            top: '50%',
            left: '33.3%',
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          src={stone2}
          style={{
            position: "absolute",
            top: '50%',
            right: "33.3%",
            transform: "translate(50%, -50%)",
          }}
        />
      </>
    )
  }
  const stone = xlarge ? STONES[tokenName].xlarge : STONES[tokenName].xxlarge;
  return (
    <img src={stone}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
  )
}

function NotConnectedFlag({ tokenName, deposited, balance, onClick }: ActiveFlagProps) {
  const classes = useStyles();
  return (
    <div className={classes.activeFlag} style={{ backgroundImage: `url(${SmallFlag})` }}>
      <div className={classes.xxlargeSoul}>
        {
          stoneImage(tokenName)
        }
      </div>
      <div className={classes.tokenName}>{tokenName}</div>
      <div className={classes.inputContainer} style={{ marginTop: 32, }}>
        <input className={classes.input} placeholder="0.000" />
      </div>
      <div className={classes.labelContainer}>
        <span className={classes.textLabel}>{`Deposit: ${(deposited).toFixed(6)}`}</span>
        <span className={classes.textLabel}>{`Balance: ${(balance).toFixed(6)}`}</span>
      </div>
      <div className={classes.connectBtn} onClick={onClick}>
        <SmallPrimaryButton>Connect Wallet</SmallPrimaryButton>
      </div>
    </div>

  );
}

function NormalFlag({ tokenName, deposited, balance, reward, onClick, isDeposit, onChange }: ActiveFlagProps) {
  const classes = useStyles();
  const prices = useRecoilValue(rewardPrices);
  const [amount, setAmount] = useRecoilState(amountState);

  const mode = isDeposit ? "Deposit" : "Withdraw";
  const price = reward ? reward * prices[tokenName] : 0;

  return (
    <div className={classes.activeFlag} style={{ backgroundImage: `url(${LargeFlag})` }}>
      <div className={classes.xxlargeSoul}>
        {stoneImage(tokenName)}
      </div>
      <div className={classes.tokenName}>{tokenName}</div>
      <div className={classes.reward}>{`${reward ? reward : 0}`}</div>
      <div className={classes.rewardInUSD}>{`$ ${price.toFixed(3)}`}</div>
      <div className={classes.claimButton}>
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
          className={classes.input}
          type='number'
          step='0.1'
          placeholder="0.000"
          value={amount}
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
      <div className={classes.confirmBtn} onClick={onClick}>
        <SmallPrimaryButton>{mode}</SmallPrimaryButton>
      </div>
    </div>
  );
}

function ActiveFlag({ tokenName, deposited, balance, reward }: ActiveFlagProps) {
  const [isDeposit, setIsDeposit] = useRecoilState(depositState);
  const setPopupState = useSetRecoilState(popupState);
  const resetAmount = useResetRecoilState(amountState);
  const { connected } = useWallet();

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }

  return connected ?
    <NormalFlag
      tokenName={tokenName}
      deposited={deposited}
      balance={balance}
      reward={reward}
      isDeposit={isDeposit}
      onClick={() => { return }}
      onChange={(mode) => {
        setIsDeposit(mode);
        resetAmount();
      }} /> :
    <NotConnectedFlag
      tokenName={tokenName}
      deposited={deposited}
      balance={balance}
      reward={reward}
      onClick={handleConnect}
    />

}

function InActiveFlag({ tokenName }: FlagProps) {
  const classes = useStyles();
  return (
    <div className={classes.inactiveFlag} style={{ backgroundImage: `url(${MiniFlag})` }}>
      <div className={classes.xxlargeSoul}>
        {stoneImage(tokenName, true)}
      </div>
    </div>
  );
}

export default function Flag({ tokenName, deposited, balance, reward, active }: FlagProps) {
  return (
    active
      ? <ActiveFlag
        tokenName={tokenName}
        deposited={deposited}
        balance={balance}
        reward={reward}
      />
      : <InActiveFlag tokenName={tokenName} deposited={deposited} balance={balance} />
  )
}