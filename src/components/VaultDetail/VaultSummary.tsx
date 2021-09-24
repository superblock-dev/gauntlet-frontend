import { makeStyles } from "@material-ui/core";
import BGVaultSummary from 'assets/svgs/BGVaultSummary.svg';
import { UserState, Vault } from "types";

const useStyles = makeStyles({
  summaryContainer: {
    backgroundImage: `url(${BGVaultSummary})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: 816,
    height: 174,
    padding: '50px 80px 48px 80px',
    display: 'flex',
    flexDirection: 'column',
  },
  summaryContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryHeader: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    height: 14,
    color: '#CBA344',
    marginBottom: 4,
  },
  summaryBody: {
    fontWeight: 700,
    fontSize: 20,
    height: 30,
    color: '#FFD271',
    marginBottom: 4,
  },
  summarySubBody: {
    fontSize: 16,
    fontWeight: 700,
    height: 24,
    color: '#CBA344',
  },
});

interface VaultSummaryProps {
  vault: Vault;
  userState?: UserState;
}


function VaultSummary({ vault, userState }: VaultSummaryProps) {
  const classes = useStyles();

  return (
    <div className={classes.summaryContainer}>
      <div className={classes.summaryContent}>
        <div className={classes.summaryHeader}>Deposits</div>
        <div className={classes.summaryHeader}>APY</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryBody}>{userState ? userState.balance : 0}</div>
        <div className={classes.summaryBody}>95.39%</div>
      </div>
      <div className={classes.summaryContent} style={{ marginBottom: 50, }}>
        <div className={classes.summarySubBody}>$2.39</div>
        <div className={classes.summarySubBody}>0.05% daily</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryHeader}>Share of pool</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryBody} style={{ marginBottom: 0, }}>20%</div>
      </div>
    </div>
  )
};

export default VaultSummary;
