import { useRecoilValue } from "recoil";
import { rewardPrices } from "recoil/atoms";

import Countup from 'react-countup';
import PageTemplate from "components/PageTemplate";
import { makeStyles } from "@material-ui/core";
import { STONES } from "utils/stones";
import InfoContainer from "components/Staking/InfoContainer";

const useStyles = makeStyles({
  stone: {
    marginTop: 40,
    width: 48,
    height: 48,
    position: 'relative',
  },
  header: {
    fontFamily: 'Sen',
    fontSize: 12,
    color: '#CBA344',
  },
  valueText: {
    fontWeight: 700,
    color: '#FFD271',
  },
  container: {
    marginTop: 64,
    display: 'flex',
    alignItems: 'center',
  },
})

function Staking() {
  const classes = useStyles();
  const prices = useRecoilValue(rewardPrices);
  const totalStakedInM = 1.34;

  return (
    <PageTemplate title={"STAKING"}>
      <div className={classes.stone}>
        <img
          src={STONES.LET}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(0.16)',
          }}
        />
      </div>
      <div className={classes.header} style={{ marginTop: 24, }}>$LET Price</div>
      <div className={classes.valueText} style={{ marginTop: 4, fontSize: 24 }}>
        <Countup
          start={0}
          end={prices['LET']}
          delay={0}
          duration={0.75}
          separator=","
          decimals={3}
          decimal="."
          suffix=" UST"
        />
      </div>
      <div className={classes.header} style={{ marginTop: 8, }}>Total Staked</div>
      <div className={classes.valueText} style={{ marginTop: 4, fontSize: 24 }}>
        <Countup
          start={0}
          end={totalStakedInM}
          delay={0}
          duration={0.75}
          separator=","
          decimals={3}
          decimal="."
          suffix="M LET"
        />
      </div>
      <div className={classes.container}>
        <InfoContainer 
          aprValue={95.43} 
          totalStaked={103}
          balance={120.124}
          staked={128.23}
        />
        <InfoContainer 
          isStaking
          aprValue={50} 
          aprMaxValue={95.39} 
          totalStaked={123}
          balance={20.124}
          staked={128.23}
        />
      </div>
    </PageTemplate>
  );
}

export default Staking;
