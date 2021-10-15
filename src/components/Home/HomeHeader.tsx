import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavButton from 'components/Buttons/NavButton';
import Logo from 'assets/svgs/Logo.png';
import CursorPointer from 'assets/CursorPointer.svg';

const useStyles = makeStyles({
  container: {
    marginLeft: 80,
    marginRight: 80,
    height: 56,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(18, 16, 18)',
  },
  logo: {
    position: 'absolute',
    left: 0,
    top: 18,
    height: 20,
  },
  navContainer: {
    position: 'absolute',
    top: 8,
    bottom: -4,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtn: {
    position: 'absolute',
    right: 0,
    top: 12,
    width: 140,
    height: 32,
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: `url(${CursorPointer}), pointer`,
  },
  tvlText: {
    position: 'absolute',
    right: 172,
    top: 16,
    fontSize: 16,
    fontWeight: 700,
    color: 'rgba(255, 210, 113, 1)',
  },
})

const routeList = [
  { label: "DOCS", path: "https://superblock.gitbook.io/gauntlet/" },
  { label: "DISCORD", path: "/" },
  { label: "TWITTER", path: "https://twitter.com/GauntletVault" },
]

export default function HomeHeader() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Link to={'/'} className={classes.logo}>
        <img src={Logo} />
      </Link>
      <div className={classes.navContainer}>
        {routeList.map((menu) => (
          <Link
            key={menu.path}
            target="_blank"
            to={{
              pathname: menu.path
            }}>
            <NavButton
              title={menu.label} />
          </Link>
        ))}
      </div>
    </div>
  )
}
