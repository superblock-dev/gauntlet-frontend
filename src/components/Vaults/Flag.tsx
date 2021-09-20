import { makeStyles } from "@material-ui/core"

import activeFlag from "../../assets/svgs/StoneFlagActive-large.svg";
import inactiveFlag from "../../assets/test/mini-1.png";

import btcStone from "../../assets/svgs/stones/BTC-XX-Large.svg";
import SmallButton from "components/Buttons/SmallButton";
import { ReactComponent as LineDivider } from 'assets/svgs/LineDivider.svg';

const useStyles = makeStyles({
    active: {
        backgroundImage: `url(${activeFlag})`,
        height: 726,
        width: 420,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    inactive: {
        backgroundImage: `url(${inactiveFlag})`,
        height: 274,
        width: 169
    },
    soul: {
        width: 187.28,
        height: 161.71,
    },
    tokenName: {
        fontFamily: "Spectral SC",
        marginTop: "8px",
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: "37px",
        fontStyle: "normal",
        background: "linear-gradient(#FFD271, #825900)",
        color: "transparent",
        WebkitBackgroundClip: "text",
    },
    reward: {
        fontFamily: "Spectral SC",
        marginTop: "16px",
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: "37px",
        color: "#FFD271",
    },
    claimButton: {
        width: 104,
        height: 32,
        marginTop: 12,
    },
    topDivider0: {
        width: '100%',
    }
});

interface FlagProps {
    active?: boolean
}

export default function Flag({ active }: FlagProps) {
    const classes = useStyles();

    return (
        <div className={active ? classes.active : classes.inactive }>
            { active ? <>
                <img className={classes.soul} src={btcStone} />
                <div className={classes.tokenName}>BTC</div>
                <div className={classes.reward}>{ `${3.39} ($${0.39})` }</div>
                <div className={classes.claimButton}>
                    <SmallButton text="CLAIM" />
                </div>
                </> : undefined
            }
        </div>
    )
}