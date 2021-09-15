import { LPToken } from 'utils/tokens';
import { makeStyles } from '@material-ui/core';
import IconToken from 'assets/svgs/IconToken.svg';
import DefaultToken from 'assets/tokens/Default.svg';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: 80,
  },
  tokenContainer: {
    backgroundImage: `url(${IconToken})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: 40,
    height: 40,
    position: 'relative',
    '& img': {
      position: 'absolute',
      borderRadius: '50%',
      width: 20,
      height: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  },
  lpNameContainer: {
    position: 'absolute',
    height: 38,
    top: 21,
    left: 96,
    display: 'flex',
    flexDirection: 'column',
  },
  lpName: {
    color: 'rgba(255, 210, 113, 1)',
    fontSize: 18,
    fontWeight: 700,
    height: 24,
  },
  link: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 14,
    height: 14,
    color: 'rgba(203, 163, 68, 1)',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
});

function LPTokenView({ lp }: { [key: string]: LPToken }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* token 2 */}
      <div 
        className={classes.tokenContainer} 
        style={{
          position: 'absolute',
          left: 36,
          top: 20,
        }}
      >
        <img src={lp.pc.icon ? lp.pc.icon : DefaultToken} />
      </div>
      {/* token 1 */}
      <div 
        className={classes.tokenContainer} 
        style={{
          position: 'absolute',
          left: 4,
          top: 20,
        }}
      >
        <img src={lp.coin.icon ? lp.coin.icon : DefaultToken} />
      </div>
      <div className={classes.lpNameContainer}>
        <div className={classes.lpName}>{lp.name}</div>
        <a 
          href={lp.url} 
          target='_blank' 
          className={classes.link}
        >{`from ${lp.urlHelper}`}</a>
      </div>
    </div>
  );
}

export default LPTokenView;
