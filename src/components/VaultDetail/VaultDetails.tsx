import { makeStyles } from "@material-ui/core";
import { Vault } from "types";

const useStyles = makeStyles({
  root: {
    width: 560,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: 560,
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 14,
    height: 17,
    color: '#CBA344',
    marginBottom: 11,
  },
  divider: {
    width: 560,
    height: 1,
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
    marginBottom: 29,
  },
  infoContainer: {
    position: 'relative',
    width: '100%',
    height: 319,
  },
  assetInfoContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: 135,
  },
  textName: {
    fontFamily: 'Sen',
    fontSize: 14,
    fontWeight: 400,
    color: '#997614',
  },
  textValue: {
    marginTop: 4,
    marginBottom: 16,
    fontWeight: 400,
    fontSize: 16,
    color: '#FFD271',
  },
  containerHeader: {
    marginBottom: 16,
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    color: '#CBA344',
  },
  apyContainer: {
    position: 'absolute',
    left: 211,
    top: 0,
    width: 96,
  },
  feeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 165,
  }
});

interface VaultDetailProps {
  vault: Vault;

}

function VaultDetails({ vault }: VaultDetailProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>Vault Details</div>
      <div className={classes.divider} />
      <div className={classes.infoContainer}>
        <div className={classes.assetInfoContainer}>
          <div className={classes.textName}>Asset</div>
          <div className={classes.textValue}>{`${vault.depositToken.name.split(' LP')[0]} lp`}</div>
          <div className={classes.textName}>Farm Name</div>
          <div className={classes.textValue}>{vault.depositToken.urlHelper}</div>
        </div>
        <div className={classes.apyContainer}>
          <div className={classes.containerHeader}>APY Calculations</div>
          <div className={classes.textName}>Farm APR</div>
          <div className={classes.textValue}>200%</div>
          {/* <div className={classes.textName}>LET APR</div>
          <div className={classes.textValue}>20%</div> */}
          <div className={classes.textName}>Total APY</div>
          <div className={classes.textValue}>230%</div>
          <div className={classes.textName}>Daily APR</div>
          <div className={classes.textValue}>0.1%</div>
        </div>
        <div className={classes.feeContainer}>
          <div className={classes.containerHeader}>Fees</div>
          <div className={classes.textName}>Control fee</div>
          <div className={classes.textValue}>{`${(vault.fees.controlFee * 100).toFixed(2)} %`}</div>
          <div className={classes.textName}>Performance fee</div>
          <div className={classes.textValue}>{`${(vault.fees.performanceFee * 100).toFixed(2)} %`}</div>
          <div className={classes.textName}>GauntLET Staking Pool</div>
          <div className={classes.textValue}>{`${(vault.fees.treasuryFee * 100).toFixed(2)} %`}</div>
          <div className={classes.textName}>Entrance fee</div>
          <div className={classes.textValue}>Free</div>
          <div className={classes.textName}>Withdrawal fee</div>
          <div className={classes.textValue}>{`${(vault.fees.withdrawalFee * 100).toFixed(2)} %`}</div>
        </div>
      </div>
    </div>
  )
}

export default VaultDetails;
