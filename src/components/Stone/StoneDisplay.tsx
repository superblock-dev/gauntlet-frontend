import { makeStyles } from "@material-ui/styles";
import { Reward } from "recoil/atoms";
import { TokenName } from "types";
import { getIndexFromSymbol } from "utils/constants";
import Stone from "./StoneDisplayItem";

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
  "LET-USDC",
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
  "LET-USDC",
];

const useStyles = makeStyles({
  container: {
    width: (112 * 7 + 152 * 5) * 2 * 2,
    height: 160,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})

interface StoneDisplayProps {
  items: Reward[],
  onClick: any,
}


export default function StoneDisplay({ items, onClick }: StoneDisplayProps) {
  const classes = useStyles();
  const symbols = items.map(i => i.symbol);

  return (
    <div className={`${classes.container} stone`}>
      {[...tokens, ...tokens].map(((item, idx) => {
        return (
          <Stone
            key={`stone-${idx}`}
            tokenName={item}
            amount={
              symbols.includes(item) ?
                items[getIndexFromSymbol(item)].amount :
                undefined}
            onClick={() => onClick(idx)} />
        )
      }
      ))}
    </div>
  )

}