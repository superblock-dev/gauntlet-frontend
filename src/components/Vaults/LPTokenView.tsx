import { LPToken } from 'utils/tokens';
import { makeStyles } from '@material-ui/core';
import IconToken from 'assets/svgs/IconToken.svg';
import DefaultToken from 'assets/tokens/Default.svg';
import { useRecoilValue } from 'recoil';
import { tokenInfos } from 'recoil/atoms';

interface LPTokenProps {
  lp: LPToken,
  name?: string,
  linkVisible?: boolean,
}

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
  linkHelper: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 14,
    height: 14,
    color: 'rgba(203, 163, 68, 1)',
  },
  link: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    height: 14,
    marginLeft: 8,
    color: 'rgba(0, 201, 177, 1)',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
});

function LPTokenView({ lp, name, linkVisible }: LPTokenProps) {
  const classes = useStyles();
  const tokens = useRecoilValue(tokenInfos);
  let pcIcon;
  let coinIcon;
  console.log(tokens)
  
  if (lp.pc) {
    const pc = tokens[lp.pc.symbol]
    pcIcon = pc?.icon
  }
  if (lp.coin) {
    const coin = tokens[lp.coin.symbol]
    coinIcon = coin?.icon
  }
  
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
        <img src={pcIcon ? pcIcon : DefaultToken} />
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
        <img src={coinIcon ? coinIcon : DefaultToken} />
      </div>
      {
        linkVisible ?
          <div style={{
            position: 'absolute',
            height: 80,
            left: 96,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div className={classes.lpName} style={{ 
              fontSize: 20,
              height: 30,
            }}>{name}</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: 24,
            }}>
              <div className={classes.linkHelper} style={{
                fontSize: 12,
                height: 14,
              }}>{lp.urlHelper ? `from ${lp.urlHelper}` : 0}</div>
              <a href={lp.url} target="_blank" className={classes.link}>{`+ Add ${lp.name} LP`}</a>
            </div>
          </div> :
          <div className={classes.lpNameContainer}>
            <div className={classes.lpName}>{name}</div>
            <div className={classes.linkHelper}>{`from ${lp.urlHelper}`}</div>
          </div>
      }
    </div>
  );
}

export default LPTokenView;
