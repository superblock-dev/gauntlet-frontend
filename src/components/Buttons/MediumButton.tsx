import { makeStyles } from "@material-ui/core";
import WalletBtnEnabled from 'assets/svgs/WalletBtnEnabled.svg';
import WalletBtnHovered from 'assets/svgs/WalletBtnHovered.svg';
import WalletBtnPressed from 'assets/svgs/WalletBtnPressed.svg';
import WalletBtnSelected from 'assets/svgs/WalletBtnSelected.svg';
import CursorPointer from 'assets/CursorPointer.svg';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 140,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${WalletBtnEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      backgroundImage: `url(${WalletBtnHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${WalletBtnPressed})`,
    },
    '&:focus': {
      backgroundImage: `url(${WalletBtnSelected})`,
    },
    cursor: `url(${CursorPointer}), pointer`,
  },
  text: {
    fontFamily: 'Spectral SC',
    fontSize: 12,
    fontWeight: 700,
    backgroundColor: 'transparent',
    marginTop: 4,
    color: 'rgba(255, 210, 113, 1)',
    lineHeight: '18px',
    userSelect: 'none',
  }
})

export interface BasicBtnProps {
  text?: string,
  link?: string,
  external?: boolean,
}

function MediumButton({ text, link, external }: BasicBtnProps) {
  const classes = useStyles();
  if (external) {
    return (
      <Link to={{
        pathname: link,
      }} target="_blank" className={classes.root}>
        <div className={classes.text}>
          {text}
        </div>
      </Link>
    )
  }

  return (
    <Link to={link ? link : "/"} className={classes.root}>
      <div className={classes.text}>
        {text}
      </div>
    </Link>
  )
}

export default MediumButton;
