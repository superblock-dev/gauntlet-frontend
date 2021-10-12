import { Link } from 'react-router-dom';
import { TokenName, UserState, Vault } from 'types';

import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from "@material-ui/core";
import Countup from 'react-countup';
import SmallButton from "components/Buttons/SmallButton";
import LinePurpleShort from 'assets/svgs/LinePurpleShort.svg';
import { ReactComponent as CaretDown } from 'assets/svgs/CaretDown.svg';
import LPTokenView from './LPTokenView';
import CursorPointer from 'assets/CursorPointer.svg';
import Stone from 'components/Stone/Stone';

const AccordionSummary = withStyles({
  root: {
    marginTop: 16,
    backgroundColor: 'rgba(138, 100, 247, 0.1)',
    borderRadius: 4,
    padding: '0 16px',
    height: 40,
    minHeight: 40,
    cursor: `url(${CursorPointer}), pointer !important`,
    '&$expanded': {
      minHeight: 40,
      height: 40,
    },
  },
  expandIcon: {
    cursor: `url(${CursorPointer}), pointer !important`,
  },
  expanded: {
    minHeight: 40,
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 0,
  },
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

interface UserVaultProps {
  vault: Vault;
  userStates: UserState[];
}

function UserVaultItem({ vault, userStates }: UserVaultProps) {
  const classes = useStyles();

  const [totalApr, totalDeposit, totalRewardInUSD] = userStates.reduce((prev, s) => {
    prev[0] = s.totalApr ? prev[0] + s.totalApr : prev[0];
    prev[1] += s.amount;
    prev[2] = s.totalRewardInUSD ? prev[2] + s.totalRewardInUSD : prev[2];

    return prev
  }, [0, 0, 0]);

  console.log("userv ault item ", userStates)

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={3} className={classes.itemContainer} >
          <LPTokenView lp={vault.depositToken} name={vault.depositToken.name.split('LP')[0]} />
        </Grid>
        <Grid item xs={2} className={classes.itemContainer} >540.1 M</Grid>
        <Grid item xs={2} className={classes.itemContainer} >
          <Countup
            start={0}
            end={totalApr}
            delay={0}
            duration={0.75}
            decimals={2}
            decimal="."
            suffix=" %"
          />
        </Grid>
        <Grid item xs={3} className={classes.itemContainer} >{
          userStates.map(s => (
            <Stone
              key={`vault-${vault.id}-${s.rewardToken.mintAddress}`}
              tokenName={s.rewardToken.symbol as TokenName}
              size="small"
              style={{
                marginRight: 8,
                display: 'inline-block',
                width: 24,
              }}
            />
          ))
        }</Grid>
        <Grid item xs={2} className={classes.btnContainer}>
          <Link to={{
            pathname: `/vault/${vault.id}`,
            state: {
              vault: vault,
            }
          }}>
            <SmallButton />
          </Link>
        </Grid>
      </Grid>
      <div className={classes.shortDivider}>
        <img src={LinePurpleShort} />
      </div>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={7}>
          <Accordion style={{
            backgroundColor: 'transparent',
            zIndex: 0,
            boxShadow: 'none',
            marginBottom: 24,
          }}>
            <AccordionSummary expandIcon={<CaretDown style={{ cursor: `url(${CursorPointer}), pointer !important` }} />} >
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
                >{totalDeposit.toLocaleString()}</div>
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
                >
                  <Countup
                    start={0}
                    end={totalRewardInUSD}
                    delay={0}
                    duration={0.75}
                    separator=","
                    decimals={3}
                    decimal="."
                    prefix="$ "
                  />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails >
              {
                userStates.map((state, idx) => (
                  <div key={`detail-${vault.id}-${state.rewardToken.symbol}-${idx}`} className={classes.rewardDetailContainer}>
                    <Stone
                      tokenName={state.rewardToken.symbol as TokenName}
                      size="small"
                      style={{
                        top: 8,
                        width: 24,
                      }}
                    />
                    <div className={classes.rewardSymbolText}>{state.rewardToken.symbol}</div>
                    <div className={classes.rewardAmount}>
                      {
                        state.reward ?
                          state.reward :
                          0
                      }</div>
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
