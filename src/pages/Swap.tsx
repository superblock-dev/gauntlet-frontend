import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import OutlineZap from 'assets/svgs/OutlineZap.svg';

const useStyles = makeStyles({
  zapContainer: {
    width: 656,
    height: 542,
    padding: 24,
    backgroundImage: `url(${OutlineZap})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: 247,
  },
});

function Swap() {
  const classes = useStyles();
  const [] = useState();

  return (
    <PageTemplate title={"ZAP"}>
      <div className={classes.zapContainer}>

      </div>
    </PageTemplate>
  )
};

export default Swap;
