import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { SnackbarProvider } from 'notistack';
import { Route as RouteType } from 'types';
import { popupState } from "recoil/atoms";

import Header from 'components/Header';
import Popup from 'components/Popup';
import Zap from "pages/Zap";
import Vault from "pages/Vault";
import Snackbar from "components/Snackbar";
import VaultDetail from "pages/VaultDetail";

const useStyles = makeStyles({
  containerRoot: {
    top: 136,
    right: 80, 
  }
})

const routeList: RouteType[] = [
  { label: "ZAP", path: "/zap" },
  { label: "VAULT", path: "/vault" },
  { label: "SWAP", path: "/swap" },
]

function App() {
  const popup = useRecoilValue(popupState);
  const classes = useStyles();
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    getPhantomWallet(),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
    <SnackbarProvider 
      maxSnack={3} 
      autoHideDuration={2000}
      anchorOrigin={{
        horizontal: 'right', 
        vertical: 'top',
      }}
      classes={{
        containerRoot: classes.containerRoot,
      }}
      content={(key, msg) => <Snackbar id={key} message={msg} />}
    >
      <Router>
        <Header routeList={routeList} />
        <Switch>
          <Route exact path={"/vault"} component={() => <Vault />} />
          <Route path={"/vault/:vaultId"} component={() => <VaultDetail />} />
          <Route path={"/swap"} component={() => <></>} />
          <Route path={"/zap"} component={() => <Zap />} />
          <Route path={"/"} component={() => <></>} />
        </Switch>
        {popup ? <Popup>{popup}</Popup> : undefined}
      </Router>
    </SnackbarProvider>

</WalletProvider>
</ConnectionProvider>
  );
}

export default App;
