import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import { STONES } from "utils/stones";
import TooltipVaultDetail from 'assets/svgs/TooltipVaultDetail.svg';

const useStyles = makeStyles({
  container: {
    position: "relative",
    display: 'inline-block',
    width: 114,
    height: 120,
    '&:hover $tooltipBox': {
      display: 'inline-block',
    },
    '&:hover $tooltipText': {
      display: 'inline-block',
    },
  },
  tooltipBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 114,
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
    width: 114,
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
    '&:hover': {
      opacity: 1.0,
      transition: 'all 0.67s', /* Animation */
    },
  },
  stone: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: "translate(-50%, 50%)",
  },
});

interface StoneProps {
  tokenName: TokenName;
  amount: number;
}

export default function Stone({ tokenName, amount }: StoneProps) {
  const classes = useStyles();

  return (
    <>
      {amount ? (
        <div className={classes.container}>
          <div className={classes.tooltipBox} />
          <div className={classes.tooltipText}>{`${tokenName} / ${amount}`}</div>
          <img className={classes.stoneBg} src={STONES[tokenName].xlargeBgEffect} />
          <img className={classes.stone} src={STONES[tokenName].xlarge} />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.tooltipBox} />
          <div className={classes.tooltipText}>{`${tokenName} / 0`}</div>
          <img className={classes.stone} src={STONES[tokenName].xlargeOutline} />
          <img className={classes.stone} src={STONES[tokenName].xlargeDeactivated} />
        </div>
      )}
    </>
  );
}
