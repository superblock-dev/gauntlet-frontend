import { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import FlagItem from './FlagItem';
import CursorPointer from "assets/CursorPointer.svg";
import IconLeftNavigation from "assets/svgs/big-arrow-left.svg";
import IconRightNavigation from "assets/svgs/big-arrow-right.svg";
import './carousel.css';

interface CarouselProps {
  items: any[],
  active: number,
}

interface CarouselAnimStat {
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
  const [animState, setAnimState] = useState<CarouselAnimStat>({
    active: props.active,
    direction: "left",
  });

  useEffect(() => {
    const target = props.active % items.length;

    if (animState.active < target) {
      for (var i = animState.active; i <= target; i++) {
        setAnimState({
          direction: 'right',
          active: i,
        })
      }
    } else {
      for (var i = animState.active; i >= target; i--) {
        setAnimState({
          direction: 'left',
          active: i,
        })
      }
    }
  }, [props.active]);

  const generateItems = (active: number) => {
    var _items = []
    var level

    for (var i = active - 2; i < active + 3; i++) {
      var index = i
      if (i < 0) {
        index = items.length + i
      } else if (i >= items.length) {
        index = i % items.length
      }
      level = i - active

      _items.push({
        key: index,
        item: items[index],
        level: level,
      })
    }
    return _items
  }

  const rightClick = () => {
    setAnimState({
      direction: 'right',
      active: (animState.active + 1) % items.length
    })
  }

  const leftClick = () => {
    setAnimState({
      direction: 'left',
      active: animState.active - 1 < 0 ? items.length - 1 : animState.active - 1
    })
  }

  return (
    <div className={classes.carouselRoot}>
      <div className={classes.leftArrow} onClick={(leftClick)}></div>
      <TransitionGroup
        className={classes.transitionGroup}
      >
        {generateItems(animState.active).map(i => {
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
                onClick={() => setAnimState({
                  direction: i.level < 0 ? 'left' : 'right',
                  active: i.key
                })} 
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className={classes.rightArrow} onClick={rightClick}></div>
    </div>
  )
}
