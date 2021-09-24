import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles, withStyles } from "@material-ui/core";
import { ReactComponent as CaretDown } from 'assets/svgs/CaretDown.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { LARGE_STONES, SMALL_STONES } from 'utils/stones';

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
  largeIcon: {
    position: 'absolute',
    left: 64,
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  smallIcon: {
    position: 'absolute',
    left: 48,
    top: '50%',
    transform: 'translate(-50%, -50%)',
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

export interface RewardAPR {
  token: string;
  value: number;
}

export interface RewardListProps {
  rewards: RewardAPR[];
  mainIndex: number;
}

function RewardList({ rewards, mainIndex }: RewardListProps) {
  const classes = useStyles();
  const index = mainIndex % 5;

  return (
    <>
      {rewards.length === 0 ?
        null :
        <div className={classes.root}>
          <div className={classes.header}>Estimated return for each token Vault</div>
          <div className={classes.divider} />
          <Accordion style={{ marginBottom: 72, marginTop: 0, }}>
            <AccordionSummary expandIcon={<CaretDown style={{ cursor: `url(${CursorPointer}), pointer !important` }} />} >
              <img className={classes.largeIcon} src={LARGE_STONES[rewards[index].token]} />
              <div className={classes.largeName}>{rewards[index].token}</div>
              <div className={classes.largePercentage}>{`${((rewards[index].value - 1) * 100).toFixed(3)} %`}</div>
            </AccordionSummary>
            <AccordionDetails>
              {
                rewards.map(r => {
                  if (r.token === rewards[index].token) return null;
                  return (
                    <div className={classes.rewardItem}>
                      <img className={classes.smallIcon} src={SMALL_STONES[r.token]} />
                      <div className={classes.smallName}>{r.token}</div>
                      <div className={classes.smallPercentage}>{`${((r.value - 1) * 100).toFixed(3)} %`}</div>
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
