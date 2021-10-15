import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { liquidityPoolInfos, Reward, rewardPrices } from 'recoil/atoms';
import { useRecoilValue } from 'recoil';
import Countup from 'react-countup';
import { makeStyles } from '@material-ui/core';

import { Strategy } from 'types';
import Stone from 'components/Stone/Stone';
import SmallButton from 'components/Buttons/SmallButton';
import SmallPrimaryButton from 'components/Buttons/SmallPrimaryButton';
import BgFlag from 'assets/backgrounds/bg_flag.png';
import FlagLeftDeco from 'assets/backgrounds/flag_left_deco.png';
import FlagRightDeco from 'assets/backgrounds/flag_right_deco.png';
import FlagLeftTail from 'assets/backgrounds/flag_left_tail.png';
import FlagRightTail from 'assets/backgrounds/flag_right_tail.png';
import CursorPointer from 'assets/CursorPointer.svg';
import dot from "assets/svgs/Dot.svg";
import './Carousel.css';

export interface FlagItemProps {
  id: any;
  level: number;
  item: Reward;
  onClick: () => void;
  handleDeposit: (amount: number, strategyInfo: Strategy) => void;
  handleWithdraw: (amount: number, rewardAmount: number, strategyInfo: Strategy) => void;
  handleClaim: () => void;
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
  textAmount: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: "27px",
    color: '#FFD271',
  },
  textBucks: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: "21px",
    color: '#FFD271',
  },
  claimButton: {
    marginTop: 8,
    width: 266,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginTop: 24,
    width: 266,
    borderTop: "0",
    borderBottom: "1px solid",
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
    display: "flex",
  },
  modeBtnContainer: {
    display: "flex",
    fontFamily: "Spectral SC",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: "21px",
    gap: 16,
    marginTop: 24,
  },
  modeBtnWrapper: {
    height: 27,
    display: "flex",
    flexDirection: "column",
    cursor: `url(${CursorPointer}), pointer`,
  },
  activeModeBtn: {
    color: "#00C9B1",
    fontWeight: 700,
  },
  inactiveModeBtn: {
    marginTop: "auto",
    color: "#007664",
    fontWeight: 700,
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 1,
    width: 266,
    height: 54,
    background: "linear-gradient(78deg, rgba(138, 100, 247, 0) 20%, rgba(136, 98, 241, 0.11) 50%, rgba(138, 100, 247, 0) 80%)",
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
    fontFamily: 'Spectral SC',
    color: '#FFD271',
    fontWeight: "bold",
    minWidth: 0, // to hanlde overflow
    "&::placeholder": {
      fontSize: "inherit",
      color: "#997614",
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
  },
  confirmBtn: {
    marginTop: 32,
  }
})

export default function FlagItem(props: FlagItemProps) {
  const classes = useStyles();
  const prices = useRecoilValue(rewardPrices);
  const [mode, setMode] = useState(true);
  const [amount, setAmount] = useState(0);
  const { level, item, onClick } = props;

  const confirmText = mode ? "Deposit" : "Withdraw";

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
        marginTop: level === 0 ? 40 : Math.abs(level) === 1 ? 160 : 129,
        marginBottom: level === 0 ? 0 : 16,
        transition: 'all 0.25s',
        transitionDelay: '0s',
      }}>
        <Stone tokenName={item.symbol} size="xlarge" />
        <span className={classes.textSymbol}>{item.symbol}</span>
        <div style={{
          width: level === 0 ? 266 : 0,
          height: level === 0 ? 488 : 0,
          transition: 'height 0s ease 0.25s, width 0s ease 0s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
          <span className={classes.textAmount}>
            <Countup
              start={0}
              end={item.amount}
              delay={0}
              duration={1}
              decimals={6}
              separator=","
              decimal="."
            />
          </span>
          <span className={classes.textAmount}>
            <Countup
              start={0}
              end={new BigNumber(item.amount).multipliedBy(item.symbol in prices ?
                prices[item.symbol] :
                0).toNumber()}
              delay={0}
              duration={1}
              decimals={2}
              separator=","
              decimal="."
              prefix="$ "
            />
          </span>

          <div
            className={classes.claimButton}
          // onClick={onClickClaim}
          >
            <SmallButton text="claim" />
          </div>
          <div className={classes.divider} />
          <div className={classes.modeBtnContainer}>
            <div className={classes.modeBtnWrapper} onClick={() => setMode(true)}>
              {mode ? <img src={dot} /> : undefined}
              <div className={mode ? classes.activeModeBtn : classes.inactiveModeBtn}>DEPOSIT</div>
            </div>
            <div className={classes.modeBtnWrapper} onClick={() => setMode(false)}>
              {!mode ? <img src={dot} /> : undefined}
              <div className={!mode ? classes.activeModeBtn : classes.inactiveModeBtn}>WITHDRAW</div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <input
              key="input-main"
              className={classes.input}
              type='number'
              step='0.1'
              placeholder="0.000"
              value={amount === 0 ? "" : amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <div
              className={classes.maxButton}
              onClick={() => {
                // isDeposit ?
                //   setAmount(balance) :
                //   setAmount(deposited)
              }}
            >MAX</div>
          </div>
          <div className={classes.labelContainer}>
            <span className={classes.textLabel}>{`Deposit: ${(item.deposit).toFixed(6)}`}</span>
            {/* <span className={classes.textLabel}>{`Balance: ${(balance).toFixed(6)}`}</span> */}
          </div>
          <div
            className={classes.confirmBtn}
          // onClick={
          // mode ?
          //   () => {
          //     onClickDeposit(amount, tokenName)
          //     resetAmount()
          //   } :
          //   () => {
          //     onClickWithdraw(amount, tokenName)
          //     resetAmount()
          //   }
          // }
          >
            <SmallPrimaryButton>{confirmText}</SmallPrimaryButton>
          </div>
        </div>
      </div>
    </div >
  )
}
