import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from "@material-ui/core";
import SmallButton from "components/Buttons/SmallButton";
import { SMALL_STONES, VaultInfo } from 'utils/tokens';
import LinePurpleShort from 'assets/svgs/LinePurpleShort.svg';
import { ReactComponent as CaretDown } from 'assets/svgs/CaretDown.svg';

const AccordionSummary = withStyles({
  root: {
    marginTop: 16,
    backgroundColor: 'rgba(138, 100, 247, 0.1)',
    borderRadius: 4,
    padding: '0 16px',
    height: 40,
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
      height: 40,
    },
  },
  content: {},
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 0,
  },
  content: {},
  expanded: {},
})(MuiAccordionDetails);

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
  stoneContainer: {
    position: 'relative',
    display: 'inline-block',
    width: 24,
    height: 24,
    marginRight: 8,
  },
  stoneIcon: {
    position: 'absolute',
    objectFit: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
  textBasic: {
    color: 'rgba(255, 210, 113, 1)',
    fontSize: 18,
    fontWeight: 700,
  },
  textSen: {
    fontFamily: 'Sen',
    fontWeight: 400,
    color: 'rgba(203, 163, 68, 1)',
    fontSize: 12,
  },
  rewardDetailContainer: {
    width: 266,
    height: 40,
    padding: '0 16px',
    marginTop: 8,
    backgroundColor: 'rgba(138, 100, 247, 0.1)',
    borderRadius: 4,
    position: 'relative',
  },
  rewardIcon: {
    position: 'absolute',
    objectFit: 'none',
    top: '50%',
    left: 28,
    transform: 'translate(-50%, -50%)',
  },
  rewardSymbolText: {
    position: 'absolute',
    top: 13,
    left: 48,
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    color: 'rgba(255, 210, 113, 1)',
  },
  rewardAmount: {
    position: 'absolute',
    top: 8,
    right: 16,
    fontWeight: 700,
    fontSize: 16,
    color: 'rgba(255, 210, 113, 1)',
  }

});

function UserVaultItem({ name, lp, userStaked }: VaultInfo) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={3} className={classes.itemContainer} >{name}</Grid>
        <Grid item xs={2} className={classes.itemContainer} >540.1 M</Grid>
        <Grid item xs={2} className={classes.itemContainer} >118.0%</Grid>
        <Grid item xs={3} className={classes.itemContainer} >{
          userStaked?.rewards.map(reward => (
            <div key={reward.token.name} className={classes.stoneContainer}>
              <img className={classes.stoneIcon} src={SMALL_STONES[reward.token.symbol]} />
            </div>
          ))
        }</Grid>
        <Grid item xs={2} className={classes.btnContainer}>
          <SmallButton />
        </Grid>
      </Grid>
      <div className={classes.shortDivider}>
        <img src={LinePurpleShort} />
      </div>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={7}>
          <Accordion style={{ backgroundColor: 'transparent', zIndex: 0, boxShadow: 'none', marginBottom: 24, }}>
            <AccordionSummary expandIcon={<CaretDown />} >
              <div className={classes.rewardSummaryContent}>
                <div 
                  className={classes.textSen}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 13,
                  }}  
                >Deposit</div>
                <div 
                  className={classes.textBasic}
                  style={{
                    position: 'absolute',
                    left: 153,
                    top: 7,
                  }}
                >{userStaked?.deposit}</div>
                <div  
                  className={classes.textSen}
                  style={{
                    position: 'absolute',
                    left: 309,
                    top: 13,
                  }}  
                >Rewards</div>
                <div 
                  className={classes.textBasic}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 7,
                  }}
                >{userStaked?.totalRewardInUSD}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails >
              {
                userStaked?.rewards.map(reward => (
                  <div className={classes.rewardDetailContainer}>
                    <img className={classes.rewardIcon} src={SMALL_STONES[reward.token.symbol]} />
                    <div className={classes.rewardSymbolText}>{reward.token.symbol}</div>
                    <div className={classes.rewardAmount}>{reward.amount}</div>
                  </div>
                ))
              }
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  )
}

export default UserVaultItem;
