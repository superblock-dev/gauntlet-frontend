import { makeStyles } from "@material-ui/styles"
import { TokenName } from "types";
import Stone from "./Stone";

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    stone: {
        width: 124.85,
        height: 128,
        backgroundRepeat: "no-repeat"
    }
})

interface StoneDisplayProps {
    items: { tokenName: TokenName, active: boolean }[]
}

export default function StoneDisplay({ items }: StoneDisplayProps) {
    const classes  = useStyles();

    return (
        <div className={classes.container}>
            { items.map((item => <Stone tokenName={item.tokenName} active={item.active} /> ))}
        </div>
    )
    
}