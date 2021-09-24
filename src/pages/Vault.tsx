import { Grid, makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import UserVaultsSummary from "components/Vaults/UserVaultsSummary";
import UserVaultItem from "components/Vaults/UserVaultItem";
import VaultItem from "components/Vaults/VaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import IconHelp from 'assets/svgs/IconHelp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';
import { USER_STATES, VAULTS } from "utils/vaults";

const useStyles = makeStyles({
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
  const userVaultIds = USER_STATES.map(userStat => userStat.vaultId);
  const userVaults = VAULTS.filter(vault => userVaultIds.includes(vault.id));
  const otherVaults = VAULTS.filter(vault => !userVaultIds.includes(vault.id));

  return (
    <PageTemplate
      title={"VAULT"}
    // subtitle={"Wherever you farm, collect what you want!"}
    >
      <UserVaultsSummary userVaults={userVaults} userStates={USER_STATES} />
      <div className={classes.contentContainer}>
        {
          userVaults.length !== 0 ?
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
                userVaults.map((vault, idx) => (
                  <>
                    <UserVaultItem
                      vault={vault}
                      userState={USER_STATES.find(state => state.vaultId === vault.id)} />
                    {
                      idx !== userVaults.length - 1 ?
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
          otherVaults.map((vault, idx) => (
            <>
              <VaultItem
                vault={vault}
              />
              {
                idx !== otherVaults.length - 1 ?
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
