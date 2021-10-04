import { ReactNode } from "react";
import { makeStyles } from "@material-ui/core";
import LargeFlag from "assets/svgs/flags/large.svg";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${LargeFlag})`,
    backgroundRepeat: "no-repeat",
    width: 420,
    height: 726,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }
})

interface FlagProps {
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

function FlagBaseNormal({ children }: FlagProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

export default FlagBaseNormal;