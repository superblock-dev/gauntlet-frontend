import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import { STONES } from "utils/stones";
import TooltipVaultDetail from 'assets/svgs/TooltipVaultDetail.svg';

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
    transform: "translate(-50%, 50%)",
  },
  stone1: {
    position: "absolute",
    bottom: 40,
    left: '33.3%',
    transform: "translate(-50%, 50%)",
  },
  stone2: {
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

export default function Stone({ tokenName, amount, onClick }: StoneProps) {
  const classes = useStyles();

  const lpTokenNames: TokenName[] = [
    "RAY-ETH",
    'RAY-SOL',
    "RAY-USDC",
    "RAY-USDT",
  ]

  if (lpTokenNames.includes(tokenName)) {
    const firstToken = tokenName.split("-")[0];
    const secondToken = tokenName.split("-")[1];

    return (
      <>
        {amount !== undefined ? (
          <div className={classes.container} onClick={onClick}>
            <div className={classes.tooltipBox} />
            <div className={classes.tooltipText}>{`${tokenName} / ${amount}`}</div>
            <img className={classes.stoneBg} src={STONES[firstToken].xlargeBgEffect} />
            <img className={classes.stone1} src={STONES[firstToken].xlarge} />
            <img className={classes.stone2} src={STONES[secondToken].xlarge} />
          </div>
        ) : (
          <div className={classes.container} onClick={onClick}>
            <div className={classes.tooltipBox} />
            <div className={classes.tooltipText}>{`${tokenName} / 0`}</div>
            <img className={classes.stone1} src={STONES[firstToken].xlargeOutline} />
            <img className={classes.stone2} src={STONES[secondToken].xlargeOutline} />
            <img className={classes.stone1} src={STONES[firstToken].xlargeDeactivated} />
            <img className={classes.stone2} src={STONES[secondToken].xlargeDeactivated} />
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
          <img className={classes.stoneBg} src={STONES[tokenName].xlargeBgEffect} />
          <img className={classes.stone} src={STONES[tokenName].xlarge} />
        </div>
      ) : (
        <div className={classes.container} onClick={onClick}>
          <div className={classes.tooltipBox} />
          <div className={classes.tooltipText}>{`${tokenName} / 0`}</div>
          <img className={classes.stone} src={STONES[tokenName].xlargeOutline} />
          <img className={classes.stone} src={STONES[tokenName].xlargeDeactivated} />
        </div>
      )}
    </>
  );
}
