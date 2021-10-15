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
];

const useStyles = makeStyles({
  container: {
    width: (112 * 6),
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
    <div className={`${classes.container}`}>
      {[...tokens].map(((item, idx) => {
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