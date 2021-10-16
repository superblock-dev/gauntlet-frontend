import { makeStyles } from "@material-ui/styles";
import { Reward } from "recoil/atoms";
import { TokenName } from "types";
import Stone from "./StoneDisplayItem";

const tokens: TokenName[] = [
  "BTC",
  "ETH",
  "SOL",
  "USDC",
  "USDT",
];

const useStyles = makeStyles({
  container: {
    width: (112 * 5),
    height: 160,
    // overflow: 'hidden',
    overflow: 'visible',
    whiteSpace: 'nowrap',
  },
})

interface StoneDisplayProps {
  items: Reward[],
  onClick: any,
}


export default function StoneDisplay({ items, onClick }: StoneDisplayProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.container}`}>
      {[...tokens].map(((item, idx) => {
        const symbol = items.find(i => i.symbol === item)
        return (
          <Stone
            key={`stone-${idx}`}
            tokenName={item}
            amount={
              symbol && symbol.deposit !== 0 ?
                symbol.amount :
                undefined}
            onClick={() => onClick(idx)} />
        )
      }
      ))}
    </div>
  )

}