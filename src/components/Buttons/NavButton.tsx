import { makeStyles } from '@material-ui/core/styles';
import { NavBtnProp } from 'types';
import NavEnabled from 'assets/svgs/NavEnabled.svg';
import NavHovered from 'assets/svgs/NavHovered.svg';
import NavPressed from 'assets/svgs/NavPressed.svg';
import NavSelected from 'assets/svgs/NavSelected.svg';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  inactive: {
    width: 124,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    backgroundImage: `url(${NavEnabled})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      backgroundImage: `url(${NavHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${NavPressed})`,
    },
    cursor: `url(${CursorPointer}), pointer`,
  },
  active: {
    width: 124,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    backgroundImage: `url(${NavSelected})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',  
    cursor: `url(${CursorPointer}), pointer`,
  },
  title: {
    fontFamily: 'Spectral SC',
    fontSize: 16,
    fontWeight: 700,
    backgroundColor: 'transparent',
    background: 'linear-gradient(175.49deg, #FFD271 26.78%, #825900 64.2%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    lineHeight: '24.5px',
  },
  activeTitle: {
    fontWeight: 700,
    fontSize: 16,
    color: '#FFD271',
  },
});

function NavButton(prop: NavBtnProp) {
  const classes = useStyles();
  const { active, title } = prop;
  return (
    <div className={active ? classes.active : classes.inactive}>
      <div className={active ? classes.activeTitle : classes.title}>
        {title}
      </div>
    </div>
  )
}

export default NavButton;
