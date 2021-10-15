import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@solana/wallet-adapter-react';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';

import { conn, liquidityPoolInfos } from 'recoil/atoms';
import { Farm, Strategy, Vault } from 'types';
import { harvest } from 'utils/transactions';
import FlagItem from './FlagItem';
import NotConnectedFlagItem from './NotConnectedFlagItem';
import CursorPointer from "assets/CursorPointer.svg";
import IconLeftNavigation from "assets/svgs/big-arrow-left.svg";
import IconRightNavigation from "assets/svgs/big-arrow-right.svg";
import './Carousel.css';

interface CarouselProps {
  vault: Vault;
  farm: Farm;
  items: any[];
  active: number;
  handleChangeIndex?: (index: number) => void;
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
  const { vault, farm, isHome } = props;
  const connection = useRecoilValue(conn);
  const { connected, publicKey } = useWallet();
  const [items, _] = useState<any[]>(props.items);
  const [animState, setAnimState] = useState<CarouselAnimState>({
    active: props.active,
    direction: "left",
  });

  useEffect(() => {
    const target = props.active % items.length;
    const activeMod = animState.active % items.length
    const activeQuotient = Math.floor(props.active / items.length)
    // console.log("가야할 곳", props.active)
    // console.log("가야할 곳 위치", target)
    // console.log("현재 위치", activeMod)
    // console.log("차이값", Math.abs(target - activeMod))

    if (target < activeMod) {
      // console.log("오른쪽 ", activeQuotient * items.length + target)
      setAnimState({
        direction: 'right',
        active: activeQuotient * items.length + target,
      });
    } else if (target > activeMod) {
      // console.log("왼쪽 ", (activeQuotient) * items.length + target);
      setAnimState({
        direction: 'left',
        active: (activeQuotient) * items.length + target,
      });
    }
  }, [props.active]);

  useEffect(() => {
    if (props.handleChangeIndex) {
      props.handleChangeIndex(animState.active % items.length)
    }
  }, [animState.active])

  const generateItems = (active: number) => {
    var _items = []
    var level
    var halfLen = Math.floor(items.length / 2)

    for (var i = active - halfLen ; i < active + halfLen + 1; i++) {
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


  // 공통으로 필요한, 커넥션, 오너 등은 Carousel 레벨에서 전달
  // Strategy, amount 등 FlagItem 레벨에서 결정해야하는 것들은 함수 인자로 정의
  const deposit = (amount: number, strategyInfo: Strategy) => {
    if (!vault.farmRewardTokenAccountB) {
      // Not dual
      const txHarvest = harvest(connection, publicKey!, vault, strategyInfo, farm)
    }
  }

  const withdraw = (amount: number, rewardAmount: number, strategyInfo: Strategy) => {
    if (!vault.farmRewardTokenAccountB) {
      // Not dual
      const txHarvest = harvest(connection, publicKey!, vault, strategyInfo, farm)
    }
  }

  const claim = () => {

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
                onClick={() => {
                  setAnimState({
                    direction: i.level < 0 ? 'left' : 'right',
                    active: i.key
                  })
                }}
                handleDeposit={deposit}
                handleWithdraw={withdraw}
                handleClaim={claim}
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
