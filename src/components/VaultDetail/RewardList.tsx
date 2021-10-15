import { useRecoilValue } from "recoil";
import { farmInfos } from "recoil/atoms";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles, withStyles } from "@material-ui/core";
import { ReactComponent as CaretDown } from 'assets/svgs/CaretDown.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { calculateApyInPercentage } from 'utils/strategies';
import { StrategyApy, TokenName, Vault } from 'types';
import { REWARD_LP_TOKENS } from 'utils/tokens';
import Stone from 'components/Stone/Stone';
import BigNumber from 'bignumber.js';

const Accordion = withStyles({
  root: {
    backgroundColor: 'transparent',
    width: 560,
    zIndex: 0,
    boxShadow: 'none',
    padding: 0,
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(138, 100, 247, 0.1)',
    borderRadius: 4,
    padding: '0',
    cursor: `url(${CursorPointer}), pointer !important`,
    '&$expanded': {
      minHeight: 80,
      height: 80,
    },
  },
  expandIcon: {
    marginRight: 40,
    padding: 0,
    marginLeft: 24,
    cursor: `url(${CursorPointer}), pointer !important`,
  },
  content: {
    margin: 0,
    height: 80,
    minHeight: 80,
    position: 'relative',
    '&$expanded': {
      margin: 0,
      minHeight: 80,
      height: 80,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: `url(${CursorPointer}), pointer !important`,
    padding: 0,
  },
})(MuiAccordionDetails);

const useStyles = makeStyles({
  root: {
    width: 560,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 80,
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
  rewardItem: {
    marginTop: 8,
    width: 528,
    height: 56,
    position: 'relative',
    backgroundColor: 'rgba(138, 100, 247, 0.1)',
    borderRadius: 4,
  },
  largeName: {
    position: 'absolute',
    left: 104,
    top: 27,
    fontSize: 18,
    fontWeight: 700,
    color: "#FFD271",
  },
  largePercentage: {
    position: 'absolute',
    right: 0,
    top: 27,
    fontSize: 18,
    fontWeight: 700,
    color: "#FFD271",
  },
  smallName: {
    position: 'absolute',
    left: 88,
    top: 18,
    fontSize: 14,
    fontWeight: 700,
    color: "#FFD271",
  },
  smallPercentage: {
    position: 'absolute',
    right: 64,
    top: 18,
    fontSize: 14,
    fontWeight: 700,
    color: "#FFD271",
  },
});

export interface RewardListProps {
  rewards: StrategyApy[];
  mainIndex: number;
  vault?: Vault;
  onClick: (...args: any) => void;
}

function RewardList({ rewards, mainIndex, vault, onClick }: RewardListProps) {
  const classes = useStyles();
  const farms = useRecoilValue(farmInfos);
  const mod = mainIndex % rewards.length;
  const index = mod < 0 ? mod + 12 : mod;

  let farmApr = vault?.farmApr
  let lpFee = vault?.farmFee;

  if (!farmApr || !lpFee) {
    const f = Object.values(farms).find(f => f.lp.symbol === vault?.depositToken.symbol);
    farmApr = f?.apr;
    lpFee = f?.fees;
  }
  return (
    <>
      {rewards.length === 0 ?
        null :
        <div className={classes.root}>
          <div className={classes.header}>Estimated return for each token Vault</div>
          <div className={classes.divider} />
          <Accordion style={{ marginBottom: 72, marginTop: 0, }}>
            <AccordionSummary expandIcon={<CaretDown style={{ cursor: `url(${CursorPointer}), pointer !important` }} />} >
              <Stone
                tokenName={rewards[index].token as TokenName}
                size="normal"
                style={{
                  marginLeft: REWARD_LP_TOKENS.includes(rewards[index].token as TokenName) ? 24 : 40,
                  marginTop: 18,
                }}
              />
              <div className={classes.largeName}>{rewards[index].token}</div>
              <div className={classes.largePercentage}>{
                farmApr && lpFee ?
                  `${BigNumber.sum(calculateApyInPercentage(farmApr, rewards[index].apy), lpFee).toFixed(2)} %` :
                  ''}</div>
            </AccordionSummary>
            <AccordionDetails>
              {
                rewards.map((r, idx) => {
                  if (r.token === rewards[index].token) return null;
                  return (
                    <div key={`reward-${idx}`} className={classes.rewardItem} onClick={() => onClick(idx)}>
                      <Stone
                        tokenName={r.token as TokenName}
                        size="small"
                        style={{
                          marginLeft: REWARD_LP_TOKENS.includes(rewards[index].token as TokenName) ? 27 : 32,
                          marginTop: 16,
                          width: 34,
                        }}
                      />
                      <div className={classes.smallName}>{r.token}</div>
                      <div className={classes.smallPercentage}>{
                        farmApr && lpFee ?
                          `${BigNumber.sum(calculateApyInPercentage(farmApr, r.apy), lpFee).toFixed(2)} %` :
                          ""}</div>
                    </div>
                  )
                })
              }
            </AccordionDetails>
          </Accordion>
        </div>
      }
    </>
  )
}

export default RewardList;
