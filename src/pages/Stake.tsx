import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useRecoilState,
} from "recoil";
import {
  amountState,
} from "recoil/atoms";

import Countup from 'react-countup';
import { makeStyles } from "@material-ui/core";
import { STONES } from "utils/stones";
import SmallPrimaryButton from "components/Buttons/SmallPrimaryButton";
import CursorPointer from 'assets/CursorPointer.svg';
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LETToken from 'assets/tokens/LET.svg';
import BgSummary from 'assets/svgs/BGVaultSummary.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';
import LargeFlag from "assets/svgs/flags/large.svg";
import dot from "assets/svgs/Dot.svg";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 72,
    width: 976,
    marginBottom: 52,
  },
  backBtnContainer: {
    height: 40,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    cursor: `url(${CursorPointer}), pointer`,
  },
  iconBack: {
    width: 32,
    height: 32,
    backgroundImage: `url(${IconBackArrow})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  textBack: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: 700,
    background: 'linear-gradient(175.49deg, #FFD271 26.78%, #825900 103.29%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    whiteSpace: 'nowrap',
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginLeft: 27,
    position: 'relative',
    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '& $headerText': {
      position: 'absolute',
      top: '50%',
      left: 76,
      transform: 'translate(0%, -50%)',
    },
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: '#FFD271',
  },
  summaryContainer: {
    backgroundImage: `url(${BgSummary})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: 816,
    height: 176,
    padding: '48px 80px 48px 80px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  divider: {
    marginTop: 40,
    marginBottom: 40,
    height: 20,
    width: 388,
    backgroundImage: `url(${LineMixPurpleAndGold})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  flagContainer: {
    backgroundImage: `url(${LargeFlag})`,
    backgroundRepeat: "no-repeat",
    width: 420,
    height: 726,
    marginBottom: 300,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  stoneIcon: {
    marginTop: 32,
    width: 120,
    height: 120,
    position: 'relative',
    '& img': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
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
    marginTop: 80,
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
    fontSize: 12,
    color: "#CBA344"
  },
  mainBtn: {
    marginTop: 75,
  },
});

function Stake() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const [isStaking, setStakeState] = useState(true);
  const [amount, setAmount] = useRecoilState(amountState);

  useEffect(() => {
    setAmount(0);
  }, [isStaking])

  const balance = 10.313;
  const staked = 180.21;
  const totalStaked = 102.12;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.backBtnContainer} onClick={goBack}>
          <div className={classes.iconBack} />
          <div className={classes.textBack}>
            Back to Staking
          </div>
        </div>
        <div className={classes.iconContainer}>
          <img src={LETToken} />
          <div className={classes.headerText}>LETstaking</div>
        </div>
      </div>
      <div className={classes.summaryContainer}>
        <div style={{
          position: 'absolute',
          top: 48,
          left: 80,
        }}>
          <div className={classes.textLabel}>Total Staked</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={totalStaked}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix="m let"
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 48,
          left: 80,
        }}>
          <div className={classes.textLabel}>Staked</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={staked}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix=" let"
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 48,
          right: 80,
        }}>
          <div className={classes.textLabel} style={{ textAlign: 'right' }}>Stakable</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={balance}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix=" let"
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 48,
          right: 80,
        }}>
          <div className={classes.textLabel} style={{ textAlign: 'right' }}>Rewards</div>
          
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.flagContainer}>
        <div className={classes.stoneIcon}>
          <img src={STONES.LET.xxlarge} />
        </div>
        <div
          className={classes.headerText}
          style={{
            marginTop: 10,
          }}>
          LET
        </div>
        <div className={classes.topDivider0} />
        <div className={classes.topDivider1} />
        <div className={classes.buttonContainer}>
          <div className={classes.buttonWrapper} onClick={() => setStakeState(true)}>
            {isStaking ? <img src={dot} /> : undefined}
            <div className={isStaking ? classes.activeButton : classes.inactiveButton}>STAKING</div>
          </div>
          <div className={classes.buttonWrapper} onClick={() => setStakeState(false)}>
            {!isStaking ? <img src={dot} /> : undefined}
            <div className={!isStaking ? classes.activeButton : classes.inactiveButton}>UNSTAKING</div>
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
              isStaking ?
                setAmount(balance) :
                setAmount(staked)
            }}
          >MAX</div>
        </div>
        <div className={classes.labelContainer}>
          <span className={classes.textLabel}>{`LET`}</span>
          <span className={classes.textLabel}>{`Available : ${isStaking ? balance : staked}`}</span>
        </div>
        <div className={classes.mainBtn}>
          <SmallPrimaryButton>{isStaking ? 'stake $LET' : 'unstake $LET'}</SmallPrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default Stake;
