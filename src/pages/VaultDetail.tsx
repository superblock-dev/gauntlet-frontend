import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BigNumber } from 'bignumber.js';

import LPTokenView from "components/Vaults/LPTokenView";
import { makeStyles } from "@material-ui/core";
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';
import VaultSummary from "components/VaultDetail/VaultSummary";
import VaultDetails from "components/VaultDetail/VaultDetails";
import MediumButton from "components/Buttons/MediumButton";
import RewardList, { RewardAPR } from "components/VaultDetail/RewardList";
import Slider from "components/Slider";
import CursorPointer from 'assets/CursorPointer.svg';
import Flag from "components/Vaults/Flag";
import { v4 as uuidv4 } from "uuid";
import FlagNavigation from "components/Vaults/FlagNavigation";
import StoneDisplay from "components/Vaults/StoneDisplay";
import { Reward, Strategy, UserState, Vault } from "types";
import { calculateReward, USER_STATES, VAULTS } from "utils/vaults";
import { TOKENS } from "utils/tokens";

function createItem(vault: Vault, reward: Reward, balance: number, active: boolean) {
  const pendingReward = calculateReward(reward, vault);

  return (
    <Flag
      tokenName={reward.tokenName}
      deposited={reward.amount}
      balance={balance}
      reward={pendingReward.toNumber()}
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
]

function createRewardsListFromUserState(
  vault: Vault,
  balance: number,
  slideIndex: number,
  onClick: (idx: number) => void,
  userState?: UserState,
) {
  if (!userState) {
    return ([...REWARDS, ...REWARDS]).map((reward, idx) => {
      return createSlide(vault, reward, balance, slideIndex === idx, () => onClick(idx));
    });
  }
  return ([...REWARDS, ...REWARDS]).map((reward, idx) => {
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
    height: 960,
    position: "relative",
  },
  stoneDisplayContainer: {
    width: 1440,
  }
});

function VaultDetail() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);
  let { vaultId } = useParams<VaultDetailParams>();
  let vId = parseInt(vaultId);
  const vault = VAULTS.find(v => v.id === vId);
  const userState = USER_STATES.find(s => s.vaultId === vId);

  if (vId === undefined || vault === undefined) return <></> // TODO: Page not found

  const lpBalance: number = 939.212316 // User LP Token Balance

  const flags = createRewardsListFromUserState(
    vault,
    lpBalance,
    slideIndex,
    setSlideIndex,
    userState,
  );

  const rewardAPRs: RewardAPR[] = [
    {
      token: 'BTC',
      value: 1.58432,
    },
    {
      token: 'ETH',
      value: 1.63592,
    },
    {
      token: 'SOL',
      value: 1.57201,
    },
    {
      token: 'USDC',
      value: 1.15039,
    },
    {
      token: 'USDT',
      value: 1.25131,
    },
  ];

  const stones: { [key: string]: BigNumber } = {};
  userState?.rewards.forEach((reward) => {
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
            <LPTokenView lp={vault.depositToken} name={vault.depositToken.name.split('LP')[0]} linkVisible />
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
        balance={userState ? userState.balance : 0}
        lpValueInUSD={userState && userState.lpValueInUSD ? userState.lpValueInUSD.toNumber() : 0}
      />

      <div className={classes.divider} />

      <div className={classes.stoneDisplayContainer}>
        <StoneDisplay items={stones} />
      </div>

      <div className={classes.divider} />

      <div className={classes.sliderContainer}>
        <Slider index={slideIndex} slides={flags} />
        <FlagNavigation onClick={(direction: number) => {
          const index = slideIndex + direction;
          const nextIndex = index >= flags.length ? 0 : index < 0 ? flags.length - 1 : index;
          setSlideIndex(nextIndex);
        }} />
      </div>

      <RewardList
        rewards={rewardAPRs}
        mainIndex={slideIndex}
      />

      <VaultDetails vault={vault} />

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
