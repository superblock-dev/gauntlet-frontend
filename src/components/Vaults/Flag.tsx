import { makeStyles } from "@material-ui/core"

import activeFlag from "../../assets/svgs/StoneFlagActive-large.svg";
import inactiveFlag from "../../assets/test/mini-1.png";

const useStyles = makeStyles({
    active: {
        backgroundImage: `url(${activeFlag})`,
        height: 726,
        width: 420,
    },
    inactive: {
        backgroundImage: `url(${inactiveFlag})`,
        height: 274,
        width: 169
    },
});

interface FlagProps {
    active?: boolean
}

export default function Flag({ active }: FlagProps) {
    const classes = useStyles();

    return (
        <div className={active ? classes.active : classes.inactive }>

        </div>
    )
}