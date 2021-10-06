import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import PageTemplate from "components/PageTemplate";
import BgSwapItemEnabled from 'assets/svgs/BGSwapItemEnabled.svg';
import BgSwapItemHovered from 'assets/svgs/BGSwapItemHovered.svg';
import RaydiumLogo from 'assets/logos/Raydium.svg';

const useStyles = makeStyles({
  container: {
    marginTop: 42,
    width: 420,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
  activeItem: {
    width: 420,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${BgSwapItemEnabled})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
      backgroundImage: `url(${BgSwapItemHovered})`,
    }
  },
  inactiveItem: {
    width: 420,
    height: 100,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "& span": {
      fontSize: 16,
      fontWeight: 700,
      color: '#8A63F4',
    },
    "&::before": {
      content: `url(${BgSwapItemEnabled})`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.3,
    }
  }
});

function Swap() {
  const classes = useStyles();

  return (
    <PageTemplate title={"SWAP"}>
      <div className={classes.container}>
        <Link to="https://raydium.io/swap/" className={classes.activeItem}>
          <img src={RaydiumLogo} />
        </Link>
        <div className={classes.inactiveItem}>
          <span>upcoming..</span>
        </div>
        <div className={classes.inactiveItem} style={{ opacity: 0.66, }}></div>
        <div className={classes.inactiveItem} style={{ opacity: 0.33, }}></div>
      </div>

    </PageTemplate>
  )
};

export default Swap;
