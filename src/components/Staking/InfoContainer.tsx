import Countup from 'react-countup';
import { makeStyles } from '@material-ui/core';
import BGStaking from 'assets/svgs/BGStaking.svg';
import LETToken from 'assets/tokens/LET.svg';
import IconToken from 'assets/tokens/TokenWrapper.svg';
import BigNumber from 'bignumber.js';
import MediumButton from 'components/Buttons/MediumButton';
import { STONES } from 'utils/stones';

const useStyles = makeStyles({
  root: {
    width: 388,
    height: 294,
    marginLeft: 20,
    marginRight: 20,
    backgroundImage: `url(${BGStaking})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 40,
  },
  mainText: {
    fontWeight: 700,
    color: '#FFD271',
  },
  subText: {
    fontFamily: 'Sen',
    color: '#CBA344',
  },
  summaryContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tokenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  imgContainer: {
    position: 'relative',
    width: 72,
    height: 40,
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
  aprContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userStateContainer: {
  },
  rewardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
    position: 'relative',
    '& img': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
});

interface StakingInfoProps {
  isStaking?: boolean
  aprValue: number
  aprMaxValue?: number
  totalStaked: number
  balance: number
  staked: number
}

function InfoContainer(props: StakingInfoProps) {
  const classes = useStyles();
  const { isStaking, aprValue, aprMaxValue, totalStaked, balance, staked } = props;
  const owned = BigNumber.sum(balance, staked).toNumber();
  const USDC_DATA = 'data:image/png;base64,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';

  return (
    <div className={classes.root}>
      <div className={classes.summaryContainer}>
        <div className={classes.tokenContainer}>
          <div className={classes.imgContainer}>
            {
              isStaking ?
                <img
                  src={LETToken}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translate(0%, -50%)',
                  }}
                />
                :
                <>
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
                </>
            }
          </div>
          <div className={classes.mainText} style={{ fontSize: 20, marginTop: 8, }}>
            {
              isStaking ?
                'stake LET' :
                'LET-USDC lp'
            }
          </div>
        </div>
        <div className={classes.aprContainer}>
          <div className={classes.subText} style={{ fontSize: 12, }}>APR</div>
          <div className={classes.mainText} style={{ fontSize: 16, marginTop: 4 }}>{
            aprMaxValue ?

              <>
                <Countup
                  start={0}
                  end={aprValue}
                  delay={0}
                  duration={0.75}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%"
                />
                {` ~ `}
                <Countup
                  start={0}
                  end={aprMaxValue}
                  delay={0}
                  duration={0.75}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%"
                />
              </>
              :
              <Countup
                start={0}
                end={aprValue}
                delay={0}
                duration={0.75}
                separator=","
                decimals={2}
                decimal="."
                suffix="%"
              />
          }</div>
          <div className={classes.subText} style={{ fontSize: 12, marginTop: 8 }}>{
            isStaking ?
              'Total staked' :
              'Total volume'
          }</div>
          <div className={classes.mainText} style={{ fontSize: 16, marginTop: 4 }}>{
            isStaking ?
              <Countup
                start={0}
                end={totalStaked}
                delay={0}
                duration={0.75}
                separator=","
                decimals={3}
                decimal="."
                suffix=" LET"
              /> :
              <Countup
                start={0}
                end={totalStaked}
                delay={0}
                duration={0.75}
                separator=","
                decimals={0}
                decimal="."
                prefix="$ "
                suffix="M"
              />
          }</div>
        </div>
      </div>
      <div className={classes.userStateContainer}>
        <div className={classes.subText} style={{ fontSize: 12, }}>You have</div>
        <div className={classes.mainText} style={{ fontSize: 16, marginTop: 8 }}>{
          isStaking ?
            <Countup
              start={0}
              end={owned}
              delay={0}
              duration={0.75}
              separator=","
              decimals={6}
              decimal="."
              suffix=" LET"
            /> :
            <Countup
              start={0}
              end={owned}
              delay={0}
              duration={0.75}
              separator=","
              decimals={6}
              decimal="."
              prefix=""
              suffix=" LP STAKED"
            />
        }</div>
        <div className={classes.mainText} style={{ fontSize: 16, marginTop: 8 }}>
          <Countup
            start={0}
            end={staked}
            delay={0}
            duration={0.75}
            separator=","
            decimals={6}
            decimal="."
            prefix="= "
            suffix=" STAKED"
          />
          <Countup
            start={0}
            end={balance}
            delay={0}
            duration={0.75}
            separator=","
            decimals={6}
            decimal="."
            prefix=" + "
            suffix=" STAKABLE"
          />
        </div>
        <div className={classes.mainText} style={{ fontSize: 16, marginTop: 8 }}></div>
      </div>
      <div className={classes.rewardContainer}>
        <div>
          <div className={classes.subText} style={{ marginBottom: 8 }}>Rewards</div>
          {!isStaking ?
            <div className={classes.iconContainer}>
              <img src={STONES.LET.small} />
            </div> :
            <div style={{ display: 'flex', }}>
              <div className={classes.iconContainer}>
                <img src={STONES.LET.small} />
              </div>
              <div className={classes.iconContainer}>
                <img src={STONES.BTC.small} />
              </div>
              <div className={classes.iconContainer}>
                <img src={STONES.ETH.small} />
              </div>
              <div className={classes.iconContainer}>
                <img src={STONES.SOL.small} />
              </div>
              <div className={classes.iconContainer}>
                <img src={STONES.USDC.small} />
              </div>
              <div className={classes.iconContainer}>
                <img src={STONES.USDT.small} />
              </div>
            </div>
          }
        </div>
        {isStaking ?
          <MediumButton text="LETS stake" link="/staking/stake" /> :
          <MediumButton text="LETS provide lp" link="/staking/pool" />
        }
      </div>
    </div >
  );
}

export default InfoContainer;
