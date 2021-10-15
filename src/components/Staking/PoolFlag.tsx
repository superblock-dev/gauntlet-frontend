import { BigNumber } from 'bignumber.js';
import { useEffect, useState } from 'react';
import {
  useRecoilState, useResetRecoilState,
} from "recoil";
import {
  amountState, amountState2,
} from "recoil/atoms";
import { makeStyles } from '@material-ui/core';
import FlagBaseNormal from 'components/Flag/FlagBaseNormal';
import SmallPrimaryButton from 'components/Buttons/SmallPrimaryButton';
import TitleBackground from 'assets/svgs/flags/pool_flag_title.svg';
import DotGreen from 'assets/svgs/Dot.svg';
import DotPurple from 'assets/svgs/DotPurple.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { ReactComponent as Plus } from 'assets/svgs/IconPlus.svg';
import { ReactComponent as ArrowDown } from 'assets/svgs/IconArrowDownPurple.svg';
import { STONES } from 'utils/stones';

const useStyles = makeStyles({
  poolFlagRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inactiveFlag: {
    transform: 'scale(0.5)'
  },
  title: {
    width: 260,
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 700,
    color: '#8A63F4',
    marginBottom: 60,
  },
  activeTitle: {
    backgroundImage: `url(${TitleBackground})`,
    backgroundRepeat: "no-repeat",
  },
  stone: {
    marginTop: 56,
    width: 132,
    height: 80,
    position: 'relative',
  },
  textMain: {
    fontSize: 20,
    color: '#FFD271',
    fontWeight: 700,
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
  modeContainer: {
    display: "flex",
    fontWeight: 700,
    fontSize: 14,
    gap: 16,
    marginTop: 24,
  },
  modeWrapper: {
    height: 27,
    display: "flex",
    flexDirection: "column",
    cursor: `url(${CursorPointer}), pointer`,
  },
  activeMode: {
    color: "#00C9B1",
    fontWeight: 700,
  },
  inactiveMode: {
    marginTop: "auto",
    color: "#007664",
    fontWeight: 700,
  },
  inputLabelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    width: 266,
    height: 54,
    marginBottom: 1,
    background: "radial-gradient(78.76% 933.51% at 50% 100%, rgba(136, 98, 241, 0.11) 0%, rgba(138, 100, 247, 0) 79.55%)",
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
      outline: "none",
    },
    color: "#997614",
    fontFamily: "Spectral SC",
    fontWeight: "bold",
    minWidth: 0, // to hanlde overflow
    "&::placeholder": {
      color: "inherit",
      fontSize: "inherit"
    },
  },
  maxBtn: {
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
    fontWeight: 400,
    fontSize: 12,
    color: "#CBA344",
  },
})

function calculatePrice(amount: number, price: number, mode: boolean) {
  return mode ?
    new BigNumber(amount).multipliedBy(price).toNumber() :
    new BigNumber(amount).dividedBy(price).toNumber();
}

export enum PoolFlagType {
  TRADE,
  POOL,
  STAKE,
}

interface PoolFlagProps {
  type: PoolFlagType
  isActive?: boolean
  coinBalance: number
  pcBalance: number
  lpBalance: number
  coinStaked: number
  pcStaked: number
  lpStaked: number
  letPrice: number
}

function PoolFlag({
  type,
  isActive,
  coinBalance,
  pcBalance,
  lpBalance,
  coinStaked,
  pcStaked,
  lpStaked,
  letPrice,
}: PoolFlagProps) {
  const classes = useStyles();
  let flagTitle, mode1, mode2;
  switch (type) {
    case PoolFlagType.TRADE:
      flagTitle = 'trade $let'
      mode1 = 'BUY'
      mode2 = 'SELL'
      break;
    case PoolFlagType.POOL:
      flagTitle = 'add liquidity'
      mode1 = 'ADD'
      mode2 = 'REMOVE'
      break;
    default:
      flagTitle = 'deposit'
      mode1 = 'DEPOSIT'
      mode2 = 'WITHDRAW'
      break;
  }
  const isPool = type === PoolFlagType.POOL;
  const isStake = type === PoolFlagType.STAKE;
  const isTrade = type === PoolFlagType.TRADE;
  const [mode, setMode] = useState(true);

  const [amount, setAmount] = useRecoilState(amountState);
  const [amount2, setAmount2] = useRecoilState(amountState2);
  const resetAmount = useResetRecoilState(amountState);
  const resetAmount2 = useResetRecoilState(amountState2);

  useEffect(() => {
    resetAmount()
    resetAmount2()
  }, [mode]);

  return (
    <div className={classes.poolFlagRoot}>
      {
        isActive ?
          <div className={`${classes.title} ${classes.activeTitle}`}>
            <img src={DotPurple} />
            <div style={{}}>{flagTitle}</div>
          </div> :
          <div className={classes.title}>
            {flagTitle}
          </div>
      }
      <FlagBaseNormal>
        {isTrade ?
          <div className={classes.stone}>
            <img
              src={mode ? STONES.LET : STONES.USDC}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0.26)',
              }}
            />
          </div> :
          <div className={classes.stone}>
            <img
              src={STONES.USDC}
              style={{
                position: 'absolute',
                top: '50%',
                right: '27.5%',
                transform: 'translate(50%, -50%) scale(0.26)',
              }}
            />
            <img
              src={STONES.LET}
              style={{
                position: 'absolute',
                top: '50%',
                left: '27.5%',
                transform: 'translate(-50%, -50%) scale(0.26)',
              }}
            />
          </div>
        }
        <div className={classes.textMain} style={{ marginTop: 25, }}>
          {isTrade ?
            mode ?
              'LET' :
              'USDC' :
            'LET-USDC lp'}
        </div>
        <div className={classes.topDivider0} />
        <div className={classes.topDivider1} />
        <div className={classes.modeContainer}>
          <div className={classes.modeWrapper} onClick={() => setMode(true)}>
            {mode ? <img src={DotGreen} /> : undefined}
            <span className={mode ? classes.activeMode : classes.inactiveMode}>{
              mode1
            }</span>
          </div>
          <div className={classes.modeWrapper} onClick={() => setMode(false)}>
            {!mode ? <img src={DotGreen} /> : undefined}
            <span className={!mode ? classes.activeMode : classes.inactiveMode}>{
              mode2
            }</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 238,
        }}>
          <div className={classes.inputLabelContainer}>
            <div className={classes.inputContainer} style={{
              marginTop: !isStake ? 22 : 79,
            }}>
              <input
                className={classes.input}
                type='number'
                step='0.1'
                placeholder="0.000"
                value={isActive && amount !== 0 ? amount : undefined}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
              <div
                className={classes.maxBtn}
                onClick={() => {
                  isPool ?
                    mode ?
                      setAmount(coinBalance) :
                      setAmount(coinStaked) :
                    isTrade ?
                      mode ?
                        setAmount(pcBalance) :
                        setAmount(coinBalance) :
                      mode ?
                        setAmount(lpBalance) :
                        setAmount(lpStaked)
                }}
              >MAX</div>
            </div>
            <div className={classes.labelContainer}>
              <span className={classes.textLabel}>{
                isPool ?
                  'LET' :
                  isStake ?
                    'LP' :
                    mode ?
                      'USDC' :
                      'LET'
              }</span>
              <span className={classes.textLabel}>{`Balance: ${isPool ?
                mode ?
                  coinBalance :
                  coinStaked :
                isTrade ?
                  mode ?
                    pcBalance :
                    coinBalance :
                  mode ?
                    lpBalance :
                    lpStaked}`}</span>
            </div>
          </div>
          {!isStake ?
            <>
              {isTrade ?
                <ArrowDown style={{
                  marginTop: 11,
                  marginBottom: 8,
                }} /> :
                <Plus style={{
                  marginTop: 11,
                  marginBottom: 8,
                }} />
              }
              {
                isPool ?
                  <div className={classes.inputLabelContainer}>
                    <div className={classes.inputContainer} >
                      <input
                        className={classes.input}
                        type='number'
                        step='0.1'
                        placeholder="0.000"
                        value={isActive && amount2 !== 0 ? amount2 : undefined}
                        onChange={(e) => setAmount2(parseFloat(e.target.value))}
                      />
                      <div
                        className={classes.maxBtn}
                        onClick={() => {
                          mode ?
                            setAmount2(pcBalance) :
                            setAmount2(pcStaked)
                        }}
                      >MAX</div>
                    </div>
                    <div className={classes.labelContainer}>
                      <span className={classes.textLabel}>{'USDC'}</span>
                      <span className={classes.textLabel}>{`Balance: ${mode ?
                        pcBalance :
                        pcStaked
                        }`}</span>
                    </div>
                  </div> :
                  <div className={classes.inputLabelContainer}>
                    <div className={classes.inputContainer} >
                      <input
                        className={classes.input}
                        type='number'
                        step='0.1'
                        placeholder="0.000"
                        value={
                          isActive && amount !== 0 ? calculatePrice(amount, letPrice, mode) : undefined}
                        disabled
                      />
                    </div>
                    <div className={classes.labelContainer}>
                      <span className={classes.textLabel}>{mode ? 'LET' : 'USDC'}</span>
                    </div>
                  </div>
              }
            </> : null
          }
        </div>
        <div>
          <SmallPrimaryButton>{
            isPool ?
              mode ?
                'add liquidity' :
                'remove liquidity' :
              isTrade ?
                mode ?
                  'buy $let' :
                  'sell $let' :
                mode ?
                  'deposit let-usdc' :
                  'withdraw let-usdc'
          }</SmallPrimaryButton>
        </div>
      </FlagBaseNormal>
    </div >
  )
}

export default PoolFlag;
