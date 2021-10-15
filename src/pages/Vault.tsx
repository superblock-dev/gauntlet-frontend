import BigNumber from 'bignumber.js';
import { useEffect, useState } from "react";
import { cloneDeep } from 'lodash';
import { PublicKey } from '@solana/web3.js';
import { useRecoilState, useRecoilValue } from "recoil";
import { conn, farmInfos, liquidityPoolInfos, rewardPrices, userInfo, vaultInfos } from "recoil/atoms";
import { useWallet } from "@solana/wallet-adapter-react";
import { Grid, makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import GauntletSummary from 'components/Vaults/GauntletSummary';
import VaultItem from "components/Vaults/VaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import UserVaultsContainer from "components/Vaults/UserVaultsContainer";
import { calculateReward } from 'utils/vaults';
import { calculateApyInPercentage, STRATEGY_FARMS, STRATEGIES } from 'utils/strategies';
import { fetchUserState, fetchUserDepositAssociatedTokenAccount } from 'api/users';
import { Vault } from 'types';
import { VAULTS } from 'utils/vaults'
import { TOKENS } from 'utils/tokens';

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

function VaultPage() {
  const classes = useStyles();
  const { connected, publicKey } = useWallet();
  const connState = useRecoilValue(conn);
  const [vaults, setVaults] = useRecoilState(vaultInfos);
  const farms = useRecoilValue(farmInfos);
  const prices = useRecoilValue(rewardPrices);
  const liquidityPools = useRecoilValue(liquidityPoolInfos);
  const [userInfoValue, setUserInfo] = useRecoilState(userInfo);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalDepositInUsd, setTotalDepositInUsd] = useState(0);
  const [avgApr, setAvgApr] = useState(0);
  const [userVaultIds, setUserVaultIds] = useState<string[]>([])
  const [userVaults, setUserVaults] = useState<Vault[]>([])
  const [otherVaults, setOtherVaults] = useState<Vault[]>(vaults)

  const updateUserInfo = async (seed: any) => {
    if (connState && publicKey != null) {
      const depositTokenMintAddressList = VAULTS.map(v => new PublicKey(v.depositToken.mintAddress))
      const userDepositTokenStatus = cloneDeep(userInfoValue.lpTokens)
      const userTokenAccountList = await fetchUserDepositAssociatedTokenAccount(connState, publicKey, depositTokenMintAddressList)
      userTokenAccountList.map(userTokenAccount => {
        const symbol = Object.keys(userDepositTokenStatus).find(key => key === userTokenAccount.depositToken)
        if (symbol != undefined) {
          userDepositTokenStatus[symbol].balance = userTokenAccount.amount
        }
      })
      const userStates = await fetchUserState(connState, seed)
      const _userStates = userStates.map(userState => {
        const v = vaults.find(vault => vault.stateAccount === userState.vaultStateAccount)
        if (v === undefined) return userState

        const totalReward = calculateReward(userState, v);

        const totalRewardInUSD = totalReward * (
          userState.rewardToken.symbol in prices ?
            prices[userState.rewardToken.symbol] :
            0
        )

        const strategyFarm = STRATEGY_FARMS.find(sf => sf.token === userState.rewardToken.symbol);
        let totalApr;
        if (!v.farmApr || !strategyFarm) {
          totalApr = 0;
        } else {
          totalApr = calculateApyInPercentage(v.farmApr, strategyFarm.apy).toNumber();
        }
        if (v.fees) {
          totalApr = BigNumber.sum(totalApr, Number(v.farmFee)).toNumber();
        }

        return {
          ...userState,
          totalReward,
          totalRewardInUSD,
          totalApr,
        }

      })
      const _userVaultIds = _userStates.map(userState => userState.vaultStateAccount)
      setUserInfo({
        ...userInfoValue,
        lpTokens: userDepositTokenStatus,
        states: _userStates,
      })
      setUserVaultIds(_userVaultIds)
    }
  }

  useEffect(() => {
    const _userVaults = connected ? vaults.filter(vault => userVaultIds.includes(vault.stateAccount)) : [];
    const _otherVaults = connected ? vaults.filter(vault => !userVaultIds.includes(vault.stateAccount)) : vaults;
    setUserVaults(_userVaults)
    setOtherVaults(_otherVaults)
  }, [userVaultIds])

  useEffect(() => {
    if (connected) {
      // user state account address 가져옴
      const seed: any[] = []
      vaults.map(v => {
        STRATEGIES.map(s => {
          if (v.stateAccount && s.stateAccount) {
            seed.push([new PublicKey(v.stateAccount).toBuffer(), publicKey?.toBuffer(), new PublicKey(s.stateAccount.toString()).toBuffer()])
          }
        })
      })
      updateUserInfo(seed)
    }
  }, [connected, publicKey])


  useEffect(() => {
    const _vaults = vaults.map(v => {
      const f = Object.values(farms).find(f => f.lp.symbol === v.depositToken.symbol);

      if (!f || !f.apr || !f.fees) {
        return v;
      }
      return {
        ...v,
        farmApr: Number(f.apr),
        farmFee: Number(f.fees),
      };
    });

    setVaults(_vaults)
  }, [farms]);

  // Vault 업데이트 되면, 각 state들마다 pending reward 계산
  useEffect(() => {
    const _states = userInfoValue.states.map(s => {
      const v = vaults.find(vault => vault.stateAccount === s.vaultStateAccount)
      // const v = s.vault;
      if (v === undefined) return s

      const totalReward = calculateReward(s, v);

      const totalRewardInUSD = totalReward * (
        s.rewardToken.symbol in prices ?
          prices[s.rewardToken.symbol] :
          0
      )
      console.log('ssibal', totalRewardInUSD)
      const strategyFarm = STRATEGY_FARMS.find(sf => sf.token === s.rewardToken.symbol);
      let totalApr;
      if (!v.farmApr || !strategyFarm) {
        totalApr = 0;
      } else {
        totalApr = calculateApyInPercentage(v.farmApr, strategyFarm.apy).toNumber();
      }
      if (v.fees) {
        totalApr = BigNumber.sum(totalApr, Number(v.farmFee)).toNumber();
      }

      return {
        ...s,
        totalReward,
        totalRewardInUSD,
        totalApr,
      }
    });

    const highestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy < v.apy ? v : p);

    let [totalDeposit, totalDepositInUsd, avgApr] = vaults.reduce((prev, v) => {
      if (v.totalDepositAmount) {
        prev[0] = BigNumber.sum(v.totalDepositAmount.toEther(), prev[0]).toNumber()

        let lpValue = 0;
        const lp = liquidityPools[v.depositToken.mintAddress];
        if (lp && lp.currentLpValue) {
          lpValue = lp.currentLpValue;
        }
        prev[1] += v.totalDepositAmount.toEther().multipliedBy(lpValue).toNumber()
      }

      let totalHApr = 0;
      if (v.farmApr) {
        totalHApr = BigNumber.sum(totalHApr, Number(v.farmApr)).toNumber();
      }

      const highestApy = calculateApyInPercentage(totalHApr, highestStrategy.apy)

      if (v.farmFee) {
        totalHApr = BigNumber.sum(highestApy, Number(v.farmFee)).toNumber()
      }

      prev[2] += totalHApr / vaults.length

      return prev;
    }, [0, 0, 0]);

    setTotalDeposit(totalDeposit);
    setTotalDepositInUsd(totalDepositInUsd);
    setAvgApr(avgApr);

    setUserInfo({
      ...userInfoValue,
      states: _states,
    })

  }, [vaults]);

  return (
    <PageTemplate
      title={"VAULT"}
    // subtitle={"Wherever you farm, collect what you want!"}
    >
      <div className={classes.contentContainer}>
        {
          connected ?
            <UserVaultsContainer vaults={userVaults} /> :
            <GauntletSummary
              totalDeposit={totalDeposit} //TODO
              totalLpValueInUSD={totalDepositInUsd}
              totalRewardsInUSD={0}
              avgApr={avgApr}
            />
        }
        <div className={classes.listTitle}>
          All Vaults
        </div>
        <Grid container className={classes.tableHeader}>
          <Grid item xs={4} className={classes.headerItem}>Vault</Grid>
          <Grid item xs={3} className={classes.headerItem}>
            <div>
              TVL
            </div>
            <img src={IconArrowUp} className={classes.headerIcon} />
          </Grid>
          <Grid item xs={3} className={classes.headerItem}>
            <div>
              Max. APR
            </div>
          </Grid>
          <Grid item xs={2} className={classes.headerItem}></Grid>
        </Grid>
        {
          otherVaults.map((vault, idx) => (
            <div key={`vault-${idx}`}>
              <VaultItem
                vault={vault}
              />
              {
                idx !== otherVaults.length - 1 ?
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 29, }}>
                    <div className={classes.divider} />
                  </div> :
                  null
              }
            </div>
          ))
        }
      </div>
    </PageTemplate>
  )
};

export default VaultPage;
