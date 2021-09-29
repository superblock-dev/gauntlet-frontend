import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import Stone from "./Stone";

const tokens: TokenName[] = ["BTC", "ETH", "SOL", "USDC", "USDT", "LET"];

const useStyles = makeStyles({
  container: {
    width: 114 * tokens.length * 2,
    height: 160,
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
  },
})

interface StoneDisplayProps {
  items: { [key: string]: number },
}


export default function StoneDisplay({ items }: StoneDisplayProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.container} stone`}>
      {[...tokens, ...tokens].map((item => <Stone tokenName={item} amount={item in items ? items[item] : 0} />))}
    </div>
  )

}