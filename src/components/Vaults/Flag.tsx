import { makeStyles } from "@material-ui/core"

import activeFlag from "../../assets/test/Large.png";
import inactiveFlag from "../../assets/test/mini-1.png";

const useStyles = makeStyles({
    flagContainer: {
        width: "100%",
        height: "100%",
    }
});

interface FlagProps {
    active?: boolean
}

export default function Flag({ active }: FlagProps) {
    return (
        <img src={active ? activeFlag : inactiveFlag} />
    )
}