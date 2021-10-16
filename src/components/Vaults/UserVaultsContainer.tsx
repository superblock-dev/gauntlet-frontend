import { BigNumber } from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { liquidityPoolInfos, rewardPrices, userInfo } from 'recoil/atoms';
import { Vault } from "types";
import { Grid, makeStyles } from "@material-ui/core";
import GauntletSummary from "components/Vaults/GauntletSummary";
import UserVaultItem from "components/Vaults/UserVaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import IconHelp from 'assets/svgs/IconHelp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';

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
}

interface UserVaultStats {
  totalDeposit: number,
  totalLpValueInUSD: number,
  totalRewardsInUSD: number,
  avgApr: number,
}

function UserVaultsContainer({ vaults }: UserVaultsProps) {
  const classes = useStyles();
  const liquidityPools = useRecoilValue(liquidityPoolInfos);
  const userInfoValue = useRecoilValue(userInfo);
  const [userVaultStats, setUserVaultStats] = useState<UserVaultStats>({
    totalDeposit: 0,
    totalLpValueInUSD: 0,
    totalRewardsInUSD: 0,
    avgApr: 0,
  })
  
  // UserState가 바뀌면 total 정보 변화
  useEffect(() => {
    const [totalDeposit, totalLpValueInUSD, totalRewardsInUSD] = userInfoValue.states.reduce((total, s) => {
      total[0] = BigNumber.sum(total[0], s.amount.toEther());
      
      const v = vaults.find(v => v.stateAccount === s.vaultStateAccount);
      if (v && v.depositToken.mintAddress in liquidityPools) {
        const lpValue = liquidityPools[v.depositToken.mintAddress].currentLpValue;
        total[1] = BigNumber.sum(total[1], lpValue ? s.amount.toEther().multipliedBy(lpValue) : 0);
      }
      if (s.totalRewardInUSD) total[2] = BigNumber.sum(total[2], s.totalRewardInUSD);
      return total
    }, [new BigNumber(0), new BigNumber(0), new BigNumber(0)]);

    const avgApr = userInfoValue.states.reduce((weighted, s) => {
      if (s.totalApr) {
        weighted = BigNumber.sum(weighted, new BigNumber(s.totalApr).multipliedBy(s.amount.toEther()))
      }
      return weighted;
    }, new BigNumber(0)).dividedBy(totalDeposit).toNumber();

    setUserVaultStats({
      totalDeposit: totalDeposit.toNumber(),
      totalLpValueInUSD: totalLpValueInUSD.toNumber(),
      totalRewardsInUSD: totalRewardsInUSD.toNumber(),
      avgApr
    })

    console.log(totalLpValueInUSD.toNumber())

  }, [userInfoValue, vaults]);

  return (
    <>
      <GauntletSummary
        totalDeposit={userVaultStats.totalDeposit}
        totalLpValueInUSD={userVaultStats.totalLpValueInUSD}
        totalRewardsInUSD={userVaultStats.totalRewardsInUSD}
        avgApr={userVaultStats.avgApr}
        userSummary
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
        vaults.length !== 0 ?
          vaults.map((vault, idx) => (
            <div key={`user-vault-${idx}`}>
              <UserVaultItem
                vault={vault}
                userStates={userInfoValue.states.filter(s => s.vaultStateAccount === vault.stateAccount)} />
              {
                idx !== vaults.length - 1 ?
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, }}>
                    <div className={classes.divider} />
                  </div> :
                  null
              }
            </div>
          )) :
          <div style={{
            height: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Sen',
            fontSize: 14,
            color: '#CBA344',
          }}>
            You have no active vaults.
          </div>
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
