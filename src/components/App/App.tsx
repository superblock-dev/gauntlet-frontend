import { useRecoilValue } from "recoil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route as RouteType } from 'types';
import { popupState } from "recoil/atoms";
import Header from 'components/Header';
import Popup from 'components/Popup';
import Zap from "pages/Zap";
import Vault from "pages/Vault";

const routeList: RouteType[] = [
  { label: "ZAP", path: "/" },
  { label: "VAULT", path: "/vault" },
  { label: "SWAP", path: "/swap" },
]

function App() {
  const popup = useRecoilValue(popupState);

  return (
    <Router>
      <Header routeList={routeList}/>
      <Switch>
        <Route path={"/vault"} component={() => <Vault />} />
        <Route path={"/swap"} component={() => <></>} />
        <Route path={"/"} component={() => <Zap />} />
      </Switch>
      {popup ? <Popup>{popup}</Popup> : undefined}
    </Router>
  );
}

export default App;
