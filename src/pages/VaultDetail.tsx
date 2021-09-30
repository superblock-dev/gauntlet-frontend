import { useState } from "react";
import { useRecoilValue } from "recoil";
import { farmInfos, liquidityPoolInfos } from "recoil/atoms";
import { useHistory, useParams } from "react-router-dom";
import { BigNumber } from 'bignumber.js';

import LPTokenView from "components/Vaults/LPTokenView";
import { makeStyles } from "@material-ui/core";
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';
import VaultSummary from "components/VaultDetail/VaultSummary";
import VaultDetails from "components/VaultDetail/VaultDetails";
import MediumButton from "components/Buttons/MediumButton";
import RewardList from "components/VaultDetail/RewardList";
import Slider from "components/Slider";
import CursorPointer from 'assets/CursorPointer.svg';
import Flag from "components/Vaults/Flag";
import { v4 as uuidv4 } from "uuid";
import FlagNavigation from "components/Vaults/FlagNavigation";
import StoneDisplay from "components/Vaults/StoneDisplay";
import { Reward, UserState, Vault } from "types";
import { calculateReward, USER_STATES, VAULTS } from "utils/vaults";
import { LP_TOKENS, TOKENS } from "utils/tokens";
import SmallButton from "components/Buttons/SmallButton";
import { calculateApyInPercentage, STRATEGY_FARMS } from "utils/strategies";

function createItem(vault: Vault, reward: Reward, balance: number, active: boolean) {
  const pendingReward = calculateReward(reward, vault);

  return (
    <Flag
      tokenName={reward.tokenName}
      deposited={reward.amount}
      balance={balance}
      reward={pendingReward}
      active={active} />
  );
}

function createSlide(vault: Vault, reward: Reward, balance: number, active: boolean, onClick: () => void) {
  return {
    key: uuidv4(),
    content: createItem(vault, reward, balance, active),
    onClick: onClick
  }
}

const REWARDS: Reward[] = [
  {
    tokenName: 'BTC',
    token: TOKENS.BTC,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'ETH',
    token: TOKENS.ETH,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'SOL',
    token: TOKENS.SOL,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'USDC',
    token: TOKENS.USDC,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'USDT',
    token: TOKENS.USDT,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY',
    token: TOKENS.RAY,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'LET',
    token: TOKENS.LET,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-ETH',
    token: LP_TOKENS['RAY-ETH-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-SOL',
    token: LP_TOKENS['RAY-SOL-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-USDC',
    token: LP_TOKENS['RAY-USDC-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-USDT',
    token: LP_TOKENS['RAY-USDT-V4'],
    amount: 0,
    rewardDebt: 0,
  },
]

function createRewardsListFromUserState(
  vault: Vault,
  balance: number,
  slideIndex: number,
  onClick: (idx: number) => void,
  userState?: UserState,
) {
  if (!userState) {
    return ([...REWARDS]).map((reward, idx) => {
      return createSlide(vault, reward, balance, slideIndex === idx, () => onClick(idx));
    });
  }
  return ([...REWARDS]).map((reward, idx) => {
    const userReward = userState.rewards.find(state => state.tokenName === reward.tokenName);
    if (userReward) {
      return createSlide(vault, userReward, balance, slideIndex === idx, () => onClick(idx));
    }
    return createSlide(vault, reward, balance, slideIndex === idx, () => onClick(idx));
  });
}

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
    marginBottom: 0,
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
  stoneDisplayContainer: {
    overflowX: 'hidden',
    width: '100vw',
    height: 160,
    position: 'relative',
  },
});

function VaultDetail() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const liquidityPools = useRecoilValue(liquidityPoolInfos);
  const farms = useRecoilValue(farmInfos);
  const [slideIndex, setSlideIndex] = useState(0);
  let { vaultId } = useParams<VaultDetailParams>();
  let vId = parseInt(vaultId);
  const vault = VAULTS.find(v => v.id === vId);
  if (vId === undefined || vault === undefined) return <></> // TODO: Page not found

  const farm = Object.values(farms).find(f => f.lp.symbol === vault?.depositToken.symbol);
  let userState = USER_STATES.find(s => s.vaultId === vId);

  if (farm === undefined) return <></> // TODO: Page not found

  if (!userState) {
    userState = {
      vaultId: vId,
      balance: 0,
      rewards: [],
      lpValueInUSD: new BigNumber(0),
    } as UserState
  }

  if ((vault.depositToken.mintAddress in liquidityPools)) {
    const lpValue = liquidityPools[vault.depositToken.mintAddress].currentLpValue;
    if (lpValue) {
      userState.lpValueInUSD = new BigNumber(userState.balance).multipliedBy(lpValue)
    }
  }

  /** APY 계산 */
  const highestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy < v.apy ? v : p);
  const lowestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy > v.apy ? v : p);

  let totalHApr = new BigNumber(0);
  let totalLApr = new BigNumber(0);
  
  if (farm.apr) {
    totalHApr = BigNumber.sum(totalHApr, Number(farm.apr))
    totalLApr = BigNumber.sum(totalLApr, Number(farm.apr))
  }

  const highestApy = calculateApyInPercentage(totalHApr, highestStrategy.apy)
  const lowestApy = calculateApyInPercentage(totalLApr, lowestStrategy.apy)

  if (farm.fees) {
    totalHApr = BigNumber.sum(highestApy, Number(farm.fees))
    totalLApr = BigNumber.sum(lowestApy, Number(farm.fees))
  }


  const lpBalance: number = 939.212316 // User LP Token Balance

  const flags = createRewardsListFromUserState(
    vault,
    lpBalance,
    slideIndex,
    setSlideIndex,
    userState,
  );

  const stones: { [key: string]: number } = {};
  userState.rewards.forEach((reward) => {
    stones[reward.tokenName.toString()] = calculateReward(reward, vault);
  });

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
            <LPTokenView lp={vault.depositToken} name={vault.depositToken.name.split(' LP')[0]} linkVisible />
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
        balance={userState.balance}
        lpValueInUSD={userState.lpValueInUSD ? userState.lpValueInUSD.toNumber() : 0}
        apr={userState.totalApr ? userState.totalApr.toNumber() : totalHApr.toNumber()}
        staked={userState.balance !== 0}
      />

      <div className={classes.divider} />

      <div className={classes.stoneDisplayContainer}>
        <StoneDisplay items={stones} />
      </div>
      <SmallButton text={'claim all'} />
      <div className={classes.divider} style={{ marginTop: 48 }} />

      <div className={classes.sliderContainer}>
        <FlagNavigation onClick={(direction: number) => {
          const index = slideIndex + direction;
          const nextIndex = index >= flags.length ? 0 : index < 0 ? flags.length - 1 : index;
          setSlideIndex(nextIndex);
        }} />
        <Slider index={slideIndex} slides={flags} />
      </div>

      <RewardList
        rewards={STRATEGY_FARMS}
        mainIndex={slideIndex}
      />

      <VaultDetails 
        vault={vault} 
        farm={farm} 
        highestApr={totalHApr.toNumber()} 
        lowestApr={totalLApr.toNumber()}
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
    </div>
  )
};

export default VaultDetail;
