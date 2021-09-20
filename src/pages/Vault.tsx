import { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import UserVaultItem from "components/Vaults/UserVaultItem";
import VaultItem from "components/Vaults/VaultItem";
import Slider from "components/Slider";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import IconHelp from 'assets/svgs/IconHelp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';
import { FARMS } from 'utils/tokens';

const useStyles = makeStyles({
  sliderContainer: {
    width: 1440,
    height: 960,
  },
  contentContainer: {
    // width: '100%',
    // minWidth: 960,
    // maxWidth: 1280,
    width: 960,
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
    borderImage: 'linear-gradient(63.44deg, rgba(143, 103, 255, 0) 31.39%, #8F67FF 65.97%, rgba(143, 103, 255, 0) 100%)',
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
  const userFarms = FARMS.filter(farmInfo => farmInfo.userStaked != null);
  const otherFarms = FARMS.filter(farmInfo => farmInfo.userStaked == null);

  return (
    <PageTemplate
      title={"VAULT"}
    // subtitle={"Wherever you farm, collect what you want!"}
    >
      <div className={classes.sliderContainer}>
        <Slider />
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
                    <UserVaultItem name={userFarm.name} lp={userFarm.lp} userStaked={userFarm.userStaked} />
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
              <VaultItem name={farm.name} lp={farm.lp} userStaked={undefined} />
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
