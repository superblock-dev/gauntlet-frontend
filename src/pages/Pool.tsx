import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useResetRecoilState,
} from "recoil";
import {
  amountState, amountState2,
} from "recoil/atoms";
import { v4 as uuidV4 } from "uuid";

import Countup from 'react-countup';
import { makeStyles } from "@material-ui/core";
import PoolFlag, { PoolFlagType } from "components/Staking/PoolFlag";
import FlagNavigation from "components/Vaults/FlagNavigation";
import Slider from "components/Slider";
import CursorPointer from 'assets/CursorPointer.svg';
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LETToken from 'assets/tokens/LET.svg';
import BgSummary from 'assets/svgs/BGVaultSummary.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';
import LineDivider from 'assets/svgs/LineDivider.svg';
import IconToken from 'assets/tokens/TokenWrapper.svg';
import BgPoolInfo from 'assets/svgs/BGPoolInfo.svg';
import { ReactComponent as IconSwap } from 'assets/svgs/IconSwap.svg';
import { ReactComponent as IconEqual } from 'assets/svgs/IconEqual.svg';
import { ReactComponent as IconHelp } from 'assets/svgs/IconHelp.svg';

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
    width: 922,
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
      left: 92,
      transform: 'translate(0%, -50%)',
    },
  },
  tokenImg: {
    backgroundImage: `url(${IconToken})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginLeft: 32,
    width: 40,
    height: 40,
    position: 'relative',
    '& img': {
      position: 'absolute',
      borderRadius: '50%',
      width: 20,
      height: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
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
  sliderContainer: {
    width: 1440,
    minHeight: 760,
    height: 'auto',
    position: "relative",
  },
  textLabel: {
    fontFamily: "Sen",
    fontSize: 12,
    color: "#CBA344"
  },
  divider2: {
    width: '100%',
    height: 22,
    backgroundImage: `url(${LineDivider})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: 48,
    marginBottom: 48,
  },
  poolInfoContainer: {
    width: 372,
    height: 92,
    padding: 24,
    marginBottom: 240,
    backgroundImage: `url(${BgPoolInfo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  poolInfoItem: {
    height: 17,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  poolInfoValue: {
    '& span': {
      fontFamily: 'Sen',
      color: '#CBA344',
      fontSize: 14,
    },
    display: 'flex',
    alignItems: 'center',
  },
});

function createSlide(
  type: PoolFlagType,
  isActive: boolean,
  coinBalance: number,
  pcBalance: number,
  lpBalance: number,
  coinStaked: number,
  pcStaked: number,
  lpStaked: number,
  letPrice: number,
  onClick: () => void,
) {
  return {
    key: uuidV4(),
    content: <PoolFlag
      type={type}
      isActive={isActive}
      coinBalance={coinBalance}
      pcBalance={pcBalance}
      lpBalance={lpBalance}
      coinStaked={coinStaked}
      pcStaked={pcStaked}
      lpStaked={lpStaked}
      letPrice={letPrice}
    />,
    isParellel: true,
    onClick: onClick
  }
}

function LetLpPool() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);
  const resetAmount = useResetRecoilState(amountState);
  const resetAmount2 = useResetRecoilState(amountState2);

  const USDC_DATA = 'data:image/png;base64,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';

  const letBalance = 120.1239;
  const usdcBalance = 1231.12389;
  const letStaked = 4824.38;
  const usdcStaked = 34573.12;
  const lpBalance = 10.313;
  const lpStaked = 180.21;
  const apr = 95.39;
  const letPrice = 0.891;

  const flags = [PoolFlagType.POOL, PoolFlagType.STAKE, PoolFlagType.TRADE].map((s, i) => createSlide(
    s,
    slideIndex === i,
    letBalance,
    usdcBalance,
    lpBalance,
    letStaked,
    usdcStaked,
    lpStaked,
    letPrice,
    () => setSlideIndex(i))
  );

  useEffect(() => {
    resetAmount();
    resetAmount2();
  }, [slideIndex]);

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
          <div className={classes.tokenImg}>
            <img src={USDC_DATA} />
          </div>
          <img
            src={LETToken}
            style={{
              position: 'absolute',
              top: '50%',
              left: '0%',
              transform: 'translate(0%, -50%)',
            }}
          />
          <div className={classes.headerText}>LET-USDC lp</div>

          <div style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translate(0, -50%)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div className={classes.textLabel}>Total volume</div>
            <div style={{
              marginTop: 4,
              fontSize: 20,
              fontWeight: 700,
              color: '#FFD271',
            }}>$ 103M</div>
          </div>
        </div>
      </div>
      <div className={classes.summaryContainer}>
        <div style={{
          position: 'absolute',
          top: 48,
          left: 80,
        }}>
          <div className={classes.textLabel}>APR</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={apr}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix=" %"
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 48,
          left: 80,
        }}>
          <div className={classes.textLabel}>Deposits</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={lpStaked}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix=" lp"
            />
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 48,
          right: 80,
        }}>
          <div className={classes.textLabel} style={{ textAlign: 'right' }}>Available</div>
          <div className={classes.headerText} style={{ marginTop: 16 }}>
            <Countup
              start={0}
              end={lpBalance}
              delay={0}
              duration={0.75}
              separator=","
              decimals={2}
              decimal="."
              suffix=" lp"
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
      <div className={classes.sliderContainer}>
        <FlagNavigation onClick={(direction: number) => {
          const index = slideIndex + direction;
          const nextIndex = index >= flags.length ? 0 : index < 0 ? flags.length - 1 : index;
          setSlideIndex(nextIndex);
        }} />
        <div style={{ height: 862, }}>
          <Slider index={slideIndex} slides={flags} />
        </div>
      </div>
      {
        slideIndex % 2 === 1 ?
          <div style={{ width: '100%', height: 240, }} /> :
          <>
            <div className={classes.divider2} />
            <div className={classes.poolInfoContainer}>
              <div className={classes.poolInfoItem}>
                <div className={classes.poolInfoValue}>
                  <span>1 LET</span>
                  <IconEqual style={{ marginLeft: 8, marginRight: 8 }} />
                  <span>00.000000 USDC</span>
                  <IconSwap style={{ marginLeft: 8, }} />
                </div>
                <div className={classes.poolInfoValue}>
                  <span>Price</span>
                </div>
              </div>
              <div className={classes.poolInfoItem}>
                <div className={classes.poolInfoValue}>
                  <span>3,000,000.000000 LET</span>
                </div>
                <div className={classes.poolInfoValue}>
                  <span>Pool Liquidity</span>
                  <IconHelp style={{ marginLeft: 4, }} />
                </div>
              </div>
              <div className={classes.poolInfoItem}>
                <div className={classes.poolInfoValue}>
                  <span>3,000,000.000000 USDC</span>
                </div>
              </div>
              <div className={classes.poolInfoItem}>
                <div className={classes.poolInfoValue}>
                  <span>7,383,601.500687</span>
                </div>
                <div className={classes.poolInfoValue}>
                  <span>LP supply</span>
                  <IconHelp style={{ marginLeft: 4, }} />
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default LetLpPool;
