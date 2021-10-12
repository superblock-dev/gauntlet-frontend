import { useRecoilValue } from 'recoil';
import Countup from 'react-countup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";
import SmallButton from "components/Buttons/SmallButton";
import LPTokenView from './LPTokenView';
import { Link } from 'react-router-dom';
import { Vault } from 'types';
import { farmInfos } from 'recoil/atoms';
import BigNumber from 'bignumber.js';
import { calculateApyInPercentage, STRATEGY_FARMS } from 'utils/strategies';

const useStyles = makeStyles({
  container: {
    color: 'rgba(255, 210, 113, 1)',
    fontSize: 18,
    fontWeight: 700,
    height: 78,
    display: 'flex',
    alignItems: 'center',
  },
  itemContainer: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortDivider: {
    display: 'flex',
    flexDirection: 'row-reverse',
    height: 2,
  },
  rewardSummaryContent: {
    width: '100%',
    height: 40,
    position: 'relative',
  },
});

interface VaultItemProps {
  vault: Vault;
}

function VaultItem({ vault }: VaultItemProps) {
  const classes = useStyles();

  const farms = useRecoilValue(farmInfos);

  const farm = Object.values(farms).find(f => f.lp.symbol === vault.depositToken.symbol);

  const highestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy < v.apy ? v : p);
  // const lowestStrategy = STRATEGY_FARMS.reduce((p, v) => p.apy > v.apy ? v : p);

  let totalHApr = new BigNumber(0);
  // let totalLApr = new BigNumber(0);
  
  if (farm && farm.apr) {
    totalHApr = BigNumber.sum(totalHApr, Number(farm.apr))
    // totalLApr = BigNumber.sum(totalLApr, Number(farm.apr))
  }

  const highestApy = calculateApyInPercentage(totalHApr.toNumber(), highestStrategy.apy)
  // const lowestApy = calculateApyInPercentage(totalLApr, lowestStrategy.apy)

  if (farm && farm.fees) {
    totalHApr = BigNumber.sum(highestApy, Number(farm.fees))
    // totalLApr = BigNumber.sum(lowestApy, Number(farm.fees))
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4} className={classes.itemContainer}>
          <LPTokenView lp={vault.depositToken} name={farm?.name} />
        </Grid>
        <Grid item xs={3} className={classes.itemContainer}>540.1 M</Grid>
        <Grid item xs={3} className={classes.itemContainer}>
          {/* <Countup
            start={0}
            end={totalLApr.toNumber()}
            delay={0}
            duration={0.75}
            decimals={2}
            decimal="."
            suffix=""
          />
          {` ~ `} */}
          <Countup
            start={0}
            end={totalHApr.toNumber()}
            delay={0}
            duration={0.75}
            decimals={2}
            decimal="."
            suffix=" %"
          />
        </Grid>
        <Grid item xs={2} className={classes.btnContainer}>
          <Link to={`/vault/${vault.id}`}>
            <SmallButton />
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default VaultItem;
