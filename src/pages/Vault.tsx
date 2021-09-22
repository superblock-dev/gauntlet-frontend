import { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { conn, rewardPrices } from "recoil/atoms";
import { getPrice, requestPriceInfo } from "api/prices";
import { FARMS } from 'utils/tokens';
import { TIMEOUT_DEFAULT } from "utils/constants";
import { LiquidityPoolInfo } from "utils/pools";

import { Grid, withStyles, makeStyles } from "@material-ui/core";
import MuiTooltip from '@material-ui/core/Tooltip';
import PageTemplate from "components/PageTemplate";
import UserVaultItem from "components/Vaults/UserVaultItem";
import VaultItem from "components/Vaults/VaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import IconHelp from 'assets/svgs/IconHelp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';
import OutlineVault from 'assets/svgs/OutlineVault.svg';
import TooltipVault from 'assets/svgs/TooltipVault.svg';
import { STONES } from "utils/stones";
import { TokenName } from "types";

const Tooltip = withStyles({

})(MuiTooltip);

const useStyles = makeStyles({
  vaultSummaryContainer: {
    width: 864,
    height: 192,
    marginTop: 64,
    padding: '48px 56px',
    backgroundImage: `url(${OutlineVault})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vaultSummaryLeft: {
    width: 338,
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryContent: {
    width: 123,
    display: 'flex',
    flexDirection: 'column',
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
  vaultSummaryRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  gauntletCopyText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 700,
    background: 'linear-gradient(101.46deg, #8963F3 1.69%, #00C9B1 103.87%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    marginBottom: 20,
  },
  stoneListContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  stoneItem: {
    width: 64,
    height: 80,
    position: 'relative',
    transition: 'transform .2s', /* Animation */
    '&:hover $stoneImg': {
      transform: 'translate(-50%, 50%) scale(1.66)',
    },
    '&:hover $tooltipBox': {
      display: 'block',
    },
    '&:hover $tooltipText': {
      display: 'block',
    }
  },
  stoneImg: {
    position: 'absolute',
    bottom: 0,
    left: 32,
    transform: 'translate(-50%, 50%)',
  },
  tooltipBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 64,
    height: 30,
    backgroundImage: `url(${TooltipVault})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'none',
  },
  tooltipText: {
    position: 'absolute',
    top: 3,
    left: 0,
    width: 64,
    textAlign: 'center',
    color: '#8F67FF',
    fontSize: 12,
    fontWeight: 700,
    display: 'none',
  },
  contentContainer: {
    width: 960,
    marginBottom: 229,
  },
  listTitle: {
    fontFamily: 'Sen',
    color: 'rgba(203, 163, 68, 1)',
    fontSize: 14,
    fontWeight: 400,
    marginTop: 64,
  },
  tableHeader: {
    height: 64,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    borderStyle: 'solid',
    borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
    borderImageSlice: 1,
    borderImageWidth: '0 0 1px 0',
  },
  headerItem: {
    fontFamily: 'Sen',
    color: 'rgba(203, 163, 68, 1)',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
  },
  headerIcon: {
    width: 14,
    height: 14,
    marginLeft: 6,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundImage: `url(${LineOnlyPurple})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
});

function Vault() {
  const classes = useStyles();
  const rewardTokenList = [
    'ETC',
    'USDT',
    'USDC',
    'SOL',
    'ETH',
    'BTC'
  ]
  const userFarms = FARMS.filter(farmInfo => farmInfo.userStaked != null);
  const otherFarms = FARMS.filter(farmInfo => farmInfo.userStaked == null);
  const web3 = useRecoilValue(conn);
  const [prices, setPrices] = useRecoilState(rewardPrices);

  const updatePriceInfo = async () => {
    if (web3) {
      const pools = await requestPriceInfo(web3) as { [key: string]: LiquidityPoolInfo };
      const newPrices = cloneDeep(prices);
      for (const value of Object.values(pools)) {
        newPrices[value.target] = {
          price: getPrice(value).toNumber(),
        }
      }
      setPrices(newPrices);
    }
  }

  useEffect(() => {
    updatePriceInfo();
  }, [web3]);

  useEffect(() => {
    const timer = setInterval(async () => {
      updatePriceInfo();
    }, TIMEOUT_DEFAULT);

    return () => clearTimeout(timer);
  });

  console.log(prices);

  return (
    <PageTemplate
      title={"VAULT"}
    // subtitle={"Wherever you farm, collect what you want!"}
    >
      <div className={classes.vaultSummaryContainer}>
        <div className={classes.vaultSummaryLeft}>
          <div style={{
            height: 192,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div className={classes.summaryContent}>
              <div className={classes.summaryHeader}>Total Deposits</div>
              <div className={classes.summaryBody}>39.45903</div>
              <div className={classes.summarySubBody}>$2.39</div>
            </div>
            <div className={classes.summaryContent}>
              <div className={classes.summaryHeader}>Average APY</div>
              <div className={classes.summaryBody}>95.39%</div>
              <div className={classes.summarySubBody}>Daily 3.49%</div>
            </div>
          </div>
          <div className={classes.summaryContent}>
            <div className={classes.summaryHeader}>User Rewards</div>
            <div className={classes.summaryBody}>$40.94</div>
          </div>
        </div>
        <div className={classes.vaultSummaryRight}>
          <div className={classes.gauntletCopyText}>{`wherever you farm,
collect what you want`}
          </div>
          <div className={classes.stoneListContainer}>
            {rewardTokenList.map((ticker) => (
              // <Tooltip title={ticker} placement="top">
                <div key={ticker} className={classes.stoneItem}>
                  <div className={classes.tooltipBox} />
                  <div className={classes.tooltipText}>{ticker}</div>
                  <img 
                    className={classes.stoneImg} 
                    src={STONES[ticker as TokenName].normal} />
                </div>
              // </Tooltip>
            ))}
          </div>
        </div>

      </div>
      <div className={classes.contentContainer}>
        {
          userFarms.length !== 0 ?
            <>
              <div className={classes.listTitle}>
                My Vaults
              </div>
              <Grid container className={classes.tableHeader}>
                <Grid item xs={3} className={classes.headerItem}>Vault</Grid>
                <Grid item xs={2} className={classes.headerItem}>
                  <div>
                    TVL
                  </div>
                  <img src={IconArrowUp} className={classes.headerIcon} />
                </Grid>
                <Grid item xs={2} className={classes.headerItem}>
                  <div>
                    APR
                  </div>
                  <img src={IconHelp} className={classes.headerIcon} />
                </Grid>
                <Grid item xs={3} className={classes.headerItem}>Your Stones</Grid>
                <Grid item xs={2} className={classes.headerItem}></Grid>
              </Grid>
              {
                userFarms.map((userFarm, idx) => (
                  <>
                    <UserVaultItem id={idx} name={userFarm.name} lp={userFarm.lp} userStaked={userFarm.userStaked} />
                    {
                      idx !== userFarms.length - 1 ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, }}>
                          <div className={classes.divider} />
                        </div> :
                        null
                    }
                  </>
                ))
              }
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <LineDivider />
              </div>
            </> :
            null
        }
        <div className={classes.listTitle}>
          All Vaults
        </div>
        <Grid container className={classes.tableHeader}>
          <Grid item xs={4} className={classes.headerItem}>Vault</Grid>
          <Grid item xs={3} className={classes.headerItem}>
            <div>
              TVL
            </div>
            <img src={IconArrowUp} className={classes.headerIcon} />
          </Grid>
          <Grid item xs={3} className={classes.headerItem}>
            <div>
              APR
            </div>
            <img src={IconHelp} className={classes.headerIcon} />
          </Grid>
          <Grid item xs={2} className={classes.headerItem}></Grid>
        </Grid>
        {
          otherFarms.map((farm, idx) => (
            <>
              <VaultItem id={idx} name={farm.name} lp={farm.lp} userStaked={undefined} />
              {
                idx !== otherFarms.length - 1 ?
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, }}>
                    <div className={classes.divider} />
                  </div> :
                  null
              }
            </>
          ))
        }
      </div>
    </PageTemplate>
  )
};

export default Vault;
