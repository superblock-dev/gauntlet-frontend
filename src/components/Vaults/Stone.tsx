import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";

import { STONES } from "utils/stones";

const useStyles = makeStyles({
        container: {
            position: "relative",
            width: 124.85,
            height: 107.45,
        },
        stoneBg: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.0,
            zIndex: 100,
            '&:hover': {
                opacity: 1.0
            },
        },
        stone: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        },
});

interface StoneProps {
    tokenName: TokenName;
    active?: boolean
}

export default function Stone({ tokenName, active }: StoneProps) {
    const classes = useStyles();

    return (
        <>
            {active ? (
                <div className={classes.container}>
                    <img className={classes.stoneBg} src={STONES[tokenName].xlargeBgEffect} />
                    <img className={classes.stone} src={STONES[tokenName].xlarge} />
                </div>
            ): (
                <div className={classes.container}>
                    <img className={classes.stone} src={STONES[tokenName].xlargeOutline} />
                    <img className={classes.stone} src={STONES[tokenName].xlargeDeactivated} />
                </div>
            )}
        </>
    );
}
