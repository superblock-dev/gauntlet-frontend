import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import { STONES, STONE_BG_EFFECTS } from "utils/stones";
import TooltipVaultDetail from 'assets/svgs/TooltipVaultDetail.svg';
import { REWARD_LP_TOKENS } from "utils/tokens";

const useStyles = makeStyles({
  container: {
    position: "relative",
    display: 'inline-block',
    width: 120,
    height: 120,
    '&:hover $tooltipBox': {
      display: 'inline-block',
    },
    '&:hover $tooltipText': {
      display: 'inline-block',
    },
    '&:hover $stoneBg': {
      opacity: 1.0,
      transition: 'all 0.67s', /* Animation */
    },
  },
  tooltipBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 33,
    backgroundImage: `url(${TooltipVaultDetail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'none',
  },
  tooltipText: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: 120,
    textAlign: 'center',
    color: '#CBA344',
    fontSize: 14,
    fontWeight: 700,
    display: 'none',
    whiteSpace: 'nowrap',
  },
  stoneBg: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translate(-50%, 50%)",
    opacity: 0.0,
    zIndex: 100,
  },
  stone: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translate(-50%, 50%) scale(0.26)",
  },
  inactiveStone: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translate(-50%, 50%)",
  },
  stone1: {
    position: "absolute",
    bottom: 40,
    left: '33.3%',
    transform: "translate(-50%, 50%) scale(0.26)",
  },
  stone2: {
    position: "absolute",
    bottom: 40,
    right: "33.3%",
    transform: "translate(50%, 50%) scale(0.26)",
  },
  inactiveStone1: {
    position: "absolute",
    bottom: 40,
    left: '33.3%',
    transform: "translate(-50%, 50%)",
  },
  inactiveStone2: {
    position: "absolute",
    bottom: 40,
    right: "33.3%",
    transform: "translate(50%, 50%)",
  },
});

interface StoneProps {
  tokenName: TokenName;
  amount?: number;
  onClick: () => void;
}

export default function StoneDisplayItem({ tokenName, amount, onClick }: StoneProps) {
  const classes = useStyles();
  if (REWARD_LP_TOKENS.includes(tokenName)) {
    const firstToken = tokenName.split("-")[0];
    const secondToken = tokenName.split("-")[1];

    return (
      <>
        {amount !== undefined ? (
          <div className={classes.container} onClick={onClick}>
            <div className={classes.tooltipBox} />
            <div className={classes.tooltipText}>{`${tokenName} / ${amount}`}</div>
            <img className={classes.stoneBg} src={STONE_BG_EFFECTS[firstToken].bgEffect} />
            <img className={classes.stone2} src={STONES[secondToken]} />
            <img className={classes.stone1} src={STONES[firstToken]} />
          </div>
        ) : (
          <div className={classes.container} onClick={onClick}>
            <div className={classes.tooltipBox} />
            <div className={classes.tooltipText}>{`${tokenName} / 0`}</div>
            <img className={classes.inactiveStone2} src={STONE_BG_EFFECTS[secondToken].outline} />
            <img className={classes.inactiveStone1} src={STONE_BG_EFFECTS[firstToken].outline} />
            <img className={classes.inactiveStone2} src={STONE_BG_EFFECTS[secondToken].deactivated} />
            <img className={classes.inactiveStone1} src={STONE_BG_EFFECTS[firstToken].deactivated} />
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {amount !== undefined ? (
        <div className={classes.container} onClick={onClick}>
          <div className={classes.tooltipBox} />
          <div className={classes.tooltipText}>{`${tokenName} / ${amount}`}</div>
          <img className={classes.stoneBg} src={STONE_BG_EFFECTS[tokenName].bgEffect} />
          <img className={classes.stone} src={STONES[tokenName]} />
        </div>
      ) : (
        <div className={classes.container} onClick={onClick}>
          <div className={classes.tooltipBox} />
          <div className={classes.tooltipText}>{`${tokenName} / 0`}</div>
          <img className={classes.inactiveStone} src={STONE_BG_EFFECTS[tokenName].outline} />
          <img className={classes.inactiveStone} src={STONE_BG_EFFECTS[tokenName].deactivated} />
        </div>
      )}
    </>
  );
}
