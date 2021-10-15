import { useEffect } from "react";
import { makeStyles } from "@material-ui/core"
import Stone from "components/Stone/Stone";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  stoneImg: {
    width: 120,
    height: 120,
    animation: '$bling 3s ease infinite',
  },
  ['@keyframes bling']: {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.5)',
    },
    '100%': {
      transform: 'scale(1)',
    }
  }
});

export default function LoadingPopup() {
  const classes = useStyles();

  //@ts-ignore
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => document.body.style.overflow = 'unset';
  });

  return (
    <div className={classes.root} style={{
      top: document.documentElement.scrollTop,
    }} >
      <div className={classes.stoneImg}>
        <Stone tokenName="LET" size="xxlarge" />
      </div>
    </div>
  )
}