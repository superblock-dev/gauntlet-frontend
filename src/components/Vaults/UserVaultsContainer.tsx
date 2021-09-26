import { useRecoilValue } from 'recoil';
import { liquidityPoolInfos, rewardPrices } from 'recoil/atoms';
import { BigNumber } from 'bignumber.js';
import { Grid, makeStyles } from "@material-ui/core";
import UserVaultsSummary from "components/Vaults/UserVaultsSummary";
import UserVaultItem from "components/Vaults/UserVaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import IconHelp from 'assets/svgs/IconHelp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';
import { calculateReward, getStrategyByTokenName, getVaultById, USER_STATES, } from "utils/vaults";
import { UserState, Vault } from "types";

const useStyles = makeStyles({
  contentContainer: {
    width: 960,
    marginBottom: 229,
  },
  listTitle: {
    fontFamily: 'Sen',
    color: 'rgba(203, 163, 68, 1)',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 64,
  },
  tableHeader: {
    height: 64,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
  },
  headerItem: {
    fontFamily: 'Sen',
    color: 'rgba(203, 163, 68, 1)',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
  },
  headerIcon: {
    width: 14,
    height: 14,
    marginLeft: 6,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundImage: `url(${LineOnlyPurple})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
});

interface UserVaultsProps {
  vaults: Vault[],
  states: UserState[],
}

function UserVaultsContainer({ vaults, states }: UserVaultsProps) {
  const classes = useStyles();
  const prices = useRecoilValue(rewardPrices);
  const liquidityPools = useRecoilValue(liquidityPoolInfos);

  // 각 state들마다 pending reward 계산
  states.forEach(s => {
    const v = getVaultById(s.vaultId);
    if (!v) return
    s.rewards.forEach(r => {
      r.pendingReward = calculateReward(r, v);
    })
    s.totalRewardInUSD = s.rewards.reduce((total, r) => {
      return r.pendingReward ?
        BigNumber.sum(total, r.pendingReward?.multipliedBy(prices[r.tokenName])) :
        total
    }, new BigNumber(0));
    if (!(v.depositToken.mintAddress in liquidityPools)) { return s.lpValueInUSD = new BigNumber(0);}
    const lpValue = liquidityPools[v.depositToken.mintAddress].currentLpValue;
    if (!lpValue) { return s.lpValueInUSD = new BigNumber(0); }
    s.lpValueInUSD = new BigNumber(s.balance).multipliedBy(lpValue);
  })

  // 모든 vault의 total reward 계산
  const [totalDeposit, totalLpValueInUSD, totalRewardsInUSD] = states.reduce((total, s) => {
    total[0] += s.balance
    if (s.lpValueInUSD) total[1] = BigNumber.sum(total[1], s.lpValueInUSD);
    if (s.totalRewardInUSD) total[2] = BigNumber.sum(total[2], s.totalRewardInUSD);
    return total
  }, [0, new BigNumber(0), new BigNumber(0)]);
  
  // 각 vault의 APR 계산


  return (
    <>
      <UserVaultsSummary
        totalDeposit={totalDeposit}
        totalLpValueInUSD={totalLpValueInUSD}
        totalRewardsInUSD={totalRewardsInUSD}
      />
      <div className={classes.listTitle}>
        My Vaults
      </div>
      <Grid container className={classes.tableHeader}>
        <Grid item xs={3} className={classes.headerItem}>Vault</Grid>
        <Grid item xs={2} className={classes.headerItem}>
          <div>
            TVL
          </div>
          <img src={IconArrowUp} className={classes.headerIcon} />
        </Grid>
        <Grid item xs={2} className={classes.headerItem}>
          <div>
            APR
          </div>
          <img src={IconHelp} className={classes.headerIcon} />
        </Grid>
        <Grid item xs={3} className={classes.headerItem}>Your Stones</Grid>
        <Grid item xs={2} className={classes.headerItem}></Grid>
      </Grid>
      {
        vaults.map((vault, idx) => (
          <>
            <UserVaultItem
              vault={vault}
              userState={USER_STATES.find(state => state.vaultId === vault.id)} />
            {
              idx !== vaults.length - 1 ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, }}>
                  <div className={classes.divider} />
                </div> :
                null
            }
          </>
        ))
      }
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LineDivider />
      </div>
    </>
  );
}

export default UserVaultsContainer;
