import { makeStyles } from "@material-ui/core";
import LineOnlyGold from 'assets/svgs/LineOnlyGold.svg';
import { PageTemplateProp } from "types";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 1080,
  },
  title: {
    marginTop: 72,
    fontWeight: 700,
    fontSize: 32, 
    height: 49,
    lineHeight: '48.7px',
    background: 'linear-gradient(175.49deg, #FFD271 26.78%, #825900 64.2%)',
    backgroundColor: 'transparent',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  titleUnderline: {
    width: '100%',
    height: 20,
    backgroundImage: `url(${LineOnlyGold})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 16,
    color: 'rgba(203, 163, 68, 1);',
  },
});

function PageTemplate({ children, title, subtitle }: PageTemplateProp) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.titleUnderline} />
      {
        subtitle ?
        <div className={classes.subtitle}>{subtitle}</div> :
        null        
      }
      { children }
    </div>  
  )
}

export default PageTemplate;
