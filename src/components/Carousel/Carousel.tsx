import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useWallet } from '@solana/wallet-adapter-react';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';

import { conn, liquidityPoolInfos, popupState, userInfo } from 'recoil/atoms';
import { Farm, Strategy, Vault } from 'types';
import {
  harvest,
  harvestV4,
  swapRewardToUsdc,
  swapUsdcToStrategy,
  swapRewardToStrategy,
  deposit,
  depositV4,
  withdraw,
  withdrawV4,
} from 'utils/transactions';
import { sendAndConfirmRawTransaction } from '@solana/web3.js';
import { SuccessSnackbar, ErrorSnackbar } from 'components/Snackbar/Snackbar';
import FlagItem from './FlagItem';
import NotConnectedFlagItem from './NotConnectedFlagItem';
import CursorPointer from "assets/CursorPointer.svg";
import IconLeftNavigation from "assets/svgs/big-arrow-left.svg";
import IconRightNavigation from "assets/svgs/big-arrow-right.svg";
import './Carousel.css';
import { STRATEGIES } from 'utils/strategies';
import { getIndexFromSymbol } from 'utils/constants';
import BigNumber from 'bignumber.js';
import { TokenAmount } from 'utils/safe-math';
import { useSnackbar } from 'notistack';
import LoadingPopup from 'components/Popup/Loading';

interface CarouselProps {
  vault: Vault;
  farm: Farm;
  items: any[];
  active: number;
  handleChangeIndex?: (index: number) => void;
  handleUpdateInfo?: () => void;
  isHome?: boolean;
}

interface CarouselAnimState {
  active: number;
  direction: "left" | "right";
}

const useStyles = makeStyles({
  carouselRoot: {
    width: '100%',
    height: 662,
    position: 'relative',
  },
  leftArrow: {
    position: 'absolute',
    left: 'calc(50% - 290px)',
    top: 270,
    transform: 'translate(-50%, 0)',
    width: 32,
    height: 32,
    zIndex: 1000,
    cursor: `url(${CursorPointer}), pointer`,
    backgroundImage: `url(${IconLeftNavigation})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  rightArrow: {
    position: 'absolute',
    right: 'calc(50% - 290px)',
    top: 270,
    transform: 'translate(50%, 0)',
    width: 32,
    height: 32,
    zIndex: 1000,
    cursor: `url(${CursorPointer}), pointer`,
    backgroundImage: `url(${IconRightNavigation})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  transitionGroup: {
  }
});

export default function Carousel(props: CarouselProps) {
  const classes = useStyles();
  const { vault, farm, isHome, handleUpdateInfo } = props;
  const setPopupState = useSetRecoilState(popupState);
  const connection = useRecoilValue(conn);
  const poolInfos = useRecoilValue(liquidityPoolInfos);
  const userInfoState = useRecoilValue(userInfo)
  const { enqueueSnackbar } = useSnackbar();
  const { connected, publicKey, signAllTransactions } = useWallet();
  const [items, setItems] = useState<any[]>(props.items);
  const [animState, setAnimState] = useState<CarouselAnimState>({
    active: props.active,
    direction: "left",
  });

  const balance = new TokenAmount(
    userInfoState.lpTokens[vault.depositToken.symbol].balance,
    vault.depositToken.decimals).toEther();

  useEffect(() => {
    const target = props.active % items.length;
    const activeMod = animState.active % items.length
    const activeQuotient = Math.floor(props.active / items.length)
    // console.log("????????? ???", props.active)
    // console.log("????????? ??? ??????", target)
    // console.log("?????? ??????", activeMod)
    // console.log("?????????", Math.abs(target - activeMod))

    if (target < activeMod) {
      // console.log("????????? ", activeQuotient * items.length + target)
      setAnimState({
        direction: 'right',
        active: activeQuotient * items.length + target,
      });
    } else if (target > activeMod) {
      // console.log("?????? ", (activeQuotient) * items.length + target);
      setAnimState({
        direction: 'left',
        active: (activeQuotient) * items.length + target,
      });
    }
  }, [props.active]);

  useEffect(() => {
    setItems(props.items)
  }, [props.items]);


  useEffect(() => {
    if (props.handleChangeIndex) {
      props.handleChangeIndex(animState.active % items.length)
    }
  }, [animState.active])

  const generateItems = (active: number) => {
    var _items = []
    var level
    var halfLen = Math.floor(items.length / 2)

    for (var i = active - halfLen; i < active + halfLen + 1; i++) {
      var index = i;
      if ((i % items.length) < 0) {
        index = (i % items.length) + items.length
      } else {
        index = i % items.length
      }
      // level
      level = i - active;
      if (level < -3) {
        level = 99
      } else if (level > 3) {
        level = 99
      }
      _items.push({
        key: i,
        item: items[index],
        level: level,
      })
    }
    return _items
  }

  const rightClick = () => {
    setAnimState({
      direction: 'right',
      active: (animState.active + 1)
    })
  }

  const leftClick = () => {
    setAnimState({
      direction: 'left',
      active: animState.active - 1
    })
  }


  // ???????????? ?????????, ?????????, ?????? ?????? Carousel ???????????? ??????
  // Strategy, amount ??? FlagItem ???????????? ?????????????????? ????????? ?????? ????????? ??????
  const handleDeposit = async (amount: BigNumber, strategyInfo: Strategy) => {
    setPopupState(<LoadingPopup />)
    let transactions = []
    if (!vault.farmRewardTokenAccountB) {
      transactions.push(
        harvest(connection, publicKey!, vault, strategyInfo, farm)
      )
      if (strategyInfo.strategyTokenSymbol === 'BTC') {
        const rewardToUsdcPoolInfo = poolInfos[vault.rewardUsdcLpMintAccount]
        const usdcToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfo, false)
        )
        transactions.push(
          swapUsdcToStrategy(connection, publicKey!, vault, strategyInfo, usdcToStrategyPoolInfo)
        )
      }
      else {
        const rewardToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfo, false)
        )
      }
      transactions.push(
        deposit(connection, publicKey!, vault, strategyInfo, farm, amount.toString())
      )
    }
    else {
      transactions.push(
        harvestV4(connection, publicKey!, vault, strategyInfo, farm)
      )
      if (strategyInfo.strategyTokenSymbol === 'BTC') {
        const rewardToUsdcPoolInfo = poolInfos[vault.rewardUsdcLpMintAccount]
        const rewardToUsdcPoolInfoB = poolInfos[vault.rewardUsdcLpMintAccountB!]
        const usdcToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfo, false)
        )
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfoB, true)
        )
        transactions.push(
          swapUsdcToStrategy(connection, publicKey!, vault, strategyInfo, usdcToStrategyPoolInfo)
        )
      }
      else {
        const rewardToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        const rewardToStrategyPoolInfoB = poolInfos[strategyInfo.strategyLpMintAccountB!]
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfo, false)
        )
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfoB, true)
        )
      }
      transactions.push(
        depositV4(connection, publicKey!, vault, strategyInfo, farm, amount.toString())
      )
    }
    try {
      transactions = await Promise.all(transactions);
      const signedTransactions = await signAllTransactions!(transactions)
      for (let signedTransaction of signedTransactions) {
        await sendAndConfirmRawTransaction(connection!, signedTransaction.serialize(), { skipPreflight: true, commitment: 'confirmed' });
      }
      enqueueSnackbar(<SuccessSnackbar message="Transaction sent successfully" />)
    } catch (e) {
      console.error(e)
      enqueueSnackbar(<ErrorSnackbar message={`Transaction failed`} />)
    }
    if (handleUpdateInfo) handleUpdateInfo();
    setPopupState(undefined)
  }

  const handleWithdraw = async (amount: BigNumber, rewardAmount: BigNumber, strategyInfo: Strategy) => {
    setPopupState(<LoadingPopup />)
    let transactions = []
    if (!vault.farmRewardTokenAccountB) {
      transactions.push(
        harvest(connection, publicKey!, vault, strategyInfo, farm)
      )
      if (strategyInfo.strategyTokenSymbol === 'BTC') {
        const rewardToUsdcPoolInfo = poolInfos[vault.rewardUsdcLpMintAccount]
        const usdcToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfo, false)
        )
        transactions.push(
          swapUsdcToStrategy(connection, publicKey!, vault, strategyInfo, usdcToStrategyPoolInfo)
        )
      }
      else {
        const rewardToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfo, false)
        )
      }
      transactions.push(
        withdraw(connection, publicKey!, vault, strategyInfo, farm, amount.toString(), rewardAmount.toString())
      )
    }
    else {
      transactions.push(
        harvestV4(connection, publicKey!, vault, strategyInfo, farm)
      )
      if (strategyInfo.strategyTokenSymbol === 'BTC') {
        const rewardToUsdcPoolInfo = poolInfos[vault.rewardUsdcLpMintAccount]
        const rewardToUsdcPoolInfoB = poolInfos[vault.rewardUsdcLpMintAccountB!]
        const usdcToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfo, false)
        )
        transactions.push(
          swapRewardToUsdc(connection, publicKey!, vault, strategyInfo, rewardToUsdcPoolInfoB, true)
        )
        transactions.push(
          swapUsdcToStrategy(connection, publicKey!, vault, strategyInfo, usdcToStrategyPoolInfo)
        )
      }
      else {
        const rewardToStrategyPoolInfo = poolInfos[strategyInfo.strategyLpMintAccount]
        const rewardToStrategyPoolInfoB = poolInfos[strategyInfo.strategyLpMintAccountB!]
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfo, false)
        )
        transactions.push(
          swapRewardToStrategy(connection, publicKey!, vault, strategyInfo, rewardToStrategyPoolInfoB, true)
        )
      }
      transactions.push(
        withdrawV4(connection, publicKey!, vault, strategyInfo, farm, amount.toString(), rewardAmount.toString())
      )
    }
    try {
      transactions = await Promise.all(transactions);
      const signedTransactions = await signAllTransactions!(transactions)
      for (let signedTransaction of signedTransactions) {
        await sendAndConfirmRawTransaction(connection!, signedTransaction.serialize(), { skipPreflight: true, commitment: 'confirmed' });
      }
      enqueueSnackbar(<SuccessSnackbar message="Transaction sent successfully" />)
    } catch (e) {
      console.error(e)
      enqueueSnackbar(<ErrorSnackbar message={`Transaction failed`} />)
    }
    if (handleUpdateInfo) handleUpdateInfo();
    setPopupState(undefined)
  }

  return (
    <div className={classes.carouselRoot}>
      <div className={classes.leftArrow} onClick={(leftClick)}></div>
      {generateItems(animState.active).map((i, idx) => {
        if (connected || isHome) {
          return (
            <CSSTransition
              key={i.key}
              classNames={animState.direction}
              timeout={500}
            >
              <FlagItem
                id={`${i.item.symbol}-${i.key}`}
                level={i.level}
                item={i.item}
                vault={vault}
                balance={balance}
                strategy={STRATEGIES[getIndexFromSymbol(i.item.symbol)]}
                onClick={() => {
                  setAnimState({
                    direction: i.level < 0 ? 'left' : 'right',
                    active: i.key
                  })
                }}
                handleDeposit={handleDeposit}
                handleWithdraw={handleWithdraw}
              />
            </CSSTransition>
          );
        } else {
          return (
            <CSSTransition
              key={i.key}
              classNames={animState.direction}
              timeout={500}
            >
              <NotConnectedFlagItem
                id={`${i.item.symbol}-${i.key}`}
                // id={i.key}
                symbol={i.item.symbol}
                level={i.level}
                onClick={() => {
                  setAnimState({
                    direction: i.level < 0 ? 'left' : 'right',
                    active: i.key
                  })
                }}
              />
            </CSSTransition>
          )
        }

      })}
      <div className={classes.rightArrow} onClick={rightClick}></div>
    </div>
  )
}
