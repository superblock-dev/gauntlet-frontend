import { useRecoilValue } from 'recoil';
import { rewardPrices } from 'recoil/atoms';
import { BigNumber } from 'bignumber.js';
import Countup from 'react-countup';
import { STONES } from "utils/stones";
import { TokenName, UserState, Vault } from "types";
import { makeStyles } from "@material-ui/core";
import OutlineVault from 'assets/svgs/OutlineVault.svg';
import TooltipVault from 'assets/svgs/TooltipVault.svg';
import { calculateReward } from "utils/vaults";

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
    transform: 'translate(-50%, 50%)',
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
  userVaults: Vault[];
  userStates: UserState[];
}

function UserVaultsSummary({ userVaults, userStates }: UserVaultsSummaryProps) {
  const classes = useStyles();
  const rewardTokenList = [
    'LET',
    'USDT',
    'USDC',
    'SOL',
    'ETH',
    'BTC'
  ];
  const prices = useRecoilValue(rewardPrices);

  const [totalDeposit, totalReward] = userStates.reduce((curr, state) => {
    const strategies = userVaults.find(v => v.id === state.vaultId)?.strategies;
    curr[0] += state.balance;

    if (strategies) {
      curr[1] = BigNumber.sum(state.rewards.reduce((total, reward) => {
        const strategy = strategies.find(s => s.rewardToken === reward.token);
        if (strategy) {
          return BigNumber.sum(total, calculateReward(reward, strategy.accRewardPerShare).multipliedBy(prices[reward.token]));
        }
        return total;
      }, new BigNumber(0)), curr[1]);
    }

    return curr;
  }, [0, new BigNumber(0)]);

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
            <div className={classes.summarySubBody}>$2.39</div>
          </div>
          <div className={classes.summaryContent}>
            <div className={classes.summaryHeader}>Average APY</div>
            <div className={classes.summaryBody}>95.39%</div>
            <div className={classes.summarySubBody}>Daily 3.49%</div>
          </div>
        </div>
        <div className={classes.summaryContent}>
          <div className={classes.summaryHeader}>User Rewards</div>
          <div className={classes.summaryBody}>
            <Countup
              start={0}
              end={totalReward.toNumber()}
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
                src={STONES[ticker as TokenName].normal} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default UserVaultsSummary;
