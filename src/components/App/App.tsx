import { useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { SnackbarProvider } from 'notistack';
import { Route as RouteType } from 'types';
import { conn, popupState, rewardPrices } from "recoil/atoms";
import { getPrices } from "api/prices";
import { TIMEOUT_DEFAULT } from "utils/constants";

import { makeStyles } from "@material-ui/core";
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
  },
  "@global": {
    input: {
      fontSize: 16,
    }
  }
})

const routeList: RouteType[] = [
  // { label: "ZAP", path: "/zap" },
  { label: "VAULT", path: "/vault" },
  // { label: "SWAP", path: "/swap" },
]

function App() {
  const popup = useRecoilValue(popupState);

  const setWeb3Connection = useSetRecoilState(conn);
  const classes = useStyles();
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    getPhantomWallet(),
  ], [network]);

  useEffect(() => {
    const connection = new Connection(
      clusterApiUrl('mainnet-beta'),
      'confirmed',
    );
    setWeb3Connection(connection);
  })

  const setPrices = useSetRecoilState(rewardPrices);

  const updatePriceInfo = async () => {
    const priceData = await getPrices();
    setPrices(priceData);
  }

  useEffect(() => {
    updatePriceInfo();
  }, []);

  useEffect(() => {
    const timer = setInterval(async () => {
      await updatePriceInfo();
    }, TIMEOUT_DEFAULT);

    return () => clearTimeout(timer);
  });


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
              {/* <Route path={"/swap"} component={() => <></>} /> */}
              {/* <Route path={"/zap"} component={() => <Zap />} /> */}
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
