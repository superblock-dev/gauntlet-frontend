import { BigNumber } from 'bignumber.js';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo, vaultInfos, farmInfos, activeFlagIndex, Reward } from "recoil/atoms";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { makeStyles } from "@material-ui/core";

import { User, Vault } from "types";
import { calculateReward } from "utils/vaults";
import { calculateApyInPercentage, STRATEGY_FARMS } from "utils/strategies";
import { getIndexFromSymbol, REWARDS } from 'utils/constants';
import { ErrorSnackbar, SuccessSnackbar } from 'components/Snackbar/Snackbar';
import Carousel from 'components/Carousel';
import LPTokenView from "components/Vaults/LPTokenView";
import VaultSummary from "components/VaultDetail/VaultSummary";
import VaultDetails from "components/VaultDetail/VaultDetails";
import MediumButton from "components/Buttons/MediumButton";
import RewardList from "components/VaultDetail/RewardList";
import StoneDisplay from "components/Stone/StoneDisplay";
import SmallButton from "components/Buttons/SmallButton";
import CursorPointer from 'assets/CursorPointer.svg';
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';

interface VaultDetailParams {
  vaultId: string,
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 72,
    width: 976,
    marginBottom: 32,
  },
  backBtnContainer: {
    width: 165,
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
  },
  divider: {
    marginTop: 80,
    marginBottom: 48,
    height: 20,
    width: 388,
    backgroundImage: `url(${LineMixPurpleAndGold})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  helpText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#CBA344',
    marginBottom: 32,
  },
  sliderContainer: {
    width: 1440,
    height: 'auto',
    position: "relative",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stoneDisplayContainer: {
    overflowX: 'hidden',
    width: '100vw',
    height: 160,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function VaultDetail() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [vaults, setVaults] = useRecoilState(vaultInfos);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);
  const farms = useRecoilValue(farmInfos);
  const [slideIndex, setSlideIndex] = useRecoilState(activeFlagIndex);

  const [vault, setVault] = useState<Vault | undefined>(undefined);
  const [userStates, setUserStates] = useState<User[]>([]);
  const [apy, setApy] = useState([0, 0]);

  const { vaultId } = useParams<VaultDetailParams>();
  const vId = vaultId;

  useEffect(() => {
    const currentVault = vaults.find(v => v.stateAccount === vId);
    if (!currentVault) return;

    const f = Object.values(farms).find(f => f.lp.symbol === currentVault?.depositToken.symbol);
    if (!f) return;

    const fApr = Number(f.apr);
    const fFees = Number(f.fees);

    if (!fApr || !fFees) {
      return setVault(currentVault);
    }

    const aprCalculatedStates = userInfoState.states.map(s => {
      return {
        ...s,
        totalApr: fApr + fFees,
      };
    })

    setVault({
      ...currentVault,
      farmApr: Number(f.apr),
      farmFee: Number(f.fees)
    })
    setUserInfoState({
      ...userInfoState,
      states: aprCalculatedStates,
    })

  }, [farms, vaults]);

  useEffect(() => {
    if (!userInfoState) return
    const userVaultStates = userInfoState.states.filter(s => s.stateAccount === vId);
    setUserStates(userVaultStates);

  }, [userInfoState]);

  useEffect(() => {
    const timer = setInterval(async () => {
      let _vaults = cloneDeep(vaults)
      _vaults.forEach(v => {
        v.accPerShares = v.accPerShares ? v.accPerShares.map(s => 1000 + s) : []
      })
      setVaults(_vaults);
    }, 5000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const highestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy < v.apy ? v : p);
    const lowestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy > v.apy ? v : p);

    let totalHApr = new BigNumber(0);
    let totalLApr = new BigNumber(0);

    if (vault?.farmApr) {
      totalHApr = BigNumber.sum(totalHApr, Number(vault.farmApr))
      totalLApr = BigNumber.sum(totalLApr, Number(vault.farmApr))
    }

    const highestApy = calculateApyInPercentage(totalHApr.toNumber(), highestStrategy.apy)
    const lowestApy = calculateApyInPercentage(totalLApr.toNumber(), lowestStrategy.apy)

    if (vault?.farmFee) {
      totalHApr = BigNumber.sum(highestApy, Number(vault?.farmFee))
      totalLApr = BigNumber.sum(lowestApy, Number(vault?.farmFee))
    }

    setApy([totalHApr.toNumber(), totalLApr.toNumber()])
  }, [vault]);

  const rewards: Reward[] = [
    {
      symbol: 'BTC',
      amount: 0,
      deposit: 0,
    },
    {
      symbol: 'ETH',
      amount: 0.001,
      deposit: 1,
    },
    {
      symbol: 'SOL',
      amount: 0,
      deposit: 0,
    },
    {
      symbol: 'USDC',
      amount: 0,
      deposit: 0,
    },
    {
      symbol: 'USDT',
      amount: 0,
      deposit: 0,
    },
    {
      symbol: 'RAY',
      amount:0,
      deposit: 0,
    },
  ];
  let lpStaked = rewards.reduce((prev, r) => BigNumber.sum(prev, r.deposit).toNumber(), 0);


  const deposit = (amount: number, symbol: string) => {
    if (!vault) return;
    const lpBalance = userInfoState.lpTokens[vault.depositToken.symbol].balance
    if (amount > lpBalance) {
      return enqueueSnackbar(<ErrorSnackbar message={"Not enough balance."} />)
    }
    let newUserInfo = cloneDeep(userInfoState);
    newUserInfo.lpTokens[vault.depositToken.symbol].balance -= amount
    newUserInfo.lpTokens[vault.depositToken.symbol].staked += amount

    const rewardIndex = getIndexFromSymbol(symbol)
    if (rewardIndex === -1) return;
    const rewardToken = REWARDS[rewardIndex];
    const accPerShare = vault.accPerShares ? vault.accPerShares[rewardIndex] : 0;
    const prevStateId = userInfoState.states.findIndex(s => s.rewardToken.symbol === symbol);

    // if (prevStateId === -1) {
    //   newUserInfo.states = [
    //     ...newUserInfo.states,
    //     {
    //       stateAccount: , // PDA 
    //       vault: vault,
    //       strategyStateAccount: // strategy state account
    //       rewardToken,
    //       reward: 0,
    //       amount,
    //       rewardDebt: new BigNumber(amount).multipliedBy(accPerShare).toNumber(),
    //     }
    //   ];
    // } else {
    //   let prevState = newUserInfo.states[prevStateId];
    //   prevState.reward = calculateReward(prevState, vault);
    //   prevState.amount += amount;
    //   prevState.rewardDebt = new BigNumber(prevState.amount).multipliedBy(accPerShare).toNumber()
    // }
    // console.log("new user info: ", newUserInfo)

    setUserInfoState(newUserInfo);
    enqueueSnackbar(<SuccessSnackbar message={`${amount} LP successfully deposited!`} />)
  }

  const withdraw = (amount: number) => {

  }

  const claim = () => {

  }

  let lpBalance = 0;

  if (vault) {
    lpBalance = userInfoState.lpTokens[vault.depositToken.symbol].balance
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.backBtnContainer} onClick={goBack}>
          <div className={classes.iconBack} />
          <div className={classes.textBack}>
            Back to Vaults
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 960,
          marginLeft: 8,
        }}>
          <div style={{ width: 800, }}>
            <LPTokenView lp={vault?.depositToken} name={vault?.depositToken.name.split(' LP')[0]} linkVisible />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 45,
            marginRight: 16,
          }}>
            <div style={{ fontFamily: 'Sen', fontSize: 12, color: '#CBA344', }}>TVL</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#FFD271', }}>540.1M</div>
          </div>
        </div>
      </div>

      <VaultSummary
        balance={lpStaked ? lpStaked : 0}
        tokenMintAddress={vault ? vault.depositToken.mintAddress : ''}
        apr={userStates.length !== 0 ?
          userStates.reduce((p, s) => s.totalApr ? p + s.totalApr : p, 0) :
          apy[0]}
        staked={!!lpStaked}
      />

      <div className={classes.divider} />

      <div className={classes.stoneDisplayContainer}>
        <StoneDisplay items={rewards} onClick={setSlideIndex} />
      </div>
      <SmallButton text={'claim all'} />
      <div className={classes.divider} style={{ marginTop: 48 }} />
      <div className={classes.helpText}>{`Choose Your Strategy & Stake LP Tokens`}</div>
      <div className={classes.sliderContainer}>
        <Carousel items={rewards} active={slideIndex} />
      </div>
      {/* {
        flags.length === 0 ?
          null :
          <div className={classes.sliderContainer}>
            <FlagNavigation onClick={(direction: number) => {
              const index = slideIndex + direction;
              setSlideIndex(index);
            }} />
            <Slider index={slideIndex} slides={flags} />
          </div>
      } */}

      <RewardList
        rewards={STRATEGY_FARMS}
        mainIndex={slideIndex}
        vault={vault}
        onClick={setSlideIndex}
      />
      {
        vault ?
          <>
            <VaultDetails
              vault={vault}
              highestApr={apy[0]}
              lowestApr={apy[1]}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 560,
              marginBottom: 340,
              marginTop: 52,
            }}>
              <MediumButton text="Create LP" link={vault.depositToken.url} external />
              <MediumButton text="Farm Contract" link={`https://solscan.io/account/}`} external />
              <MediumButton text="Vault Contract" external />
            </div>
          </> :
          null
      }
    </div>
  )
};

export default VaultDetail;
