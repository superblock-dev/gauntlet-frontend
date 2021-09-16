import { useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { SnackbarProvider } from 'notistack';
import { Route as RouteType } from 'types';
import { popupState } from "recoil/atoms";
import Header from 'components/Header';
import Popup from 'components/Popup';
import Zap from "pages/Zap";
import Vault from "pages/Vault";
import Snackbar from "components/Snackbar";

const useStyles = makeStyles({
  containerRoot: {
    top: 136,
    right: 80, 
  }
})

const routeList: RouteType[] = [
  { label: "ZAP", path: "/" },
  { label: "VAULT", path: "/vault" },
  { label: "SWAP", path: "/swap" },
]

function App() {
  const popup = useRecoilValue(popupState);
  const classes = useStyles();

  return (
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
          <Route path={"/vault"} component={() => <Vault />} />
          <Route path={"/swap"} component={() => <></>} />
          <Route path={"/"} component={() => <Zap />} />
        </Switch>
        {popup ? <Popup>{popup}</Popup> : undefined}
      </Router>
    </SnackbarProvider>
  );
}

export default App;
