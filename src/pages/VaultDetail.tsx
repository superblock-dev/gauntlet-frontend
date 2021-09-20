import { useParams } from "react-router-dom";

import LPTokenView from "components/Vaults/LPTokenView";
import { Grid, makeStyles } from "@material-ui/core";
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import BGVaultSummary from 'assets/svgs/BGVaultSummary.svg';
import { FARMS } from 'utils/tokens';

interface VaultDetailParams {
  vaultId: string,
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 72,
    width: 976,
    marginBottom: 32,
  },
  backBtnContainer: {
    width: 165,
    height: 40,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
  },
  iconBack: {
    width: 32,
    height: 32,
    backgroundImage: `url(${IconBackArrow})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  textBack: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: 700,
    background: 'linear-gradient(175.49deg, #FFD271 26.78%, #825900 103.29%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
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

function VaultDetail() {
  const classes = useStyles();
  let { vaultId } = useParams<VaultDetailParams>();
  let vId = parseInt(vaultId);
  if (vId === undefined) return <></> // TODO: Page not found
  let farm = FARMS.find(farm => farm.id === vId);
  if (farm === undefined) return <></> // TODO: Page not found

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.backBtnContainer}>
          <div className={classes.iconBack} />
          <div className={classes.textBack}>
            Back to Vaults
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 960,
          marginLeft: 8,
        }}>
          <div style={{ width: 800, }}>
            <LPTokenView lp={farm.lp} linkVisible />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 45,
            marginRight: 16,
          }}>
            <div style={{ fontFamily: 'Sen', fontSize: 12, color: '#CBA344', }}>TVL</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#FFD271', }}>540.1M</div>
          </div>
        </div>
      </div>

      <div className={classes.summaryContainer}>
        <div className={classes.summaryContent}>
          <div className={classes.summaryHeader}>Deposits</div>
          <div className={classes.summaryHeader}>APY</div>
        </div>
        <div className={classes.summaryContent}>
          <div className={classes.summaryBody}>0.04859</div>
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
    </div>
  )
};

export default VaultDetail;
