import { useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { conn, liquidityPoolInfos, pairsInfo, popupState, rewardPrices, tokenInfos } from "recoil/atoms";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { SnackbarProvider } from 'notistack';
import { Route as RouteType } from 'types';
import { getPrices } from "api/prices";
import { TIMEOUT_DEFAULT } from "utils/constants";

import { makeStyles } from "@material-ui/core";
import Header from 'components/Header';
import Popup from 'components/Popup';
import Swap from "pages/Swap";
import Vault from "pages/Vault";
import Snackbar from "components/Snackbar";
import VaultDetail from "pages/VaultDetail";
import { getPairs, requestLiquidityInfo } from "api/pools";
import { loadTokenInfo } from "utils/tokens";
import { calculateLpValues } from "utils/pools";
import ScrollToTop from "./ScrollToTop";
import { requestFarmInfo } from "api/farms";

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
  { label: "SWAP", path: "/swap" },
  { label: "VAULT", path: "/vault" },
  // { label: "SWAP", path: "/swap" },
]

function App() {
  const popup = useRecoilValue(popupState);
  const [connState, setWeb3Connection] = useRecoilState(conn);
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
  }, []);

  const setPrices = useSetRecoilState(rewardPrices);
  const setPairsInfo = useSetRecoilState(pairsInfo);
  const setTokenInfo = useSetRecoilState(tokenInfos);
  const setLiquidityInfo = useSetRecoilState(liquidityPoolInfos);

  const updateInfos = async () => {
    const priceData = await getPrices();
    setPrices(priceData);
    const pairsData = await getPairs();
    setPairsInfo(pairsData);
    if (connState) {
      const liquidityPools = await requestLiquidityInfo(connState);
      calculateLpValues(liquidityPools, priceData);
      setLiquidityInfo(liquidityPools);
    }
    if (connState) {
      const farmInfos = await requestFarmInfo(connState);
      console.log(farmInfos)
    }
  }

  useEffect(() => {
    (async () => {
      const tokenInfoData = await loadTokenInfo();
      setTokenInfo(tokenInfoData);
    })();
  }, []);

  useEffect(() => {
    updateInfos();
  }, [connState]);

  useEffect(() => {
    const timer = setInterval(async () => {
      await updateInfos();
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
            <ScrollToTop />
            <Header routeList={routeList} />
            <Switch>
              <Route exact path={"/vault"} component={() => <Vault />} />
              <Route path={"/vault/:vaultId"} component={() => <VaultDetail />} />
              <Route path={"/swap"} component={() => <Swap />} />
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
