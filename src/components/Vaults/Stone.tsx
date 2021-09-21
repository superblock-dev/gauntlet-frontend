import { makeStyles } from "@material-ui/styles";
import { TokenName } from "types";

import { STONES } from "utils/stones";

function makeStoneStyles(tokenName: TokenName) {
    return makeStyles({
        container: {
            position: "relative",
            width: 124.85,
            height: 130,
        },
        activatedStoneBg: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundRepeat: "no-repeat",
            '&:hover': {
                backgroundImage: `url(${STONES[tokenName].xlargeBgEffect})`,
            },
        },
        activatedStone: {
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${STONES[tokenName].xlarge})`,
        },
        deactivatedStone: {
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${STONES[tokenName].xlargeDeactivated})`,
        },
        stoneOutline: {
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${STONES[tokenName].xlargeOutline})`,
        },
    })();
}

interface StoneProps {
    tokenName: TokenName;
    active?: boolean
}

export default function Stone({ tokenName, active }: StoneProps) {
    const classes = makeStoneStyles(tokenName);

    return (
        <>
            {active ? (
                <div className={classes.container}>
                <div className={classes.activatedStoneBg}>
                    <div className={classes.activatedStone} />
                </div>
                </div>
            ): (
                <div className={classes.container}>
                    <div className={classes.stoneOutline} />
                    <div className={classes.deactivatedStone} />
                </div>
            )}
        </>
    );
}
