import { useState } from "react";
import CursorPointer from 'assets/CursorPointer.svg';
import { makeStyles } from "@material-ui/core"

import dot from "../../assets/svgs/Dot.svg";
import SmallButton from "components/Buttons/SmallButton";
import SmallPrimaryButton from "components/Buttons/SmallPrimaryButton";
import { TokenName } from "types";
import { STONES } from "utils/stones";

const useStyles = makeStyles({
    activeFlag: {
        backgroundRepeat: "no-repeat",
        height: 726,
        width: 420,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    inactiveFlag: {
        height: 274,
        width: 176,
        backgroundRepeat: "no-repeat",
    },
    soul: {
        width: 187.28,
        height: 161.71,
    },
    tokenName: {
        fontFamily: "Spectral SC",
        marginTop: "-12px",
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
    topDivider0: { // TODO: reuse
        marginTop: 32,
        width: 266,
        borderTop: "0",
        borderBottom: "1px solid",
        borderStyle: 'solid',
        borderImage: 'linear-gradient(45deg, rgba(143, 103, 255, 0), #8F67FF 50%, rgba(143, 103, 255, 0) 100%)',
        borderImageSlice: 1,
        borderImageWidth: '0 0 1px 0',
        display: "flex",
    },
    topDivider1: {
        marginTop: 4,
        width: 152,
        borderTop: "0",
        borderBottom: "1px solid",
        borderStyle: 'solid',
        borderImage: 'linear-gradient(45deg, rgba(0, 201, 177, 0), #00C9B1 50%, rgba(0, 201, 177, 0) 100%)',
        borderImageSlice: 1,
        borderImageWidth: '0 0 1px 0',
        display: "flex",
    },
    buttonContainer: {
        display: "flex",
        fontFamily: "Spectral SC",
        fontStyle: "bold",
        fontSize: 14,
        lineHeight: "21px",
        gap: 16,
        marginTop: 32,
    },
    buttonWrapper: {
        height: 27,
        display: "flex",
        flexDirection: "column",
        cursor: `url(${CursorPointer}), pointer`,
    },
    activeButton: {
        color: "#00C9B1",
    },
    inactiveButton: {
        marginTop: "auto",
        color: "#007664",
    },
    inputContainer: {
        marginTop: 24,
        width: 266,
        height: 54,
        background: "radial-gradient(78.76% 933.51% at 50% 100%, rgba(136, 98, 241, 0.11) 0%, rgba(138, 100, 247, 0) 79.55%)",
        display: "flex",
        alignItems: "center",
    },
    input: {
        margin: "0 8px",
        background: "none",
        border: "none",
        "&:focus":{
            outline: "none"
        },
        color: "#997614",
        fontFamily: "Spectral SC",
        fontWeight: "bold",
        minWidth: 0, // to hanlde overflow
        "&::placeholder": {
            color: "inherit",
            fontSize: "inherit"
        }
    },
    maxButton: {
        width: 52,
        height: 24,
        color: "#00C9B1",
        fontSize: 14,
        lineHeight: "21px",
        margin: "0 8px 0 0",
    },
    labelContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "266px",
        marginTop: 8,
    },
    textLabel: {
        fontFamily: "Sen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        lineHeight: "14px",
        color: "#CBA344"
    },
    confirmBtn: {
        marginTop: 31
    }
});

interface ActiveFlagProps {
    tokenName: TokenName;
    onClick: (...args: any) => void;
}

function ConfirmFlag({ tokenName, onClick }: ActiveFlagProps) {
    const classes = useStyles();

    const flagBg = STONES[tokenName].smallFlag;
    const stone = STONES[tokenName].xxlarge;

    return (
        <div className={classes.activeFlag} style={{backgroundImage: `url(${flagBg})`}}>
            <img className={classes.soul} src={stone} />
            <div className={classes.tokenName}>BTC</div>
            <div className={classes.inputContainer}>
                <input className={classes.input} placeholder="0.000" />
                <div className={classes.maxButton}>MAX</div>
            </div>
            <div className={classes.labelContainer}>
                <span className={classes.textLabel}>{`Deposit: ${(0.000).toFixed(3)}`}</span>
                <span className={classes.textLabel}>{`Balance: ${(0.000).toFixed(3)}`}</span>
            </div>
            <div className={classes.confirmBtn} onClick={onClick}>
                <SmallPrimaryButton>Approve</SmallPrimaryButton>
            </div>
        </div>

    );
}

function NormalFlag({ tokenName, onClick }: ActiveFlagProps) {
    const classes = useStyles();
    const [ isDeposit, setIsDeposit ] = useState(true);

    const flagBg = STONES[tokenName].largeFlag;
    const stone = STONES[tokenName].xxlarge;

    return (
        <div className={classes.activeFlag} style={{backgroundImage: `url(${flagBg})`}}>
            <img className={classes.soul} src={stone} />
            <div className={classes.tokenName}>{tokenName}</div>
            <div className={classes.reward}>{ `${3.39} ($${0.39})` }</div>
            <div className={classes.claimButton}>
                <SmallButton text="CLAIM" />
            </div>
            <div className={classes.topDivider0} />
            <div className={classes.topDivider1} />
            <div className={classes.buttonContainer}>
                <div className={classes.buttonWrapper} onClick={() => setIsDeposit(true)}>
                    {isDeposit ? <img src={dot} /> : undefined }
                    <div className={isDeposit ? classes.activeButton : classes.inactiveButton}>DEPOSIT</div>
                </div>
                <div className={classes.buttonWrapper} onClick={() => setIsDeposit(false)}>
                    {!isDeposit ? <img src={dot} /> : undefined }
                    <div className={!isDeposit ? classes.activeButton : classes.inactiveButton}>WIDTHDRAW</div>
                </div>
            </div>
            <div className={classes.inputContainer}>
                <input className={classes.input} placeholder="0.000" />
                <div className={classes.maxButton}>MAX</div>
            </div>
            <div className={classes.labelContainer}>
                <span className={classes.textLabel}>{`Deposit: ${(0.000).toFixed(3)}`}</span>
                <span className={classes.textLabel}>{`Balance: ${(0.000).toFixed(3)}`}</span>
            </div>
            <div className={classes.confirmBtn} onClick={onClick}>
                <SmallPrimaryButton>Deposit</SmallPrimaryButton>
            </div>
        </div>
    );
}

interface FlagProps {
    tokenName: TokenName;
    active?: boolean;
}

function ActiveFlag({ tokenName }: FlagProps) {
    const [needApprove, setNeedApprove] = useState(false);
    return needApprove
        ? <ConfirmFlag tokenName={tokenName} onClick={() => setNeedApprove(false)} />
        :  <NormalFlag tokenName={tokenName} onClick={() => setNeedApprove(true)} />;
}

function InActiveFlag({ tokenName }: FlagProps) {
    const classes = useStyles();
    const flagBg = STONES[tokenName].mini1Flag;
    return  <div className={classes.inactiveFlag} style={{backgroundImage: `url(${flagBg})`}} />;
}

export default function Flag({ tokenName, active }: FlagProps) {
    return (
        active
        ? <ActiveFlag tokenName={tokenName} />
        : <InActiveFlag tokenName={tokenName} />
    )
}