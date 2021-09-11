import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Route as RouteType } from 'types';
import Header from 'components/Header';

const routeList: RouteType[] = [
  { label: "ZAP", path: "/" },
  { label: "VAULT", path: "/vault" },
  { label: "SWAP", path: "/swap" },
]

function App() {
  return (
    <Router>
      <Header routeList={routeList}/>
      <Switch>
        <Route path={"/vault"} component={() => <></>} />
        <Route path={"/swap"} component={() => <></>} />
        <Route path={"/"} component={() => <></>} />
      </Switch>
    </Router>
  );
}

export default App;
