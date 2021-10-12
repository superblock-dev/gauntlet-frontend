import { useRecoilValue } from "recoil";
import { userInfo, vaultInfos } from "recoil/atoms";
import { Grid, makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import VaultItem from "components/Vaults/VaultItem";
import IconArrowUp from 'assets/svgs/IconArrowUp.svg';
import LineOnlyPurple from 'assets/svgs/LineOnlyPurple.svg';
import UserVaultsContainer from "components/Vaults/UserVaultsContainer";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const vaults = useRecoilValue(vaultInfos);
  const userInfoState = useRecoilValue(userInfo);
  const userVaultIds = userInfoState.states.map(userStat => userStat.vaultId);
  const { connected } = useWallet();
  const userVaults = connected ? vaults.filter(vault => userVaultIds.includes(vault.id)) : [];
  const otherVaults = connected ? vaults.filter(vault => !userVaultIds.includes(vault.id)) : vaults;

  return (
    <PageTemplate
      title={"VAULT"}
    // subtitle={"Wherever you farm, collect what you want!"}
    >
      <div className={classes.contentContainer}>
        {
          connected ?
          <UserVaultsContainer vaults={userVaults} states={userInfoState.states} /> :
          <></>
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
              Max. APR
            </div>
          </Grid>
          <Grid item xs={2} className={classes.headerItem}></Grid>
        </Grid>
        {
          otherVaults.map((vault, idx) => (
            <div key={`vault-${idx}`}>
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
            </div>
          ))
        }
      </div>
    </PageTemplate>
  )
};

export default Vault;
