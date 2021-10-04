import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";
import Stone from "./Stone";

const tokens: TokenName[] = [
  "BTC", 
  "ETH", 
  "SOL", 
  "USDC", 
  "USDT", 
  "RAY",
  "LET", 
  "RAY-ETH",
  "RAY-SOL",
  "RAY-USDC",
  "RAY-USDT",
  "BTC", 
  "ETH", 
  "SOL", 
  "USDC", 
  "USDT", 
  "RAY",
  "LET", 
  "RAY-ETH",
  "RAY-SOL",
  "RAY-USDC",
  "RAY-USDT",
];

const useStyles = makeStyles({
  container: {
    width: 120 * tokens.length * 2,
    height: 160,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})

interface StoneDisplayProps {
  items: { [key: string]: number },
  onClick: any,
}


export default function StoneDisplay({ items, onClick }: StoneDisplayProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.container} stone`}>
      {[...tokens, ...tokens].map(((item, idx) => {
        return (
          <Stone tokenName={item} amount={item in items ? items[item] : undefined} onClick={() => onClick(idx)} />
        )
      }
      ))}
    </div>
  )

}