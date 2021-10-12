import { BigNumber } from 'bignumber.js';
import { cloneDeep, clone } from 'lodash';
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { farmInfos, liquidityPoolInfos, userInfo, vaultInfos } from "recoil/atoms";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { ErrorSnackbar, SuccessSnackbar } from 'components/Snackbar/Snackbar';

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
import StoneDisplay from "components/Stone/StoneDisplay";
import { Reward, TokenName, UserState, Vault } from "types";
import { calculateReward } from "utils/vaults";
import SmallButton from "components/Buttons/SmallButton";
import { calculateApyInPercentage, STRATEGY_FARMS } from "utils/strategies";
import { REWARDS } from 'utils/constants';
import { FarmInfo } from 'utils/farms';

interface FlagCreationArgs {
  vault: Vault;
  reward: Reward;
  balance: number;
  active: boolean;
  onClickDeposit: (...args: any) => void;
  onClickWithdraw: (...args: any) => void;
  onClickClaim: (...args: any) => void;
}

function createItem(args: FlagCreationArgs) {
  const { vault, reward, balance, active, onClickDeposit, onClickWithdraw, onClickClaim } = args;
  const pendingReward = calculateReward(reward, vault);
  console.log('here')

  return (
    <Flag
      tokenName={reward.tokenName}
      deposited={reward.amount}
      balance={balance}
      reward={pendingReward}
      active={active}
      onClickDeposit={onClickDeposit}
      onClickWithdraw={onClickWithdraw}
      onClickClaim={onClickClaim}
    />
  );
}

function createSlide(
  flagArgs: FlagCreationArgs,
  onClickSlide: () => void,
) {
  return {
    key: uuidv4(),
    content: createItem(flagArgs),
    onClick: onClickSlide,
  }
}

function createRewardsListFromUserState(
  vault: Vault,
  balance: number,
  slideIndex: number,
  onClickSlide: (idx: number) => void,
  onClickDeposit: (...args: any) => void,
  onClickWithdraw: (...args: any) => void,
  onClickClaim: (...args: any) => void,
  userState?: UserState,
) {

  return ([...REWARDS]).map((reward, idx) => {
    let userReward;
    userReward = userState?.rewards.find(state => state.tokenName === reward.tokenName);

    const flagArgs: FlagCreationArgs = {
      vault,
      reward: userReward ? userReward : reward,
      balance,
      active: (slideIndex % REWARDS.length) === idx,
      onClickDeposit,
      onClickWithdraw,
      onClickClaim,
    }
    return createSlide(flagArgs, () => onClickSlide(idx));
  })
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
  const { enqueueSnackbar } = useSnackbar();
  const [vaults, setVaults] = useRecoilState(vaultInfos);
  const liquidityPools = useRecoilValue(liquidityPoolInfos);
  const [userInfoState, setUserInfoState] = useRecoilState(userInfo);
  const farms = useRecoilValue(farmInfos);

  const [slideIndex, setSlideIndex] = useState(0);
  const [farm, setFarm] = useState<FarmInfo | undefined>(undefined);
  const [vault, setVault] = useState<Vault | undefined>(undefined);
  const [userState, setUserState] = useState<UserState | undefined>(undefined);
  const [stones, setStones] = useState<{[key: string]: any}>({});

  let { vaultId } = useParams<VaultDetailParams>();
  let vId = parseInt(vaultId);

  useEffect(() => {
    const _vault = vaults.find(v => v.id === vId);
    calculateLpValue(_vault!);
    setVault(_vault);
    console.log(stones)
  }, [vaults]);

  useEffect(() => {
    const timer = setInterval(async () => {
      let _vaults = cloneDeep(vaults)
      console.log('tick');
      _vaults.forEach(v => {
        v.strategies = v.strategies.map(s => {
          return {
            ...s,
            accRewardPerShare: 1000 + s.accRewardPerShare
          }
        })
      })
      console.log(_vaults);

      setVaults(_vaults);
    }, 5000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const _farm = Object.values(farms).find(f => f.lp.symbol === vault?.depositToken.symbol);
    setFarm(_farm);
  }, [vault, farms]);

  const calculateLpValue = (vault: Vault) => {
    let userStateId = userInfoState.states.findIndex(s => s.vaultId === vId);
    let _userState

    if (!_userState) {
      _userState = {
        vaultId: vId,
        balance: 0,
        rewards: [],
        lpValueInUSD: new BigNumber(0),
      } as UserState
    } else {
      _userState = clone(userInfoState.states[userStateId]);
    }

    if (vault.depositToken.mintAddress in liquidityPools) {
      const lpValue = liquidityPools[vault.depositToken.mintAddress].currentLpValue;
      if (lpValue) {
        _userState.lpValueInUSD = new BigNumber(_userState.balance * lpValue)
        setUserInfoState({
          ...userInfoState,
          states: [
            ...userInfoState.states.slice(0, userStateId),
            _userState,
            ...userInfoState.states.slice(userStateId + 1)
          ]
        })
      }
    }
    setUserState(_userState);

    let _stones: { [key: string]: any } = {};
    _userState.rewards.forEach((reward) => {
      _stones[reward.tokenName.toString()] = calculateReward(reward, vault);
      console.log(_stones)
    });
    setStones(_stones);
  }

  const deposit = (amount: number, tokenName: TokenName) => {
    if (!vault) return;
    const lpBalance = userInfoState.lpTokens[vault.depositToken.symbol].balance
    if (amount > lpBalance) {
      return enqueueSnackbar(<ErrorSnackbar message={"Not enough balance."} />)
    }
    let newUserInfo = cloneDeep(userInfoState);
    newUserInfo.lpTokens[vault.depositToken.symbol].balance -= amount
    newUserInfo.lpTokens[vault.depositToken.symbol].staked += amount

    const reward = REWARDS.find(r => r.tokenName === tokenName);
    const strategy = vault.strategies.find(s => s.rewardToken === tokenName);

    if (!reward || !strategy) return;
    const prevStateId = userInfoState.states.findIndex(s => s.vaultId === vId);
    console.log(prevStateId);

    if (prevStateId === -1) {
      reward.amount = amount
      reward.rewardDebt = new BigNumber(amount).multipliedBy(strategy.accRewardPerShare).toNumber();
      newUserInfo.states = [
        ...newUserInfo.states,
        {
          vaultId: vId,
          balance: amount,
          rewards: [
            reward
          ],
        }
      ];
    } else {
      let prevReward = newUserInfo.states[prevStateId].rewards.find(r => r.tokenName === tokenName);
      if (!prevReward) {
        reward.amount = amount
        reward.rewardDebt = new BigNumber(amount).multipliedBy(strategy.accRewardPerShare).toNumber();
        newUserInfo.states[prevStateId].rewards.push(reward);
      } else {
        const pending = new BigNumber(prevReward.amount).multipliedBy(strategy.accRewardPerShare).minus(prevReward.rewardDebt);
        prevReward.pendingReward = prevReward.pendingReward ?
          BigNumber.sum(prevReward.pendingReward, pending).toNumber() :
          pending.toNumber();
        prevReward.amount += amount;
      }
    }
    setUserInfoState(newUserInfo);
  }

  const withdraw = (amount: number) => {

  }

  const claim = () => {

  }
  // console.log("vault", vault)
  // console.log("userState", userState)
  // console.log("farm", farm)
  if (!vault || !userState || !farm) return <></>;

  const lpBalance = userInfoState.lpTokens[vault.depositToken.symbol].balance
  const lpStaked = userInfoState.lpTokens[vault.depositToken.symbol].staked

  const flags = createRewardsListFromUserState(
    vault,
    lpBalance,
    slideIndex,
    setSlideIndex,
    deposit,
    withdraw,
    claim,
    userState,
  );

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
        balance={lpStaked ? lpStaked : 0}
        lpValueInUSD={userState.lpValueInUSD ? userState.lpValueInUSD.toNumber() : 0}
        apr={userState.totalApr ? userState.totalApr.toNumber() : totalHApr.toNumber()}
        staked={!!lpStaked}
      />

      <div className={classes.divider} />

      <div className={classes.stoneDisplayContainer}>
        <StoneDisplay items={stones} onClick={setSlideIndex} />
      </div>
      <SmallButton text={'claim all'} />
      <div className={classes.divider} style={{ marginTop: 48 }} />
      <div className={classes.helpText}>{`Choose Your Strategy & Stake LP Tokens`}</div>

      <div className={classes.sliderContainer}>
        <FlagNavigation onClick={(direction: number) => {
          const index = slideIndex + direction;
          setSlideIndex(index);
        }} />
        <Slider index={slideIndex} slides={flags} />
      </div>

      <RewardList
        rewards={STRATEGY_FARMS}
        mainIndex={slideIndex}
        farmApr={farm.apr!}
        lpFee={farm.fees!}
        onClick={setSlideIndex}
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
