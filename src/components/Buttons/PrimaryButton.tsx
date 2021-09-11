import { makeStyles } from '@material-ui/core/styles';
import { PrimaryBtnProp } from 'types';
import PrimaryBtnEnabled from 'assets/svgs/PrimaryBtnEnabled.svg';
import PrimaryBtnDisabled from 'assets/svgs/PrimaryBtnDisabled.svg';
import PrimaryBtnHovered from 'assets/svgs/PrimaryBtnHovered.svg';
import PrimaryBtnPressed from 'assets/svgs/PrimaryBtnPressed.svg';
import PrimaryBtnSelected from 'assets/svgs/PrimaryBtnSelected.svg';

const useStyles = makeStyles({
  root: {
    width: 592,
    height: 59,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${PrimaryBtnEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    '&:hover': {
      backgroundImage: `url(${PrimaryBtnHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${PrimaryBtnPressed})`,
    },
    '&:focus': {
      backgroundImage: `url(${PrimaryBtnSelected})`,
    },
  },
  disabled: {
    width: 592,
    height: 59,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${PrimaryBtnDisabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    userSelect: 'none',
  },
});

function PrimaryButton({ disabled, children }: PrimaryBtnProp) {
  const classes = useStyles();

  return (
    <div className={disabled ? classes.disabled : classes.root}>
      {children}
    </div>
  )
}

export default PrimaryButton;
