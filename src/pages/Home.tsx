import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core";
import { STONES } from "utils/stones";
import { HOME_FLAG_DATA } from "utils/constants";
import { TokenName } from "types";
import HomeHeader from "components/Home/HomeHeader";
import Slider from "components/Slider";
import Flag from "components/Vaults/Flag";
import BgHome from 'assets/svgs/BGHome.png';
import TextLets from 'assets/logos/title 1.png';
import TextGauntlet from 'assets/logos/title 2.png';
// import TextLets from 'assets/logos/lets.png';
// import TextGauntlet from 'assets/logos/gauntlet.png';
import Logo from 'assets/svgs/Logo.png';
import BtnGoToApp from 'assets/svgs/BtnGoToApp.svg';
import BtnGoToAppHovered from 'assets/svgs/BtnGoToAppHovered.svg';
import BtnGoToAppPressed from 'assets/svgs/BtnGoToAppPressed.svg';
import IconPageUp from 'assets/svgs/IconPageUp.svg';
import { ReactComponent as LineDivider } from 'assets/svgs/LineHomeDivider.svg';
import { ReactComponent as Stones } from 'assets/test/HomeStones.svg';
import BtnMore from 'assets/svgs/BtnMore.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'auto',
    overflow: 'hidden',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    transform: 'translateY(-110%)',
    transition: 'transform 0.3s ease',
    '&.active': {
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease',
    },
  },
  stone: {
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  mainSection: {
    width: '100%',
    height: 826,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgb(0, 0, 0)',
    backgroundImage: `url(${BgHome})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    animation: '1s ease-in-out 0.2s 1 normal forwards running $textPop'
  },
  textLets: {
    marginTop: 201,
    width: 216,
    zIndex: 10,
  },
  textGauntlet: {
    marginTop: 24,
    width: 431,
    zIndex: 10,
  },
  textCopy: {
    marginTop: 32,
    fontFamily: 'Sen',
    fontSize: 16,
    color: 'white',
  },
  divider: {
    marginTop: 48,
    width: '100%',
    height: 20,
  },
  appBtnContainer: {
    marginTop: 64,
    width: '100%',
    height: 38,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBtn: {
    position: 'relative',
    width: 124,
    height: 38,
    // cursor: `url(${CursorPointer}), pointer`,
    cursor: 'pointer',
    background: 'rgb(18, 16, 18)',
    backgroundImage: `url(${BtnGoToApp})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 4,
    '&::after': {
      position: 'absolute',
      content: '""',
      top: -1,
      left: -1,
      zIndex: -1,
      width: 'calc(100% + 2px)',
      height: 'calc(100% + 2px)',
      background: `linear-gradient(60deg, transparent 40%, rgb(255, 198, 78) 50%, transparent 60%)`,
      backgroundSize: '300% 300%',
      backgroundPosition: '0 50%',
      borderRadius: 4,
      animation: '$moveGradient 4s alternate infinite',
    },
    '&:hover': {
      backgroundImage: `url(${BtnGoToAppHovered})`,
    },
    '&:active': {
      backgroundImage: `url(${BtnGoToAppPressed})`,
    },
  },
  ['@keyframes moveGradient']: {
    '50%': {
      backgroundPosition: '100% 50%',
    }
  },
  ['@keyframes textPop']: {
    '0%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(1)',
    }
  },
  section: {
    width: 976,
    margin: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 770,
    position: 'relative',
  },
  ['@keyframes showText']: {
    '0%': {
      opacity: 0,
      transform: 'translate3d(0px, 50px, 0px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0px, 0px, 0px)',
    },
  },
  textHeader: {
    fontFamily: 'Sen',
    fontWeight: 800,
    fontSize: 32,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    opacity: 0,
    transform: 'translate3d(0px, 50px, 0px)',
    '&.active': {
      animation: '1s ease-in-out 0s 1 normal forwards running $showText'
    },
  },
  textBody: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#B2B0B4',
    marginTop: 56,
    width: 780,
    opacity: 0,
    transform: 'translate3d(0px, 50px, 0px)',
    '&.active': {
      animation: '1s ease-in-out 0.2s 1 normal forwards running $showText'
    },
  },
  stones: {
    opacity: 0,
    transform: 'translate3d(0px, 50px, 0px)',
    '&.active': {
      animation: '1s ease-in-out 0.4s 1 normal forwards running $showText'
    },
  },
  btnMore: {
    marginTop: 104,
    width: 122,
    height: 32,
    backgroundImage: `url(${BtnMore})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: `pointer`,
    opacity: 0,
    transform: 'translate3d(0px, 50px, 0px)',
    '&.active': {
      animation: '1s ease-in-out 0.4s 1 normal forwards running $showText'
    },
  },
  footer: {
    width: 976,
    margin: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 400,
  },
  iconPageUp: {
    marginTop: 57,
    width: 32,
    height: 32,
    alignSelf: 'flex-end',
    background: `url(${IconPageUp})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  footerLine: {
    margin: '32px 0',
    height: 1,
    width: '100vw',
    background: 'linear-gradient(90deg, rgba(9, 1, 6, 0) 0%, rgb(214, 86, 254, 0.5) 50.41%, rgba(0, 0, 0, 0) 100%)',
  },
  footerText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#B2B0B4',
  }
});


export default function Home() {
  const classes = useStyles();
  const { push } = useHistory();
  const [show, setShow] = useState(false);
  const [section1, setSection1] = useState(false);
  const [section2, setSection2] = useState(false);
  const [section3, setSection3] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const THROTTLE = 770;
  const THROTTLE1 = 1150;
  const THROTTLE2 = 2300;
  const THROTTLE3 = 2880;

  function handleDocumentScroll() {
    const { scrollTop: currentScrollTop } = document.documentElement || document.body;
    const scrollBottom = currentScrollTop + window.innerHeight;

    setShow(currentScrollTop > THROTTLE);
    if (scrollBottom > THROTTLE1) setSection1(true);
    if (scrollBottom > THROTTLE2) setSection2(true);
    if (scrollBottom > THROTTLE3) setSection3(true);
  }

  const flags = HOME_FLAG_DATA.map((d, idx) => (
    {
      key: uuidv4(),
      content: <Flag
        isHome={true}
        tokenName={d.name as TokenName}
        deposited={0}
        balance={159.167833}
        reward={d.amount}
        active={slideIndex % HOME_FLAG_DATA.length === idx}
      />,
      onClick: () => setSlideIndex(idx)
    }
  ))

  useEffect(() => {
    const { scrollTop: currentScrollTop } = document.documentElement || document.body;
    const scrollBottom = currentScrollTop + window.innerHeight;

    setShow(currentScrollTop > THROTTLE);
    if (scrollBottom > THROTTLE1) setSection1(true);

    window.addEventListener('scroll', handleDocumentScroll);

    return () => window.removeEventListener('scroll', handleDocumentScroll);
  }, [])

  useEffect(() => {
    var timer = setInterval(() => {
      setSlideIndex(slideIndex + 2);
    }, 3000);

    return () => {
      clearInterval(timer);
    }
  }, [slideIndex]);

  useEffect(() => {
    document.body.style.background = 'rgb(18, 16, 18)';
    return () => {
      document.body.style.background = 'radial-gradient(74.59% 79.26% at 24.92% 28.24%, #1F1830 24.32%, #3F2643 91.83%)'
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.mainSection}>
        <img src={TextLets} className={classes.textLets} />
        <img src={TextGauntlet} className={classes.textGauntlet} />
        <div className={classes.textCopy}>Wherever you farm, whatever you yield!</div>
        <LineDivider className={classes.divider} />
        <div className={classes.appBtnContainer}>
          <div className={classes.appBtn} onClick={() => push('/vault')} />
        </div>
      </div>
      <img className={`${classes.stone} stone1`} src={STONES.BTC.xxlarge} />
      <img className={`${classes.stone} stone2`} src={STONES.ETH.xxlarge} />
      <img className={`${classes.stone} stone3`} src={STONES.SOL.xxlarge} />
      <img className={`${classes.stone} stone4`} src={STONES.USDC.xxlarge} />
      <img className={`${classes.stone} stone5`} src={STONES.USDT.xxlarge} />
      <img className={`${classes.stone} stone6`} src={STONES.RAY.xxlarge} />
      <img className={`${classes.stone} stone7`} src={STONES.LET.xxlarge} />
      <div className={classes.section} style={{ marginTop: 153, }}>
        <div className={`${classes.textHeader} ${section1 ? "active" : ''}`}>The new yield Optimizer</div>
        <div className={`${classes.textBody} ${section1 ? "active" : ''}`} style={{ textAlign: 'center', marginBottom: 104, }}>{
          `Gauntlet is the first Defi service that harvests Yield automatically and turn them into a targeted asset. You can collect any asset you want whichever Defi service you farm!`
        }</div>
        <Stones className={`${classes.stones} ${section1 ? "active" : ''}`} />
        <div className={`${classes.btnMore} ${section1 ? "active" : ''}`} />
      </div>
      <div className={classes.section} style={{ alignItems: 'flex-start' }}>
        <div style={{
          position: 'absolute',
          top: 66,
          left: '50%',
          transform: 'translate(-138px, 0)',
          width: 1168,
          height: 726,
          zIndex: -1,
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
            <Slider index={slideIndex} slides={flags} />
          </div>
        </div>
        <div
          className={`${classes.textHeader} ${section2 ? "active" : ''}`}
          style={{
            marginTop: 394,
            background: "linear-gradient(102.9deg, #D656FE 20%, #00EAAD 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: 'transparent',
          }}
        >AUTOmated yield converter</div>
        <div
          className={`${classes.textBody} ${section2 ? "active" : ''}`}
          style={{
            textAlign: 'left',
            width: 640,
          }}>{
            `Automated Yield Converter converts any yields to targeted assets to avoid or speculate on volatility. Also, if there are people who have taken the same strategy, the performing cost will be lowered to maximize the profit.`
          }</div>
        <div
          className={`${classes.btnMore} ${section2 ? "active" : ''}`}
          style={{ marginTop: 80, }}
          onClick={() => console.log('click')}
        />
      </div>
      <div className={classes.section}>
        <div className={`${classes.textHeader} ${section3 ? "active" : ''}`} style={{ marginTop: 251, }}>pipeline the Money legos</div>
        <div className={`${classes.textBody} ${section3 ? "active" : ''}`} style={{ textAlign: 'center', width: 700 }}>{
          `Gauntlet supports pipelining Defi services by providing Vaults so that the auto-converted asset can be invested to any Defi service to maximize your profit!`
        }</div>
        <div
          className={`${classes.btnMore} ${section3 ? "active" : ''}`}
          style={{ marginTop: 80, }}
          onClick={() => console.log('click')}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.iconPageUp} onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }} />
        <div className={classes.footerLine} />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img src={Logo} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 32,
              }}
            >
              <span className={classes.footerText}>Docs</span>
              <span className={classes.footerText}>Medium</span>
              <span className={classes.footerText}>Discord</span>
              <span className={classes.footerText}>Telegram</span>
            </div>
            <span className={classes.footerText} style={{ fontSize: 12, }}>© 2021 by Gauntlet Protocol. All rights reserved.</span>
          </div>
        </div>
      </div>
      <div className={show ? `${classes.header} active` : classes.header}>
        <HomeHeader />
      </div>
    </div>
  )
}
