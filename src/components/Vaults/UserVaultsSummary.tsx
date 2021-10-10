import { BigNumber } from 'bignumber.js';
import Countup from 'react-countup';
import { STONES } from "utils/stones";
import { TokenName } from "types";
import { makeStyles } from "@material-ui/core";
import OutlineVault from 'assets/svgs/OutlineVault.svg';
import TooltipVault from 'assets/svgs/TooltipVault.svg';

const useStyles = makeStyles({
  vaultSummaryContainer: {
    width: 864,
    height: 192,
    marginTop: 64,
    padding: '48px 56px',
    backgroundImage: `url(${OutlineVault})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vaultSummaryLeft: {
    width: 338,
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryContent: {
    // width: 123,
    display: 'flex',
    flexDirection: 'column',
  },
  summaryHeader: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    height: 14,
    color: '#CBA344',
    marginBottom: 4,
  },
  summaryBody: {
    fontWeight: 700,
    fontSize: 20,
    height: 30,
    color: '#FFD271',
    marginBottom: 4,
  },
  summarySubBody: {
    fontSize: 16,
    fontWeight: 700,
    height: 24,
    color: '#CBA344',
  },
  vaultSummaryRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  gauntletCopyText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 700,
    background: 'linear-gradient(101.46deg, #8963F3 1.69%, #00C9B1 103.87%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    marginBottom: 20,
  },
  stoneListContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  stoneItem: {
    width: 64,
    height: 80,
    position: 'relative',
    '&:hover $stoneImg': {
      transition: 'all 0.67s', /* Animation */
      transform: 'translate(-50%, 50%) scale(1.4)',
    },
    '&:hover $tooltipBox': {
      display: 'block',
    },
    '&:hover $tooltipText': {
      display: 'block',
    }
  },
  stoneImg: {
    position: 'absolute',
    bottom: 24,
    left: 32,
    transform: 'translate(-50%, 50%) scale(0.16)',
  },
  tooltipBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 64,
    height: 30,
    backgroundImage: `url(${TooltipVault})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'none',
  },
  tooltipText: {
    position: 'absolute',
    top: 3,
    left: 0,
    width: 64,
    textAlign: 'center',
    color: '#8F67FF',
    fontSize: 12,
    fontWeight: 700,
    display: 'none',
  },
});

interface UserVaultsSummaryProps {
  totalDeposit: number;
  totalLpValueInUSD: BigNumber;
  totalRewardsInUSD: BigNumber;
  avgApr: BigNumber;
}

function UserVaultsSummary({ totalDeposit, totalLpValueInUSD, totalRewardsInUSD, avgApr }: UserVaultsSummaryProps) {
  const classes = useStyles();
  const rewardTokenList = [
    'LET',
    'RAY',
    'USDT',
    'USDC',
    'SOL',
    'ETH',
    'BTC'
  ];

  return (
    <div className={classes.vaultSummaryContainer}>
      <div className={classes.vaultSummaryLeft}>
        <div style={{
          height: 192,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div className={classes.summaryContent}>
            <div className={classes.summaryHeader}>Total Deposits</div>
            <div className={classes.summaryBody}>
              <Countup
                start={0}
                end={totalDeposit}
                delay={0}
                duration={0.75}
                separator=","
                decimals={3}
                decimal="."
                prefix=""
              />
            </div>
            <div className={classes.summarySubBody}>
              <Countup
                start={0}
                end={totalLpValueInUSD.toNumber()}
                delay={0}
                duration={0.75}
                separator=","
                decimals={3}
                decimal="."
                prefix="$ "
              />
            </div>
          </div>
          <div className={classes.summaryContent}>
            <div className={classes.summaryHeader}>Average APR</div>
            <div className={classes.summaryBody}>
              <Countup
                start={0}
                end={avgApr.toNumber()}
                delay={0}
                duration={0.75}
                decimals={2}
                decimal="."
                suffix=" %"
              />
            </div>
            <div className={classes.summarySubBody}>
              <Countup
                start={0}
                end={avgApr.dividedBy(365).toNumber()}
                delay={0}
                duration={0.75}
                decimals={2}
                decimal="."
                prefix="Daily "
                suffix=" %"
              />
            </div>
          </div>
        </div>
        <div className={classes.summaryContent}>
          <div className={classes.summaryHeader}>User Rewards</div>
          <div className={classes.summaryBody}>
            <Countup
              start={0}
              end={totalRewardsInUSD.toNumber()}
              delay={0}
              duration={0.75}
              separator=","
              decimals={3}
              decimal="."
              prefix="$ "
            />
          </div>
        </div>
      </div>
      <div className={classes.vaultSummaryRight}>
        <div className={classes.gauntletCopyText}>{`wherever you farm,
collect what you want`}
        </div>
        <div className={classes.stoneListContainer}>
          {rewardTokenList.map((ticker) => (
            <div key={ticker} className={classes.stoneItem}>
              <div className={classes.tooltipBox} />
              <div className={classes.tooltipText}>{ticker}</div>
              <img
                className={classes.stoneImg}
                src={STONES[ticker as TokenName]} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default UserVaultsSummary;
