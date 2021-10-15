import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import FlagItem from './FlagItem';
import CursorPointer from "assets/CursorPointer.svg";
import IconLeftNavigation from "assets/svgs/big-arrow-left.svg";
import IconRightNavigation from "assets/svgs/big-arrow-right.svg";
import './Carousel.css';
import NotConnectedFlagItem from './NotConnectedFlagItem';

interface CarouselProps {
  items: any[];
  active: number;
  handleChangeIndex?: (index: number) => void;
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
  const [items, _] = useState<any[]>(props.items);
  const { connected } = useWallet();
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

  return (
    <div className={classes.carouselRoot}>
      <div className={classes.leftArrow} onClick={(leftClick)}></div>
      {generateItems(animState.active).map((i, idx) => {
        if (connected) {
          return (
            <CSSTransition
              key={i.key}
              classNames={animState.direction}
              timeout={500}
            >
              <FlagItem
                id={`${i.item.symbol}-${i.key}`}
                // id={i.key}
                level={i.level}
                item={i.item}
                onClick={() => {
                  setAnimState({
                    direction: i.level < 0 ? 'left' : 'right',
                    active: i.key
                  })
                }}
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
