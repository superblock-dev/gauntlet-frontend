import { forwardRef, useCallback, useState } from "react";
import { useSnackbar, SnackbarContent } from "notistack";

import { makeStyles } from "@material-ui/core";
import BGErrorSnackbar from 'assets/svgs/BGErrorSnackbar.svg';
import BGSuccessSnackbar from 'assets/svgs/BGSuccessSnackbar.svg';
import IconExit from 'assets/svgs/IconExit.svg';
import IconErrorTriangle from 'assets/svgs/IconErrorTriangle.svg';
import IconSuccessTriangle from 'assets/svgs/IconSuccessTriangle.svg';
import IconError from 'assets/svgs/IconError.svg';
import IconSuccess from 'assets/svgs/IconSuccess.svg';

interface SnackbarProp {
  message: string | React.ReactNode,
}

const useStyles = makeStyles({
  root: {
    width: 316,
    minHeight: 84,
    position: 'relative',
  },
  exitBtn: {
    position: 'absolute',
    top: 24,
    right: 16,
    width: 12,
    height: 12,
    backgroundImage: `url(${IconExit})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  icon: {
    width: 14,
    height: 14,
  },
  errorContainer: {
    width: 312,
    borderLeft: '4px solid',
    borderLeftColor: 'rgba(236, 84, 84, 1)',
  },
  successContainer: {
    width: 312,
    borderLeft: '4px solid',
    borderLeftColor: 'rgba(0, 201, 177, 1)',
  },
  errorBackground: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${BGErrorSnackbar}), linear-gradient(97.54deg, rgba(236, 84, 84, 0.11) 16.26%, rgba(236, 84, 84, 0) 74.41%)`,
    backgroundRepeat: 'no-repeat',
  },
  successBackground: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${BGSuccessSnackbar}), linear-gradient(97.54deg, rgba(0, 201, 177, 0.11) 16.26%, rgba(0, 201, 177, 0) 74.41%)`,
    backgroundRepeat: 'no-repeat',
  },
  header: {
    width: '100%',
    height: 27,
    paddingTop: 16,
    display: 'flex',
    alignItems: 'center',
  },
  errorTriangle: {
    width: 4,
    height: 8,
    backgroundImage: `url(${IconErrorTriangle})`,
    backgroundRepeat: 'no-repeat',
  },
  errorIcon: {
    marginLeft: 9,
    marginRight: 9,
    width: 14,
    height: 14,
    backgroundImage: `url(${IconError})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  errorHeaderText: {
    fontWeight: 700,
    fontSize: 18,
    color: '#EC5454',
  },
  successTriangle: {
    width: 4,
    height: 8,
    backgroundImage: `url(${IconSuccessTriangle})`,
    backgroundRepeat: 'no-repeat',
  },
  successIcon: {
    marginLeft: 9,
    marginRight: 9,
    width: 14,
    height: 14,
    backgroundImage: `url(${IconSuccess})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  successHeaderText: {
    fontWeight: 700,
    fontSize: 18,
    color: '#00C9B1',
  },
  snackbarMsg: {
    fontFamily: 'Sen',
    color: '#FFD271',
    fontSize: 14,
    lineHeight: '17px',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 20,
    minHeight: 17,
    width: 280,
  }
})

export function SuccessSnackbar({ message }: SnackbarProp) {
  const classes = useStyles();

  return (
    <div className={classes.successContainer}>
      <div className={classes.successBackground}>
        <div className={classes.header}>
          <div className={classes.successTriangle} />
          <div className={classes.successIcon} />
          <div className={classes.successHeaderText}>Success!</div>
        </div>
        <div className={classes.snackbarMsg}>{message}</div>
      </div>
    </div>
  )
}

export function ErrorSnackbar({ message }: SnackbarProp) {
  const classes = useStyles();

  return (
    <div className={classes.errorContainer}>
      <div className={classes.errorBackground}>
        <div className={classes.header}>
          <div className={classes.errorTriangle} />
          <div className={classes.errorIcon} />
          <div className={classes.errorHeaderText}>Error!</div>
        </div>
        <div className={classes.snackbarMsg}>{message}</div>
      </div>
    </div>
  )
}


const Snackbar = forwardRef<HTMLDivElement, { id: string | number, message: string | React.ReactNode }>((props, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [exitVisible, setExitVisible] = useState(false);

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent
      ref={ref}
      className={classes.root}
      onMouseEnter={() => setExitVisible(true)}
      onMouseLeave={() => setExitVisible(false)}
    >
      {
        props.message
      }
      {
        exitVisible ?
          <div className={classes.exitBtn} onClick={handleDismiss}>
          </div> :
          null
      }

    </SnackbarContent>
  );
});

export default Snackbar;
