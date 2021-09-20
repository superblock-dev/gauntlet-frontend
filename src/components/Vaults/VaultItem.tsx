import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";
import SmallButton from "components/Buttons/SmallButton";
import { VaultInfo } from 'utils/tokens';
import LPTokenView from './LPTokenView';
import { Link } from 'react-router-dom';

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

function VaultItem({ id, lp, userStaked }: VaultInfo) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={4} className={classes.itemContainer}>
          <LPTokenView lp={lp} />
        </Grid>
        <Grid item xs={3} className={classes.itemContainer}>540.1 M</Grid>
        <Grid item xs={3} className={classes.itemContainer}>118.0%</Grid>
        <Grid item xs={2} className={classes.btnContainer}>
          <Link to={`/vault/${id}`}>
            <SmallButton />
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default VaultItem;
