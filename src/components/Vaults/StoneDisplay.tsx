import { BigNumber } from 'bignumber.js';
import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import Stone from "./Stone";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
})

interface StoneDisplayProps {
  items: {[key: string]: BigNumber},
}

export default function StoneDisplay({ items }: StoneDisplayProps) {
  const classes = useStyles();
  const tokens: TokenName[] = ["BTC", "ETH", "SOL", "USDC", "USDT", "LET"]

  return (
    <div className={classes.container}>
      {tokens.map((item => <Stone tokenName={item} amount={item in items ? items[item].toNumber() : 0} />))}
    </div>
  )

}