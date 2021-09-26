import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";
import SmallButton from "components/Buttons/SmallButton";
import LPTokenView from './LPTokenView';
import { Link } from 'react-router-dom';
import { Vault } from 'types';
import { FARMS } from 'utils/farms';

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

  const farm = FARMS.find(f => f.lp.symbol === vault.depositToken.symbol);

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4} className={classes.itemContainer}>
          <LPTokenView lp={vault.depositToken} name={farm?.name} />
        </Grid>
        <Grid item xs={3} className={classes.itemContainer}>540.1 M</Grid>
        <Grid item xs={3} className={classes.itemContainer}>118.0%</Grid>
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
